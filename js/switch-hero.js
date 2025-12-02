const slides = document.querySelectorAll(".hero-slide");
let index = 0;

function switchHero() {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}

setInterval(switchHero, 3000);