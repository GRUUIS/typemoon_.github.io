/*asked ChatGPT; this code gets elements in that carousel container, then 
change its style's transform in X-axis*/
// Initialize variables
let currentSlide = 0;
const slidesContainer = document.querySelector('.carousel-slides');
const totalSlides = document.querySelectorAll('.carousel-slide').length;
const transitionDuration = 1500;
const autoPlayInterval = 8000;
let touchStartX = 0;
let touchStartY = 0;
let isTouching = false; // Flag to track touch interaction

// Function to show a specific slide based on its index
function showSlide(index) {
    const offset = -index * 100 + '%';
    slidesContainer.style.transition = `transform ${transitionDuration / 1000}s ease-out`;
    slidesContainer.style.transform = `translateX(${offset})`;
}

// Function to move to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Function to move to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Function for auto-playing slides
function autoPlay() {
    nextSlide();
}

// Set up an interval for auto-playing slides (every 8 seconds)
let autoPlayTimer = setInterval(autoPlay, autoPlayInterval);

// Function to restart auto-play after manual slide navigation
function startAutoPlay() {
    if (!isTouching) {
        autoPlayTimer = setInterval(autoPlay, autoPlayInterval);
    }
}

// Event listeners for previous and next button clicks
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

// Touch events for swipe functionality
slidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isTouching = true;
});

slidesContainer.addEventListener('touchmove', (e) => {
    if (!isTouching) return;

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Check if the swipe is horizontal
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Swipe left
        if (deltaX > 0) {
            prevSlide();
        }
        // Swipe right
        else {
            nextSlide();
        }
    }

    isTouching = false;
    clearInterval(autoPlayTimer);
    startAutoPlay();
});
