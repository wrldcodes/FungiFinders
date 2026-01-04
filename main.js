const hamburgerButton = document.querySelector('[aria-controls="primary-nav"]');
const nav = document.querySelector("#primary-nav");
const themes = document.querySelector(".themes");
const darkModeButton = document.querySelector(
  '[aria-controls="toggle-dark-mode"]'
);
const lightModeButton = document.querySelector(
  '[aria-controls="toggle-light-mode"]'
);
const mobileThemeToggle = document.querySelector("#mobile-theme-toggle");

// Initialize theme from localStorage
const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.documentElement.classList.add("light-mode");
    darkModeButton.hidden = false;
    lightModeButton.hidden = true;
    updateMobileThemeLabel();
  } else {
    document.documentElement.classList.remove("light-mode");
    darkModeButton.hidden = true;
    lightModeButton.hidden = false;
    updateMobileThemeLabel();
  }
};

// Update mobile theme label
const updateMobileThemeLabel = () => {
  const isLightMode = document.documentElement.classList.contains("light-mode");
  const themeLabel = mobileThemeToggle.querySelector(".theme-label");

  if (isLightMode) {
    themeLabel.textContent = "Dark mode";
  } else {
    themeLabel.textContent = "Light mode";
  }
};

// Handle mobile theme toggle visibility
const handleThemeToggleVisibility = () => {
  const themeToggleLi = mobileThemeToggle.closest("li");
  if (window.innerWidth > 760) {
    themeToggleLi.hidden = true;
  } else {
    themeToggleLi.hidden = false;
  }
};

// Run on page load
initializeTheme();
handleThemeToggleVisibility();

// Theme toggle function
const toggleTheme = () => {
  const isLightMode = document.documentElement.classList.contains("light-mode");

  if (isLightMode) {
    // Switch to dark mode
    document.documentElement.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
    darkModeButton.hidden = true;
    lightModeButton.hidden = false;
  } else {
    // Switch to light mode
    document.documentElement.classList.add("light-mode");
    localStorage.setItem("theme", "light");
    darkModeButton.hidden = false;
    lightModeButton.hidden = true;
  }
  updateMobileThemeLabel();
};
// close nav if user click outside the dropdown
document.addEventListener("click", (e) => {
  if (
    hamburgerButton &&
    nav &&
    !hamburgerButton.contains(e.target) &&
    !nav.contains(e.target) &&
    hamburgerButton.getAttribute("aria-expanded") === "true"
  ) {
    hamburgerButton.setAttribute("aria-expanded", "false");
  }
});

// Both buttons toggle the theme
darkModeButton.addEventListener("click", toggleTheme);
lightModeButton.addEventListener("click", toggleTheme);
mobileThemeToggle.addEventListener("click", toggleTheme);

hamburgerButton.addEventListener("click", () => {
  // check if the navigation is opened
  const isNavOpened = hamburgerButton.getAttribute("aria-expanded");

  if (isNavOpened === "false") {
    hamburgerButton.setAttribute("aria-expanded", "true");
  } else {
    hamburgerButton.setAttribute("aria-expanded", "false");
  }
});

const resizeObserver = new ResizeObserver(() => {
  document.body.classList.add("resizing");
  requestAnimationFrame(() => {
    document.body.classList.remove("resizing");
  });
  handleThemeToggleVisibility();
});

resizeObserver.observe(document.body);
