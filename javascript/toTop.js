// Get the button
var mybutton = document.getElementById("toTop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    if (window.scrollY > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
};

//logo back to homepage
document.getElementById('logo').addEventListener('click', function() {
    var currentPath = window.location.pathname;

    if (currentPath.endsWith("index.html")) {
        window.location.href = "index.html";
    } else {
        window.location.href = "../index.html";
    }
});
