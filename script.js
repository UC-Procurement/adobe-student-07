// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    // Toggle mobile menu
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        mobileMenuBtn.classList.toggle('active', isMenuOpen);
        mobileMenu.classList.toggle('active', isMenuOpen);
        
        // Update ARIA attributes
        mobileMenuBtn.setAttribute('aria-expanded', isMenuOpen);
        mobileMenuBtn.setAttribute('aria-label', isMenuOpen ? 'Close navigation menu' : 'Open navigation menu');
        
        // Focus management
        if (isMenuOpen) {
            // Focus first menu item when menu opens
            const firstMenuItem = mobileMenu.querySelector('.mobile-nav-link');
            if (firstMenuItem) {
                setTimeout(() => firstMenuItem.focus(), 100);
            }
        }
    }

    // Close mobile menu
    function closeMobileMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
            mobileMenuBtn.focus();
        }
    }

    // Event listeners
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        // Close menu when clicking on a link
        const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && isMenuOpen) {
                closeMobileMenu();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (isMenuOpen && !mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                closeMobileMenu();
            }
        });
    }

    // Set active navigation link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === 'index.html' && linkHref === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // Initialize active nav link
    setActiveNavLink();

    // Form validation helper
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add form validation if contact form exists
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            
            let isValid = true;
            
            // Clear previous error states
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            
            // Validate name
            if (!nameField.value.trim()) {
                showFieldError(nameField, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            if (!emailField.value.trim()) {
                showFieldError(emailField, 'Email is required');
                isValid = false;
            } else if (!validateEmail(emailField.value)) {
                showFieldError(emailField, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!messageField.value.trim()) {
                showFieldError(messageField, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                showSuccessMessage('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // Show field error
    function showFieldError(field, message) {
        field.classList.add('error');
        const errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        errorEl.textContent = message;
        field.parentNode.appendChild(errorEl);
    }

    // Show success message
    function showSuccessMessage(message) {
        const successEl = document.createElement('div');
        successEl.className = 'success-message';
        successEl.textContent = message;
        
        const form = document.getElementById('contact-form');
        form.parentNode.insertBefore(successEl, form);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successEl.remove();
        }, 5000);
    }

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-button');
        const content = item.querySelector('.faq-content');
        
        if (button && content) {
            button.addEventListener('click', function() {
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherButton = otherItem.querySelector('.faq-button');
                        const otherContent = otherItem.querySelector('.faq-content');
                        otherButton.setAttribute('aria-expanded', 'false');
                        otherContent.style.maxHeight = '0';
                        otherContent.style.padding = '0 1rem';
                    }
                });
                
                // Toggle current item
                if (isExpanded) {
                    button.setAttribute('aria-expanded', 'false');
                    content.style.maxHeight = '0';
                    content.style.padding = '0 1rem';
                } else {
                    button.setAttribute('aria-expanded', 'true');
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.padding = '1rem';
                }
            });
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading states for buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit' || this.classList.contains('submit-btn')) {
                this.classList.add('loading');
                this.disabled = true;
                
                // Remove loading state after form processing
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                }, 2000);
            }
        });
    });
});