(function () {
  var OPEN_DELAY_MS = 80;
  var CLOSE_DELAY_MS = 100;
  var VIEWPORT_MARGIN = 12;
  var PANEL_GAP = 10;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function isMobileViewport() {
    return window.matchMedia('(max-width: 959px)').matches;
  }

  function isElementVisible(element) {
    if (!element) {
      return false;
    }

    return Boolean(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
  }

  function ensureRelativeTarget(target) {
    if (!target) {
      return;
    }

    target.classList.add('explainer-target');
    if (!target.style.position) {
      var computed = window.getComputedStyle(target).position;
      if (computed === 'static') {
        target.style.position = 'relative';
      }
    }
  }

  function normalizeItems(items) {
    var list = Array.isArray(items) ? items.slice() : [];

    return list
      .filter(function (item) {
        return item && typeof item.id === 'string' && typeof item.target === 'string';
      })
      .sort(function (a, b) {
        var orderA = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
        var orderB = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
      });
  }

  function buildPanel(zoneId) {
    var panel = document.createElement('aside');
    panel.className = 'explainer-panel';
    panel.setAttribute('data-explainer-panel', zoneId);
    panel.id = 'explainer-panel-' + zoneId;
    panel.setAttribute('aria-live', 'polite');
    panel.hidden = true;

    panel.innerHTML =
      '<p class="explainer-panel-kicker">EXPLAINER</p>' +
      '<h3 class="explainer-panel-label" data-explainer-panel-label></h3>' +
      '<p class="explainer-panel-line explainer-panel-what" data-explainer-panel-what></p>' +
      '<p class="explainer-panel-line explainer-panel-how" data-explainer-panel-how></p>' +
      '<p class="explainer-panel-related" data-explainer-panel-related></p>' +
      '<div class="explainer-panel-controls">' +
      '<button type="button" class="button button-ghost" data-explainer-prev>Prev</button>' +
      '<button type="button" class="button button-ghost" data-explainer-next>Next</button>' +
      '<button type="button" class="button" data-explainer-close>Close</button>' +
      '</div>';

    return panel;
  }

  function buildMarker(item, index, panelId) {
    var anchorType = item && item.anchorType === 'line' ? 'line' : 'box';
    var fallbackAnchor = anchorType === 'line' ? { x: 50, y: 50 } : { x: 92, y: 88 };

    var marker = document.createElement('button');
    marker.type = 'button';
    marker.className = 'explainer-marker is-anchor-' + anchorType;
    marker.dataset.explainerId = item.id;
    marker.dataset.explainerIndex = String(index);
    marker.dataset.anchorType = anchorType;
    marker.setAttribute('aria-label', item.label || 'Explainer part');
    marker.setAttribute('aria-expanded', 'false');
    marker.setAttribute('aria-current', 'false');
    marker.setAttribute('aria-controls', panelId);

    var x = item.anchor && typeof item.anchor.x === 'number' ? item.anchor.x : fallbackAnchor.x;
    var y = item.anchor && typeof item.anchor.y === 'number' ? item.anchor.y : fallbackAnchor.y;
    marker.style.left = clamp(x, 4, 96) + '%';
    marker.style.top = clamp(y, 6, 94) + '%';

    marker.innerHTML =
      '<span class="explainer-marker-dot">' +
      '?' +
      '</span>' +
      '<span class="explainer-tooltip" role="tooltip">' +
      (item.label || 'Part') +
      '</span>';

    return marker;
  }

  function mount(root, config) {
    if (!root || !config) {
      return;
    }

    var zoneId = config.zoneId || 'default';
    var items = normalizeItems(config.items);

    if (items.length === 0) {
      return;
    }

    root.classList.add('explainer-root');
    root.classList.add('explainer-root-' + zoneId);

    var fallback = root.querySelector('[data-explainer-fallback]');
    if (fallback && fallback.tagName === 'DETAILS') {
      fallback.open = false;
    }

    var panel = buildPanel(zoneId);
    root.appendChild(panel);

    var labelNode = panel.querySelector('[data-explainer-panel-label]');
    var whatNode = panel.querySelector('[data-explainer-panel-what]');
    var howNode = panel.querySelector('[data-explainer-panel-how]');
    var relatedNode = panel.querySelector('[data-explainer-panel-related]');
    var prevButton = panel.querySelector('[data-explainer-prev]');
    var nextButton = panel.querySelector('[data-explainer-next]');
    var closeButton = panel.querySelector('[data-explainer-close]');

    var triggerMap = new Map();
    var activeId = null;
    var lockedId = null;
    var activeMarker = null;
    var openTimer = null;
    var closeTimer = null;

    function clearTimer(timerRef) {
      if (timerRef) {
        window.clearTimeout(timerRef);
      }
      return null;
    }

    function findItemById(id) {
      return items.find(function (item) {
        return item.id === id;
      });
    }

    function getVisibleItemIds() {
      return items
        .filter(function (item) {
          var entry = triggerMap.get(item.id);
          return entry && isElementVisible(entry.target);
        })
        .map(function (item) {
          return item.id;
        });
    }

    function getNeighborId(currentId, direction) {
      var ids = getVisibleItemIds();
      if (ids.length === 0) {
        return null;
      }

      var startIndex = ids.indexOf(currentId);
      if (startIndex === -1) {
        startIndex = 0;
      }

      var nextIndex = (startIndex + direction + ids.length) % ids.length;
      return ids[nextIndex];
    }

    function setPanelContent(item) {
      if (!item) {
        return;
      }

      labelNode.textContent = item.label || 'Part';
      whatNode.textContent = item.whatThisIs || '';
      howNode.textContent = item.howItConnects || '';

      var relatedLabels = (item.related || [])
        .map(function (id) {
          var related = findItemById(id);
          return related ? related.label : null;
        })
        .filter(Boolean);

      relatedNode.textContent =
        relatedLabels.length > 0 ? 'Related: ' + relatedLabels.join(', ') : '';
    }

    function clearStates() {
      triggerMap.forEach(function (entry) {
        entry.marker.classList.remove('is-preview', 'is-active', 'is-dimmed');
        entry.marker.setAttribute('aria-expanded', 'false');
        entry.marker.setAttribute('aria-current', 'false');

        entry.target.classList.remove('is-preview', 'is-active', 'is-related', 'is-dimmed');
      });

      root.classList.remove('is-explainer-active');
    }

    function positionPanelNearMarker(marker) {
      if (!marker) {
        return;
      }

      panel.classList.toggle('is-mobile-sheet', isMobileViewport());
      panel.style.left = '';
      panel.style.top = '';
      panel.style.right = '';
      panel.style.bottom = '';

      if (panel.classList.contains('is-mobile-sheet')) {
        return;
      }

      var markerRect = marker.getBoundingClientRect();
      var panelRect = panel.getBoundingClientRect();
      var viewportWidth = window.innerWidth;
      var viewportHeight = window.innerHeight;

      var placements = [
        {
          name: 'top-center',
          left: markerRect.left + markerRect.width / 2 - panelRect.width / 2,
          top: markerRect.top - panelRect.height - PANEL_GAP
        },
        {
          name: 'top-right',
          left: markerRect.right - panelRect.width,
          top: markerRect.top - panelRect.height - PANEL_GAP
        },
        {
          name: 'top-left',
          left: markerRect.left,
          top: markerRect.top - panelRect.height - PANEL_GAP
        },
        {
          name: 'right',
          left: markerRect.right + PANEL_GAP,
          top: markerRect.top + markerRect.height / 2 - panelRect.height / 2
        },
        {
          name: 'left',
          left: markerRect.left - panelRect.width - PANEL_GAP,
          top: markerRect.top + markerRect.height / 2 - panelRect.height / 2
        },
        {
          name: 'bottom',
          left: markerRect.left + markerRect.width / 2 - panelRect.width / 2,
          top: markerRect.bottom + PANEL_GAP
        }
      ];

      function fits(candidate) {
        return (
          candidate.left >= VIEWPORT_MARGIN &&
          candidate.top >= VIEWPORT_MARGIN &&
          candidate.left + panelRect.width <= viewportWidth - VIEWPORT_MARGIN &&
          candidate.top + panelRect.height <= viewportHeight - VIEWPORT_MARGIN
        );
      }

      var chosen = placements.find(fits) || placements[0];
      var safeLeft = clamp(chosen.left, VIEWPORT_MARGIN, viewportWidth - panelRect.width - VIEWPORT_MARGIN);
      var safeTop = clamp(chosen.top, VIEWPORT_MARGIN, viewportHeight - panelRect.height - VIEWPORT_MARGIN);

      panel.style.left = safeLeft + 'px';
      panel.style.top = safeTop + 'px';
      panel.dataset.placement = chosen.name;
    }

    function showPanel() {
      panel.hidden = false;
      panel.classList.add('is-open');
    }

    function hidePanel() {
      panel.hidden = true;
      panel.classList.remove('is-open', 'is-mobile-sheet');
      panel.style.left = '';
      panel.style.top = '';
      panel.style.right = '';
      panel.style.bottom = '';
      delete panel.dataset.placement;
    }

    function closePanel() {
      activeId = null;
      activeMarker = null;
      if (!lockedId) {
        clearStates();
      }
      hidePanel();
    }

    function applyActiveState(item, marker, isLocked) {
      if (!item) {
        return;
      }

      activeId = item.id;
      activeMarker = marker;

      clearStates();
      root.classList.add('is-explainer-active');

      triggerMap.forEach(function (entry, key) {
        var isActive = key === item.id;
        var isRelated = Array.isArray(item.related) && item.related.indexOf(key) !== -1;
        var shouldDim = !isActive && !isRelated;

        entry.marker.classList.toggle('is-active', isActive);
        entry.marker.classList.toggle('is-dimmed', shouldDim);
        entry.marker.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        entry.marker.setAttribute('aria-current', isActive ? 'true' : 'false');

        entry.target.classList.toggle('is-active', isActive);
        entry.target.classList.toggle('is-related', isRelated);
        entry.target.classList.toggle('is-dimmed', shouldDim);
      });

      setPanelContent(item);
      showPanel();
      positionPanelNearMarker(marker);

      if (isLocked) {
        lockedId = item.id;
      }
    }

    function scheduleOpen(id, marker, lockOnOpen) {
      openTimer = clearTimer(openTimer);
      closeTimer = clearTimer(closeTimer);

      openTimer = window.setTimeout(function () {
        if (lockedId && lockedId !== id && !lockOnOpen) {
          return;
        }

        var item = findItemById(id);
        applyActiveState(item, marker, lockOnOpen);
      }, OPEN_DELAY_MS);
    }

    function scheduleClose() {
      if (lockedId) {
        return;
      }

      closeTimer = clearTimer(closeTimer);
      closeTimer = window.setTimeout(function () {
        closePanel();
      }, CLOSE_DELAY_MS);
    }

    function focusMarker(id) {
      var entry = triggerMap.get(id);
      if (entry) {
        entry.marker.focus();
      }
    }

    items.forEach(function (item, index) {
      var target = root.querySelector(item.target);
      if (!target) {
        return;
      }

      ensureRelativeTarget(target);

      var marker = buildMarker(item, index, panel.id);
      target.appendChild(marker);

      marker.addEventListener('mouseenter', function () {
        scheduleOpen(item.id, marker, false);
      });

      marker.addEventListener('mouseleave', function () {
        openTimer = clearTimer(openTimer);
        scheduleClose();
      });

      marker.addEventListener('focus', function () {
        scheduleOpen(item.id, marker, false);
      });

      marker.addEventListener('blur', function () {
        openTimer = clearTimer(openTimer);
        scheduleClose();
      });

      marker.addEventListener('click', function () {
        if (lockedId === item.id) {
          lockedId = null;
          closePanel();
          return;
        }

        lockedId = null;
        scheduleOpen(item.id, marker, true);
      });

      marker.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();

          if (lockedId === item.id) {
            lockedId = null;
            closePanel();
            return;
          }

          lockedId = null;
          scheduleOpen(item.id, marker, true);
          return;
        }

        if (event.key === 'Escape') {
          event.preventDefault();
          lockedId = null;
          closePanel();
          marker.focus();
          return;
        }

        if (
          event.key === 'ArrowRight' ||
          event.key === 'ArrowDown' ||
          event.key === 'ArrowLeft' ||
          event.key === 'ArrowUp'
        ) {
          event.preventDefault();
          var direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
          var nextId = getNeighborId(item.id, direction);
          if (nextId) {
            var nextEntry = triggerMap.get(nextId);
            if (nextEntry) {
              scheduleOpen(nextId, nextEntry.marker, Boolean(lockedId));
              focusMarker(nextId);
            }
          }
        }
      });

      triggerMap.set(item.id, {
        item: item,
        marker: marker,
        target: target
      });
    });

    if (triggerMap.size === 0) {
      panel.remove();
      return;
    }

    panel.addEventListener('mouseenter', function () {
      closeTimer = clearTimer(closeTimer);
    });

    panel.addEventListener('mouseleave', function () {
      scheduleClose();
    });

    prevButton.addEventListener('click', function () {
      var current = activeId || getVisibleItemIds()[0];
      var previousId = getNeighborId(current, -1);
      if (previousId) {
        var entry = triggerMap.get(previousId);
        if (entry) {
          scheduleOpen(previousId, entry.marker, Boolean(lockedId));
          focusMarker(previousId);
        }
      }
    });

    nextButton.addEventListener('click', function () {
      var current = activeId || getVisibleItemIds()[0];
      var nextId = getNeighborId(current, 1);
      if (nextId) {
        var entry = triggerMap.get(nextId);
        if (entry) {
          scheduleOpen(nextId, entry.marker, Boolean(lockedId));
          focusMarker(nextId);
        }
      }
    });

    closeButton.addEventListener('click', function () {
      lockedId = null;
      closePanel();
    });

    root.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && activeId) {
        event.preventDefault();
        var focusId = activeId;
        lockedId = null;
        closePanel();
        focusMarker(focusId);
      }
    });

    window.addEventListener(
      'scroll',
      function () {
        if (activeMarker && !panel.hidden) {
          positionPanelNearMarker(activeMarker);
        }
      },
      true
    );

    window.addEventListener('resize', function () {
      if (activeMarker && !panel.hidden) {
        positionPanelNearMarker(activeMarker);
      }
    });
  }

  window.AgencyExplainers = {
    mount: mount
  };
})();
