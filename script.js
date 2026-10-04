// ==============================
// DARK / LIGHT MODE
// ==============================

const themeButton =
    document.getElementById("theme-button");

themeButton.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeButton.textContent = "☀️ Light Mode";

    } else {

        themeButton.textContent = "🌙 Dark Mode";

    }

});


// ==============================
// MOBILE MENU
// ==============================

const menuButton =
    document.getElementById("menu-button");

const navMenu =
    document.getElementById("nav-menu");


menuButton.addEventListener("click", function() {

    navMenu.classList.toggle("active");

});


// Close menu after clicking a link

const navLinks =
    document.querySelectorAll("#nav-menu a");


navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        navMenu.classList.remove("active");

    });

});