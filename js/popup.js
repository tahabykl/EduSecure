window.onload = function() {
  if(localStorage.getItem('isLoggedIn') !== 'true') {
      window.location.href = "login.html";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const tab = await getActiveTab();
  updateConnectionStatus(tab);
  displayPrivacyTip();
  setColor(localStorage.getItem("edusecureTheme"));

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    // Login (giriş) sayfasına yönlendir
    window.location.href = "login.html";
  }
});

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
      if (confirm("Bulunduğunuz site varsayılan olarak HTTPS protokolünü desteklemiyor. Bu siteyi HTTPS protokolü kullanmaya zorlamak ister misiniz?")) {
        redirectToHttps(tab);
      }
    }
  }

  function getActiveTab() {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        resolve(tab);
      });
    });
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
    const response = await fetch("../resources/privacyTips.json");
    return response.json();
  }

  function getRandomTip(tips) {
    return tips[Math.floor(Math.random() * tips.length)];
  }

  function generateDomainList() {
    const domainList = document.getElementById('domainList');
    domainList.innerHTML = '<h3>Son Kullanılan Websiteleri</h3>';  // Önce listeyi temizle
    const storedDomains = JSON.parse(localStorage.getItem('domains'));
    if (storedDomains) {
      storedDomains.forEach(domain => {
        const listItem = document.createElement('div');
        listItem.innerHTML = "<a href='https://" + domain + "' target='_blank'>" + domain + "</a>";
        domainList.appendChild(listItem);
      });
    }
  }

const navButtons = document.querySelectorAll(".navButton");
navButtons.forEach((button) => {
  button.addEventListener("click", switchPage);
});

// Sayfa değiştirme
function switchPage(event) {
  const targetButton = event.currentTarget;
  const targetPageId = targetButton.dataset.target;
  const targetPage = document.getElementById(targetPageId);

  // Aktif olan eklenti sekmesini değiştir ve bir önceki aktif sekmenin "nav" butonunun rengini soluklaştır.
  const currentPage = document.querySelector(".content-page.active");
  const currentNavButton = document.querySelector(".navButton.active");
  currentPage.classList.remove("active");
  currentNavButton.classList.remove("active");

  // Yeni aktif edilen sekmeye geç ve "nav" butonunu aktive et.
  targetPage.classList.add("active");
  targetButton.classList.add("active");

  if (targetPageId === 'vault') {
    generateDomainList();
  }
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

// Çıkış butonu için event listener
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("masterPassword"); // Ana parolayı düzenle
  window.location.href = "login.html"; // Login (giriş) sayfasında yönlendir
});