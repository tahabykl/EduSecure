document.addEventListener('DOMContentLoaded', async () => {
  const passwordForm = document.getElementById('password-form');
  const siteInput = document.getElementById('site');
  const generatedPassword = document.getElementById('generated-password');
  const copyButton = document.getElementById('copy-button');

  const currentDomain = await getActiveTabDomain();
  siteInput.value = currentDomain;

  passwordForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const site = siteInput.value;
    //const masterPassword = document.getElementById('master-password').value;
    const length = document.getElementById('length').value;

    const password = await generatePassword(site, length);
    generatedPassword.value = password;
  });

  copyButton.addEventListener('click', () => {
    generatedPassword.select();
    document.execCommand('copy');
  });
});

async function getActiveTabDomain() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = new URL(tabs[0].url);
      resolve(url.hostname);
    });
  });
}

function storeDomain(domain) {
  let storedDomains = JSON.parse(localStorage.getItem('domains'));
  if (!storedDomains) {
    storedDomains = [];
  }
  if (!storedDomains.includes(domain)) {
    storedDomains.push(domain);
  }
  localStorage.setItem('domains', JSON.stringify(storedDomains));
}

async function generatePassword(site, length) {
  storeDomain(site);
  var input;

  if (localStorage.getItem('Account') == 'Bireysel') {
    input = site + localStorage.getItem("masterPassword");
  } else {
    input = site + localStorage.getItem("familyPassword");
  }

  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/';
  const hash = new TextEncoder().encode(input);

  const digest = await window.crypto.subtle.digest('SHA-256', hash);
  const password = [];
  const data = new Uint8Array(digest);

  for (let i = 0; i < length; i++) {
    const index = data[i % data.length] % charset.length;
    password.push(charset[index]);
  }

  return password.join('');
}

async function getActiveTabDomain() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = new URL(tabs[0].url);
      resolve(url.hostname);
    });
  });
}