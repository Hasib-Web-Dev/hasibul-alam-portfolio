// Global flag to track asset loading status
let pageLoaded = false;
window.addEventListener('load', () => {
    pageLoaded = true;
});

// Hardware-accelerated dynamic Preloader Runner (Cyberpunk Unix Terminal Style)
function runPreloader(durationMs, statusText, onComplete, autoFade = true) {
    const progressBar = document.getElementById('terminal-progress-bar');
    const percentText = document.getElementById('preloader-percent');
    const terminalBody = document.getElementById('terminal-body');
    const preloader = document.getElementById('preloader');
    
    if (!progressBar || !percentText || !preloader) {
        if (onComplete) onComplete();
        return;
    }

    progressBar.style.width = '0%';
    percentText.textContent = '0%';
    preloader.classList.remove('fade-out');

    if (terminalBody) {
        terminalBody.innerHTML = ''; // clear terminal output
    }

    const printedSteps = new Set();

    function addLine(text, type = '') {
        if (!terminalBody) return;
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        const prompt = document.createElement('span');
        prompt.className = 'terminal-prompt';
        prompt.textContent = '❯';
        
        const content = document.createElement('span');
        content.className = `terminal-text ${type}`;
        content.textContent = text;
        
        line.appendChild(prompt);
        line.appendChild(content);
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    let cursorLine = null;
    function updateCursorLine() {
        if (!terminalBody) return;
        if (cursorLine) cursorLine.remove();
        cursorLine = document.createElement('div');
        cursorLine.className = 'terminal-line';
        const prompt = document.createElement('span');
        prompt.className = 'terminal-prompt';
        prompt.textContent = '❯';
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        cursorLine.appendChild(prompt);
        cursorLine.appendChild(cursor);
        terminalBody.appendChild(cursorLine);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    let startTimestamp = null;
    
    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / durationMs, 1);
        const percent = Math.floor(progress * 100);

        progressBar.style.width = `${percent}%`;
        percentText.textContent = `${percent}%`;

        // Output lines dynamically depending on loading percentages
        if (statusText === 'INITIALIZING') {
            if (percent >= 0 && !printedSteps.has('step0')) {
                printedSteps.add('step0');
                addLine('sh hasibul_alam_os.sh --init', 'info');
                addLine('System: Hasibul Alam Portfolio OS v2.4.0');
                addLine('User: guest@client');
                updateCursorLine();
            }
            if (percent >= 12 && !printedSteps.has('step12')) {
                printedSteps.add('step12');
                addLine('Initializing memory allocation... OK', 'success');
                updateCursorLine();
            }
            if (percent >= 28 && !printedSteps.has('step28')) {
                printedSteps.add('step28');
                addLine('Loading CSS variables & layout tokens... OK', 'success');
                updateCursorLine();
            }
            if (percent >= 45 && !printedSteps.has('step45')) {
                printedSteps.add('step45');
                addLine('Mounting responsive flex grids... OK', 'success');
                updateCursorLine();
            }
            if (percent >= 62 && !printedSteps.has('step62')) {
                printedSteps.add('step62');
                addLine('Mapping interactive portfolio details... OK', 'success');
                updateCursorLine();
            }
            if (percent >= 78 && !printedSteps.has('step78')) {
                printedSteps.add('step78');
                addLine('Compiling 10 Vercel project cards... OK', 'success');
                updateCursorLine();
            }
            if (percent >= 92 && !printedSteps.has('step92')) {
                printedSteps.add('step92');
                addLine('Systems optimized. Booting core GUI...', 'info');
                updateCursorLine();
            }
        } else if (statusText.startsWith('LAUNCHING')) {
            const targetProj = statusText.replace('LAUNCHING', '').trim();
            if (percent >= 0 && !printedSteps.has('launch0')) {
                printedSteps.add('launch0');
                addLine(`sh hasibul_alam_os.sh --launch "${targetProj}"`, 'info');
                addLine(`Redirect: connecting to vercel secure cluster...`);
                updateCursorLine();
            }
            if (percent >= 25 && !printedSteps.has('launch25')) {
                printedSteps.add('launch25');
                addLine('Pinging vercel gateway server... 200 OK', 'success');
                updateCursorLine();
            }
            if (percent >= 55 && !printedSteps.has('launch55')) {
                printedSteps.add('launch55');
                addLine('Performing secure SSL & DNS handshake... OK', 'success');
                updateCursorLine();
            }
            if (percent >= 85 && !printedSteps.has('launch85')) {
                printedSteps.add('launch85');
                addLine('Redirect tunnel established. Fetching payload...', 'info');
                updateCursorLine();
            }
        } else {
            if (percent >= 0 && !printedSteps.has('gen0')) {
                printedSteps.add('gen0');
                addLine(statusText, 'info');
                updateCursorLine();
            }
        }

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            progressBar.style.width = '100%';
            percentText.textContent = '100%';
            if (statusText === 'INITIALIZING' && !printedSteps.has('step100')) {
                printedSteps.add('step100');
                addLine('GUI ready. Enjoy your stay!', 'success');
                if (cursorLine) cursorLine.remove();
            } else if (statusText.startsWith('LAUNCHING') && !printedSteps.has('launch100')) {
                printedSteps.add('launch100');
                addLine('Launching project. Redirecting...', 'success');
                if (cursorLine) cursorLine.remove();
            }
            
            if (autoFade) {
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    if (onComplete) onComplete();
                }, 400);
            } else {
                if (onComplete) onComplete();
            }
        }
    }
    
    requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // MOBILE NAVIGATION TOGGLE
    // ==========================================================================
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            const isOpen = nav.classList.contains('open');
            nav.classList.toggle('open');
            navToggle.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', !isOpen);
        });
    }

    // Close menu when clicking navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav && nav.classList.contains('open')) {
                nav.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ==========================================================================
    // UNIFIED OPTIMIZED SCROLL MANAGER (requestAnimationFrame & Passive Listeners)
    // ==========================================================================
    const scrollCallbacks = [];
    let isScrollPending = false;

    window.addEventListener('scroll', () => {
        if (!isScrollPending) {
            isScrollPending = true;
            requestAnimationFrame(() => {
                scrollCallbacks.forEach(cb => cb());
                isScrollPending = false;
            });
        }
    }, { passive: true });

    // Header scroll background shrink
    const header = document.querySelector('.header');
    if (header) {
        scrollCallbacks.push(() => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // SCROLL PROGRESS INDICATOR
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        scrollCallbacks.push(() => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            progressBar.style.width = scrolled + '%';
        });
    }

    // ACTIVE NAVIGATION LINKS ON SCROLL (NAV SPY)
    const sections = document.querySelectorAll('section[id]');
    function scrollActive() {
        const scrollY = (window.pageYOffset || document.documentElement.scrollTop) + 120; // offset for sticky header

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-list a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    scrollCallbacks.push(scrollActive);

    // ==========================================================================
    // ACADEMIC TIMELINE ACCORDION
    // ==========================================================================
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.parentElement;
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            
            // Close other accordion items
            accordionTriggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    const otherContent = otherTrigger.nextElementSibling;
                    if (otherContent) {
                        otherContent.style.maxHeight = null;
                    }
                }
            });

            // Toggle current item
            trigger.setAttribute('aria-expanded', !isExpanded);
            const content = trigger.nextElementSibling;
            
            if (content) {
                if (!isExpanded) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = null;
                }
            }
        });
    });

    // ==========================================================================
    // SKILLS LEVEL FILL ON SCROLL (INTERSECTION OBSERVER)


    // ==========================================================================
    // PROJECTS GALLERY FILTER
    // ==========================================================================
    // ==========================================================================
    // PROJECTS SWIPE CARD STACK ENGINE
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allCards = Array.from(document.querySelectorAll('.coverflow-card'));
    const prevBtn = document.getElementById('coverflow-prev-btn');
    const nextBtn = document.getElementById('coverflow-next-btn');

    let activeIndex = 0;
    
    // Drag Tracking variables
    const coverflowContainer = document.getElementById('projects-coverflow');
    let dragStartX = 0;
    let dragCurrentX = 0;
    let isCoverflowDragging = false;
    let dragOffset = 0;
    let coverflowDraggedTrigger = false;

    // Autoplay Engine (3-second dwell time, loops forward)
    let autoplayTimer = null;
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
            const activeButton = document.querySelector('.filter-btn.active');
            const activeFilter = activeButton ? activeButton.getAttribute('data-filter') : 'all';
            const count = allCards.filter(card => activeFilter === 'all' || card.getAttribute('data-category') === activeFilter).length;
            if (count > 1) {
                activeIndex = (activeIndex + 1) % count;
                arrangeCoverflow();
            }
        }, 3000);
    }
    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }
    function resetAutoplay() {
        startAutoplay();
    }

    // Transition function to show preloader screen on project card redirects
    function triggerPreloaderTransition(projectName, url) {
        stopAutoplay();
        // Run preloader over 1.5s with "LAUNCHING [PROJECT NAME]..." status, then open link
        runPreloader(1500, `LAUNCHING ${projectName}`, () => {
            window.open(url, '_blank', 'noopener,noreferrer');
            startAutoplay();
        });
    }

    function arrangeCoverflow(dragXOffset = 0) {
        const activeButton = document.querySelector('.filter-btn.active');
        const activeFilter = activeButton ? activeButton.getAttribute('data-filter') : 'all';
        
        // Filter cards matching the category
        const filteredCards = allCards.filter(card => {
            const category = card.getAttribute('data-category');
            if (activeFilter === 'all' || category === activeFilter) {
                card.style.display = 'flex';
                return true;
            } else {
                card.style.display = 'none';
                card.classList.remove('active');
                return false;
            }
        });

        const count = filteredCards.length;
        if (count === 0) return;

        // Maintain activeIndex within range
        if (activeIndex >= count) {
            activeIndex = count - 1;
        }
        if (activeIndex < 0) {
            activeIndex = 0;
        }

        const isMobile = window.innerWidth < 768;
        const activeWidth = isMobile ? 290 : 600;
        const activeHeight = isMobile ? 290 : 400;
        const restWidth = isMobile ? 120 : 200;
        const restHeight = isMobile ? 160 : 270;
        const gap = isMobile ? 15 : 30;

        const c1 = activeWidth / 2 + gap + restWidth / 2;
        const dragFraction = dragXOffset / c1;
        const pos = activeIndex - dragFraction;

        filteredCards.forEach((card, i) => {
            let rel = i - pos;
            // Infinite loop wrapping calculation
            if (rel > count / 2) rel -= count;
            if (rel < -count / 2) rel += count;

            const ar = Math.abs(rel);
            const visible = ar <= 4;
            const isActive = Math.abs(rel) < 0.5;

            // Transition: if dragging, disable transform transitions for raw responsive tracking
            if (isCoverflowDragging) {
                card.style.transition = 'opacity 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease';
            } else {
                card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease, width 0.5s cubic-bezier(0.25, 1, 0.5, 1), height 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-radius 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease';
            }

            if (isActive) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }

            if (visible) {
                card.style.opacity = ar <= 3 ? '1' : ar >= 4 ? '0' : (1 - (ar - 3)).toString();
                card.style.pointerEvents = 'auto';
                card.setAttribute('aria-hidden', 'false');
                
                const blend = Math.min(ar, 1);
                const w = activeWidth + (restWidth - activeWidth) * blend;
                const h = activeHeight + (restHeight - activeHeight) * blend;
                // Calculate radius: (2 / 20) * (min / 2) to prevent excessive oval clipping
                const r = (2 / 20) * (Math.min(w, h) / 2);

                const pitch = restWidth + gap;
                const mag = ar <= 1 ? ar * c1 : c1 + (ar - 1) * pitch;
                const tx = (rel < 0 ? -1 : 1) * mag;

                card.style.width = `${w}px`;
                card.style.height = `${h}px`;
                card.style.borderRadius = `${r}px`;
                card.style.transform = `translate(-50%, -50%) translateX(${tx}px)`;
                card.style.zIndex = Math.round(1000 - ar * 100).toString();
                
                // Allow clicking side cards to navigate, and active card to launch app
                card.onclick = (e) => {
                    // Ignore clicks if the user was dragging/swiping
                    if (coverflowDraggedTrigger) {
                        e.preventDefault();
                        return;
                    }
                    if (ar >= 0.5) {
                        activeIndex = i;
                        arrangeCoverflow();
                    } else {
                        // Center card click => trigger preloader transition
                        if (!e.target.closest('a')) {
                            const projectLink = card.querySelector('.project-link');
                            const titleElement = card.querySelector('.project-title');
                            if (projectLink) {
                                const projectName = titleElement ? titleElement.textContent : 'Project';
                                triggerPreloaderTransition(projectName, projectLink.href);
                            }
                        }
                    }
                };
            } else {
                card.style.opacity = '0';
                card.style.pointerEvents = 'none';
                card.setAttribute('aria-hidden', 'true');
                card.style.transform = 'translate(-50%, -50%) scale(0.4)';
                card.style.zIndex = '0';
                card.onclick = null;
            }
        });
    }

    // Pointer Drag Listeners for Coverflow
    if (coverflowContainer) {
        coverflowContainer.style.cursor = 'grab';
        
        coverflowContainer.addEventListener('pointerdown', (e) => {
            // Don't drag if clicking link or button
            if (e.target.closest('a') || e.target.closest('button')) return;
            
            stopAutoplay();
            isCoverflowDragging = true;
            coverflowContainer.setPointerCapture(e.pointerId);
            coverflowContainer.style.cursor = 'grabbing';
            dragStartX = e.clientX;
            dragCurrentX = e.clientX;
            dragOffset = 0;
            coverflowDraggedTrigger = false;
        });

        coverflowContainer.addEventListener('pointermove', (e) => {
            if (!isCoverflowDragging) return;
            
            dragOffset = e.clientX - dragStartX;
            dragCurrentX = e.clientX;
            
            if (Math.abs(dragOffset) > 10) {
                coverflowDraggedTrigger = true;
            }
            
            arrangeCoverflow(dragOffset);
        });

        coverflowContainer.addEventListener('pointerup', (e) => {
            if (!isCoverflowDragging) return;
            isCoverflowDragging = false;
            coverflowContainer.releasePointerCapture(e.pointerId);
            coverflowContainer.style.cursor = 'grab';
            
            const threshold = 60; // swipe threshold in pixels
            const activeButton = document.querySelector('.filter-btn.active');
            const activeFilter = activeButton ? activeButton.getAttribute('data-filter') : 'all';
            const count = allCards.filter(card => activeFilter === 'all' || card.getAttribute('data-category') === activeFilter).length;
            
            if (count > 1) {
                if (dragOffset < -threshold) {
                    // Swiped left => next index
                    activeIndex = (activeIndex + 1) % count;
                } else if (dragOffset > threshold) {
                    // Swiped right => prev index
                    activeIndex = (activeIndex - 1 + count) % count;
                }
            }
            
            arrangeCoverflow();
            startAutoplay();
            
            if (coverflowDraggedTrigger) {
                // Intercept accidental link clicks immediately post drag
                const clickPrevent = (ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                };
                window.addEventListener('click', clickPrevent, { capture: true, once: true });
                setTimeout(() => {
                    window.removeEventListener('click', clickPrevent, { capture: true });
                }, 50);
            }
        });

        coverflowContainer.addEventListener('pointercancel', (e) => {
            if (!isCoverflowDragging) return;
            isCoverflowDragging = false;
            coverflowContainer.releasePointerCapture(e.pointerId);
            coverflowContainer.style.cursor = 'grab';
            arrangeCoverflow();
            startAutoplay();
        });
    }

    // Arrow Buttons Interaction
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const activeButton = document.querySelector('.filter-btn.active');
            const activeFilter = activeButton ? activeButton.getAttribute('data-filter') : 'all';
            const count = allCards.filter(card => activeFilter === 'all' || card.getAttribute('data-category') === activeFilter).length;
            if (count > 1) {
                activeIndex = (activeIndex + 1) % count;
                arrangeCoverflow();
                resetAutoplay();
            }
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const activeButton = document.querySelector('.filter-btn.active');
            const activeFilter = activeButton ? activeButton.getAttribute('data-filter') : 'all';
            const count = allCards.filter(card => activeFilter === 'all' || card.getAttribute('data-category') === activeFilter).length;
            if (count > 1) {
                activeIndex = (activeIndex - 1 + count) % count;
                arrangeCoverflow();
                resetAutoplay();
            }
        });
    }

    // Filter Buttons Interaction
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            activeIndex = 0; // reset to first slide on filter change
            arrangeCoverflow();
            resetAutoplay();
        });
    });



    // Global keyboard arrow navigation
    window.addEventListener('keydown', (e) => {
        // Prevent trigger while typing in contact form fields
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
        
        const activeButton = document.querySelector('.filter-btn.active');
        const activeFilter = activeButton ? activeButton.getAttribute('data-filter') : 'all';
        const count = allCards.filter(card => activeFilter === 'all' || card.getAttribute('data-category') === activeFilter).length;
        if (count <= 1) return;

        if (e.key === 'ArrowRight') {
            e.preventDefault();
            activeIndex = (activeIndex + 1) % count;
            arrangeCoverflow();
            resetAutoplay();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            activeIndex = (activeIndex - 1 + count) % count;
            arrangeCoverflow();
            resetAutoplay();
        }
    });

    // Intercept project link clicks for preloader transition
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const card = link.closest('.coverflow-card');
            const titleElement = card ? card.querySelector('.project-title') : null;
            const projectName = titleElement ? titleElement.textContent : 'Project';
            triggerPreloaderTransition(projectName, link.href);
        });
    });

    // Start page loader immediately (2-second dwell animation)
    runPreloader(2000, 'INITIALIZING', () => {
        const preloader = document.getElementById('preloader');
        const statusLabel = document.getElementById('preloader-status');
        
        // Wait for page assets to finish loading before fading out
        if (!pageLoaded) {
            if (statusLabel) statusLabel.textContent = 'FINISHING';
            const handleFinish = () => {
                setTimeout(() => {
                    if (preloader) preloader.classList.add('fade-out');
                }, 300);
                window.removeEventListener('load', handleFinish);
            };
            window.addEventListener('load', handleFinish);
            
            // Failsafe backup load fallback (max 2 seconds extra wait)
            setTimeout(() => {
                if (preloader && !preloader.classList.contains('fade-out')) {
                    preloader.classList.add('fade-out');
                }
            }, 2000);
        } else {
            if (preloader) preloader.classList.add('fade-out');
        }
    }, false); // Pass false to prevent runPreloader from fading out automatically before we check pageLoaded

    // Initialize Coverflow layout and autoplay on page load
    arrangeCoverflow();
    startAutoplay();

    // ==========================================================================
    // CERTIFICATE LIGHTBOX MODAL
    // ==========================================================================
    // ==========================================================================
    // 3D ROUND CAROUSEL ENGINE (Credentials)
    // ==========================================================================
    const carouselStage = document.querySelector('.carousel-3d-stage');
    const carouselRing = document.getElementById('carousel-ring');
    const carouselCards = Array.from(document.querySelectorAll('.carousel-3d-card'));

    let carouselDragged = false;
    let radius = 300; // fallback radius

    if (carouselStage && carouselRing && carouselCards.length > 0) {
        const count = carouselCards.length;
        const angle = 360 / count;
        const spacing = 2.8; // Spacing factor
        let rotY = 0;
        let velocity = 0;
        let lastTime = 0;
        let isDragging = false;
        let startX = 0;
        let lastX = 0;
        let dragDistance = 0;

        // Auto-rotation speed: speed = 4
        const speed = 4;
        const degPerSec = speed * 6; // default rotation speed

        function getResponsiveWidth() {
            return window.innerWidth < 768 ? 240 : 320;
        }

        function updateDimensions() {
            const imageWidth = getResponsiveWidth();
            const factor = 1 + spacing * 0.15;
            radius = (imageWidth * factor) / (2 * Math.tan(Math.PI / count));

            // Set 3D transformations for each card face
            carouselCards.forEach((card, i) => {
                card.style.transform = `rotateY(${i * angle}deg) translateZ(${radius}px)`;
            });
            
            // Re-apply ring rotation
            carouselRing.style.transform = `translateZ(${-radius}px) rotateY(${rotY}deg)`;
        }

        // Pointer Drag Events
        carouselStage.addEventListener('pointerdown', (e) => {
            if (e.button && e.button !== 0) return;
            isDragging = true;
            carouselStage.setPointerCapture(e.pointerId);
            startX = e.clientX;
            lastX = e.clientX;
            velocity = 0;
            dragDistance = 0;
        });

        carouselStage.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - lastX;
            lastX = e.clientX;
            dragDistance += Math.abs(e.clientX - startX);
            
            const sensitivity = 0.3 * 4.5;
            rotY += dx * sensitivity;
            velocity = dx * sensitivity * 60; // calculate drag velocity
            
            carouselRing.style.transform = `translateZ(${-radius}px) rotateY(${rotY}deg)`;
        });

        carouselStage.addEventListener('pointerup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            carouselStage.releasePointerCapture(e.pointerId);
            
            if (dragDistance > 10) {
                carouselDragged = true;
                setTimeout(() => { carouselDragged = false; }, 50);
            } else {
                carouselDragged = false;
            }
        });

        carouselStage.addEventListener('pointercancel', (e) => {
            if (!isDragging) return;
            isDragging = false;
            carouselStage.releasePointerCapture(e.pointerId);
        });

        // Frame loops for inertia and auto-rotate
        function drawCarousel(now) {
            requestAnimationFrame(drawCarousel);
            
            const dt = lastTime ? (now - lastTime) / 1000 : 0;
            lastTime = now;
            const f = Math.min(dt, 0.1);

            if (!isDragging) {
                if (Math.abs(velocity) > 0.05) {
                    rotY += velocity * f;
                    velocity *= 0.94; // friction damping
                } else {
                    rotY += degPerSec * f; // automatic continuous spin
                }
                carouselRing.style.transform = `translateZ(${-radius}px) rotateY(${rotY}deg)`;
            }
        }

        window.addEventListener('resize', updateDimensions);
        
        // Initialize dimensions and trigger layout loop
        updateDimensions();
        requestAnimationFrame(drawCarousel);
    }

    // ==========================================================================
    // CERTIFICATE LIGHTBOX MODAL
    // ==========================================================================
    const certCards = document.querySelectorAll('.cert-card');
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.querySelector('.modal-close');

    if (modal && modalImg && modalCaption) {
        certCards.forEach(card => {
            card.style.cursor = 'pointer';
            
            card.addEventListener('click', (e) => {
                // If user was dragging/spinning the carousel, ignore expansion trigger
                if (carouselDragged) {
                    carouselDragged = false;
                    return;
                }
                
                const imgPath = card.getAttribute('data-image');
                const titleEl = card.querySelector('h4');
                const badgeEl = card.querySelector('.cert-badge') || card.querySelector('.card-info-badge');
                
                const titleText = titleEl ? titleEl.textContent : (badgeEl ? badgeEl.textContent : "Credential");
                const orgText = badgeEl ? badgeEl.textContent : "";

                if (imgPath) {
                    modalImg.src = imgPath;
                    modalCaption.textContent = orgText ? `${titleText} — ${orgText}` : titleText;
                    modal.classList.add('active');
                    modal.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden'; // Lock scroll background
                }
            });
        });

        // Close functions
        const closeModal = () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Unlock scroll background
            setTimeout(() => {
                modalImg.src = '';
            }, 300);
        };

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-content-wrapper')) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // ==========================================================================
    // INTERACTIVE PRICE ESTIMATOR
    // ==========================================================================
    const calcInputs = document.querySelectorAll('.calc-input');
    const estPriceEl = document.getElementById('est-price');
    const estTimeEl = document.getElementById('est-time');

    let currentPriceVal = 0;
    let currentTimeVal = 0;

    function animateValue(el, start, end, duration, prefix = '', suffix = '') {
        if (start === end) return;
        const animIdKey = 'animFrameId';
        if (el.dataset[animIdKey]) {
            cancelAnimationFrame(parseInt(el.dataset[animIdKey]));
        }

        const startTime = performance.now();

        function update(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            // EaseOut Quad easing for organic slowing feel near target
            const easedProgress = progress * (2 - progress);
            const value = Math.round(easedProgress * (end - start) + start);
            el.textContent = `${prefix}${value}${suffix}`;

            if (progress < 1) {
                el.dataset[animIdKey] = requestAnimationFrame(update);
            } else {
                delete el.dataset[animIdKey];
            }
        }
        el.dataset[animIdKey] = requestAnimationFrame(update);
    }

    function calculateEstimate() {
        let totalPrice = 0;
        let totalTime = 0;

        calcInputs.forEach(input => {
            if (input.checked) {
                totalPrice += parseInt(input.getAttribute('data-price')) || 0;
                totalTime += parseInt(input.getAttribute('data-time')) || 0;
            }
        });

        if (estPriceEl) {
            animateValue(estPriceEl, currentPriceVal, totalPrice, 400, '$');
            currentPriceVal = totalPrice;
        }
        if (estTimeEl) {
            animateValue(estTimeEl, currentTimeVal, totalTime, 400, '', ' Days');
            currentTimeVal = totalTime;
        }
    }

    calcInputs.forEach(input => {
        input.addEventListener('change', calculateEstimate);
    });

    // Run once on load to show initial values ($0, 0 Days)
    calculateEstimate();

    // ==========================================================================
    // FAQ ACCORDION
    // ==========================================================================
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            
            // Close other FAQ items
            faqTriggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    const otherContent = otherTrigger.nextElementSibling;
                    if (otherContent) {
                        otherContent.style.maxHeight = null;
                    }
                }
            });

            // Toggle current
            trigger.setAttribute('aria-expanded', !isExpanded);
            const content = trigger.nextElementSibling;
            
            if (content) {
                if (!isExpanded) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = null;
                }
            }
        });
    });

    // ==========================================================================
    // INTERACTIVE AJAX CONTACT FORM
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const successAlert = document.getElementById('form-status-success');
    const errorAlert = document.getElementById('form-status-error');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide previous alerts
            if (successAlert) successAlert.style.display = 'none';
            if (errorAlert) errorAlert.style.display = 'none';

            // Show loading state
            submitBtn.disabled = true;
            if (btnText) btnText.textContent = 'Sending...';

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                submitBtn.disabled = false;
                if (btnText) btnText.textContent = 'Send Message';
                
                if (response.ok) {
                    if (successAlert) successAlert.style.display = 'flex';
                    contactForm.reset();
                } else {
                    if (errorAlert) errorAlert.style.display = 'flex';
                }
            })
            .catch(error => {
                submitBtn.disabled = false;
                if (btnText) btnText.textContent = 'Send Message';
                if (errorAlert) errorAlert.style.display = 'flex';
            });
        });
    }



    // ==========================================================================
    // ABOUT SECTION SCROLLSPY
    // ==========================================================================
    const spySections = document.querySelectorAll('.about-scrollspy-section');
    const spyLinks = document.querySelectorAll('.scrollspy-link');

    if (spySections.length > 0 && spyLinks.length > 0) {
        // Offset activation zone by sticky header height + some buffer
        const observerOptions = {
            root: null,
            rootMargin: '-120px 0px -50% 0px', // triggers when section is in top half
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    spyLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${id}`) {
                            link.setAttribute('aria-current', 'location');
                        } else {
                            link.removeAttribute('aria-current');
                        }
                    });
                }
            });
        }, observerOptions);

        spySections.forEach(section => {
            observer.observe(section);
        });

        // Smooth scroll to targets with header offset on spy link clicks
        spyLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetEl = document.querySelector(targetId);
                
                if (targetEl) {
                    const headerOffset = 90;
                    const elementPosition = targetEl.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ==========================================================================
    // INTERACTIVE SCROLL-LINKED TIMELINE PROGRESS
    // ==========================================================================
    const timeline = document.querySelector('.timeline');
    const progressLine = document.querySelector('.timeline-progress-line');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timeline && progressLine && timelineItems.length > 0) {
        function updateTimelineProgress() {
            const timelineRect = timeline.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Set trigger point at 60% viewport height
            const triggerPoint = viewportHeight * 0.6;
            
            // Scrolled distance from trigger line to the top of the timeline
            const scrolled = triggerPoint - timelineRect.top;
            const timelineHeight = timelineRect.height;
            
            let percent = scrolled / timelineHeight;
            percent = Math.max(0, Math.min(1, percent)); // clamp to [0, 1]
            
            progressLine.style.transform = `scaleY(${percent})`;
            
            // Highlight dots as the active line reaches them
            const progressReached = timelineHeight * percent;
            
            timelineItems.forEach(item => {
                const dot = item.querySelector('.timeline-dot');
                if (dot) {
                    // offsetTop of item relative to the timeline container
                    const itemTop = item.offsetTop;
                    
                    if (progressReached >= itemTop - 10) {
                        dot.classList.add('active');
                        item.classList.add('scroll-active');
                    } else {
                        dot.classList.remove('active');
                        item.classList.remove('scroll-active');
                    }
                }
            });
        }

        scrollCallbacks.push(updateTimelineProgress);
        window.addEventListener('resize', updateTimelineProgress);
        updateTimelineProgress(); // trigger on page load
    }

    // ==========================================================================
    // CUSTOM NEON CURSOR INTERACTIVE LOGIC
    // ==========================================================================
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('custom-cursor-dot');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let hasMoved = false;

    let lastParticleX = 0;
    let lastParticleY = 0;

    function spawnParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        
        // Random size between 4px and 8px
        const size = Math.random() * 4 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Random speed & angle
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        document.body.appendChild(particle);
        
        let opacity = 0.8;
        let scale = 1.0;
        let px = x;
        let py = y;
        
        function animate() {
            opacity -= 0.035;
            scale -= 0.025;
            px += vx;
            py += vy;
            
            particle.style.opacity = opacity;
            particle.style.transform = `translate(-50%, -50%) scale(${scale})`;
            particle.style.left = `${px}px`;
            particle.style.top = `${py}px`;
            
            if (opacity <= 0 || scale <= 0) {
                particle.remove();
            } else {
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate);
    }

    // Track mouse move coordinates
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!hasMoved) {
            hasMoved = true;
            if (cursor) cursor.style.opacity = '1';
            if (cursorDot) cursorDot.style.opacity = '1';
            cursorX = mouseX;
            cursorY = mouseY;
        }

        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }

        // Spawn a trail particle if mouse has moved more than 16px
        const dist = Math.hypot(mouseX - lastParticleX, mouseY - lastParticleY);
        if (dist > 16) {
            spawnParticle(mouseX, mouseY);
            lastParticleX = mouseX;
            lastParticleY = mouseY;
        }
    });

    // Hide custom cursor when mouse leaves the document window
    document.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.opacity = '0';
        if (cursorDot) cursorDot.style.opacity = '0';
        hasMoved = false;
    });

    // Animate trailing cursor with damping lerp
    function animateCursor() {
        if (hasMoved) {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.15;
            cursorY += dy * 0.15;
            
            if (cursor) {
                cursor.style.left = `${cursorX}px`;
                cursor.style.top = `${cursorY}px`;
            }
        }
        requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Hover interactions for clickable/interactive items
    function setupCursorHovers() {
        const hoverTargets = document.querySelectorAll('a, button, [role="button"], .coverflow-card, .carousel-3d-card, .accordion-header, .filter-btn');
        hoverTargets.forEach(target => {
            // Remove first to avoid duplicated events
            target.removeEventListener('mouseenter', addHoverClass);
            target.removeEventListener('mouseleave', removeHoverClass);
            
            target.addEventListener('mouseenter', addHoverClass);
            target.addEventListener('mouseleave', removeHoverClass);
        });
    }

    function addHoverClass() {
        if (cursor) cursor.classList.add('hover');
        if (cursorDot) cursorDot.classList.add('hover');
    }

    function removeHoverClass() {
        if (cursor) cursor.classList.remove('hover');
        if (cursorDot) cursorDot.classList.remove('hover');
    }

    setupCursorHovers();

    // Re-bind hover states when project filters change
    const filterButtonsForCursor = document.querySelectorAll('.filter-btn');
    filterButtonsForCursor.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(setupCursorHovers, 600); // Wait for coverflow transition to bind new elements
        });
    });

    // Click mouse down shrink/expand states
    window.addEventListener('mousedown', () => {
        if (cursor) cursor.classList.add('click');
        if (cursorDot) cursorDot.classList.add('click');
    });
    window.addEventListener('mouseup', () => {
        if (cursor) cursor.classList.remove('click');
        if (cursorDot) cursorDot.classList.remove('click');
    });


    // ==========================================================================
    // FLOATING LIVE STATS VISITORS & VIEWS COUNTER
    // ==========================================================================
    const activeVisitorsVal = document.getElementById('active-visitors-val');
    const totalViewsVal = document.getElementById('total-views-val');

    // Fluctuating active users counter (random between 3 and 8)
    function updateActiveVisitors() {
        if (!activeVisitorsVal) return;
        const currentActive = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
        activeVisitorsVal.textContent = currentActive.toString();
    }
    setInterval(updateActiveVisitors, 5000); // Update every 5 seconds
    updateActiveVisitors(); // Initial run

    // Fetch and display total views from counter api with localStorage backup
    async function initViewsCounter() {
        if (!totalViewsVal) return;

        // Step 1: Read localStorage backup view count, increment it, and show immediately
        let backupCount = parseInt(localStorage.getItem('portfolio_backup_views') || '4129');
        backupCount += 1;
        localStorage.setItem('portfolio_backup_views', backupCount.toString());
        totalViewsVal.textContent = backupCount.toLocaleString();

        // Step 2: Fetch increment from public counterapi database
        try {
            const res = await fetch('https://api.counterapi.dev/v1/hasibulalam_portfolio/views/up');
            if (res.ok) {
                const data = await res.json();
                if (data && typeof data.count === 'number') {
                    totalViewsVal.textContent = data.count.toLocaleString();
                    localStorage.setItem('portfolio_backup_views', data.count.toString());
                }
            }
        } catch (err) {
            console.log('Visitor Counter API offline/blocked. Using local backup:', err);
        }
    }
    initViewsCounter();

    // ==========================================================================
    // KLARNA-STYLE PROCESS CAROUSEL (VANILLA JS VERSION OF ORIGINKIT COMPONENT)
    // ==========================================================================
    const PROCESS_STEPS = [
        {
            num: '01',
            title: 'Proposal',
            desc: 'Providing a detailed project proposal, clear milestones, and estimated costs based on your direct business goals.',
            icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
        },
        {
            num: '02',
            title: 'Design Concept',
            desc: 'Creating highly conversion-focused, bespoke UI/UX designs that keep users engaged and reduce bounce rates.',
            icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`
        },
        {
            num: '03',
            title: 'Technology Selection',
            desc: 'Choosing the optimal modern tech stack (fast, secure, and highly scalable) tailored to fit your specific needs.',
            icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
        },
        {
            num: '04',
            title: 'Success as a Service',
            desc: 'Focusing entirely on return on investment (ROI). I refine layout copies and call-to-actions to maximize conversion rates.',
            icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line><path d="M20 4L12 12L8 8L2 14"></path></svg>`
        },
        {
            num: '05',
            title: 'Development',
            desc: 'Writing clean, pixel-perfect frontend code and solid logic with direct transparency and regular checkpoints.',
            icon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`
        }
    ];

    function initProcessAnimations() {
        const wrapper = document.querySelector('.process-carousel-wrapper');
        const buttons = document.querySelectorAll('.process-btn');
        const activeCard = document.getElementById('process-active-card');
        const activeIcon = document.getElementById('process-active-icon');
        const activeNum = document.getElementById('process-active-num');
        const activeTitle = document.getElementById('process-active-title');
        const activeDesc = document.getElementById('process-active-desc');

        if (!wrapper || buttons.length === 0 || !activeCard) return;

        // 1. Scroll reveal
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    wrapper.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealObserver.observe(wrapper);

        // 2. Carousel Mathematics & State
        const M = PROCESS_STEPS.length;
        let posTarget = 0;
        let posDisplay = 0;
        let rafId = null;
        let transitionInProgress = false;

        // Configuration values (match React defaults or mobile scale overrides)
        const getParams = () => {
            const isMobile = window.innerWidth < 768;
            const buttonSize = isMobile ? 34 : 40;
            const gap = isMobile ? 18 : 26;
            const curve = 5;
            const t = curve / 10;
            const step = buttonSize + gap;
            const dPsi = ((Math.PI * 2) / M) * t;
            const R = step / (2 * Math.sin(dPsi / 2));
            return { buttonSize, gap, dPsi, R };
        };

        function getVisualSlot(itemIdx, displayPos) {
            let slot = itemIdx - displayPos;
            slot = slot % M;
            if (slot > M / 2) slot -= M;
            if (slot < -M / 2) slot += M;
            return slot;
        }

        function updateLayout() {
            const { buttonSize, dPsi, R } = getParams();
            const center = Math.round(posDisplay);
            const activeIndex = ((center % M) + M) % M;

            buttons.forEach((btn, i) => {
                const slot = getVisualSlot(i, posDisplay);
                const angle = slot * dPsi;
                const x = R * Math.sin(angle);
                const y = R * (1 - Math.cos(angle));
                const deg = (angle * 180) / Math.PI;
                const absSlot = Math.abs(slot);

                const depth = Math.max(0, 1 - (0.55 * absSlot) / 2); // half = 2
                const scale = 0.55 + 0.45 * depth;

                // Fading
                const fadeInner = 1.6;
                const fadeEnd = 2.6;
                const opacity = absSlot <= fadeInner ? 1 : (absSlot >= fadeEnd ? 0 : 1 - (absSlot - fadeInner) / (fadeEnd - fadeInner));
                
                const zIndex = Math.round(depth * 100) + (absSlot < 0.5 ? 100 : 0);

                btn.style.transform = `translate(${x}px, ${y}px) rotate(${deg}deg) scale(${scale})`;
                btn.style.opacity = opacity;
                btn.style.zIndex = zIndex;

                // Counter-rotate the inner content to keep it upright
                const numSpan = btn.querySelector('.btn-num');
                if (numSpan) {
                    numSpan.style.transform = `rotate(${-deg}deg)`;
                }

                // Set active class
                if (i === activeIndex) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        function easeCubicInOut(p) {
            return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        }

        function select(itemIdx) {
            const currentActive = ((Math.round(posTarget) % M) + M) % M;
            if (itemIdx === currentActive) return;

            let delta = itemIdx - Math.round(posTarget);
            delta = ((delta % M) + M) % M;
            if (delta > M / 2) delta -= M;

            const startPos = posTarget;
            const targetPos = posTarget + delta;
            posTarget = targetPos;

            const startAnimTime = performance.now();
            const DURATION = 450; // duration in ms

            // Animate Card content transition (slide left/right with exit/enter bounce)
            const dir = Math.sign(delta);
            animateCardTransition(itemIdx, dir);

            if (rafId) cancelAnimationFrame(rafId);

            function tick(now) {
                const elapsed = now - startAnimTime;
                const progress = Math.min(1, elapsed / DURATION);
                posDisplay = startPos + (targetPos - startPos) * easeCubicInOut(progress);
                
                updateLayout();

                if (progress < 1) {
                    rafId = requestAnimationFrame(tick);
                } else {
                    posDisplay = targetPos;
                    updateLayout();
                    rafId = null;
                }
            }
            rafId = requestAnimationFrame(tick);
        }

        function animateCardTransition(newIdx, dir) {
            if (transitionInProgress) return;
            transitionInProgress = true;

            const shiftAmount = dir * 80;
            // 1. Slide active card out
            activeCard.style.transform = `translateX(${-shiftAmount}px) scale(0.92)`;
            activeCard.style.opacity = '0';
            activeCard.style.filter = 'blur(4px)';

            setTimeout(() => {
                // 2. Load new item details into active card HTML
                const item = PROCESS_STEPS[newIdx];
                if (activeIcon) activeIcon.innerHTML = item.icon;
                if (activeNum) activeNum.textContent = item.num;
                if (activeTitle) activeTitle.textContent = item.title;
                if (activeDesc) activeDesc.textContent = item.desc;

                // 3. Move the card to opposite entry offset instantly without animation
                activeCard.style.transition = 'none';
                activeCard.style.transform = `translateX(${shiftAmount}px) scale(0.92)`;
                activeCard.style.opacity = '0';
                activeCard.style.filter = 'blur(4px)';

                // Force reflow
                activeCard.offsetHeight;

                // 4. Slide in smoothly to center
                activeCard.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease, filter 0.45s ease';
                activeCard.style.transform = 'translateX(0px) scale(1)';
                activeCard.style.opacity = '1';
                activeCard.style.filter = 'blur(0px)';
                
                transitionInProgress = false;
            }, 220);
        }

        // 5. Arrow navigation elements
        const prevBtn = document.getElementById('process-prev-btn');
        const nextBtn = document.getElementById('process-next-btn');

        const prev = () => {
            const currentActive = ((Math.round(posTarget) % M) + M) % M;
            const prevIdx = (currentActive - 1 + M) % M;
            select(prevIdx);
        };

        const next = () => {
            const currentActive = ((Math.round(posTarget) % M) + M) % M;
            const nextIdx = (currentActive + 1) % M;
            select(nextIdx);
        };

        if (prevBtn) prevBtn.addEventListener('click', () => { resetAutoplay(); prev(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { resetAutoplay(); next(); });

        // Attach click listeners to buttons
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                resetAutoplay();
                const idx = parseInt(btn.getAttribute('data-index'));
                select(idx);
            });
        });

        // 6. Autoplay Loop (helps visitors understand it is interactive!)
        let autoplayTimer = setInterval(next, 7000);
        function resetAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        // Initialize positions
        updateLayout();
        window.addEventListener('resize', updateLayout);
    }
    initProcessAnimations();

    // ==========================================================================
    // THEME SWITCHER (DARK / LIGHT THEME MODE)
    // ==========================================================================
    function initThemeSwitcher() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            const isLight = document.documentElement.classList.contains('light-mode');
            if (isLight) {
                document.documentElement.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    initThemeSwitcher();

    // ==========================================================================
    // INSPECT ELEMENT PREVENTION (Disable Right Click & DevTools Shortcuts)
    // ==========================================================================
    function initInspectPrevention() {
        // Disable Right-Click Context Menu
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        // Disable Common DevTools and View Source Shortcuts
        document.addEventListener('keydown', (e) => {
            // F12 key
            if (e.key === 'F12') {
                e.preventDefault();
                return false;
            }
            
            // Ctrl + Shift + I (Inspect)
            // Ctrl + Shift + J (Console)
            // Ctrl + Shift + C (Element selector)
            if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
                e.preventDefault();
                return false;
            }

            // Ctrl + U (View Source)
            if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
                e.preventDefault();
                return false;
            }

            // Ctrl + S (Save Page)
            if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
                e.preventDefault();
                return false;
            }
        });
    }
    initInspectPrevention();


    // ==========================================================================
    // TEXT COPY & DRAG-SELECT PROTECTION
    // ==========================================================================
    function initCopyPrevention() {
        // Block copy and cut actions
        document.addEventListener('copy', (e) => {
            e.preventDefault();
        });
        document.addEventListener('cut', (e) => {
            e.preventDefault();
        });

        // Prevent selecting text unless inside input or textarea fields
        document.addEventListener('selectstart', (e) => {
            const tagName = e.target.tagName.toLowerCase();
            if (tagName !== 'input' && tagName !== 'textarea') {
                e.preventDefault();
            }
        });

        // Prevent drag actions (dragging text or images)
        document.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    }
    initCopyPrevention();

});
