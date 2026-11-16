// =========================================================
// script.js — shared behaviour for every page of the site
// Loaded with <script src="js/script.js" defer></script>
// =========================================================

// ---- 1. Mobile navigation toggle ---------------------------
// Finds the hamburger button and the nav list; clicking the
// button shows/hides the nav on small screens (see media query
// in style.css) and updates aria-expanded for screen readers.
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// ---- 2. Dark / light theme toggle --------------------------
// Preference is remembered in localStorage so it persists
// across pages and future visits.
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

function applyStoredTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    root.setAttribute("data-theme", "dark");
  }
}
applyStoredTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    if (isDark) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });
}

// ---- 3. Back-to-top button ---------------------------------
// Hidden until the user scrolls down a bit, then fades in.
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 400 ? "block" : "none";
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---- 4. Footer year --------------------------------------
// Avoids hard-coding the copyright year in every HTML file.
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ---- 5. Portfolio filter (portfolio.html only) --------------
const filterButtons = document.querySelectorAll(".filter-bar button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    // update pressed state for accessibility + styling
    filterButtons.forEach((b) => b.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");

    projectCards.forEach((card) => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.style.display = matches ? "" : "none";
    });
  });
});

// ---- 6. Contact form validation (contact.html only) ----------
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      formStatus.textContent = "Please fill in every field.";
      formStatus.style.color = "crimson";
      return;
    }
    if (!emailPattern.test(email)) {
      formStatus.textContent = "Please enter a valid email address.";
      formStatus.style.color = "crimson";
      return;
    }

    // No backend is wired up yet — this just simulates success.
    formStatus.textContent = "Thanks! Your message has been noted (demo only, not actually sent).";
    formStatus.style.color = "green";
    contactForm.reset();
  });
}
