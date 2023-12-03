/*asked ChatGPT; this code gets elements in that carousel container, then 
change its style's transform in X-axis*/
let currentSlide = 0;
const slidesContainer = document.querySelector('.carousel-slides');
const totalSlides = document.querySelectorAll('.carousel-slide').length;
const transitionDuration = 2500; 
const autoPlayInterval = 10000;

function showSlide(index) {
    const offset = -index * 100 + '%';
    slidesContainer.style.transition = `transform ${transitionDuration / 1000}s ease-out`;
    slidesContainer.style.transform = `translateX(${offset})`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function autoPlay() {
    nextSlide();
}

let autoPlayTimer = setInterval(autoPlay, autoPlayInterval);

function startAutoPlay() {
    autoPlayTimer = setInterval(autoPlay, autoPlayInterval);
}

document.getElementById('prevBtn').addEventListener('click', () => {
    prevSlide();
    clearInterval(autoPlayTimer);
    startAutoPlay();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    nextSlide();
    clearInterval(autoPlayTimer);
    startAutoPlay();
});
