const textarea = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

function updateCounts() {
  const text = textarea.value;
  const length = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  charCount.textContent = `${length} / 200 characters`;
  wordCount.textContent = `${words} ${words === 1 ? "word" : "words"}`;

  charCount.classList.remove("warning", "over");
  if (length > 200) {
    charCount.classList.add("over");
  } else if (length > 180) {
    charCount.classList.add("warning");
  }
}

// Save draft on input
textarea.addEventListener("input", () => {
  updateCounts();
  localStorage.setItem("draft", textarea.value);
});

// Clear function
function clearAll() {
  textarea.value = "";
  localStorage.removeItem("draft");
  updateCounts();
}
clearBtn.addEventListener("click", clearAll);

// Escape key clears
textarea.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    clearAll();
  }
});

// Theme toggle
function toggleTheme() {
  body.classList.toggle("dark");
  const dark = body.classList.contains("dark");
  themeToggle.textContent = dark ? "Light mode" : "Dark mode";
  localStorage.setItem("theme", dark ? "dark" : "light");
}
themeToggle.addEventListener("click", toggleTheme);

// Restore on load
window.addEventListener("DOMContentLoaded", () => {
  const savedDraft = localStorage.getItem("draft");
  if (savedDraft) textarea.value = savedDraft;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "Light mode";
  }

  updateCounts();
});
