document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    function handleSectionFade() {
        const triggerBottom = window.innerHeight * 0.92;
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    }
    window.addEventListener('scroll', handleSectionFade);
    window.addEventListener('resize', handleSectionFade);
    handleSectionFade();

    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Remove old theme toggle button logic

    // Add theme switch logic for new switch
    const themeSwitchCheckbox = document.getElementById('themeSwitchCheckbox');
    if (themeSwitchCheckbox) {
        // Set initial state based on body class
        themeSwitchCheckbox.checked = !document.body.classList.contains('light-theme');
        themeSwitchCheckbox.addEventListener('change', function () {
            document.body.classList.toggle('light-theme', !this.checked);
            // Update container decor (moon/stars/clouds)
            setTimeout(updateContainerDecor, 350);
        });
    }

    const typedText = document.getElementById('typedText');
    const phrases = [
        'Aspiring Web Designer',
        'Front-End Developer',
        'UI/UX Enthusiast',
        'Creative Problem Solver'
    ];
    let phraseIndex = 0, charIndex = 0, typing = true;
    function typeLoop() {
        if (!typedText) return;
        if (typing) {
            if (charIndex < phrases[phraseIndex].length) {
                typedText.textContent += phrases[phraseIndex][charIndex++];
                setTimeout(typeLoop, 80);
            } else {
                typing = false;
                setTimeout(typeLoop, 1200);
            }
        } else {
            if (charIndex > 0) {
                typedText.textContent = phrases[phraseIndex].slice(0, --charIndex);
                setTimeout(typeLoop, 40);
            } else {
                typing = true;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeLoop, 400);
            }
        }
    }
    typeLoop();

    let skillBarsAnimated = false;
    function animateSkillBars() {
        if (skillBarsAnimated) return;
        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
            bar.style.width = bar.getAttribute('style').match(/width: (\d+%)/)[1];
        });
        skillBarsAnimated = true;
    }
    window.addEventListener('scroll', animateSkillBars);
    window.addEventListener('resize', animateSkillBars);
    animateSkillBars();

    const scrollProgress = document.getElementById('scrollProgress');
    let lastScrollPercent = 0;
    function getScrollPercent() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    }
    function setScrollBar(percent) {
        scrollProgress.style.width = percent + '%';
    }
    window.addEventListener('scroll', function () {
        lastScrollPercent = getScrollPercent();
        setScrollBar(lastScrollPercent);
    });
    scrollProgress.addEventListener('mouseenter', function () {
        let start = 0;
        const end = lastScrollPercent;
        const duration = 600;
        const startTime = performance.now();
        function animate(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const value = start + (end - start) * progress;
            setScrollBar(value);
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setScrollBar(end);
            }
        }
        setScrollBar(0);
        requestAnimationFrame(animate);
    });
    scrollProgress.addEventListener('mouseleave', function () {
        setScrollBar(lastScrollPercent);
    });

    (function() {
        const svg = document.getElementById('mouse-trail-svg');
        if (!svg) return;
        let points = [];
        const maxPoints = 32;
        const trailColor = getComputedStyle(document.body).getPropertyValue('--trail-color') || '#00f0ff';
        const trailDuration = 1200;

        function resizeSVG() {
            svg.setAttribute('width', window.innerWidth);
            svg.setAttribute('height', window.innerHeight);
        }
        resizeSVG();
        window.addEventListener('resize', resizeSVG);

        function ensureDefs() {
            if (!svg.querySelector('defs')) {
                const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                defs.innerHTML = `<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>`;
                svg.appendChild(defs);
            }
        }
        ensureDefs();

        document.addEventListener('mousemove', function(e) {
            const now = Date.now();
            points.push({ x: e.clientX, y: e.clientY, t: now });
            if (points.length > maxPoints) points.shift();
        });

        document.addEventListener('mouseleave', () => {
            points = [];
        });

        function drawTrail() {
            ensureDefs();
            [...svg.querySelectorAll('line')].forEach(line => line.remove());
            const now = Date.now();
            points = points.filter(pt => now - pt.t < trailDuration);
            for (let i = 1; i < points.length; i++) {
                const prev = points[i - 1];
                const curr = points[i];
                const age = now - curr.t;
                const opacity = Math.max(0, 0.22 * (1 - age / trailDuration) + 0.08 * (i / points.length));
                const width = 7 * (i / points.length) + 1.5;
                const color = `hsl(${180 + 60 * (i / points.length)}, 100%, 60%)`;
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', prev.x);
                line.setAttribute('y1', prev.y);
                line.setAttribute('x2', curr.x);
                line.setAttribute('y2', curr.y);
                line.setAttribute('stroke', color);
                line.setAttribute('stroke-width', width);
                line.setAttribute('stroke-linecap', 'round');
                line.setAttribute('opacity', opacity);
                line.setAttribute('filter', 'url(#glow)');
                svg.appendChild(line);
            }
            // Add a glowing orb at the tip
            if (points.length > 0) {
                let orb = svg.querySelector('circle#trail-orb');
                if (!orb) {
                    orb = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    orb.setAttribute('id', 'trail-orb');
                    svg.appendChild(orb);
                }
                const tip = points[points.length - 1];
                orb.setAttribute('cx', tip.x);
                orb.setAttribute('cy', tip.y);
                orb.setAttribute('r', 11);
                orb.setAttribute('fill', 'url(#orb-gradient)');
                orb.setAttribute('opacity', 0.45);
                orb.setAttribute('filter', 'url(#glow)');
                // Add gradient for orb
                if (!svg.querySelector('radialGradient#orb-gradient')) {
                    const grad = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
                    grad.setAttribute('id', 'orb-gradient');
                    grad.innerHTML = `
                      <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
                      <stop offset="60%" stop-color="#00f0ff" stop-opacity="0.7"/>
                      <stop offset="100%" stop-color="#00f0ff" stop-opacity="0"/>
                    `;
                    svg.querySelector('defs').appendChild(grad);
                }
            }
            requestAnimationFrame(drawTrail);
        }
        drawTrail();
    })();

    // Remove random cloud JS for dark theme, add moon and stars for dark theme containers
    function addMoonAndStarsToContainers() {
        document.querySelectorAll('section, .hero-section').forEach(container => {
            // Remove any existing moon/stars
            container.querySelectorAll('.moon, .container-stars').forEach(e => e.remove());
            if (!document.body.classList.contains('light-theme')) {
                // Add moon only to hero-section
                if (container.classList.contains('hero-section')) {
                    const moon = document.createElement('div');
                    moon.className = 'moon';
                    // Add craters
                    for (let i = 1; i <= 3; i++) {
                        const crater = document.createElement('div');
                        crater.className = 'moon-crater moon-crater' + i;
                        moon.appendChild(crater);
                    }
                    container.appendChild(moon);
                }
                // Add stars to all containers
                const stars = document.createElement('div');
                stars.className = 'container-stars';
                // Add 8-14 random stars per container
                const starCount = 8 + Math.floor(Math.random() * 7);
                for (let i = 0; i < starCount; i++) {
                    const star = document.createElement('div');
                    star.className = 'star';
                    star.style.top = Math.random() * 90 + '%';
                    star.style.left = Math.random() * 96 + '%';
                    star.style.width = star.style.height = (1.5 + Math.random() * 2.5) + 'px';
                    stars.appendChild(star);
                }
                container.appendChild(stars);
            }
        });
    }

    // Remove random clouds in dark theme, add moon/stars; keep clouds in light theme
    function updateContainerDecor() {
        if (document.body.classList.contains('light-theme')) {
            // Remove moon/stars
            document.querySelectorAll('.moon, .container-stars').forEach(e => e.remove());
            // Add random clouds (existing logic)
            if (typeof addRandomCloudsToContainers === 'function') addRandomCloudsToContainers();
        } else {
            // Remove clouds
            document.querySelectorAll('.cloud, .random-cloud, .sky-decor.clouds').forEach(e => e.remove());
            addMoonAndStarsToContainers();
        }
    }

    // Call on load, theme toggle, and resize
    window.addEventListener('DOMContentLoaded', updateContainerDecor);
    window.addEventListener('resize', updateContainerDecor);
    document.getElementById('themeToggle').addEventListener('click', () => {
        setTimeout(updateContainerDecor, 350);
    });
});
