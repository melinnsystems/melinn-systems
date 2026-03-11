// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav')) {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
    }
  });
}

// Animated Counter
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = Math.round(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.round(start);
    }
  }, 16);
}

// Trigger counters when in viewport
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(counter => {
  counterObserver.observe(counter);
});

// Animate on Scroll (AOS) Implementation
function initAOS() {
  const aosElements = document.querySelectorAll('[data-aos]');
  
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  aosElements.forEach(element => {
    aosObserver.observe(element);
  });
}

// Initialize AOS
initAOS();

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector('.hero-background');
  
  if (heroBackground && scrolled < window.innerHeight) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Form Validation & Enhancement
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
      // Submit form (using formspree or your backend)
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Success message
        submitButton.textContent = '✓ Message Sent!';
        submitButton.style.background = '#2FA67A';
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          submitButton.style.background = '';
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      // Error message
      submitButton.textContent = 'Error - Try Again';
      submitButton.style.background = '#ef4444';
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.background = '';
      }, 3000);
    }
  });
}

// Add subtle hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'all 0.6s ease-out';
  fadeObserver.observe(element);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Smooth reveal for hero elements
const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-actions, .hero-stats');
heroElements.forEach((element, index) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  
  setTimeout(() => {
    element.style.transition = 'all 0.8s ease-out';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, index * 150);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
  }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
  // Your scroll handlers here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add custom cursor effect for interactive elements (optional enhancement)
const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');

interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    document.body.style.cursor = 'pointer';
  });
  
  element.addEventListener('mouseleave', () => {
    document.body.style.cursor = 'default';
  });
});

// Console message for developers
console.log('%c🚀 Melinn Systems', 'font-size: 20px; font-weight: bold; color: #2FA67A;');
console.log('%cEngineering digital solutions that scale', 'font-size: 12px; color: #0F2F2A;');
console.log('%cInterested in working with us? Contact us at hello@melinnsystems.com', 'font-size: 10px; color: #666;');