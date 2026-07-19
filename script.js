// ===============================
// QUICK TOOLS OFFICIAL V3
// script.js - Part 1
// ===============================

// Elements
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

// ===============================
// Sidebar Open / Close
// ===============================

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");

    });

}

if(overlay){

    overlay.addEventListener("click",()=>{

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

    });

}

// ===============================
// Smooth Scroll Navigation
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link=>{

    link.addEventListener("click",function(e){

        const target=this.getAttribute("href");

        if(target!=="#"){

            e.preventDefault();

            document.querySelector(target).scrollIntoView({

                behavior:"smooth"

            });

        }

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

    });

});

// ===============================
// Search Filter
// ===============================

const searchInput=document.querySelector(".search-box input");

if(searchInput){

searchInput.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

document.querySelectorAll(".tool-card").forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=text.includes(value)?"block":"none";
    

});

});

}
// ===============================
// Active Navigation on Scroll
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

// ===============================
// Header Shadow on Scroll
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {

        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.12)";

    } else {

        header.style.boxShadow = "0 6px 20px rgba(0,0,0,.08)";

    }

});

// ===============================
// Tool Card Animation
// ===============================

const cards = document.querySelectorAll(".tool-card");

cards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all .5s ease";

    setTimeout(() => {

        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    }, index * 120);

});

// ===============================
// Coming Soon Buttons
// ===============================

document.querySelectorAll(".tool-btn.disabled").forEach(btn => {

    btn.addEventListener("click", function (e) {

        e.preventDefault();

        alert("🚀 This tool is coming soon!");

    });

});

// ===============================
// Footer Year
// ===============================

const footer = document.querySelector("footer p");

if (footer) {

    const year = new Date().getFullYear();

    footer.innerHTML =
        `&copy; ${year} Quick Tools Official. All Rights Reserved.`;

}

// ===============================
// End of Script
// ===============================
// Close Button

const closeBtn = document.getElementById("close-btn");

if(closeBtn){

closeBtn.addEventListener("click",()=>{

sidebar.classList.remove("active");

overlay.classList.remove("active");

});

}
// ===============================
// Glass Header Effect
// ===============================

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});
// ===============================
// Hero Button Ripple Effect
// ===============================

document.querySelectorAll(".primary-btn, .secondary-btn").forEach(button=>{

    button.addEventListener("mouseenter",()=>{

        button.style.transition="all .3s ease";

    });

});
