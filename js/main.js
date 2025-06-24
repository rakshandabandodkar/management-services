$(document).ready(function () {
    // Initialize Slick Slider
    $('.project-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
        dots: false,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 992,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 },
            },
        ],
    });

    // Custom Slick Navigation
    $('.next').on('click', () => $('.project-slider').slick('slickNext'));
    $('.prev').on('click', () => $('.project-slider').slick('slickPrev'));
});

// DOMContentLoaded logic (vanilla JS)
document.addEventListener("DOMContentLoaded", function () {
    // 1. Tab Switcher Logic
    const serviceTabs = document.querySelectorAll('.service-tab');
    const serviceItems = document.querySelectorAll('.service-item');

    serviceTabs.forEach((tab) => {
        tab.addEventListener('click', function () {
            serviceTabs.forEach((btn) => btn.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.category;
            serviceItems.forEach((item) => {
                item.style.display = item.dataset.category === category ? 'block' : 'none';
            });
        });
    });

    // Trigger default active tab
    document.querySelector('.service-tab.active')?.click();

    // 2. Navbar Toggle Logic
    const toggler = document.getElementById("navbarToggler");
    const navbarMenu = document.getElementById("navbarMenu");
    const togglerIcon = toggler?.querySelector(".navbar-toggler-icon");
    const closeIcon = toggler?.querySelector(".close-icon");

    if (toggler && navbarMenu && togglerIcon && closeIcon) {
        const bsCollapse = new bootstrap.Collapse(navbarMenu, { toggle: false });

        function updateIcons(isOpen) {
            togglerIcon.classList.toggle("d-none", isOpen);
            closeIcon.classList.toggle("d-none", !isOpen);
        }

        toggler.addEventListener("click", () => {
            const isExpanded = toggler.getAttribute("aria-expanded") === "true";
            updateIcons(!isExpanded);
        });

        navbarMenu.addEventListener("shown.bs.collapse", () => updateIcons(true));
        navbarMenu.addEventListener("hidden.bs.collapse", () => updateIcons(false));
    }

    // 3. Close navbar on link click
    const navLinks = document.querySelectorAll('.navbar-collapse .nav-link, .navbar-collapse .btn');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const collapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (collapse) collapse.hide();
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(form);

        fetch("submit-form.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.text())
        .then(response => {
            if (response.trim() === "success") {
                alert("Thank you! Your message has been sent.");
                form.reset();
            } else {
                alert("Something went wrong: " + response);
            }
        })
        .catch(error => {
            alert("There was an error submitting the form.");
            console.error(error);
        });
    });
});