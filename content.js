// Modify content.js to capture the selected text and communicate with the popup:

document.addEventListener('mouseup', function () {
    const selectedText = window.getSelection().toString();
    chrome.runtime.sendMessage({ selectedText: selectedText });
  });

