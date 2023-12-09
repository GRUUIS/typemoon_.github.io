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

//https://www.youtube.com/watch?v=7HPsdVQhpRw
// Event listeners for touch events to enable swipe navigation
slidesContainer.addEventListener('touchstart', handleTouchStart);
slidesContainer.addEventListener('touchmove', handleTouchMove);
slidesContainer.addEventListener('touchend', handleTouchEnd);

// Touch start event handler
function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isTouching = true;
}

// Touch move event handler
function handleTouchMove(e) {
    if (!isTouching) return;

    const touchMoveX = e.touches[0].clientX;
    const touchMoveY = e.touches[0].clientY;
    const deltaX = touchMoveX - touchStartX;
    const deltaY = touchMoveY - touchStartY;

    // Calculate the angle of the swipe
    const angle = Math.atan2(Math.abs(deltaY), Math.abs(deltaX)) * (180 / Math.PI);

    // If the angle is less than 45 degrees, consider it a horizontal swipe
    if (angle < 45) {
        const percentageDeltaX = (deltaX / window.innerWidth) * 100;

        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = `translateX(-${currentSlide * 100 + percentageDeltaX}%)`;

        e.preventDefault(); // Prevent default touchmove behavior to improve responsiveness
    }
}

// Touch end event handler
function handleTouchEnd(e) {
    if (!isTouching) return;

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) > 50) {
        deltaX > 0 ? prevSlide() : nextSlide();
        clearInterval(autoPlayTimer);
        startAutoPlay();
    } else {
        showSlide(currentSlide); // Reset to current slide if the movement is less than the threshold
    }

    isTouching = false;
}
