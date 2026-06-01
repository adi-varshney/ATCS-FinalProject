const themeToggle = document.querySelector(".theme-toggle");

function getTheme() {
  return document.documentElement.dataset.theme || "dark";
}

function setTheme(theme) {
  const isDark = theme === "dark";
  const themeIcon = themeToggle ? themeToggle.querySelector(".theme-icon") : null;

  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    themeIcon.setAttribute("data-lucide", isDark ? "moon" : "sun");
    themeToggle.querySelector(".theme-label").textContent = isDark ? "Dark" : "Light";
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }

  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(getTheme() === "dark" ? "light" : "dark");
  });
}

setTheme(getTheme());
