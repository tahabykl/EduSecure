// Fonksiyonu her x dakikada bir çalıştır (varsayılan: her 5 dakikada bir)
const intervalInMinutes = 5;
setInterval(function() {
  //chrome.tabs.create({ url: "login.html" });
  localStorage.setItem('masterPassword', "");
  localStorage.setItem("isLoggedIn", false);
}, intervalInMinutes * 60 * 1000);

var maliciousUrls = [];
var alertedUrls = {};

// Load the malicious URLs
var xhr = new XMLHttpRequest();
xhr.open("GET", chrome.runtime.getURL("/resources/maliciousUrls.json"), true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    maliciousUrls = JSON.parse(xhr.responseText);
  }
}
xhr.send();

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const url = new URL(details.url);
    if (maliciousUrls.includes(url.hostname) && (!alertedUrls[details.tabId] || !alertedUrls[details.tabId].includes(url.hostname))) {
      if(!alertedUrls[details.tabId]) {
        alertedUrls[details.tabId] = [];
      }
      alertedUrls[details.tabId].push(url.hostname); // Add the URL to the list of URLs we've alerted about for this tab
      alert("Malicious request: " + url.hostname);
    }
  },
  { urls: ["<all_urls>"] }
);