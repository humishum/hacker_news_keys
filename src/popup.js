// thanks claude
document.addEventListener('DOMContentLoaded', function() {
    var checkbox = document.getElementById('useUpDown');
    
    // Load saved state, default to true (Up & Down)
    chrome.storage.sync.get('useUpDown', function(data) {
      checkbox.checked = data.useUpDown !== undefined ? data.useUpDown : true;
      updateContentScript(checkbox.checked);
    });
  
    // Save state on change
    checkbox.addEventListener('change', function() {
      chrome.storage.sync.set({useUpDown: checkbox.checked});
      updateContentScript(checkbox.checked);
    });
  
    function updateContentScript(useUpDown) {
      // Send message to content script
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {useUpDown: useUpDown});
      });
    }
  });