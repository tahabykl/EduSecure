document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const masterPassword = document.getElementById('master-password').value;
    // Save the password in memory
    localStorage.setItem('masterPassword', masterPassword);
    // Redirect to the main popup page
    localStorage.setItem("isLoggedIn", true);
    window.location.href = "popup.html";
  });