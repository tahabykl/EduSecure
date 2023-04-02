document.addEventListener("DOMContentLoaded", async () => {
  const maliciousUrls = await getMaliciousUrls();
  const tab = await getActiveTab();
  checkForMaliciousSite(tab, maliciousUrls);
  updateConnectionStatus(tab);
  displayPrivacyTip();
  setColor(localStorage.getItem("edusecureTheme"));

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    // Show the login page
    window.location.href = "login.html";
  }
});
  
  async function getMaliciousUrls() {
    const response = await fetch("maliciousUrls.json");
    return response.json();
  }
  
  function getActiveTab() {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        resolve(tab);
      });
    });
  }
  
  function checkForMaliciousSite(tab, maliciousUrls) {
    const url = new URL(tab.url);
    if (maliciousUrls.includes(url.hostname)) {
      alert("Warning! This site is potentially malicious.");
    }
  }
  
  function updateConnectionStatus(tab) {
    const url = new URL(tab.url);
    const statusText = document.getElementById("statusText");
  
    if (url.protocol === "https:") {
      document.getElementById("statusImg").src="images/secure.png"
      statusText.textContent = "Güvenli bağlantı kuruldu.";
      statusText.classList.add("secure");
    } else {
      document.getElementById("statusImg").src="images/insecure.png"
      statusText.textContent = "Güvensiz bağlantı! Lütfen URL'yi kontrol edin.";
      statusText.classList.add("insecure");
      if (confirm("Do you want to try forcing the website to use HTTPS?")) {
        redirectToHttps(tab);
      }
    }
  }
  
  function redirectToHttps(tab) {
    const url = new URL(tab.url);
    url.protocol = "https:";
    chrome.tabs.update(tab.id, { url: url.toString() });
  }
  
  async function displayPrivacyTip() {
    const tips = await fetchPrivacyTips();
    const tipText = document.getElementById("tipText");
    tipText.textContent = getRandomTip(tips);
  }
  
  async function fetchPrivacyTips() {
    const response = await fetch("privacyTips.json");
    return response.json();
  }
  
  function getRandomTip(tips) {
    return tips[Math.floor(Math.random() * tips.length)];
  }
  

  // Add the following lines at the end of the DOMContentLoaded event listener
const reportButton = document.getElementById("reportButton");
reportButton.addEventListener("click", () => reportSite(tab));

// Add the following function to handle reporting a site
async function reportSite(tab) {
  const url = new URL(tab.url);
  const browserVersion = navigator.userAgent;
  const apiEndpoint = "https://example-api.com/report"; // Replace with the actual API URL

  const reportData = {
    domain: url.hostname,
    browserVersion: browserVersion
  };

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reportData)
    });

    if (response.ok) {
      alert("Thank you for reporting this site. Your report has been submitted.");
    } else {
      alert("There was an error submitting your report. Please try again later.");
    }
  } catch (error) {
    alert("There was a problem connecting to the server. Please try again later.");
  }
}

// Add the following lines at the end of the DOMContentLoaded event listener
const navButtons = document.querySelectorAll(".navButton");
navButtons.forEach((button) => {
  button.addEventListener("click", switchPage);
});

// Add the following function to handle page switching
function switchPage(event) {
  const targetButton = event.currentTarget;
  const targetPageId = targetButton.dataset.target;
  const targetPage = document.getElementById(targetPageId);

  // Hide the currently active page and deactivate its nav button
  const currentPage = document.querySelector(".content-page.active");
  const currentNavButton = document.querySelector(".navButton.active");
  currentPage.classList.remove("active");
  currentNavButton.classList.remove("active");

  // Show the target page and activate its nav button
  targetPage.classList.add("active");
  targetButton.classList.add("active");
}

document.getElementById('generate').addEventListener('click', function() {
  var array = [];

  var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  for (var i=0; i<alphabet.length; ++i) {
    array.push(alphabet[i]);
  }

  if ( document.querySelector('input[name=upper]:checked') ) {
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    for (var i=0; i<alphabet.length; ++i) {
      array.push(alphabet[i]);
    }
  }

  if ( document.querySelector('input[name=numeric]:checked') ) {
    var number = '0123456789'.split('');
    for (var i=0; i<number.length; ++i) {
      array.push(number[i]);
    }
  }

  if ( document.querySelector('input[name=spChar]:checked') ) {
    var special = '!@#$%^&*(){}][:;><,.]'.split('');
    for (var i=0; i<special.length; ++i) {
      array.push(special[i]);
    }
  }

  var pass = "";
  for (var i=0; i<parseInt(document.querySelector('input[name=plength]').value); ++i) {
    pass += array[Math.floor(Math.random() * array.length)];
  }

  document.getElementById('gpwd').value = pass;
});

document.getElementById("copyButtonGen").addEventListener("click", () => {
  const passwordInput = document.getElementById("generatedPassword");
  passwordInput.select();
  document.execCommand("copy");
});