document.addEventListener("DOMContentLoaded", function () {
    /** 📌 Quick Assists Click Handling **/
    const assistLinks = document.querySelectorAll(".quick-assists a");
    assistLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            alert(`Feature for ${link.textContent} coming soon!`);
        });
    });

    /** 📌 Handle Accordion & Screen Resizing **/
    function handleScreenResize() {
        const accordions = document.querySelectorAll(".accordion");
        const isMobile = window.innerWidth <= 768;

        accordions.forEach(button => {
            const panel = button.nextElementSibling;

            if (isMobile) {
                panel.style.maxHeight = null; // Collapse on small screens

                // Add event listener only if not already added
                if (!button.hasAttribute("data-listener")) {
                    button.addEventListener("click", togglePanel);
                    button.setAttribute("data-listener", "true"); // Prevent duplicate listeners
                }
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px"; // Always expanded on large screens
                panel.style.display = "block"; // Ensure visibility
                button.removeEventListener("click", togglePanel);
                button.removeAttribute("data-listener"); // Allow re-adding if resized back to mobile
            }
        });
    }

    function togglePanel() {
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null; // Collapse
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px"; // Expand
        }
    }

    window.addEventListener("resize", handleScreenResize);
    handleScreenResize(); // Run on page load

    /** 📌 Dictionary API Fetch **/
    const searchInput = document.getElementById("search-input"); // Input field
    const searchButton = document.getElementById("search-button"); // Search button
    const resultContainer = document.getElementById("search-results"); // Where results show

    async function fetchDefinition(word) {
        if (!word) {
            resultContainer.innerHTML = "<p style='color:red;'>Please enter a word.</p>";
            return;
        }

        try {
            resultContainer.innerHTML = "<p>Loading...</p>"; // Show loading state
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!response.ok) {
                throw new Error("Word not found");
            }
            const data = await response.json();
            displayDefinition(data);
        } catch (error) {
            resultContainer.innerHTML = `<p style='color:red;'>${error.message}</p>`;
        }
    }

    function displayDefinition(data) {
        const wordData = data[0];
        const meanings = wordData.meanings.map(meaning => `
            <div>
                <strong>${meaning.partOfSpeech}</strong>: ${meaning.definitions[0].definition}
            </div>
        `).join("<br>");
        
        resultContainer.innerHTML = `
            <h3>${wordData.word}</h3>
            ${meanings}
        `;
    }

    // Search button click event
    searchButton.addEventListener("click", function () {
        const word = searchInput.value.trim();
        fetchDefinition(word);
    });

    // Allow "Enter" key to trigger search
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchButton.click();
        }
    });
});
