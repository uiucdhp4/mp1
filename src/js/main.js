/* Your JS here. */
const sections = document.querySelectorAll("section");
const nav = document.getElementById("navLinks");
const navLinks = document.querySelectorAll("nav a");
const carouselSlides = document.querySelector(".carouselSlides");
const slides = document.querySelectorAll(".slide");
const leftButton = document.querySelector("#leftButton");
const rightButton = document.querySelector("#rightButton");
const modalButtons = document.querySelectorAll(".modalButton");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".closeModal");
let currentSlide = 0;

// for updating navbar

function updateNavbar() {

    let currentSection = "";
    let scrollPosition = window.scrollY;
    // resize if necessay
    if (scrollPosition > 100) {
        nav.parentElement.classList.add("scrolled");
    } else {
        nav.parentElement.classList.remove("scrolled");
    }

    const pageBottom = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (pageBottom >= documentHeight - 5) {
        currentSection = "footer";
    } else {
        sections.forEach(function(section) {

            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }

        });
    }

    navLinks.forEach(function(link) {

        link.classList.remove("on_it");
        link.classList.add("off_it");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.remove("off_it");
            link.classList.add("on_it");
        }

    });

}

window.addEventListener("scroll", updateNavbar);
navLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const sectionId = link.getAttribute("href");
        const section = document.querySelector(sectionId);
        section.scrollIntoView({
            behavior: "smooth"
        });

    });

});


// Carousel

function showSlide() {
    carouselSlides.style.transform = "translateX(-" + (currentSlide * 100) + "%)";
}

rightButton.addEventListener("click", function() {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide();
});

leftButton.addEventListener("click", function() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide();
});

// Modals

modalButtons.forEach(function(button, index) {
    button.addEventListener("click", function() {
        modals[index].classList.add("active");
    });
});

closeButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        button.closest(".modal").classList.remove("active");
    });
});