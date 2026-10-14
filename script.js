document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeButton = document.getElementById("theme-button");
    const menuButton = document.getElementById("menu-button");
    const navMenu = document.getElementById("nav-menu");
    const year = document.getElementById("current-year");

    // 1. Update the footer year
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // 2. Restore saved theme
    try {
        if (localStorage.getItem("portfolio-theme") === "light") {
            body.classList.add("light-mode");
        }
    } catch (error) {
        console.log("Theme storage unavailable.");
    }

    function updateThemeButton() {
        if (!themeButton) return;

        const isLight = body.classList.contains("light-mode");

        themeButton.textContent = isLight ? "🌙" : "☀️";
        themeButton.setAttribute(
            "aria-label",
            isLight ? "Switch to dark mode" : "Switch to light mode"
        );
    }

    updateThemeButton();

    // 3. Dark/light theme toggle
    themeButton ? .addEventListener("click", () => {
        body.classList.toggle("light-mode");

        try {
            const theme = body.classList.contains("light-mode") ?
                "light" :
                "dark";

            localStorage.setItem("portfolio-theme", theme);
        } catch (error) {
            console.log("Unable to save theme preference.");
        }

        updateThemeButton();
    });

    // 4. Mobile navigation
    menuButton ? .addEventListener("click", () => {
        const isOpen = navMenu ? .classList.toggle("active") ? ? false;

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });

    navMenu ? .querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuButton ? .setAttribute("aria-expanded", "false");
            menuButton ? .setAttribute("aria-label", "Open navigation");
        });
    });

    // 5. Scroll reveal animations
    const revealTargets = document.querySelectorAll(
        ".section-heading, .about-card, .highlight-card, " +
        ".skill-card, .project-card, .timeline-item, " +
        ".contact-panel, .skills-note, .project-note"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealTargets.forEach((element) => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    } else {
        revealTargets.forEach((element) => {
            element.classList.add("show");
        });
    }

    // 6. Highlight active navigation link
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(
        "#nav-menu a[href^='#']"
    );

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    navLinks.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle("active-link", isActive);

                        if (isActive) {
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.removeAttribute("aria-current");
                        }
                    });
                });
            }, {
                rootMargin: "-25% 0px -60% 0px"
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    // 7. Create back-to-top button
    const backToTop = document.createElement("button");

    backToTop.id = "backToTop";
    backToTop.type = "button";
    backToTop.textContent = "↑";
    backToTop.setAttribute("aria-label", "Back to top");
    backToTop.title = "Back to top";

    document.body.appendChild(backToTop);

    function updateBackToTop() {
        backToTop.classList.toggle(
            "visible",
            window.scrollY > 350
        );
    }

    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });

    updateBackToTop();

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 8. Copy email address
    const copyEmail = document.getElementById("copyEmail");
    const copyFeedback = document.getElementById("copy-feedback");

    copyEmail ? .addEventListener("click", async() => {
        const email =
            copyEmail.dataset.email ||
            "prashantguggari21@email.com";

        try {
            await navigator.clipboard.writeText(email);

            if (copyFeedback) {
                copyFeedback.textContent =
                    "Email copied to clipboard!";
            }

            const oldText = copyEmail.textContent;
            copyEmail.textContent = "Copied ✓";

            window.setTimeout(() => {
                copyEmail.textContent = oldText;

                if (copyFeedback) {
                    copyFeedback.textContent = "";
                }
            }, 2000);
        } catch (error) {
            if (copyFeedback) {
                copyFeedback.textContent =
                    "Clipboard unavailable. Please use Email Me.";
            }
        }
    });

    // 9. Close mobile menu on desktop resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            navMenu ? .classList.remove("active");

            menuButton ? .setAttribute("aria-expanded", "false");
        }
    });
});

