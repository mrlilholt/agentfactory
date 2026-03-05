(function () {
  var STORAGE_KEY = 'ai-agency-builder-checks-v1';

  function readState() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      return {};
    }
  }

  function writeState(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      // Ignore write failures in private browsing modes.
    }
  }

  function ensureStepState(state, stepId, totalChecks) {
    var key = String(stepId);
    if (!Array.isArray(state[key])) {
      state[key] = [];
    }

    while (state[key].length < totalChecks) {
      state[key].push(false);
    }

    return state[key];
  }

  function isStepComplete(stepId, totalChecks) {
    var state = readState();
    var checks = ensureStepState(state, stepId, totalChecks);
    return checks.every(function (value) {
      return Boolean(value);
    });
  }

  function getCompletedStepCount(steps) {
    if (!Array.isArray(steps)) {
      return 0;
    }

    return steps.reduce(function (count, step) {
      return count + (isStepComplete(step.id, step.checks.length) ? 1 : 0);
    }, 0);
  }

  function updateStepCheck(stepId, checkIndex, checked, totalChecks) {
    var state = readState();
    var checks = ensureStepState(state, stepId, totalChecks);
    checks[checkIndex] = checked;
    writeState(state);

    document.dispatchEvent(
      new CustomEvent('agency:checks-updated', {
        detail: {
          stepId: stepId,
          totalChecks: totalChecks
        }
      })
    );
  }

  function hydrateStep(stepId, totalChecks) {
    var state = readState();
    var checks = ensureStepState(state, stepId, totalChecks);

    document.querySelectorAll('[data-check-index]').forEach(function (checkbox) {
      var index = Number(checkbox.dataset.checkIndex);
      checkbox.checked = Boolean(checks[index]);

      checkbox.addEventListener('change', function () {
        updateStepCheck(stepId, index, checkbox.checked, totalChecks);
      });
    });
  }

  window.AgencyChecks = {
    hydrateStep: hydrateStep,
    isStepComplete: isStepComplete,
    getCompletedStepCount: getCompletedStepCount
  };
})();
