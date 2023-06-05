window.onload = function() {

  document.getElementById('login').addEventListener('click', (event) => {
    event.preventDefault();

    const masterPasswordElement = document.getElementById('master-password');
    const familyPasswordElement = document.getElementById('family-password');

    if (!masterPasswordElement || !familyPasswordElement) {
      alert("Parola ögesi bulunamadı.");
      return;
    }

    const masterPassword = masterPasswordElement.value;
    const familyPassword = familyPasswordElement.value;

    const isMasterPasswordValid = passwordPolicy(masterPassword);
    const isFamilyPasswordValid = passwordPolicy(familyPassword);

    let checkBox = false;
    if (familyPassword.length >= 12 && familyPassword !== '') {
      checkBox = true;
    }

    if (isMasterPasswordValid && checkBox && isFamilyPasswordValid) {
      localStorage.setItem('Account', 'Bireysel');
      localStorage.setItem('masterPassword', masterPassword);
      localStorage.setItem('familyPassword', familyPassword);
      localStorage.setItem("isLoggedIn", true);
      window.location.href = "/html/anasayfa.html";
    } else if (isMasterPasswordValid && !checkBox && familyPassword === '') {
      localStorage.setItem('Account', 'Bireysel');
      localStorage.setItem('masterPassword', masterPassword);
      localStorage.setItem("isLoggedIn", true);
      window.location.href = "/html/anasayfa.html";
    } else {
      alert("Girdiğiniz ana parola veya aile parolası uygun değildir!");
    }
  });

  };

  function passwordPolicy(password) {
    const minLength = 12;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length < 1) {
      return false;
    }

    if(password.length < minLength) {
        alert('Parolanız en az 12 karakter uzunluğunda olmalıdır!');
        return false;
    } else if (!hasLowercase) {
        alert('Parolanız en az bir küçük harf içermelidir!');
        return false;
    } else if (!hasUppercase) {
        alert('Parolanız en az bir büyük harf içermelidir!');
        return false;
    } else if (!hasNumber) {
        alert('Parolanız en az bir rakam içermelidir!');
        return false;
    } else {
        return true;
    }
  };