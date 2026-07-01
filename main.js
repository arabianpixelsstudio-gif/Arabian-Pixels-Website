document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (mobileToggle) {
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. Sticky Header & Active Nav Link
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Nav Link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Trigger point

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // 4. Animated Statistics Counters
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 200; // lower is faster
                
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger counters when stats section is visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        window.addEventListener('scroll', () => {
            const sectionTop = statsSection.getBoundingClientRect().top;
            if (!hasAnimated && sectionTop < window.innerHeight) {
                animateCounters();
                hasAnimated = true;
            }
        });
    }

    // 5. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // 6. Theme Toggle (Dark Mode)
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });

    // 7. Language Toggle (EN / AR)
    const langToggle = document.getElementById('lang-toggle');
    const htmlTag = document.documentElement;
    const translatableElements = document.querySelectorAll('.tr');
    const translatablePlaceholders = document.querySelectorAll('.tr-placeholder');
    const savedLang = localStorage.getItem('lang') || 'en';

    const setLanguage = (lang) => {
        if (lang === 'ar') {
            htmlTag.setAttribute('dir', 'rtl');
            htmlTag.setAttribute('lang', 'ar');
            langToggle.textContent = 'EN';
            
            translatableElements.forEach(el => {
                if (el.dataset.ar) el.innerHTML = el.dataset.ar;
            });
            translatablePlaceholders.forEach(el => {
                if (el.dataset.ar) el.setAttribute('placeholder', el.dataset.ar);
            });
        } else {
            htmlTag.setAttribute('dir', 'ltr');
            htmlTag.setAttribute('lang', 'en');
            langToggle.textContent = 'AR';
            
            translatableElements.forEach(el => {
                if (el.dataset.en) el.innerHTML = el.dataset.en;
            });
            translatablePlaceholders.forEach(el => {
                if (el.dataset.en) el.setAttribute('placeholder', el.dataset.en);
            });
        }
    };

    // Initialize language
    setLanguage(savedLang);

    langToggle.addEventListener('click', () => {
        const currentLang = htmlTag.getAttribute('lang');
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        localStorage.setItem('lang', newLang);
        setLanguage(newLang);
    });

});
