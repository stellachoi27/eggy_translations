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
    //console.log(this.responseText);
    const responseData = (this.responseText) ? JSON.parse(this.responseText)[0] : "";
    console.log(responseData.translations)
    let translation = (responseData && responseData.translations) ? responseData.translations[0].text : "";
    document.getElementById("output").innerHTML = translation;

});

document.getElementById('translate').onclick = function(){
    translate();
};

document.addEventListener("DOMContentLoaded", event => {
  const app = firebase.app();
});

const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      document.write("Hello ${user.displayName]");
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
    });
  };