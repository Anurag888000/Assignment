const toggle = document.getElementById("dark-mode-toggle");
const html = document.documentElement;

toggle.addEventListener("click", () => {
  html.classList.toggle("dark");

  // Save preference
  if (html.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggle.textContent = "🌙";
  }
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  html.classList.add("dark");
  toggle.textContent = "☀️";
}
