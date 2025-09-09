/**
 * Dixie Custom Scripts
 * All custom JavaScript functionality for LingArch theme
 * Author: dixie designs
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        
        // Initialize all custom features
        initMegaMenu();
        initSimpleDropdowns();
        initIntroAnimation();
        initCaseStudiesAnimation();
        initIndustriesAnimation();
        initTypewriter();
        initCaseStudiesCarousel();
        initBackToTop();
        initFAQs();
        cleanupEmptyTags();
        
    });

    /**
     * Mega Menu Hover Fix
     * Solves the UX issue where menu disappears when moving to dropdown items
     */
    function initMegaMenu() {
        const megaMenuTriggers = document.querySelectorAll('.dropdown-parent.mega-menu');
        
        megaMenuTriggers.forEach(function(trigger) {
            const megaContent = trigger.querySelector('.mega-content');
            if (!megaContent) return;
            
            let hideTimeout;
            
            // Show menu
            function showMenu() {
                clearTimeout(hideTimeout);
                megaContent.style.display = 'block';
            }
            
            // Hide menu with delay
            function hideMenu() {
                hideTimeout = setTimeout(function() {
                    megaContent.style.display = 'none';
                }, 200); // 200ms delay
            }
            
            // Cancel hide if mouse enters menu content
            function cancelHide() {
                clearTimeout(hideTimeout);
            }
            
            // Attach events
            trigger.addEventListener('mouseenter', showMenu);
            trigger.addEventListener('mouseleave', hideMenu);
            megaContent.addEventListener('mouseenter', cancelHide);
            megaContent.addEventListener('mouseleave', hideMenu);
        });
    }

    /**
     * Simple Dropdown Menus (Industries, Resources)
     * Applies same hover logic as mega menu for consistent UX
     */
    function initSimpleDropdowns() {
        const simpleMenuTriggers = document.querySelectorAll('.dropdown-parent.simple-menu');
        
        simpleMenuTriggers.forEach(function(trigger) {
            const dropdownList = trigger.querySelector('.dropdown-list');
            if (!dropdownList) return;
            
            let hideTimeout;
            
            // Show dropdown
            function showDropdown() {
                clearTimeout(hideTimeout);
                dropdownList.style.display = 'block';
            }
            
            // Hide dropdown with delay
            function hideDropdown() {
                hideTimeout = setTimeout(function() {
                    dropdownList.style.display = 'none';
                }, 200); // 200ms delay
            }
            
            // Cancel hide if mouse enters dropdown content
            function cancelHide() {
                clearTimeout(hideTimeout);
            }
            
            // Attach events
            trigger.addEventListener('mouseenter', showDropdown);
            trigger.addEventListener('mouseleave', hideDropdown);
            dropdownList.addEventListener('mouseenter', cancelHide);
            dropdownList.addEventListener('mouseleave', hideDropdown);
        });
    }

    /**
     * Typewriter Effect for Hero Description
     * Cycles through 3 different statements with typing animation
     */
    function initTypewriter() {
        const typewriterElement = document.querySelector('.typewriter-content');
        if (!typewriterElement) return;
        
        const statements = [
            "Bad translations cost money.",
            "Legal mistakes can destroy deals.", 
            "Medical errors put people at risk."
        ];
        
        let currentStatementIndex = 0;
        let currentCharIndex = statements[0].length; // Start with first sentence complete
        let isTyping = false; // Start in pause state
        
        function typeWriter() {
            const currentStatement = statements[currentStatementIndex];
            
            if (isTyping) {
                // Typing animation
                if (currentCharIndex < currentStatement.length) {
                    typewriterElement.textContent = currentStatement.substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                    setTimeout(typeWriter, 100); // Typing speed
                } else {
                    // Pause before deleting
                    setTimeout(function() {
                        isTyping = false;
                        typeWriter();
                    }, 2000);
                }
            } else {
                // Deleting animation
                if (currentCharIndex > 0) {
                    typewriterElement.textContent = currentStatement.substring(0, currentCharIndex - 1);
                    currentCharIndex--;
                    setTimeout(typeWriter, 50); // Deleting speed (faster)
                } else {
                    // Move to next statement
                    isTyping = true;
                    currentStatementIndex = (currentStatementIndex + 1) % statements.length;
                    setTimeout(typeWriter, 300); // Pause before typing next
                }
            }
        }
        
        // Set initial content to first complete sentence
        typewriterElement.textContent = statements[0];
        
        // Start the typewriter effect with a longer delay to show complete sentence first
        setTimeout(typeWriter, 2000);
    }

    /**
     * Case Studies Carousel
     * Horizontal scrolling carousel with navigation controls and drag functionality
     */
    function initCaseStudiesCarousel() {
        const track = document.getElementById('caseStudiesTrack');
        const prevBtn = document.getElementById('casePrevBtn');
        const nextBtn = document.getElementById('caseNextBtn');
        const tabs = document.querySelectorAll('.tab'); // Keep for potential future use
        const carousel = document.querySelector('.case-studies-carousel');
        
        if (!track || !prevBtn || !nextBtn || !carousel) return;
        
        let currentIndex = 0;
        const cardWidth = 360; // Width of each card
        const gap = 40; // Gap between cards
        const slideWidth = cardWidth + gap;
        const cardsPerView = 3; // Number of cards visible at once
        
        // Drag functionality variables
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationId = null;
        let initialMousePos = 0;
        let hasDragged = false;
        
        // Get total number of cards
        const totalCards = track.children.length;
        const maxIndex = Math.max(0, totalCards - cardsPerView);
        
        function updateCarousel(animate = true) {
            const translateX = -(currentIndex * slideWidth);
            
            if (animate) {
                track.style.transition = 'transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            } else {
                track.style.transition = 'none';
            }
            
            track.style.transform = `translateX(${translateX}px)`;
            currentTranslate = translateX;
            prevTranslate = translateX;
            
            // Update button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;
        }
        
        function setSliderPosition() {
            track.style.transform = `translateX(${currentTranslate}px)`;
        }
        
        function animation() {
            setSliderPosition();
            if (isDragging) requestAnimationFrame(animation);
        }
        
        function setPositionByIndex() {
            currentTranslate = currentIndex * -slideWidth;
            prevTranslate = currentTranslate;
            setSliderPosition();
        }
        
        // Touch/Mouse events for dragging
        function dragStart(e) {
            if (e.type === 'touchstart') {
                startPos = e.touches[0].clientX;
            } else {
                startPos = e.clientX;
                e.preventDefault();
            }
            
            initialMousePos = startPos;
            isDragging = true;
            hasDragged = false;
            animationId = requestAnimationFrame(animation);
            track.style.cursor = 'grabbing';
            track.style.transition = 'none';
        }
        
        function dragMove(e) {
            if (!isDragging) return;
            
            const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const diff = currentPosition - startPos;
            
            // Set dragged flag if movement is more than 5px
            if (Math.abs(diff) > 5) {
                hasDragged = true;
            }
            
            currentTranslate = prevTranslate + diff;
            
            // Remove hard boundaries - allow free movement with very gentle resistance
            const maxTranslate = 0;
            const minTranslate = -(maxIndex * slideWidth);
            
            if (currentTranslate > maxTranslate) {
                // Very gentle resistance when dragging right (left to right)
                currentTranslate = maxTranslate + (currentTranslate - maxTranslate) * 0.2;
            } else if (currentTranslate < minTranslate) {
                // Very gentle resistance when dragging left (right to left)
                currentTranslate = minTranslate + (currentTranslate - minTranslate) * 0.2;
            }
        }
        
        function dragEnd(e) {
            if (!isDragging) return;
            
            isDragging = false;
            cancelAnimationFrame(animationId);
            track.style.cursor = 'grab';
            
            const movedBy = currentTranslate - prevTranslate;
            const threshold = slideWidth * 0.2; // Slightly higher threshold for more intentional swiping
            
            // Determine if we should snap to next/previous slide
            if (Math.abs(movedBy) > threshold) {
                // Moving right (left to right drag) - go to previous slide
                if (movedBy > 0 && currentIndex > 0) {
                    currentIndex--;
                } 
                // Moving left (right to left drag) - go to next slide
                else if (movedBy < 0 && currentIndex < maxIndex) {
                    currentIndex++;
                }
            }
            
            // Ensure we stay within bounds
            currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
            
            // Animate to the final position with smoother easing
            track.style.transition = 'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            updateCarousel(true);
        }
        
        // Add event listeners for dragging
        // Mouse events
        track.addEventListener('mousedown', dragStart);
        track.addEventListener('mousemove', dragMove);
        track.addEventListener('mouseup', dragEnd);
        track.addEventListener('mouseleave', dragEnd);
        
        // Touch events
        track.addEventListener('touchstart', dragStart, { passive: false });
        track.addEventListener('touchmove', dragMove, { passive: false });
        track.addEventListener('touchend', dragEnd);
        
        // Prevent context menu and selection
        track.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
        
        track.addEventListener('selectstart', function(e) {
            e.preventDefault();
        });
        
        // Prevent card clicks when dragging
        track.addEventListener('click', function(e) {
            if (hasDragged) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }, true);
        
        // Prevent link clicks within cards when dragging
        const cardLinks = track.querySelectorAll('.case-link');
        cardLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                if (hasDragged) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            });
        });
        
        // Set initial cursor
        track.style.cursor = 'grab';
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        // Tab functionality removed - keeping this block commented for potential future use
        // tabs.forEach(function(tab) {
        //     tab.addEventListener('click', function() {
        //         // Remove active class from all tabs
        //         tabs.forEach(t => t.classList.remove('active'));
        //         // Add active class to clicked tab
        //         this.classList.add('active');
        //         
        //         // Reset carousel to beginning when switching tabs
        //         currentIndex = 0;
        //         updateCarousel();
        //     });
        // });
        
        // Initialize carousel
        updateCarousel();
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                updateCarousel();
            }, 250);
        });
    }

    /**
     * Back to Top Button
     * Shows/hides button based on scroll position and handles smooth scroll to top
     */
    function initBackToTop() {
        const backToTopButton = document.getElementById('backToTop');
        if (!backToTopButton) return;
        
        let lastScrollTop = 0;
        let ticking = false;
        
        // Show/hide button based on scroll direction and position
        function toggleBackToTopButton() {
            const scrolled = window.scrollY || document.documentElement.scrollTop;
            const isScrollingUp = scrolled < lastScrollTop;
            
            // Only show if:
            // 1. User has scrolled down at least 300px (past hero section)
            // 2. User is currently scrolling UP
            if (scrolled > 300 && isScrollingUp) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
            
            lastScrollTop = scrolled <= 0 ? 0 : scrolled; // For mobile compatibility
            ticking = false;
        }
        
        // Throttle scroll events for better performance
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(toggleBackToTopButton);
                ticking = true;
            }
        }
        
        // Smooth scroll to top
        function scrollToTop(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Event listeners
        window.addEventListener('scroll', requestTick);
        backToTopButton.addEventListener('click', scrollToTop);
        
        // Initial check - ensure button starts hidden
        backToTopButton.classList.remove('visible');
    }

    /**
     * FAQs Accordion
     * Handles expanding/collapsing FAQ items with smooth animations
     */
    function initFAQs() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;
        
        faqItems.forEach(function(item) {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (!question || !answer) return;
            
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        });
    }

    /**
     * Hero Title Animation with GSAP and SplitText
     * Creates a mask reveal animation with staggered words on page load
     */
    function initHeroTitleAnimation() {
        // Add a delay to ensure GSAP libs are loaded
        setTimeout(function() {
            // Check if GSAP and SplitText are available
            if (typeof gsap === 'undefined' || typeof SplitText === 'undefined') {
                // Fallback - just show the text normally
                const heroTitle = document.querySelector('.hero-title');
                if (heroTitle) {
                    heroTitle.style.opacity = '1';
                }
                return;
            }

            const heroTitle = document.querySelector('.hero-title');
            if (!heroTitle) return;

            // Split text into words and characters using SplitText
            const splitText = new SplitText(heroTitle, {
                type: "words,chars",
                wordsClass: "word",
                charsClass: "char"
            });

            // Add class to enable CSS hiding
            heroTitle.classList.add('split-ready');

            // Set initial state for characters
            gsap.set(".hero-title .char", {
                y: "100%",
                opacity: 0
            });

            // Create timeline for animation
            const tl = gsap.timeline({ delay: 0.5 });

            // Animate characters with stagger
            tl.to(".hero-title .char", {
                y: "0%",
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                stagger: {
                    amount: 1.2,
                    from: "start"
                }
            });

        }, 100); // Wait 100ms for scripts to load
    }

    /**
     * Intro Section Animation with GSAP and ScrollTrigger
     * Creates staggered animations triggered when elements come into view
     */
    function initIntroAnimation() {
        // Add a delay to ensure GSAP libs are loaded
        setTimeout(function() {
            // Check if GSAP and ScrollTrigger are available
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
                console.log('GSAP or ScrollTrigger not loaded, skipping intro animation');
                return;
            }

            gsap.registerPlugin(ScrollTrigger);

            const introSection = document.querySelector('.intro-section, .service-second-point');
            if (!introSection) return;

            // Animate intro title with SplitText if available
            const introTitle = introSection.querySelector('.intro-title');
            if (introTitle) {
                if (typeof SplitText !== 'undefined') {
                    // Split text into characters
                    const splitText = new SplitText(introTitle, {
                        type: "words,chars",
                        wordsClass: "word",
                        charsClass: "char"
                    });

                    introTitle.classList.add('split-ready');

                    // Animate characters with scroll trigger
                    gsap.fromTo(".intro-title .char", 
                        {
                            y: "100%",
                            opacity: 0
                        },
                        {
                            y: "0%",
                            opacity: 1,
                            duration: 0.8,
                            ease: "power3.out",
                            stagger: {
                                amount: 0.8,
                                from: "start"
                            },
                            scrollTrigger: {
                                trigger: introTitle,
                                start: "top 80%",
                                end: "bottom -20%",
                                toggleActions: "play none none reset"
                            }
                        }
                    );
                } else {
                    // Fallback simple animation
                    gsap.fromTo(introTitle, 
                        { opacity: 0, y: 30 },
                        { 
                            opacity: 1, 
                            y: 0, 
                            duration: 1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: introTitle,
                                start: "top 80%",
                                end: "bottom -20%",
                                toggleActions: "play none none reset"
                            }
                        }
                    );
                }
            }

            // Animate other intro elements
            const animateElements = introSection.querySelectorAll('[data-animate]');
            let statsTimeline;
            
            animateElements.forEach(function(element, index) {
                if (element.classList.contains('intro-stats')) {
                    // Create timeline for stats that will trigger CTA
                    statsTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: element,
                            start: "top 80%",
                            end: "bottom -100%",
                            toggleActions: "play none none reset"
                        }
                    });
                    
                    statsTimeline.fromTo(element,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power3.out"
                        }
                    );
                    
                    // Animate CTA at the same time
                    const ctaElement = introSection.querySelector('.intro-cta[data-animate]');
                    if (ctaElement) {
                        statsTimeline.fromTo(ctaElement,
                            { opacity: 0, y: 30 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.8,
                                ease: "power3.out"
                            },
                            "<" // Start at the same time as stats
                        );
                    }
                } else if (element.classList.contains('intro-cta')) {
                    // Animate CTA independently if no stats are present
                    gsap.fromTo(element,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power3.out",
                            delay: index * 0.1,
                            scrollTrigger: {
                                trigger: element,
                                start: "top 80%",
                                toggleActions: "play none none none"
                            }
                        }
                    );
                } else {
                    // Regular animation for other elements
                    gsap.fromTo(element,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power3.out",
                            delay: index * 0.1,
                            scrollTrigger: {
                                trigger: element,
                                start: "top 80%",
                                toggleActions: "play none none none"
                            }
                        }
                    );
                }
            });

        }, 100);
    }

    /**
     * Case Studies Section Animation with GSAP and ScrollTrigger
     * Creates staggered animations for section elements and cards
     */
    function initCaseStudiesAnimation() {
        // Add a delay to ensure GSAP libs are loaded
        setTimeout(function() {
            // Check if GSAP and ScrollTrigger are available
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
                console.log('GSAP or ScrollTrigger not loaded, skipping case studies animation');
                return;
            }

            gsap.registerPlugin(ScrollTrigger);

            const caseStudiesSection = document.querySelector('.case-studies-new');
            if (!caseStudiesSection) return;

            // Animate section header and description
            const animateElements = caseStudiesSection.querySelectorAll('[data-animate]');
            let cardsTimeline;
            
            animateElements.forEach(function(element, index) {
                if (element.classList.contains('case-studies-nav')) {
                    // Skip nav controls, animate with cards instead
                    return;
                } else {
                    // Regular animation for header and description
                    gsap.fromTo(element,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power3.out",
                            delay: index * 0.1,
                            scrollTrigger: {
                                trigger: element,
                                start: "top 80%",
                                toggleActions: "play none none none"
                            }
                        }
                    );
                }
            });

            // Animate case study cards with stagger
            const caseCards = caseStudiesSection.querySelectorAll('.case-card');
            if (caseCards.length > 0) {
                // Create timeline for cards and nav controls
                cardsTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: caseStudiesSection.querySelector('.case-studies-track'),
                        start: "top 70%",
                        toggleActions: "play none none reset"
                    }
                });

                // Animate cards with stagger
                cardsTimeline.fromTo(caseCards,
                    { 
                        opacity: 0, 
                        y: 50, 
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: {
                            amount: 1.2,
                            from: "start"
                        }
                    }
                );

                // Animate nav controls at the same time
                const navControls = caseStudiesSection.querySelector('.case-studies-nav');
                if (navControls) {
                    cardsTimeline.fromTo(navControls,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power3.out"
                        },
                        "<" // Start at the same time as cards
                    );
                }
            }

        }, 100);
    }

    /**
     * Initialize Industries Section Animation
     * Uses global animation classes for consistent behavior
     */
    function initIndustriesAnimation() {
        // Check if GSAP and required plugins are loaded
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('Industries Animation: GSAP or ScrollTrigger not loaded');
            return;
        }

        // Wait for page to settle
        setTimeout(function() {
            const industriesSections = document.querySelectorAll('.industries-new, .industries-extra, .industry-services');
            if (industriesSections.length === 0) {
                console.log('Industries Animation: No sections found');
                return;
            }
            console.log('Industries Animation: Found', industriesSections.length, 'sections');
            
            industriesSections.forEach(function(industriesSection, index) {
                console.log('Animating section', index + 1, ':', industriesSection.className);

            // Animate all data-animate elements except the title (which gets special treatment)
            const animatedElements = industriesSection.querySelectorAll('[data-animate]:not(.industries-title)');
            animatedElements.forEach(element => {
                gsap.fromTo(element,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 80%",
                            end: "bottom -100%",
                            toggleActions: "play none none reset"
                        }
                    }
                );
            });

            // Industries Title - First make it visible, then animate
            const industriesTitle = industriesSection.querySelector('.industries-title[data-animate]');
            if (industriesTitle) {
                // Force show the title immediately
                gsap.set(industriesTitle, { opacity: 1, transform: "none" });
                
                if (typeof SplitText !== 'undefined') {
                    // Split the text by words and characters
                    const splitTitle = new SplitText(industriesTitle, { 
                        type: "words,chars",
                        wordsClass: "word",
                        charsClass: "char"
                    });

                    // Add split-ready class for CSS styling
                    industriesTitle.classList.add('split-ready');

                    // Animate characters with scroll trigger
                    gsap.fromTo(splitTitle.chars, 
                        {
                            y: "100%",
                            opacity: 0
                        },
                        {
                            y: "0%",
                            opacity: 1,
                            duration: 0.8,
                            ease: "power3.out",
                            stagger: {
                                amount: 0.6,
                                from: "start"
                            },
                            scrollTrigger: {
                                trigger: industriesTitle,
                                start: "top 80%",
                                toggleActions: "play none none reset"
                            }
                        }
                    );
                } else {
                    // Fallback animation if SplitText is not available
                    gsap.fromTo(industriesTitle,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: industriesTitle,
                                start: "top 80%",
                                toggleActions: "play none none reset"
                            }
                        }
                    );
                }
            }

            // Animate industry items with stagger when list comes into view
            const industriesList = industriesSection.querySelector('.industries-list');
            const industryItems = industriesSection.querySelectorAll('.industry-item');
            if (industriesList && industryItems.length > 0) {
                gsap.fromTo(industryItems,
                    { 
                        opacity: 0, 
                        y: 50
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: {
                            amount: 0.8,
                            from: "start"
                        },
                        scrollTrigger: {
                            trigger: industriesList,
                            start: "top 70%",
                            toggleActions: "play none none reset"
                        }
                    }
                );
            }
            
            }); // Close forEach loop for multiple sections

        }, 100);
    }

    /**
     * Clean up empty paragraph tags in service-second-point section
     * Removes any empty <p> tags to prevent layout issues
     */
    function cleanupEmptyTags() {
        const serviceSection = document.querySelector('.service-second-point');
        if (!serviceSection) return;
        
        // Find all paragraph tags in the service section
        const paragraphs = serviceSection.querySelectorAll('p');
        
        paragraphs.forEach(function(p) {
            // Check if paragraph is empty (no text content or only whitespace)
            const textContent = p.textContent.trim();
            const innerHTML = p.innerHTML.trim();
            
            if (textContent === '' || innerHTML === '' || innerHTML === '&nbsp;') {
                p.remove();
            }
        });
    }

})();