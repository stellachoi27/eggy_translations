const API_KEY ="c767efbbadmsh8c7fb926d00ab20p1abc0fjsncc4b32bc1674",
XHR = new XMLHttpRequest();
XHR.withCredentials = true;
// These variables will be required for restoring the state, before replacing the translated text
var prev = '', prevRange = '';

function getText() {
    var textarea = document.getElementById('inputText');
    array = textarea.value.replace(/\s+/g, ' ').split(' ').filter((e) => e.length > 0);
    console.log(array);
    return array;
  }

function translate() {
    console.log("flag 1");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Send a message to the background script to get the selected text
      chrome.tabs.sendMessage(tabs[0].id, {}, function (response) {
        const inputText = getText();
        const targetLanguage = 'en'; // Target language code (e.g., German)

        // Call the apiRequest function to make the translation request
        apiRequest(inputText, targetLanguage);
      });
    });
  }

// Makes the HTTP request using the selected text as the query string
function apiRequest(text, target = 'en', source = '') {
    XHR.open("POST", "https://microsoft-translator-text.p.rapidapi.com/translate?to="
        + target.toString() +
        "&api-version=3.0&"
        + source +
        "profanityAction=NoAction&textType=plain");
    XHR.setRequestHeader("content-type", "application/json");
    XHR.setRequestHeader("x-rapidapi-key", API_KEY);
    XHR.setRequestHeader("x-rapidapi-host", "microsoft-translator-text.p.rapidapi.com");
    XHR.send(JSON.stringify([{ "text": text.join(" ") }]));
}
// Handles the translation response
XHR.addEventListener("readystatechange", function () {
    console.log("flag 2");
    //console.log(this.responseText);
    const responseData = (this.responseText) ? JSON.parse(this.responseText)[0] : "";
    console.log(responseData.translations)
    let translation = (responseData && responseData.translations) ? responseData.translations[0].text : "";
    document.getElementById("output").innerHTML = translation;

});


document.getElementById('translate').onclick = function(){
    translate();
};
