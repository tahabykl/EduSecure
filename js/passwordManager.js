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
  
  async function generatePassword(site, length) {
    masterPassword = localStorage.getItem("masterPassword");
    const input = site + masterPassword;
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
  

  siteInput.value = currentDomain;

  async function getActiveTabDomain() {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = new URL(tabs[0].url);
        resolve(url.hostname);
      });
    });
  }