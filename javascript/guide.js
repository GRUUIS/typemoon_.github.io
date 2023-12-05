document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    //nodelist
    const projects = document.querySelectorAll('.project');

    filterButtons.forEach(button => {
        //In this code snippet, button is just a placeholder or variable name. It can be replaced with any valid variable name. 
        //In the callback function of the forEach method, button represents the current iterated element, allowing you to reference the current button element.
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-filter');

            projects.forEach(project => {
                const projectCategory = project.getAttribute('data-category');

                if (category === 'all' || category === projectCategory) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });


    // Initially show all content
    projects.forEach(project => {
        project.style.display = 'block';
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const imgElements = document.querySelectorAll('.gameAnime img');
    const containerElements = document.querySelectorAll('.container2');

    // display:none to hide the div
    function hideAllContainers() {
        containerElements.forEach(container => {
            container.style.display = 'none';
        });
    }

    hideAllContainers();

    // add eventlistener for each image; index: in the querylist
    imgElements.forEach((img, index) => {
        img.addEventListener('click', function () {
            if (containerElements[index].style.display === 'block') {
                containerElements[index].style.display = 'none';
            } else {
                hideAllContainers();
                containerElements[index].style.display = 'block';
            }
        });
    });

    //ChatGPT: to hide it again: listen to click on screen
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.project') && !event.target.closest('.container2')) {
            hideAllContainers();
        }
    });
});

