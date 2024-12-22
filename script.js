const toggle = document.getElementById("toggle");
const toggleText = document.getElementById("toggle-text");
const heroText = document.getElementById("hero-text");
const lightEffect = document.querySelector(".light-effect");
const timeElement = document.getElementById("time");
const hamburgerMenu = document.getElementById("hamburger");
const worldGlobe = document.getElementById("world");

const navLinks = document.getElementById("nav-links");
const body = document.body;
const cursor = document.getElementById("cursor");

const homeSection = document.getElementById("home");
const backToTopButton = document.getElementById("back-to-top");

const navMenu = document.querySelectorAll(".nav-menu-text");

navMenu.forEach((element) => {
  let isAnimating = false;

  element.addEventListener("mouseenter", () => {
    if (!isAnimating) {
      element.classList.add("animate");
      isAnimating = true;

      element.addEventListener(
        "animationend",
        () => {
          element.classList.remove("animate");
          isAnimating = false;
        },
        { once: true }
      );
    }
  });
});
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(homeSection);

hamburgerMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburgerMenu.classList.toggle("active");

  document.body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav-menu_link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburgerMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});

toggle.addEventListener("click", () => {
  const isDarkMode = body.classList.contains("dark-mode");

  if (isDarkMode) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    toggle.classList.remove("dark");
    heroText.classList.remove("highlight-lines");
    worldGlobe.classList.remove("world-dark");
    toggleText.textContent = "LIGHT MODE";
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode", "dark");
    toggle.classList.add("dark");
    heroText.classList.add("highlight-lines");
    worldGlobe.classList.add("world-dark");
    toggleText.textContent = "DARK MODE";
  }
});

document.querySelectorAll(".grid-item").forEach((item) => {
  const media = item.querySelector(".media");

  // Reset opacity when mouse enters
  item.addEventListener("mouseenter", () => {
    media.style.opacity = "1";
  });

  // Track cursor movement inside the element
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect(); // Get card's position
    const x = e.clientX - rect.left; // Cursor X within the card
    const y = e.clientY - rect.top; // Cursor Y within the card

    // Position the media element
    media.style.top = `${y}px`;
    media.style.left = `${x}px`;
  });

  // Hide media when the cursor leaves
  item.addEventListener("mouseleave", () => {
    media.style.opacity = "0";
  });
});

document.addEventListener("mousemove", (e) => {
  const lightEffect = document.querySelector(".light-effect");
  const { clientX, clientY } = e;

  lightEffect.style.transform = `translate(${clientX - 75}px, ${
    clientY - 75
  }px)`;
});

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedTime = `${hours % 12 || 12}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;

  timeElement.textContent = formattedTime;
}

setInterval(updateClock, 1000);
updateClock();
