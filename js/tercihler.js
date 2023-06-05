window.onload = function() {
    // Çıkış butonu için event listener
    const logoutButton = document.getElementById("logoutButton");
    
    if (logoutButton !== null) { // logoutButton'ın null olmadığını kontrol edin
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("masterPassword"); // Ana parolayı düzenle
            localStorage.removeItem("familyPassword"); // Aile parolayı düzenle
            localStorage.removeItem("Account");
            localStorage.setItem('masterPassword', "");
            localStorage.setItem('familyPassword', "");
            localStorage.setItem('Account', "");
            localStorage.setItem("isLoggedIn", false);
            window.location.href = "login.html"; // Login (giriş) sayfasında yönlendir
        });
    }

    const accountType = document.getElementById("accountType");
    accountType.innerHTML = localStorage.getItem("Account");
    accountType.addEventListener("click", () => {
    if (localStorage.getItem("familyPassword") != '') {
        if (localStorage.getItem("Account") == 'Bireysel') {
        localStorage.setItem('Account', 'Aile');
        } else {
        localStorage.setItem('Account', 'Bireysel');
        }
    }
    accountType.innerHTML = localStorage.getItem("Account");
    });
}