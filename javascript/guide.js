document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project');
    const animeContents = document.querySelectorAll('.animeContent');

    filterButtons.forEach(button => {
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

    // Hide all container elements
    containerElements.forEach(container => {
        container.style.display = 'none';
    });
    
    imgElements.forEach((img, index) => {
        img.addEventListener('click', function () {
            // Toggle the display of the corresponding container
            if (containerElements[index].style.display === 'block') {
                containerElements[index].style.display = 'none';
            } else {
                // Hide all container elements
                containerElements.forEach(container => {
                    container.style.display = 'none';
                });
                // Show the corresponding container
                containerElements[index].style.display = 'block';
            }
        });
    });
});
