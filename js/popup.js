document.addEventListener('DOMContentLoaded', function () {
    const toggleRedirect = document.getElementById('toggleRedirect');
    const toggleActivity = document.getElementById('toggleActivity');
  
    // Retrieve the current states from storage
    chrome.storage.sync.get(['redirectEnabled', 'preventLogout'], function (data) {
      // Set the default state if values are not found
      toggleRedirect.checked = data.redirectEnabled !== undefined ? data.redirectEnabled : true;
      toggleActivity.checked = data.preventLogout !== undefined ? data.preventLogout : true;
    });
  
    // Update storage when the Redirect toggle is changed
    toggleRedirect.addEventListener('change', function () {
      chrome.storage.sync.set({ redirectEnabled: toggleRedirect.checked });
    });
  
    // Update storage when the Prevent Logout toggle is changed
    toggleActivity.addEventListener('change', function () {
      chrome.storage.sync.set({ preventLogout: toggleActivity.checked });
    });
  });
  