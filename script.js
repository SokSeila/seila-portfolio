const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const navItems = document.querySelectorAll('.nav-link');

// Mobile navigation
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navItems.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Light / dark theme toggle
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀';
  themeToggle.setAttribute('aria-label', 'Switch to light mode');
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  themeToggle.textContent = isDark ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
});

// Highlight the navigation item for the visible section
const sections = document.querySelectorAll('main section[id]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => observer.observe(section));

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();


// Typing animation: switch between the two interests
const roleText = document.getElementById('roleText');
if (roleText) {
  const roles = ['Web Developer', 'Cybersecurity Enthusiast'];
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = true;

  function typeRole() {
    const currentRole = roles[roleIndex];

    if (deleting) {
      charIndex--;
      roleText.textContent = currentRole.slice(0, charIndex);
      if (charIndex <= 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 350);
        return;
      }
    } else {
      const nextRole = roles[roleIndex];
      charIndex++;
      roleText.textContent = nextRole.slice(0, charIndex);
      if (charIndex >= nextRole.length) {
        deleting = true;
        setTimeout(typeRole, 1500);
        return;
      }
    }

    setTimeout(typeRole, deleting ? 55 : 95);
  }

  // Begin by showing the first title, then animate to the next.
  setTimeout(typeRole, 1600);
}
