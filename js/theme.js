// Select the color scheme dropdown element
const colorSchemeDropdown = document.getElementById("color-schemes");

// Add an event listener to the color scheme dropdown
colorSchemeDropdown.addEventListener("change", () => {
  // Get the selected option's value
  const selectedValue = colorSchemeDropdown.value;

  // Update the CSS variables to reflect the selected color scheme
  if (selectedValue === "blue") {
    setColor("blue");
    localStorage.setItem("edusecureTheme", "blue");
  } else if (selectedValue === "green") {
    setColor("green");
    localStorage.setItem("edusecureTheme", "green");
  } else if (selectedValue === "purple") {
    setColor("purple");
    localStorage.setItem("edusecureTheme", "purple");
  } else if (selectedValue === "orange") {
    setColor("orange");
    localStorage.setItem("edusecureTheme", "red");
  } else if (selectedValue === "default") {
    setColor("default");
    localStorage.setItem("edusecureTheme", "default");
  } else if (selectedValue === "orange") {
    setColor("orange");
    localStorage.setItem("edusecureTheme", "orange");
  }
});

function setColor(color) {
  const root = document.documentElement;

  switch (color) {
    case "blue":
      document.documentElement.style.setProperty("--primary-color", "#E8E5DA");
      document.documentElement.style.setProperty("--secondary-color", "#9EB7E5");
      document.documentElement.style.setProperty("--tertiary-color", "#CDC392");
      document.documentElement.style.setProperty("--background-color", "#648DE5");
      break;
    case "purple":
      document.documentElement.style.setProperty("--primary-color", "#e80074");
      document.documentElement.style.setProperty("--secondary-color", "#c200db");
      document.documentElement.style.setProperty("--tertiary-color", "#00cfe5");
      document.documentElement.style.setProperty("--background-color", "#1d1856");
      break;
    case "orange":
      document.documentElement.style.setProperty("--primary-color", "#5a79c8");
      document.documentElement.style.setProperty("--secondary-color", "#5fb7cf");
      document.documentElement.style.setProperty("--tertiary-color", "#eeeeee");
      document.documentElement.style.setProperty("--background-color", "#3c339a");
      break;
    //case "purple":
    //  document.documentElement.style.setProperty("--primary-color", "#dc3545");
    //  document.documentElement.style.setProperty("--secondary-color", "#6c757d");
    //  break;
    case "default":
      document.documentElement.style.setProperty("--primary-color", "#395B64");
      document.documentElement.style.setProperty("--secondary-color", "#A5C9CA");
      document.documentElement.style.setProperty("--tertiary-color", "#E7F6F2");
      document.documentElement.style.setProperty("--background-color", "#2C3333");
      break;
    default:
      console.error("Invalid color selection");
  }
}