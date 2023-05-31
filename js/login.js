document.getElementById('login').addEventListener('click', (event) => {
  event.preventDefault();
  const masterPassword = passwordPolicy(document.getElementById('master-password').value);
  const familyPassword = passwordPolicy(document.getElementById('family-password').value);
  var checkBox = document.getElementById("myCheck").checked;
  localStorage.setItem('Account', 'Bireysel');
  if (masterPassword != '' && (checkBox == true && familyPassword != '')) {
      localStorage.setItem('masterPassword', masterPassword);
      localStorage.setItem('familyPassword', familyPassword);
      localStorage.setItem("isLoggedIn", true);
      window.location.href = "popup.html";
  } else if (masterPassword != '' && (checkBox == false)) {
      localStorage.setItem('masterPassword', masterPassword);
      localStorage.setItem("isLoggedIn", true);
      window.location.href = "popup.html";
  } else {
      alert("Girdiğniz şifre uygun değildir!");
  }
});

document.getElementById('myCheck').addEventListener('change', (event) => {
  event.preventDefault();
  var checkBox = document.getElementById("myCheck");
  var text = document.getElementById("family-password");
  if (checkBox.checked == true){
      text.style.display = "block";
  } else {
      text.style.display = "none";
  }
});

function passwordPolicy(password) {
  const minLength = 12;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if(password.length < minLength || !hasLowercase || !hasUppercase || !hasNumber) {
      return '';
  } else {
      return password;
  }
};