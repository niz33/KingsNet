// On install or update, set default values if they don't exist
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['redirectEnabled', 'preventLogout'], (data) => {
    if (typeof data.redirectEnabled === 'undefined') {
      chrome.storage.sync.set({ redirectEnabled: true });
    }
    if (typeof data.preventLogout === 'undefined') {
      chrome.storage.sync.set({ preventLogout: true });
    }
  });
});

// Listen for changes to the redirect or prevent logout settings
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.redirectEnabled) {
    updateRedirectRule(changes.redirectEnabled.newValue);
  }
  
  if (changes.preventLogout) {
    updatePreventLogout(changes.preventLogout.newValue);
  }
});

// Handle enabling/disabling the redirect rule
function updateRedirectRule(isEnabled) {
  if (isEnabled) {
    chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: ['ruleset_1']
    });
  } else {
    chrome.declarativeNetRequest.updateEnabledRulesets({
      disableRulesetIds: ['ruleset_1']
    });
  }
}

// Inject or remove the prevent logout script based on the toggle
function updatePreventLogout(isEnabled) {
  chrome.tabs.query({url: "*://cranbrook.myschoolapp.com/*"}, (tabs) => {
    tabs.forEach((tab) => {
      if (isEnabled) {
        // Inject the content script that prevents the logout
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: ['js/content.js']  // Ensure content.js contains the scrolling logic
        });
      } else {
        // Optionally, remove or stop the prevent logout action if needed
        // You could implement a stop function here if needed.
      }
    });
  });
}

// On startup, apply the current settings immediately
chrome.storage.sync.get(['redirectEnabled', 'preventLogout'], (data) => {
  updateRedirectRule(data.redirectEnabled);
  updatePreventLogout(data.preventLogout);
});
