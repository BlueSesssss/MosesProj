// JavaScript functionality for the website

document.addEventListener("DOMContentLoaded", () => {
    console.log("Website loaded successfully");

    // Example of dynamic functionality: Scroll to top button
    const scrollToTopButton = document.createElement("button");
    scrollToTopButton.textContent = "Top";
    scrollToTopButton.style.position = "fixed";
    scrollToTopButton.style.bottom = "20px";
    scrollToTopButton.style.right = "20px";
    scrollToTopButton.style.padding = "10px 15px";
    scrollToTopButton.style.backgroundColor = "#000";
    scrollToTopButton.style.color = "#fff";
    scrollToTopButton.style.border = "none";
    scrollToTopButton.style.borderRadius = "5px";
    scrollToTopButton.style.cursor = "pointer";
    scrollToTopButton.style.display = "none"; // Hidden by default

    document.body.appendChild(scrollToTopButton);

    // Show button when user scrolls down
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    });

    // Scroll to top on button click
    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Placeholder for adding more interactivity later
});

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('show');
}
