/*asked ChatGPT; this code gets elements in that carousel container, then 
change its style's transform in X-axis*/
// Initialize variables
let currentSlide = 0;
const slidesContainer = document.querySelector('.carousel-slides');
const totalSlides = document.querySelectorAll('.carousel-slide').length;
const transitionDuration = 1500;
const autoPlayInterval = 8000;
let touchStartX = 0;
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

// Event listeners for touch events to enable swipe navigation
slidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    isTouching = true;
});

slidesContainer.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) > 50) {
        deltaX > 0 ? prevSlide() : nextSlide();
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    isTouching = false;
});

// Optional: Add touch cancel event listener
slidesContainer.addEventListener('touchcancel', () => {
    isTouching = false;
});

// Optional: Add touch move event listener for additional interactions
// slidesContainer.addEventListener('touchmove', (e) => {
//     // Handle touch move if needed
// });
