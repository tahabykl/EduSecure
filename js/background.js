// Run the function every x minutes (e.g., every 10 minutes)
const intervalInMinutes = 5;
setInterval(function() {
  chrome.tabs.create({ url: "login.html" });
}, intervalInMinutes * 60 * 1000);

/*
const intervalInMinutes = 1;
setInterval(function() {
  chrome.storage.local.set({ isLoggedIn: false });
}, intervalInMinutes * 5 * 1000);

*/

//setLocalStorageValue('myKey', 'myValue');
//getLocalStorageValue('myKey', function(value) {
 // console.log('Value retrieved:', value);
//});

/*

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ maliciousDomains: [] });
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      checkMaliciousDomain(tab.url);
      checkHTTPorHTTPS(tab);
    }
  });
  
  chrome.windows.onCreated.addListener((window) => {
    displayPrivacyTip();
  });
  
  function checkMaliciousDomain(url) {
    chrome.storage.sync.get(['maliciousDomains'], (result) => {
      const maliciousDomains = result.maliciousDomains;
      const domain = new URL(url).hostname;
      if (maliciousDomains.includes(domain)) {
        chrome.tabs.update({ url: 'blocked.html' });
      }
    });
  }
  
  function checkHTTPorHTTPS(tab) {
    const url = tab.url;
    const tabId = tab.id;
    if (url.startsWith('http://')) {
      chrome.tabs.sendMessage(tabId, { type: 'http' });
    } else if (url.startsWith('https://')) {
      chrome.tabs.sendMessage(tabId, { type: 'https' });
    }
  }
  
  function displayPrivacyTip() {
    chrome.tabs.create({ url: 'privacy_tip.html' });
  }
  
*/