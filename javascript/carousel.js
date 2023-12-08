/*asked ChatGPT; this code gets elements in that carousel container, then 
change its style's transform in X-axis*/
// Initialize variables
let currentSlide = 0; 
const slidesContainer = document.querySelector('.carousel-slides'); 
const totalSlides = document.querySelectorAll('.carousel-slide').length; 
const transitionDuration = 1500; 
const autoPlayInterval = 8000; 

// Variable to store initial touch position
let touchStartX = 0;

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

// Set up an interval for auto-playing slides；8s
let autoPlayTimer = setInterval(autoPlay, autoPlayInterval);

// Function to restart auto-play after manual slide navigation
function startAutoPlay() {
    autoPlayTimer = setInterval(autoPlay, autoPlayInterval);
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
});

slidesContainer.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    // Set a threshold for the swipe distance to prevent accidental swipes
    if (Math.abs(deltaX) > 50) {
        // If positive, swipe right; if negative, swipe left
        deltaX > 0 ? prevSlide() : nextSlide();
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }
});
