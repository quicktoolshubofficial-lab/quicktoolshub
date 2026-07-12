// ===============================
// Quick Tools Official v2.0
// script.js
// ===============================

// Smooth Scroll for Navigation
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
        const target = this.getAttribute("href");

        if (target.startsWith("#")) {
            e.preventDefault();

            const section = document.querySelector(target);

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    });
});

// Search Function
const searchInput = document.getElementById("search");

if (searchInput) {

    searchInput.addEventListener("keyup", function(){

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".tool-card");

        cards.forEach(card=>{

            const text = card.innerText.toLowerCase();

            if(text.includes(value)){
                card.style.display="block";
            }else{
                card.style.display="none";
            }

        });

    });

}

// Explore Button
const heroBtn = document.querySelector(".hero-btn");

if(heroBtn){

heroBtn.addEventListener("click",()=>{

document.getElementById("tools").scrollIntoView({
behavior:"smooth"
});

});

}

// Open Tool Buttons
document.querySelectorAll(".tool-card button").forEach(button=>{

button.addEventListener("click",()=>{

alert("🚀 This tool will be available in the next update.");

});

});

// Footer Year
const footer=document.querySelector("footer p");

if(footer){

const year=new Date().getFullYear();

footer.innerHTML=`© ${year} Quick Tools Official. All Rights Reserved.`;

}