/* ===== LIVE 3D SOFTWARE CODE BACKGROUND ===== */
(() => {
    const canvas = document.getElementById("network-bg");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    let width = 0;
    let height = 0;
    let frame = 0;
    let animationId = null;
    let lastTime = 0;

    const codeLines = [
        "const developer = 'Prashant';",
        "function buildSoftware() {",
        "  return secureApplication;",
        "import React from 'react';",
        "const server = express();",
        "if (user.isAuthenticated) {",
        "  access.grantPermission();",
        "const database = connectDB();",
        "while (system.isRunning) {",
        "  monitorNetworkTraffic();",
        "git commit -m 'New feature';",
        "async function deployApp() {",
        "  await server.listen(3000);",
        "class CyberSecurity extends Security {",
        "  detectThreats(packet);",
        "const result = await fetch(api);",
        "return response.json();",
        "docker build -t my-app .",
        "const model = train(dataset);",
        "console.log('System ready');",
        "01001000 01000001 01000011",
        "10101010 01010101 11001010",
        "01010110 10110010 01101001",
        "npm install dependencies",
        "SELECT * FROM projects;",
        "def secure_system():",
        "    encrypt_sensitive_data()",
        "sudo systemctl status service"
    ];

    const streams = [];
    const mouse = { x: -1000, y: -1000 };

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        streams.length = 0;

        const count = Math.max(10, Math.floor(width / 105));

        for (let i = 0; i < count; i++) {
            streams.push({
                x: (i / count) * width,
                y: Math.random() * height,
                speed: 12 + Math.random() * 25,
                size: 10 + Math.random() * 5,
                text: codeLines[Math.floor(Math.random() * codeLines.length)],
                depth: 0.35 + Math.random() * 0.65,
                alpha: 0.25 + Math.random() * 0.55
            });
        }
    }

    function drawBackground() {
        ctx.fillStyle = "#001322";
        ctx.fillRect(0, 0, width, height);

        // Cyan light on the right side
        const glow = ctx.createRadialGradient(
            width * 0.78, height * 0.35, 10,
            width * 0.78, height * 0.35, width * 0.7
        );

        glow.addColorStop(0, "rgba(0, 210, 255, 0.20)");
        glow.addColorStop(0.45, "rgba(0, 100, 180, 0.08)");
        glow.addColorStop(1, "rgba(0, 10, 30, 0)");

        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);

        // Perspective digital grid
        ctx.save();
        ctx.strokeStyle = "rgba(0, 190, 255, 0.10)";
        ctx.lineWidth = 1;

        const horizon = height * 0.53;

        for (let i = -12; i <= 12; i++) {
            ctx.beginPath();
            ctx.moveTo(width / 2 + i * 9, horizon);
            ctx.lineTo(width / 2 + i * width * 0.11, height);
            ctx.stroke();
        }

        for (let i = 0; i < 9; i++) {
            const progress = ((i / 9) + frame * 0.000035) % 1;
            const y = horizon + progress * progress * height * 0.6;

            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        ctx.restore();
    }

    function drawCode(delta) {
        streams.forEach((stream, index) => {
            stream.y += stream.speed * delta * stream.depth;

            if (stream.y > height + 60) {
                stream.y = -30 - Math.random() * 100;
                stream.text =
                    codeLines[Math.floor(Math.random() * codeLines.length)];
                stream.alpha = 0.25 + Math.random() * 0.55;
            }

            // Simulated perspective movement around screen center
            const centerX = width / 2;
            const perspectiveX =
                centerX + (stream.x - centerX) * (0.65 + stream.depth * 0.55);

            const perspectiveY =
                height * 0.5 + (stream.y - height * 0.5) * stream.depth;

            const fontSize = stream.size * stream.depth;
            const distance = Math.abs(mouse.x - perspectiveX);
            const focus = distance < 180 ? 1.35 : 1;

            ctx.save();
            ctx.font = `600 ${fontSize}px monospace`;
            ctx.globalAlpha = Math.min(1, stream.alpha * focus);
            ctx.shadowBlur = 10 * stream.depth;
            ctx.shadowColor = "#00cfff";
            ctx.fillStyle = index % 4 === 0 ? "#79f6ff" : "#00c8ff";

            ctx.fillText(
                stream.text,
                perspectiveX,
                perspectiveY,
                Math.max(80, width * 0.3)
            );

            ctx.restore();
        });
    }

    function animate(timestamp) {
        if (!lastTime) lastTime = timestamp;

        const delta = Math.min((timestamp - lastTime) / 1000, 0.05);
        lastTime = timestamp;
        frame++;

        drawBackground();
        drawCode(delta);

        animationId = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);

    window.addEventListener("pointermove", (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }, { passive: true });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
            lastTime = 0;
        } else if (animationId !== null) {
            cancelAnimationFrame(animationId);
            lastTime = 0;
            animationId = requestAnimationFrame(animate);
        }
    });

    resize();
    animationId = requestAnimationFrame(animate);
})();