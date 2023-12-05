/*asked ChatGPT; this code gets elements in that carousel container, then 
change its style's transform in X-axis*/
// Initialize variables
let currentSlide = 0; // Current index of the visible slide
const slidesContainer = document.querySelector('.carousel-slides'); // Container for all carousel slides
const totalSlides = document.querySelectorAll('.carousel-slide').length; // Total number of slides
const transitionDuration = 2500; // Duration of slide transition animation in milliseconds
const autoPlayInterval = 10000; // Interval for auto-playing slides in milliseconds

// Function to show a specific slide based on its index
function showSlide(index) {
    const offset = -index * 100 + '%'; // Calculate the horizontal offset based on the index
    slidesContainer.style.transition = `transform ${transitionDuration / 1000}s ease-out`; // Set transition properties
    slidesContainer.style.transform = `translateX(${offset})`; // Apply the transform to show the desired slide
}

// Function to move to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides; // Calculate the index of the next slide
    showSlide(currentSlide); // Display the next slide
}

// Function to move to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Calculate the index of the previous slide
    showSlide(currentSlide); // Display the previous slide
}

// Function for auto-playing slides
function autoPlay() {
    nextSlide(); // Move to the next slide
}

// Set up an interval for auto-playing slides；10s
let autoPlayTimer = setInterval(autoPlay, autoPlayInterval);

// Function to restart auto-play after manual slide navigation
function startAutoPlay() {
    autoPlayTimer = setInterval(autoPlay, autoPlayInterval);
}

// Event listeners for previous and next button clicks
document.getElementById('prevBtn').addEventListener('click', () => {
    prevSlide(); // Move to the previous slide
    clearInterval(autoPlayTimer); // Clear the auto-play interval
    startAutoPlay(); // Restart auto-play
});

document.getElementById('nextBtn').addEventListener('click', () => {
    nextSlide(); 
    clearInterval(autoPlayTimer); 
    startAutoPlay(); 
});

