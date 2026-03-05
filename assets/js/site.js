(function () {
  var ONBOARDING_STORAGE_KEY = 'agency-onboarding-hidden-v1';

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/\n/g, '&#10;');
  }

  function joinPath(basePath, filePath) {
    if (!filePath) {
      return '';
    }

    if (/^https?:\/\//.test(filePath)) {
      return filePath;
    }

    if (!basePath || basePath === '.') {
      return filePath;
    }

    return basePath.replace(/\/$/, '') + '/' + filePath.replace(/^\//, '');
  }

  function cloneRecord(record) {
    return JSON.parse(JSON.stringify(record));
  }

  function normalizeItems(items) {
    if (!Array.isArray(items)) {
      return [];
    }

    return items
      .map(function (item, index) {
        var normalized = cloneRecord(item);
        if (typeof normalized.order !== 'number') {
          normalized.order = index + 1;
        }
        return normalized;
      })
      .filter(function (item) {
        return item && typeof item.id === 'string';
      });
  }

  function getModeLabel(mode) {
    if (mode === 'dont') {
      return "DON'T";
    }

    if (mode === 'warn') {
      return 'CHECK';
    }

    return 'DO';
  }

  function renderActionButton(button) {
    if (!button) {
      return '';
    }

    if (button.type === 'external') {
      return (
        '<a class="button" href="' +
        escapeAttr(button.value) +
        '" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(button.label) +
        '</a>'
      );
    }

    if (button.type === 'copy') {
      return (
        '<button class="button" type="button" data-copy-trigger data-copy-value="' +
        escapeAttr(button.value) +
        '">' +
        escapeHtml(button.label) +
        '</button>'
      );
    }

    if (button.type === 'disabled') {
      return (
        '<button class="button" type="button" disabled aria-disabled="true">' +
        escapeHtml(button.label) +
        '</button>'
      );
    }

    return '';
  }

  function renderProgressBars(totalSteps, currentStep, completedSteps) {
    var bars = '';
    for (var index = 1; index <= totalSteps; index += 1) {
      var classes = ['progress-bar'];
      if (index < currentStep) {
        classes.push('is-past');
      } else if (index === currentStep) {
        classes.push('is-current');
      }

      if (index <= completedSteps) {
        classes.push('is-checked');
      }

      bars += '<span class="' + classes.join(' ') + '"></span>';
    }

    return bars;
  }

  function renderStepRail(steps, currentStepId, basePath) {
    var items = steps
      .map(function (step) {
        var isCurrent = step.id === currentStepId;
        var complete =
          window.AgencyChecks && window.AgencyChecks.isStepComplete
            ? window.AgencyChecks.isStepComplete(step.id, step.checks.length)
            : false;

        var itemClass = ['step-rail-item'];
        if (isCurrent) {
          itemClass.push('is-current');
        }
        if (complete) {
          itemClass.push('is-complete');
        }

        return (
          '<li class="' +
          itemClass.join(' ') +
          '"><a href="' +
          joinPath(basePath, step.path) +
          '"><span class="step-rail-number">' +
          escapeHtml(step.stepNumberText) +
          '</span><span class="step-rail-label">' +
          escapeHtml(step.navLabel) +
          '</span></a></li>'
        );
      })
      .join('');

    return '<ol class="step-rail-list">' + items + '</ol>';
  }

  function renderChecklist(step) {
    return step.checks
      .map(function (text, index) {
        var checkboxId = 'step-' + step.id + '-check-' + index;
        return (
          '<label class="check-item" for="' +
          checkboxId +
          '"><input id="' +
          checkboxId +
          '" type="checkbox" data-check-index="' +
          String(index) +
          '"><span>' +
          escapeHtml(text) +
          '</span></label>'
        );
      })
      .join('');
  }

  function renderActionPanel(action, basePath, iconPath) {
    if (!action) {
      return '';
    }

    var panelClass = 'panel panel-action mode-' + action.mode.toLowerCase();
    var helperText = action.helperText
      ? '<p class="action-helper" aria-live="polite">' + escapeHtml(action.helperText) + '</p>'
      : '';
    var promptBlock = action.promptBlock
      ? '<div class="action-prompt-box"><pre>' + escapeHtml(action.promptBlock) + '</pre></div>'
      : '';
    var referenceImage = '';

    if (action.referenceImage && action.referenceImage.src) {
      referenceImage =
        '<figure class="action-reference"><img src="' +
        escapeAttr(joinPath(basePath, action.referenceImage.src)) +
        '" alt="' +
        escapeAttr(action.referenceImage.alt || 'Reference image') +
        '">' +
        (action.referenceImage.caption
          ? '<figcaption>' + escapeHtml(action.referenceImage.caption) + '</figcaption>'
          : '') +
        '</figure>';
    }

    return (
      '<section class="' +
      panelClass +
      '" data-panel-id="' +
      escapeAttr(action.panelId) +
      '"><span class="panel-index">' +
      escapeHtml(action.panelId) +
      '</span><p class="panel-label">' +
      getModeLabel(action.mode) +
      '</p><div class="panel-content action-content"><img class="icon" src="' +
      escapeAttr(iconPath || joinPath(basePath, 'assets/icons/copy.svg')) +
      '" alt="" aria-hidden="true"><p>' +
      escapeHtml(action.line) +
      '</p>' +
      helperText +
      promptBlock +
      referenceImage +
      renderActionButton(action.button) +
      '</div></section>'
    );
  }

  function renderNavStrip(steps, stepIndex, basePath, panelId, currentStep) {
    var previousStep = stepIndex > 0 ? steps[stepIndex - 1] : null;
    var nextStep = stepIndex < steps.length - 1 ? steps[stepIndex + 1] : null;
    var navPanelId = panelId || 'P7';

    var left = previousStep
      ? '<a class="button button-ghost" href="' +
        joinPath(basePath, previousStep.path) +
        '">Back</a>'
      : '<a class="button button-ghost" href="' + joinPath(basePath, 'index.html') + '">Home</a>';

    var right = '';

    if (nextStep) {
      right = '<a class="button" href="' + joinPath(basePath, nextStep.path) + '">Next</a>';
    } else {
      var finishPath = joinPath(basePath, 'finish/index.html');
      var isFinalStepComplete =
        window.AgencyChecks &&
        window.AgencyChecks.isStepComplete &&
        currentStep &&
        window.AgencyChecks.isStepComplete(currentStep.id, currentStep.checks.length);

      right =
        '<button class="button" type="button" data-finish-button data-finish-href="' +
        escapeAttr(finishPath) +
        '"' +
        (isFinalStepComplete ? '' : ' disabled aria-disabled="true"') +
        '>Finish</button>';
    }

    return (
      '<section class="panel panel-nav" data-panel-id="' +
      escapeAttr(navPanelId) +
      '"><span class="panel-index">' +
      escapeHtml(navPanelId) +
      '</span><p class="panel-label">NAV</p><div class="panel-content nav-strip">' +
      left +
      right +
      '</div></section>'
    );
  }

  function getCalloutLabel(entry, index) {
    if (typeof entry === 'string') {
      return entry;
    }

    if (entry && typeof entry.label === 'string' && entry.label.trim()) {
      return entry.label.trim();
    }

    return 'Part ' + String(index + 1);
  }

  function getFallbackDiagramExplainItems(step) {
    var callouts =
      step && step.diagram && Array.isArray(step.diagram.callouts) ? step.diagram.callouts : [];

    return callouts.map(function (entry, index) {
      var label = getCalloutLabel(entry, index);
      return {
        id: 'diagram-fallback-' + String(step.id) + '-' + String(index + 1),
        label: label,
        whatThisIs: 'Key part in this diagram.',
        howItConnects: 'Links this step to the full workflow.',
        target: '#diagram-stage-step-' + String(step.id),
        group: 'diagram-fallback',
        order: 10 + index,
        anchor: {
          x: 12 + Math.min(76, index * 18),
          y: 30 + (index % 2) * 24
        }
      };
    });
  }

  function buildStepExplainItems(step, explainersData) {
    var diagramItems = normalizeItems(
      (explainersData.diagramById || {})[step.diagram.diagramId] || getFallbackDiagramExplainItems(step)
    ).map(function (item, index) {
      var copy = cloneRecord(item);
      copy.target = '#diagram-stage-step-' + String(step.id);
      if (typeof copy.order !== 'number') {
        copy.order = 10 + index;
      }
      return copy;
    });

    return diagramItems;
  }

  function initExplainers(root, zoneId, items) {
    if (!root || !window.AgencyExplainers || typeof window.AgencyExplainers.mount !== 'function') {
      return;
    }

    window.AgencyExplainers.mount(root, {
      zoneId: zoneId,
      items: items
    });
  }

  function renderDiagramCalloutIndex(step) {
    if (!step || !step.diagram || !Array.isArray(step.diagram.callouts) || step.diagram.callouts.length === 0) {
      return '';
    }

    var rows = step.diagram.callouts
      .map(function (entry, index) {
        return '<li>' + escapeHtml(getCalloutLabel(entry, index)) + '</li>';
      })
      .join('');

    return '<ol class="diagram-callout-index" aria-label="Diagram part list">' + rows + '</ol>';
  }

  function renderStepPage(appRoot, steps, step, stepIndex, basePath, explainersData) {
    var completedSteps =
      window.AgencyChecks && window.AgencyChecks.getCompletedStepCount
        ? window.AgencyChecks.getCompletedStepCount(steps)
        : 0;

    var bannerPath = joinPath(basePath, 'assets/brand/agentTopBanner.svg');
    var templateCodeId = step.template ? 'template-block-' + step.id : null;
    var actions = Array.isArray(step.actions)
      ? step.actions.map(function (item) {
          return cloneRecord(item);
        })
      : [];

    var missionStep = steps.find(function (entry) {
      return entry.id === 3;
    });

    var missionComplete =
      window.AgencyChecks &&
      window.AgencyChecks.isStepComplete &&
      missionStep &&
      window.AgencyChecks.isStepComplete(missionStep.id, missionStep.checks.length);

    if (step.id === 7 && !missionComplete) {
      var stepSevenRunAction = actions.find(function (item) {
        return item.panelId === 'P3';
      });

      if (stepSevenRunAction) {
        stepSevenRunAction.line = 'Complete Step 3 mission checks before sending command.';
        stepSevenRunAction.button = {
          label: 'Complete Step 3 First',
          type: 'disabled'
        };
        stepSevenRunAction.helperText = 'Mission gate is required before sequence start.';
      }
    }

    var actionsHtml = actions
      .map(function (action) {
        return renderActionPanel(action, basePath, joinPath(basePath, 'assets/icons/' + (action.iconKey || 'copy') + '.svg'));
      })
      .join('');

    var diagramPanelId = step.diagram && step.diagram.panelId ? step.diagram.panelId : 'P4';
    var templatePanelId = step.template && step.template.panelId ? step.template.panelId : 'P5';
    var checkPanelId = step.checkPanelId || 'P6';
    var navPanelId = step.navPanelId || 'P7';

    var diagramHtml = '';
    if (step.diagram) {
      diagramHtml =
        '<section class="panel panel-diagram" data-panel-id="' +
        escapeAttr(diagramPanelId) +
        '"><span class="panel-index">' +
        escapeHtml(diagramPanelId) +
        '</span><p class="panel-label">DIAGRAM</p><div class="panel-content diagram-content"><figure><div class="diagram-stage" id="diagram-stage-step-' +
        String(step.id) +
        '"><img src="' +
        joinPath(basePath, 'assets/diagrams/' + step.diagram.src) +
        '" alt="' +
        escapeAttr(step.diagram.alt) +
        '"></div><figcaption>' +
        escapeHtml(step.diagram.diagramId) +
        '</figcaption></figure>' +
        renderDiagramCalloutIndex(step) +
        '</div></section>';
    }

    var templateHtml = '';
    if (step.template && step.template.templateAsset) {
      templateHtml =
        '<section class="panel panel-template" data-panel-id="' +
        escapeAttr(templatePanelId) +
        '"><span class="panel-index">' +
        escapeHtml(templatePanelId) +
        '</span><p class="panel-label">BLOCK</p><div class="panel-content template-content"><p class="template-file">' +
        escapeHtml(step.template.fileLabel || '') +
        '</p>' +
        (step.template.description
          ? '<p class="template-note">' + escapeHtml(step.template.description) + '</p>'
          : '') +
        '<pre class="template-block"><code id="' +
        templateCodeId +
        '">Loading template...</code></pre><button class="button" type="button" data-copy-trigger data-copy-from="#' +
        templateCodeId +
        '">' +
        escapeHtml(step.template.copyLabel || 'Copy') +
        '</button></div></section>';
    }

    var checkHtml =
      '<section class="panel panel-check" data-panel-id="' +
      escapeAttr(checkPanelId) +
      '"><span class="panel-index">' +
      escapeHtml(checkPanelId) +
      '</span><p class="panel-label">CHECK</p><div class="panel-content check-content">' +
      renderChecklist(step) +
      '</div></section>';

    var explainItems = buildStepExplainItems(step, explainersData);

    appRoot.innerHTML =
      '<header class="topbar"><a class="brand brand-with-banner" href="' +
      joinPath(basePath, 'index.html') +
      '"><img class="brand-banner" src="' +
      bannerPath +
      '" alt="Agent Factory banner"></a><p class="progress-text">Step ' +
      escapeHtml(step.stepNumberText) +
      '/8</p><div class="progress-bars">' +
      renderProgressBars(steps.length, step.id, completedSteps) +
      '</div><p class="progress-meta"><span data-completed-count>' +
      String(completedSteps) +
      '</span>/8 steps checked</p></header>' +
      '<div class="step-layout"><aside class="step-rail"><p class="rail-title">Step Sequence</p>' +
      renderStepRail(steps, step.id, basePath) +
      '</aside><main id="main" class="panel-stack"><section class="panel panel-header" data-panel-id="P0"><span class="panel-index">P0</span><p class="panel-label">STEP</p><div class="panel-content step-header-content"><p class="step-badge">' +
      escapeHtml(step.stepNumberText) +
      '</p><div><h1>' +
      escapeHtml(step.title) +
      '</h1><p class="goal-line">' +
      escapeHtml(step.goal) +
      '</p><p class="state-pill" data-step-state>In Progress</p></div></div></section><section class="panel panel-goal" data-panel-id="P1"><span class="panel-index">P1</span><p class="panel-label">GOAL</p><div class="panel-content goal-content"><img class="icon" src="' +
      joinPath(basePath, 'assets/icons/' + step.goalIcon + '.svg') +
      '" alt="" aria-hidden="true"><p>' +
      escapeHtml(step.goal) +
      '</p></div></section>' +
      actionsHtml +
      diagramHtml +
      templateHtml +
      checkHtml +
      renderNavStrip(steps, stepIndex, basePath, navPanelId, step) +
      '</main></div>';

    if (step.template && step.template.templateAsset && templateCodeId) {
      loadTemplateText(basePath, step.template.templateAsset, templateCodeId);
    }

    if (window.AgencyChecks && window.AgencyChecks.hydrateStep) {
      window.AgencyChecks.hydrateStep(step.id, step.checks.length);
    }

    refreshStepState(steps, step);

    document.addEventListener('agency:checks-updated', function () {
      refreshStepState(steps, step);
    });

    var main = appRoot.querySelector('#main');
    initExplainers(main, 'step-' + String(step.id), explainItems);

    var finishButton = appRoot.querySelector('[data-finish-button]');
    if (finishButton) {
      finishButton.addEventListener('click', function () {
        if (finishButton.disabled) {
          return;
        }

        var finishHref = finishButton.getAttribute('data-finish-href');
        if (finishHref) {
          window.location.href = finishHref;
        }
      });
    }
  }

  function refreshStepState(steps, step) {
    var completedSteps =
      window.AgencyChecks && window.AgencyChecks.getCompletedStepCount
        ? window.AgencyChecks.getCompletedStepCount(steps)
        : 0;

    var isComplete =
      window.AgencyChecks && window.AgencyChecks.isStepComplete
        ? window.AgencyChecks.isStepComplete(step.id, step.checks.length)
        : false;

    document.querySelectorAll('[data-completed-count]').forEach(function (element) {
      element.textContent = String(completedSteps);
    });

    var statePill = document.querySelector('[data-step-state]');
    if (statePill) {
      statePill.textContent = isComplete ? 'Complete' : 'In Progress';
      statePill.classList.toggle('is-complete', isComplete);
    }

    var finishButton = document.querySelector('[data-finish-button]');
    if (finishButton) {
      finishButton.disabled = !isComplete;
      finishButton.setAttribute('aria-disabled', isComplete ? 'false' : 'true');
    }
  }

  function renderHomePage(appRoot, steps, basePath) {
    var completedSteps =
      window.AgencyChecks && window.AgencyChecks.getCompletedStepCount
        ? window.AgencyChecks.getCompletedStepCount(steps)
        : 0;

    var bannerPath = joinPath(basePath, 'assets/brand/agentTopBanner.svg');

    var listItems = steps
      .map(function (step) {
        var complete =
          window.AgencyChecks && window.AgencyChecks.isStepComplete
            ? window.AgencyChecks.isStepComplete(step.id, step.checks.length)
            : false;

        return (
          '<li class="home-step-card"><a href="' +
          joinPath(basePath, step.path) +
          '"><p class="card-number">' +
          escapeHtml(step.stepNumberText) +
          '</p><h3>' +
          escapeHtml(step.title) +
          '</h3><p>' +
          escapeHtml(step.goal) +
          '</p><p class="card-state ' +
          (complete ? 'is-complete' : '') +
          '">' +
          (complete ? 'Checked' : 'Pending') +
          '</p></a></li>'
        );
      })
      .join('');

    var stepOnePath = steps && steps[0] ? joinPath(basePath, steps[0].path) : joinPath(basePath, 'steps/01-download-starter-set.html');

    appRoot.innerHTML =
      '<main id="main" class="home-layout"><section class="home-hero"><div class="hero-banner-wrap"><img class="hero-banner" src="' +
      bannerPath +
      '" alt="Agent Factory banner"></div><p class="hero-kicker">Assembly Manual V2</p><h1>Build Your AI Agency in 8 Steps</h1><p class="hero-copy">Use the starter set, rename your folder, complete mission.md, then run the workflow.</p><div class="hero-actions"><a class="button" href="' +
      stepOnePath +
      '">Start Step 1</a><button class="button button-ghost" type="button" data-open-onboarding>Quick Guide</button><a class="button button-ghost" href="' +
      joinPath(basePath, 'starter-kit/index.html') +
      '">Starter Kit</a></div><p class="progress-meta"><strong>' +
      String(completedSteps) +
      '/8</strong> steps checked on this browser</p></section><section class="must-do"><h2>Mandatory Before Workflow</h2><ol><li>Download starter set from class link.</li><li>Duplicate and rename folder to your project name.</li><li>Complete every mission.md section.</li></ol></section><section><h2>Step Routes</h2><ol class="home-step-grid">' +
      listItems +
      '</ol></section></main>' +
      renderHomeOnboardingModal(stepOnePath);

    initHomeOnboarding(appRoot);
  }

  function renderStarterKitPage(appRoot, steps, basePath) {
    var bannerPath = joinPath(basePath, 'assets/brand/agentTopBanner.svg');

    appRoot.innerHTML =
      '<main id="main" class="starter-layout"><header class="starter-header"><img class="starter-banner" src="' +
      bannerPath +
      '" alt="Agent Factory banner"><h1>Starter Kit Download</h1><p>Use this before Step 1. You must rename your copied folder and complete mission.md before agent workflow start.</p></header><section class="panel starter-panel"><span class="panel-index">A</span><p class="panel-label">DOWNLOAD</p><div class="panel-content"><p>Download the class starter set folder:</p><a class="button" href="https://drive.google.com/drive/folders/1Qgy3w4FKWmipEu_ADLoyrOPy5-MLnvoR?usp=drive_link" target="_blank" rel="noopener noreferrer">Open Google Drive Folder</a><button class="button button-ghost" type="button" data-copy-trigger data-copy-value="https://drive.google.com/drive/folders/1Qgy3w4FKWmipEu_ADLoyrOPy5-MLnvoR?usp=drive_link">Copy Link</button></div></section><section class="panel starter-panel"><span class="panel-index">B</span><p class="panel-label">RENAME</p><div class="panel-content"><p>Duplicate the starter folder, then rename the copy to your project name.</p><p class="starter-note">Do not keep the default copied name.</p></div></section><section class="panel starter-panel"><span class="panel-index">C</span><p class="panel-label">MISSION GATE</p><div class="panel-content"><p>Complete all sections in <code>mission.md</code> before running any agent sequence.</p><button class="button" type="button" data-copy-trigger data-copy-value="Project Name\nProblem\nOutcome\nTarget Users\nSuccess Criteria\nNon-Goals\nTone and Style">Copy Mission Checklist</button></div></section><section class="starter-nav"><a class="button" href="' +
      joinPath(basePath, steps[0].path) +
      '">Go to Step 1</a><a class="button button-ghost" href="' +
      joinPath(basePath, 'index.html') +
      '">Back Home</a></section></main>';
  }

  function isConfiguredEmail(value) {
    if (!value || typeof value !== 'string') {
      return false;
    }

    var email = value.trim();
    if (!email) {
      return false;
    }

    if (email.indexOf('example.com') !== -1) {
      return false;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function normalizeProjectUrl(url) {
    if (!url || typeof url !== 'string') {
      return '';
    }

    var value = url.trim();
    if (!value) {
      return '';
    }

    if (!/^https?:\/\//i.test(value)) {
      value = 'https://' + value.replace(/^\/+/, '');
    }

    return value;
  }

  function getProjectHomepageUrl(projectUrl) {
    var safeUrl = normalizeProjectUrl(projectUrl);
    if (!safeUrl) {
      return '';
    }

    try {
      var parsed = new URL(safeUrl);
      return parsed.origin + '/';
    } catch (error) {
      return safeUrl;
    }
  }

  function getAutoProjectPreviewUrl(projectUrl) {
    var homepageUrl = getProjectHomepageUrl(projectUrl);
    if (!homepageUrl) {
      return '';
    }

    return 'https://image.thum.io/get/width/1200/noanimate/' + encodeURI(homepageUrl);
  }

  function getAutoProjectPreviewBackupUrl(projectUrl) {
    var homepageUrl = getProjectHomepageUrl(projectUrl);
    if (!homepageUrl) {
      return '';
    }

    return 'https://free.pagepeeker.com/v2/thumbs.php?size=x&url=' + encodeURIComponent(homepageUrl);
  }

  function getProjectFaviconUrl(projectUrl) {
    var homepageUrl = getProjectHomepageUrl(projectUrl);
    if (!homepageUrl) {
      return '';
    }

    return 'https://www.google.com/s2/favicons?sz=128&domain_url=' + encodeURIComponent(homepageUrl);
  }

  function renderRecentProjectCards(basePath, projects) {
    if (!Array.isArray(projects) || projects.length === 0) {
      return '<p class="finish-empty">No selected projects are published yet.</p>';
    }

    return (
      '<div class="recent-project-grid">' +
      projects
        .map(function (project) {
          if (!project || !project.title) {
            return '';
          }

          var safeTitle = escapeHtml(project.title);
          var safeAuthor = project.author ? escapeHtml(project.author) : 'Agent Factory Student';
          var projectUrl = normalizeProjectUrl(project.url || '');
          var thumbSrc = '';
          var fallbackChain = [];
          var localFallbackThumb = joinPath(basePath, 'assets/icons/agent.svg');

          if (project.thumbnail && typeof project.thumbnail === 'string') {
            thumbSrc = joinPath(basePath, project.thumbnail);
          } else if (projectUrl) {
            thumbSrc = getAutoProjectPreviewUrl(projectUrl);
            var backupPreview = getAutoProjectPreviewBackupUrl(projectUrl);
            var faviconPreview = getProjectFaviconUrl(projectUrl);

            if (backupPreview && backupPreview !== thumbSrc) {
              fallbackChain.push(backupPreview);
            }

            if (faviconPreview) {
              fallbackChain.push(faviconPreview);
            }

            fallbackChain.push(localFallbackThumb);
          } else {
            thumbSrc = localFallbackThumb;
          }

          var thumb =
            '<img class="recent-project-image" src="' +
            escapeAttr(thumbSrc) +
            '" alt="' +
            safeTitle +
            ' thumbnail"' +
            (fallbackChain.length > 0 ? ' data-fallback-chain="' + escapeAttr(fallbackChain.join('|')) + '"' : '') +
            '>';

          var body =
            '<div class="recent-project-thumb">' +
            thumb +
            '</div><div class="recent-project-body"><h3>' +
            safeTitle +
            '</h3><p>' +
            safeAuthor +
            '</p></div>';

          if (projectUrl) {
            return (
              '<article class="recent-project-card"><a href="' +
              escapeAttr(projectUrl) +
              '" target="_blank" rel="noopener noreferrer">' +
              body +
              '</a></article>'
            );
          }

          return '<article class="recent-project-card">' + body + '</article>';
        })
        .join('') +
      '</div>'
    );
  }

  function renderFinishPage(appRoot, steps, basePath, finishData) {
    var bannerPath = joinPath(basePath, 'assets/brand/agentTopBanner.svg');
    var agentFactoryLogoPath = joinPath(basePath, 'assets/brand/logo-only.png');
    var completedSteps =
      window.AgencyChecks && window.AgencyChecks.getCompletedStepCount
        ? window.AgencyChecks.getCompletedStepCount(steps)
        : 0;

    var accomplishments = (steps || [])
      .map(function (step) {
        var complete =
          window.AgencyChecks && window.AgencyChecks.isStepComplete
            ? window.AgencyChecks.isStepComplete(step.id, step.checks.length)
            : false;

        return (
          '<li class="finish-accomplishment' +
          (complete ? ' is-complete' : '') +
          '"><span class="finish-accomplishment-index">Step ' +
          escapeHtml(step.stepNumberText) +
          '</span><span class="finish-accomplishment-text">' +
          escapeHtml(step.title) +
          '</span><span class="finish-accomplishment-state">' +
          (complete ? 'Done' : 'Pending') +
          '</span></li>'
        );
      })
      .join('');

    var data = finishData && typeof finishData === 'object' ? finishData : {};
    var submissionEmail = typeof data.submissionEmail === 'string' ? data.submissionEmail.trim() : '';
    var emailConfigured = isConfiguredEmail(submissionEmail);

    appRoot.innerHTML =
      '<main id="main" class="finish-layout"><header class="topbar"><a class="brand brand-with-banner" href="' +
      joinPath(basePath, 'index.html') +
      '"><img class="brand-banner" src="' +
      bannerPath +
      '" alt="Agent Factory banner"></a><p class="progress-text">Finish</p><div class="progress-bars">' +
      renderProgressBars(steps.length, steps.length, completedSteps) +
      '</div><p class="progress-meta"><span data-completed-count>' +
      String(completedSteps) +
      '</span>/8 steps checked</p></header><section class="finish-hero"><div class="finish-hero-icon"><img src="' +
      joinPath(basePath, 'assets/icons/person.svg') +
      '" alt=\"Student icon\"></div><div><h1>Congratulations, you have successfully built and deployed your first agentic workflow system using AI Production Architecture.</h1><p>You completed the assembly workflow and now know how to coordinate a multi-agent build process.</p></div></section><section class=\"finish-panel\"><h2>Your Accomplishments</h2><ol class=\"finish-accomplishments\">' +
      accomplishments +
      '</ol></section><section class=\"finish-panel\"><h2>Share Your Project Link (Selected Projects Only)</h2><form class=\"finish-share-form\" data-share-form><label>Project name<input type=\"text\" name=\"projectName\" data-share-name placeholder=\"My Agent Project\"></label><label>Project link<input type=\"url\" name=\"projectUrl\" data-share-url placeholder=\"https://...\" required></label><label>Notes (optional)<textarea name=\"projectNotes\" data-share-notes rows=\"4\" placeholder=\"What does your project do?\"></textarea></label><button class=\"button\" type=\"submit\" data-share-submit' +
      (emailConfigured ? '' : ' disabled aria-disabled=\"true\"') +
      '>Submit Project Link</button><p class=\"finish-share-note\" data-share-status>' +
      (emailConfigured
        ? 'Your email app will open with the submission draft.'
        : 'Add your real email in data/finish.json under submissionEmail.') +
      '</p></form></section><section class=\"finish-panel\"><div class=\"finish-recent-heading\"><img class=\"finish-recent-icon\" src=\"' +
      joinPath(basePath, 'assets/icons/agent.svg') +
      '\" alt=\"Agent logo\"><h2>Recent Projects Created With the Help of <img class=\"finish-inline-logo\" src=\"' +
      agentFactoryLogoPath +
      '\" alt=\"Agent Factory\"></h2></div>' +
      renderRecentProjectCards(basePath, data.recentProjects) +
      '</section></main>';

    var form = appRoot.querySelector('[data-share-form]');
    if (!form) {
      return;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!emailConfigured) {
        return;
      }

      var nameInput = form.querySelector('[data-share-name]');
      var urlInput = form.querySelector('[data-share-url]');
      var notesInput = form.querySelector('[data-share-notes]');

      var projectName = nameInput ? nameInput.value.trim() : '';
      var projectUrl = urlInput ? urlInput.value.trim() : '';
      var projectNotes = notesInput ? notesInput.value.trim() : '';
      var subject = 'Agent Factory Project Submission' + (projectName ? ': ' + projectName : '');
      var body =
        'Project Name: ' +
        (projectName || 'Not provided') +
        '\\n' +
        'Project URL: ' +
        (projectUrl || 'Not provided') +
        '\\n\\n' +
        'Notes:\\n' +
        (projectNotes || 'None') +
        '\\n\\n' +
        'Submitted from Agent Factory Finish page.';

      window.location.href =
        'mailto:' +
        encodeURIComponent(submissionEmail) +
        '?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(body);
    });

    appRoot.querySelectorAll('.recent-project-image[data-fallback-chain]').forEach(function (image) {
      image.addEventListener('error', function () {
        var chain = (image.getAttribute('data-fallback-chain') || '')
          .split('|')
          .filter(Boolean);

        if (chain.length === 0) {
          return;
        }

        var nextSrc = chain.shift();
        image.setAttribute('data-fallback-chain', chain.join('|'));
        image.src = nextSrc;

        var isFallbackVisual =
          nextSrc.indexOf('google.com/s2/favicons') !== -1 || nextSrc.indexOf('assets/icons/agent.svg') !== -1;
        image.classList.toggle('is-fallback', isFallbackVisual);
      });
    });
  }

  function renderHomeOnboardingModal(stepOnePath) {
    return (
      '<div class="onboarding-backdrop" data-onboarding-backdrop hidden>' +
      '<section class="onboarding-modal" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">' +
      '<p class="onboarding-kicker">QUICK START GUIDE</p>' +
      '<h2 id="onboarding-title">How This System Works</h2>' +
      '<p class="onboarding-lead">You are the Human Director. This site is your assembly manual for leading an AI team.</p>' +
      '<ol class="onboarding-steps">' +
      '<li><strong>Set up first:</strong> download starter set, rename your folder, and complete <code>mission.md</code>.</li>' +
      '<li><strong>Follow all 8 steps in order:</strong> finish one step before moving to the next.</li>' +
      '<li><strong>Use diagram help:</strong> hover, focus, or tap each <strong>?</strong> inside a diagram.</li>' +
      '<li><strong>Run protocol correctly:</strong> all agent updates go through <code>agentCom.md</code>.</li>' +
      '</ol>' +
      '<label class="onboarding-remember"><input type="checkbox" data-onboarding-remember> Do not show this again</label>' +
      '<div class="onboarding-actions">' +
      '<button class="button button-ghost" type="button" data-onboarding-close>Close</button>' +
      '<a class="button" href="' +
      stepOnePath +
      '">Go To Step 1</a>' +
      '</div>' +
      '</section>' +
      '</div>'
    );
  }

  function initHomeOnboarding(appRoot) {
    var backdrop = appRoot.querySelector('[data-onboarding-backdrop]');
    if (!backdrop) {
      return;
    }

    var openButton = appRoot.querySelector('[data-open-onboarding]');
    var closeButton = backdrop.querySelector('[data-onboarding-close]');
    var rememberToggle = backdrop.querySelector('[data-onboarding-remember]');
    var lastFocusedElement = null;

    function shouldAutoOpen() {
      try {
        return window.localStorage.getItem(ONBOARDING_STORAGE_KEY) !== '1';
      } catch (error) {
        return true;
      }
    }

    function persistPreference() {
      if (!rememberToggle) {
        return;
      }

      try {
        if (rememberToggle.checked) {
          window.localStorage.setItem(ONBOARDING_STORAGE_KEY, '1');
        } else {
          window.localStorage.removeItem(ONBOARDING_STORAGE_KEY);
        }
      } catch (error) {
        // Ignore storage errors and keep current session behavior.
      }
    }

    function openModal() {
      lastFocusedElement = document.activeElement;
      backdrop.hidden = false;
      document.body.classList.add('is-modal-open');

      if (closeButton) {
        closeButton.focus();
      }
    }

    function closeModal() {
      persistPreference();
      backdrop.hidden = true;
      document.body.classList.remove('is-modal-open');

      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    }

    if (openButton) {
      openButton.addEventListener('click', function (event) {
        event.preventDefault();
        openModal();
      });
    }

    appRoot.addEventListener('click', function (event) {
      if (event.target && event.target.closest('[data-onboarding-close]')) {
        event.preventDefault();
        closeModal();
      }
    });

    document.addEventListener('click', function (event) {
      if (!backdrop.hidden && event.target && event.target.closest('[data-onboarding-close]')) {
        event.preventDefault();
        closeModal();
      }
    });

    if (closeButton) {
      closeButton.addEventListener('click', function (event) {
        event.preventDefault();
        closeModal();
      });
    }

    backdrop.addEventListener('click', function (event) {
      if (event.target === backdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !backdrop.hidden) {
        event.preventDefault();
        closeModal();
      }
    });

    if (shouldAutoOpen()) {
      openModal();
    }
  }

  function loadTemplateText(basePath, templateAsset, codeBlockId) {
    var codeBlock = document.getElementById(codeBlockId);
    if (!codeBlock) {
      return;
    }

    fetch(joinPath(basePath, 'assets/templates/' + templateAsset))
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Missing template file');
        }
        return response.text();
      })
      .then(function (text) {
        codeBlock.textContent = text.trim();
      })
      .catch(function () {
        codeBlock.textContent = 'Template unavailable.';
      });
  }

  function fetchJson(basePath, filename, fallbackValue) {
    return fetch(joinPath(basePath, filename))
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Missing file: ' + filename);
        }
        return response.json();
      })
      .catch(function () {
        return fallbackValue;
      });
  }

  function init() {
    var appRoot = document.getElementById('app');
    if (!appRoot) {
      return;
    }

    var page = document.body.dataset.page;
    var basePath = document.body.dataset.basePath || '.';

    Promise.all([
      fetchJson(basePath, 'data/steps.json', { steps: [] }),
      fetchJson(basePath, 'data/explainers.json', {})
    ])
      .then(function (payload) {
        var stepData = payload[0] || { steps: [] };
        var explainersData = payload[1] || {};
        var steps = stepData.steps || [];

        if (page === 'home') {
          renderHomePage(appRoot, steps, basePath);
          return;
        }

        if (page === 'starter-kit') {
          renderStarterKitPage(appRoot, steps, basePath);
          return;
        }

        if (page === 'step') {
          var stepId = Number(document.body.dataset.stepId);
          var stepIndex = steps.findIndex(function (step) {
            return step.id === stepId;
          });

          if (stepIndex === -1) {
            appRoot.innerHTML = '<main class="error">Step not found.</main>';
            return;
          }

          renderStepPage(appRoot, steps, steps[stepIndex], stepIndex, basePath, explainersData);
          return;
        }

        if (page === 'finish') {
          fetchJson(basePath, 'data/finish.json', { submissionEmail: '', recentProjects: [] }).then(function (finishData) {
            renderFinishPage(appRoot, steps, basePath, finishData);
          });
          return;
        }

        appRoot.innerHTML = '<main class="error">Unknown page mode.</main>';
      })
      .catch(function () {
        appRoot.innerHTML = '<main class="error">Could not load guide content.</main>';
      });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
