// PRNG (Sözde rastgele sayı üretici).
function XorShift(seed = 1) {
  let x = seed;
  
  return function() {
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    return x >>> 0;
  }
}

// Web sayfası tamamen yüklendiğinde bu kod bloğunu çalıştır
document.addEventListener('DOMContentLoaded', async () => {
  // HTML'den elementleri al
  const passwordForm = document.getElementById('password-form');
  const siteInput = document.getElementById('site');
  const generatedPassword = document.getElementById('generated-password');
  const copyButton = document.getElementById('copy-button');

  var passlength = 12;

  // Aktif sekmenin domain bilgisini al
  const currentDomain = await getActiveTabDomain();
  siteInput.textContent = currentDomain;

  // 'password-form' elementine tıklanınca olacaklar
  passwordForm.addEventListener('click', async (event) => {
    event.preventDefault();

    const site = siteInput.textContent;
    const length = passlength;

    // Site ve uzunluk bilgisiyle bir şifre oluşturuluyor
    const password = await generatePassword(site, length);
    generatedPassword.value = password;
  });
  
  // 'copy-button' elementine tıklanınca şifre panoya kopyalanıyor
  copyButton.addEventListener('click', () => {
    generatedPassword.select();
    document.execCommand('copy');
  });

  const passwordLength = document.getElementById('passwordLength');

  const incLength = document.getElementById('incLength');
  // 'incLength' elementine tıklanınca şifre uzunluğu artırılıyor
  incLength.addEventListener('click', async (event) => {
    event.preventDefault();
    passlength++;
    passwordLength.innerHTML = passlength;
  });

  const decLength = document.getElementById('decLength');
  // 'decLength' elementine tıklanınca şifre uzunluğu azaltılıyor
  decLength.addEventListener('click', async (event) => {
    event.preventDefault();
    passlength--;
    passwordLength.innerHTML = passlength;
  });
});

// Aktif sekmenin domain bilgisini döndüren fonksiyon
async function getActiveTabDomain() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = new URL(tabs[0].url);
      resolve(url.hostname);
    });
  });
}

// Domain ve şifre uzunluğunu local storage'a kaydeden fonksiyon
function storeDomain(domain, passlength) {
  let storedDomains = JSON.parse(localStorage.getItem('domains'));
  let lastId = Number(localStorage.getItem('lastId'));
  
  if (!storedDomains) {
    storedDomains = [];
  }

  if (isNaN(lastId)) {
    lastId = 0;
  }

  const domainObj = {
    id: lastId + 1,
    domain: domain,
    length: passlength,
  };

  const domainExists = storedDomains.some((storedDomain) => storedDomain.domain === domain);

  if (!domainExists) {
    storedDomains.unshift(domainObj);
    localStorage.setItem('lastId', domainObj.id);
  }

  localStorage.setItem('domains', JSON.stringify(storedDomains));
}

function shuffleCharset(charset, xorshift) {
  let array = charset.split('');
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.abs(xorshift()) % currentIndex;
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array.join('');
}


// Site ve uzunluk bilgisiyle bir şifre oluşturan fonksiyon
async function generatePassword(site, length) {
  let masterPassword;
  
  if (localStorage.getItem('Account') == 'Bireysel') {
    masterPassword = localStorage.getItem("masterPassword");
  } else {
    masterPassword = localStorage.getItem("familyPassword");
  }
  
  const input = site + masterPassword;
  
  // Use a hashed version of the master password as the seed for XorShift
  const masterPasswordHash = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(masterPassword));
  const xorshift = XorShift(new Uint32Array(masterPasswordHash)[0]);

  const charset = shuffleCharset('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/', xorshift);
  const hash = new TextEncoder().encode(input);

  const digest = await window.crypto.subtle.digest('SHA-256', hash);
  const password = [];
  const data = new Uint8Array(digest);

  for (let i = 0; i < length; i++) {
    const index = data[i % data.length] % charset.length;
    password.push(charset[index]);
  }

  return shuffleCharset(password.join(''), xorshift);
}