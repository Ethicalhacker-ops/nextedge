// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navbar = document.getElementById('navbar');

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

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
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

    // Chatbot Functionality
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotOptions = document.querySelectorAll('.chatbot-option');

    if (chatbotToggle) {
        // Toggle chatbot window
        chatbotToggle.addEventListener('click', function() {
            chatbotWindow.classList.toggle('active');
        });

        // Close chatbot window
        chatbotClose.addEventListener('click', function() {
            chatbotWindow.classList.remove('active');
        });

        // Send message function
        function sendMessage() {
            const message = chatbotInput.value.trim();
            if (message) {
                // Add user message
                addMessage(message, 'user');
                chatbotInput.value = '';

                // Show typing indicator
                showTypingIndicator();

                // Process and respond after a delay
                setTimeout(() => {
                    // Remove typing indicator
                    removeTypingIndicator();

                    // Get bot response
                    const response = getBotResponse(message);

                    // Add bot response
                    addMessage(response.text, 'bot', response.options);
                }, 1000);
            }
        }

        // Send message on button click
        chatbotSend.addEventListener('click', sendMessage);

        // Send message on Enter key
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Quick option selection
        chatbotOptions.forEach(option => {
            option.addEventListener('click', function() {
                const question = this.getAttribute('data-question');
                chatbotInput.value = question;
                sendMessage();
            });
        });

        // Add message to chat
        function addMessage(text, sender, options = null) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
            messageDiv.innerHTML = text;

            chatbotMessages.appendChild(messageDiv);

            // Add options if provided
            if (options) {
                const optionsDiv = document.createElement('div');
                optionsDiv.classList.add('chatbot-options');
                optionsDiv.classList.add('mt-2');

                options.forEach(option => {
                    const button = document.createElement('button');
                    button.classList.add('chatbot-option');
                    button.setAttribute('data-question', option.text);
                    button.textContent = option.text;
                    button.addEventListener('click', function() {
                        chatbotInput.value = this.getAttribute('data-question');
                        sendMessage();
                    });
                    optionsDiv.appendChild(button);
                });

                messageDiv.appendChild(optionsDiv);
            }

            // Scroll to bottom
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        // Show typing indicator
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.classList.add('typing-indicator');
            typingDiv.id = 'typingIndicator';

            for (let i = 0; i < 3; i++) {
                const dot = document.createElement('div');
                dot.classList.add('typing-dot');
                typingDiv.appendChild(dot);
            }

            chatbotMessages.appendChild(typingDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        // Remove typing indicator
        function removeTypingIndicator() {
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }

        // Bot response logic
        function getBotResponse(question) {
            const lowerQuestion = question.toLowerCase();
            let response = {};

            // Define responses
            if (lowerQuestion.includes('service') || lowerQuestion.includes('offer') || lowerQuestion.includes('provide')) {
                response.text = "I offer comprehensive IT services including:<br><br>" +
                               "<strong>1. Domain Setup & Management</strong><br>" +
                               "<strong>2. Web Hosting Support & Maintenance</strong><br>" +
                               "<strong>3. Email Hosting & Configuration</strong><br>" +
                               "<strong>4. Technical Troubleshooting & IT Support</strong><br><br>" +
                               "Would you like more details about any specific service?";

                response.options = [
                    { text: "Tell me about Domain Setup" },
                    { text: "I need Web Hosting help" },
                    { text: "Email Hosting information" }
                ];
            }
            else if (lowerQuestion.includes('contact') || lowerQuestion.includes('reach') || lowerQuestion.includes('call')) {
                response.text = "You can reach me through:<br><br>" +
                               "<strong>Email:</strong> contact@jayprasad.com.np<br>" +
                               "<strong>Location:</strong> Kathmandu, Nepal<br><br>" +
                               "You can also use the contact form on the contact page.";

                response.options = [
                    { text: "What are your services?" },
                    { text: "Back to main menu" }
                ];
            }
            else {
                response.text = "I'm sorry, I didn't understand your question. Here are some options that might help:";

                response.options = [
                    { text: "What services do you offer?" },
                    { text: "How do I contact you?" }
                ];
            }

            return response;
        }
    }


    // Contact form submission
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simulate form submission
            // Here you would typically send the form data to your server
            // For this example, we'll simulate a successful submission
            setTimeout(() => {
                contactForm.reset();
                alert('Message sent successfully!');
            }, 1000);
        });
    }

    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize animations when elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .testimonial-item, .team-member, .blog-post-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});
