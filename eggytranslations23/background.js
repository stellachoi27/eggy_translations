// Create a background script to handle messages from the content script and communicate with the popup:

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.selectedText) {
      // Communicate the selected text to the popup
      chrome.runtime.sendMessage({ selectedText: request.selectedText });
    }
  });
