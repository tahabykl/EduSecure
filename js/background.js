// Fonksiyonu her x dakikada bir çalıştır (varsayılan: her 5 dakikada bir)
const intervalInMinutes = 5;
setInterval(function() {
  chrome.tabs.create({ url: "login.html" });
}, intervalInMinutes * 60 * 1000);

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const requestUrl = new URL(details.url);
    const domain = requestUrl.hostname;

    // JSON dosyasından zararlı URL adreslerini çek
    fetch("../resources/maliciousUrls.json")
      .then(response => response.json())
      .then(maliciousUrls => {
        if (maliciousUrls.includes(domain)) {
          alert("Malicious request: " + domain);
        }
      })
      .catch(error => {
        console.error("Error fetching malicious URLs: ", error);
      });
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);