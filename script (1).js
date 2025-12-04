// ========== Toggle Mobile Menu ==========
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('header nav a');

menuIcon.onclick = () => {
  navbar.classList.toggle('active');
  menuIcon.classList.toggle('bx-x');
};

// Close menu when clicking a nav link (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
  });
});

// ========== Highlight Active Section with Intersection Observer ==========
const sections = document.querySelectorAll('section');

const observerOptions = {
  threshold: 0.3,
  rootMargin: '-100px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// ========== Sticky Header ==========
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  header.classList.toggle('sticky', window.scrollY > 100);
});

// ========== Scroll Reveal Animation with Intersection Observer ==========
const revealElements = document.querySelectorAll(
  '.home-content, .home-img, .about-img, .about-content, .education-box, .skill-box, .certificate-box, .project-card, .contact form'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ========== Contact Form Validation & Submit ==========
const form = document.querySelector('#contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const name = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const phone = form.querySelector('input[name="phone"]').value.trim();
  const message = form.querySelector('textarea[name="message"]').value.trim();
  
  // Basic validation
  if (name.length < 2) {
    alert('Please enter a valid name (at least 2 characters)');
    return;
  }
  
  if (!isValidEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }
  
  if (phone.length < 10) {
    alert('Please enter a valid phone number (at least 10 digits)');
    return;
  }
  
  if (message.length < 10) {
    alert('Please enter a message (at least 10 characters)');
    return;
  }
  
  // Success message
  alert('Thank you! Your message has been sent ✅');
  form.reset();
});

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ========== Custom Smooth Scroll ==========
function smoothScroll(target, duration) {
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Apply smooth scroll to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        smoothScroll(target, 1500); // 1.5 seconds - adjust this number to change speed
      }
    }
  });
});

// ========== Loading Animation ==========
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ========== Certificate Image Modal ==========
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const captionText = document.getElementById('caption');
const closeModal = document.querySelector('.modal-close');

// Add click event to all certificate images
document.querySelectorAll('.certificate-box img').forEach(img => {
  img.addEventListener('click', function() {
    modal.style.display = 'block';
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  });
});

// Close modal when clicking the X
closeModal.onclick = function() {
  modal.style.display = 'none';
};

// Close modal when clicking outside the image
modal.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
