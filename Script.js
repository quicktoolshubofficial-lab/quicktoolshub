// ==========================
// Quick Tools Official v1.0
// script.js
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    console.log("✅ Quick Tools Official Loaded");

    // Hero Button
    const heroButton = document.querySelector(".hero button");

    if (heroButton) {
        heroButton.addEventListener("click", () => {
            alert("🚀 Welcome to Quick Tools Official!\n\n100+ Free Online Tools Coming Soon.");
        });
    }

    // Search Box
    const searchInput = document.querySelector(".hero input");

    if (searchInput) {

        searchInput.addEventListener("keypress", function(event){

            if(event.key === "Enter"){

                let value = searchInput.value.trim();

                if(value === ""){

                    alert("Please enter a tool name.");

                }else{

                    alert("Searching for: " + value + "\n\nSearch feature will be available soon.");

                }

            }

        });

    }

    // Tool Cards Click

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            alert(card.innerText + "\n\nThis tool is under development.");

        });

    });

});
