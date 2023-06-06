// Fonksiyonu her x dakikada bir çalıştır (varsayılan: her 5 dakikada bir)
// Local storage'dan masterPassword ve familyPassword'ü temizle
const intervalInMinutes = 30;
setInterval(function() {
  chrome.tabs.create({ url: "/html/login.html" });
  localStorage.setItem('masterPassword', "");
  localStorage.setItem('familyPassword', "");
  localStorage.setItem("isLoggedIn", false);
}, intervalInMinutes * 60 * 1000);

var maliciousUrls = [];
var alertedUrls = {};

// Zararlı URL'leri yükle
var xhr = new XMLHttpRequest();
xhr.open("GET", chrome.runtime.getURL("/resources/maliciousUrls.json"), true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) { // XMLHttpRequest's readyState property = 4 -> DONE = "The operation is complete."
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
      alertedUrls[details.tabId].push(url.hostname); // URL'yi uyarılmış URL'ler listesine ekle.
      alert("Zararlı istek gönderildi. Kullandığınız websitesini terk etmeniz önerilir: " + url.hostname);
    }
  },
  { urls: ["<all_urls>"] }
);
