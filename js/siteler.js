function XorShift(seed = 1) {
  let x = seed;
  
  return function() {
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    return x >>> 0;
  }
}

const shuffleCharset = (charset) => {
    const xorshift = XorShift(charset.length);
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

document.addEventListener('DOMContentLoaded', async () => {
    //const passwordForm = document.getElementById('password-form');
    const siteInput = document.getElementById('site');
    //const generatedPassword = document.getElementById('generated-password');
    //const copyButton = document.getElementById('copy-button');

    const currentDomain = await getActiveTabDomain();
    siteInput.textContent = currentDomain;

    let page_num = 0;
    const pageSize = 5;

    let domains_arry = JSON.parse(localStorage.getItem("domains"));
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');

    for (let i = 0; i < (localStorage.getItem("lastId") > 5 ? 5 : localStorage.getItem("lastId")); i++) {
        my_title = document.getElementById(i+"-title");
        my_domain = document.getElementById(i+"-domain");
        my_title.innerHTML = domains_arry[i]["domain"];
        my_domain.innerHTML = domains_arry[i]["domain"];
    };
    
    let elements = document.querySelectorAll('[id$="-copy"]');
    elements.forEach(function(element) {
        element.addEventListener('click', async function() {
            let my_num = this.id[0];
            let passLength = domains_arry[my_num]["length"];
            let password = await generatePassword(document.getElementById(my_num+"-domain").innerText, passLength);
            navigator.clipboard.writeText(password).then(function() {
                console.log('Kopyalama başarılı');
            }, function(err) {
                console.error('Kopyalama başarısız: ', err);
            });
        });
    });
    
    function updatePage() {
      for (let i = 0; i < pageSize; i++) {
        let idx = i + page_num * pageSize;
        let my_title = document.getElementById(i+"-title");
        let my_domain = document.getElementById(i+"-domain");
        let my_div = document.getElementById(i+"-copy");
        let my_icon = document.getElementById(i+"-icon");
    
        if (idx < domains_arry.length) {
          my_div.style.display = "block";
          my_icon.style.display = "block";
          my_title.innerHTML = domains_arry[idx]["domain"];
          my_domain.innerHTML = domains_arry[idx]["domain"];
        } else {
          my_div.style.display = "none"; 
          my_icon.style.display = "none";
        }
      };
    }
    
    updatePage();
    
    
    nextButton.addEventListener("click", () => {
      page_num = Math.min(page_num + 1, Math.floor((domains_arry.length - 1) / pageSize));
      updatePage();
    });
    
    
    prevButton.addEventListener("click", () => {
      page_num = Math.max(page_num - 1, 0);
      updatePage();
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
  var input;

  if (localStorage.getItem('Account') == 'Bireysel') {
    input = site + localStorage.getItem("masterPassword");
  } else {
    input = site + localStorage.getItem("familyPassword");
  }

  const charset = shuffleCharset('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/');
  const hash = new TextEncoder().encode(input);

  const digest = await window.crypto.subtle.digest('SHA-256', hash);
  const password = [];
  const data = new Uint8Array(digest);

  for (let i = 0; i < length; i++) {
    const index = data[i % data.length] % charset.length;
    password.push(charset[index]);
  }

  return shuffleCharset(password.join(''));
}

async function getActiveTabDomain() {
return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = new URL(tabs[0].url);
    resolve(url.hostname);
    });
});
}