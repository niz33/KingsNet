document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('toggle');

    // Get the current toggle state
    chrome.storage.sync.get('redirectEnabled', function (data) {
        toggle.checked = data.redirectEnabled;
    });

    // Add an event listener to the toggle switch
    toggle.addEventListener('change', function () {
        chrome.storage.sync.set({ redirectEnabled: toggle.checked });
    });
});
