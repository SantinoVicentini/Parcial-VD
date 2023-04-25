const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("data-scroll");
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({behavior: "smooth"});
    });
});

window.addEventListener('scroll', function() {
    var container1 = document.querySelector('#vis');
    var container2 = document.querySelector('#vis2');
    var container3 = document.querySelector('#vis3');
    var container4 = document.querySelector('#vis4');
    var container5 = document.querySelector('#vis5');
    var container6 = document.querySelector('#vis6');
    var container7 = document.querySelector('#vis7');
    var scrollPosition = window.scrollY;

    if (scrollPosition > 500) {
        container1.style.opacity = '0';
    } else {
        container1.style.opacity = '1';
    }
    if (scrollPosition > 501) {
        container2.style.opacity = '1';
    } else {
        container2.style.opacity = '0';
    }
    if (scrollPosition > 1400) {
        container3.style.opacity = '1';
    } else {
        container3.style.opacity = '0';
    }
    if (scrollPosition > 2300) {
        container4.style.opacity = '1';
    } else {
        container4.style.opacity = '0';
    }
    if (scrollPosition > 3000) {
        container5.style.opacity = '1';
    } else {
        container5.style.opacity = '0';
    }
    if (scrollPosition > 3700) {
        container6.style.opacity = '1';
    } else {
        container6.style.opacity = '0';
    }
    if (scrollPosition > 4600) {
        container7.style.opacity = '1';
    } else if (scrollPosition > 5200) {
        container7.style.opacity = '0';
    } else {
        container7.style.opacity = '0';
    }
});