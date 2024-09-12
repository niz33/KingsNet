// Listen for toggle changes and update the redirect rule accordingly
chrome.storage.sync.get('redirectEnabled', function (data) {
    if (data.redirectEnabled === undefined) {
      // Set default value
      chrome.storage.sync.set({ redirectEnabled: true }, function () {
        chrome.declarativeNetRequest.updateEnabledRulesets({
          enableRulesetIds: ['ruleset_1']
        });
      });
    } else {
      if (data.redirectEnabled) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
          enableRulesetIds: ['ruleset_1']
        });
      } else {
        chrome.declarativeNetRequest.updateEnabledRulesets({
          disableRulesetIds: ['ruleset_1']
        });
      }
    }
  });
  
  // Update ruleset when the user toggles the redirect
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (changes.redirectEnabled) {
      if (changes.redirectEnabled.newValue) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
          enableRulesetIds: ['ruleset_1']
        });
      } else {
        chrome.declarativeNetRequest.updateEnabledRulesets({
          disableRulesetIds: ['ruleset_1']
        });
      }
    }
  });
  