// Script for Help Page Interactivity

document.addEventListener("DOMContentLoaded", () => {
    // Add interactivity for FAQ items
    const assistLinks = document.querySelectorAll(".quick-assists a");

    assistLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            alert(`Feature for ${link.textContent} coming soon!`);
        });
    });

    // Example: Toggle contact info visibility
    const contactUs = document.querySelector(".contact-us");
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Contact Info";
    toggleButton.style.margin = "20px auto";
    toggleButton.style.display = "block";
    toggleButton.style.padding = "10px 20px";
    toggleButton.style.fontSize = "1rem";

    toggleButton.addEventListener("click", () => {
        contactUs.style.display = contactUs.style.display === "none" ? "flex" : "none";
    });

    document.body.insertBefore(toggleButton, contactUs);
});
