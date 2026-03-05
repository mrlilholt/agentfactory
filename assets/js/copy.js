(function () {
  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', 'readonly');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();

    var success = false;
    try {
      success = document.execCommand('copy');
    } catch (error) {
      success = false;
    }

    document.body.removeChild(textarea);
    return success;
  }

  function setButtonState(button, label) {
    if (!button) {
      return;
    }

    button.textContent = label;
    window.setTimeout(function () {
      button.textContent = button.dataset.copyDefaultLabel || button.textContent;
    }, 1200);
  }

  function getCopyText(trigger) {
    if (trigger.dataset.copyValue) {
      return trigger.dataset.copyValue;
    }

    if (trigger.dataset.copyFrom) {
      var source = document.querySelector(trigger.dataset.copyFrom);
      if (source) {
        return source.textContent || '';
      }
    }

    return '';
  }

  function copyText(text) {
    if (!text) {
      return Promise.resolve(false);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard
        .writeText(text)
        .then(function () {
          return true;
        })
        .catch(function () {
          return fallbackCopy(text);
        });
    }

    return Promise.resolve(fallbackCopy(text));
  }

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-copy-trigger]');
    if (!trigger) {
      return;
    }

    event.preventDefault();
    trigger.dataset.copyDefaultLabel = trigger.dataset.copyDefaultLabel || trigger.textContent;

    var text = getCopyText(trigger).trim();
    copyText(text).then(function (ok) {
      setButtonState(trigger, ok ? 'Copied' : 'Copy failed');
    });
  });
})();
