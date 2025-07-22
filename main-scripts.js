/**
 * NextEdge IT Service - Main JavaScript File
 * Contains all interactive functionality for the website
 */

// ========== DOCUMENT READY ==========
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initMobileNavigation();
  initSmoothScrolling();
  initHeaderScrollEffect();
  initBackToTopButton();
  initContactForm();
  initTestimonialSlider();
  initServiceCardAnimations();
  initChatbot();
  initScrollAnimations();
  initTrustBadgesAnimation();
});

// ========== COMPONENT INITIALIZERS ==========

/**
 * Initialize mobile navigation functionality
 */
function initMobileNavigation() {
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navbar = document.getElementById('navbar');
  
  if (mobileNavToggle && navbar) {
    mobileNavToggle.addEventListener('click', function() {
      navbar.classList.toggle('active');
      this.classList.toggle('fa-times');
      this.classList.toggle('fa-bars');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
        mobileNavToggle.classList.remove('fa-times');
        mobileNavToggle.classList.add('fa-bars');
      });
    });
  }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });
}

/**
 * Initialize header scroll effect
 */
function initHeaderScrollEffect() {
  const header = document.getElementById('header');
  if (!header) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Initialize back to top button
 */
function initBackToTopButton() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });
  
  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ... (continues with 800+ lines of JavaScript)
