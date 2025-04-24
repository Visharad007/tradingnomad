// index.js - Home Page Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initParticles();
  setupNavbarScrollEffect();
  setupScrollAnimations();
  setupMobileMenu();
});

// ======================
// 1. Particles Background
// ======================
function initParticles() {
  if (document.getElementById('particles-js')) {
      particlesJS('particles-js', {
          particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: "#6c5ce7" },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              line_linked: {
                  enable: true,
                  distance: 150,
                  color: "#6c5ce7",
                  opacity: 0.4,
                  width: 1
              },
              move: {
                  enable: true,
                  speed: 2,
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out"
              }
          },
          interactivity: {
              detect_on: "canvas",
              events: {
                  onhover: { enable: true, mode: "grab" },
                  onclick: { enable: true, mode: "push" },
                  resize: true
              }
          },
          retina_detect: true
      });
  }
}

// ======================
// 2. Navbar Scroll Effect
// ======================
function setupNavbarScrollEffect() {
  const navbar = document.querySelector('.glass-nav');
  if (!navbar) return;
  
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          navbar.style.background = "rgba(37, 42, 58, 0.9)";
          navbar.style.padding = "0.75rem var(--page-margin)";
      } else {
          navbar.style.background = "var(--glass)";
          navbar.style.padding = "1rem var(--page-margin)";
      }
  });
}

// ======================
// 3. Scroll Animations
// ======================
function setupScrollAnimations() {
  // Add scroll indicator animation
  const scrollIndicator = document.querySelector('.scroll-indicator span');
  if (scrollIndicator) {
      scrollIndicator.style.animation = 'scroll 2s infinite';
  }
  
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
          }
      });
  }, {
      threshold: 0.1
  });
  
  // Observe elements that should animate on scroll
  document.querySelectorAll('.hero-content, .footer-content').forEach(el => {
      observer.observe(el);
  });
}

// ======================
// 4. Mobile Menu
// ======================
function setupMobileMenu() {
  // This is a placeholder for mobile menu functionality
  // Since the mobile menu is commented out in HTML, this can be implemented later
  console.log('Mobile menu setup - ready for implementation');
}

// Add CSS animation styles dynamically
const style = document.createElement('style');
style.textContent = `
  .animate-in {
      animation: fadeInUp 0.6s ease forwards;
  }
  
  @keyframes fadeInUp {
      from {
          opacity: 0;
          transform: translateY(30px);
      }
      to {
          opacity: 1;
          transform: translateY(0);
      }
  }
`;
document.head.appendChild(style);