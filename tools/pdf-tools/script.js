/*=====================================
        QUICK TOOLS HUB V2
        PROFESSIONAL SCRIPT
=====================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
            MOBILE MENU
    ==============================*/

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (mobileMenu.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }

    /*==============================
            SEARCH
    ==============================*/

    const searchInput = document.getElementById("toolSearch");
    const clearBtn = document.getElementById("clearSearch");
    const cards = document.querySelectorAll(".tool-card");

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const value = searchInput.value.toLowerCase();

            cards.forEach(card => {

                const title = card.querySelector("h3").innerText.toLowerCase();

                const text = card.innerText.toLowerCase();

                if (
                    title.includes(value) ||
                    text.includes(value)
                ) {

                    card.style.display = "flex";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }

    if (clearBtn) {

        clearBtn.addEventListener("click", () => {

            searchInput.value = "";

            cards.forEach(card => {

                card.style.display = "flex";

            });

        });

    }

    /*==============================
          CATEGORY FILTER
    ==============================*/

    const buttons = document.querySelectorAll(".category");

    buttons.forEach(btn => {

        btn.addEventListener("click", () => {

            buttons.forEach(b =>
                b.classList.remove("active")
            );

            btn.classList.add("active");

            const category = btn.dataset.category;

            cards.forEach(card => {

                if (
                    category === "all" ||
                    card.dataset.category === category
                ) {

                    card.style.display = "flex";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });

});
/*=====================================
        SCROLL TO TOP
=====================================*/

const scrollTopBtn = document.createElement("div");

scrollTopBtn.className = "scroll-top";

scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

scrollTopBtn.classList.add("show");

}else{

scrollTopBtn.classList.remove("show");

}

});

scrollTopBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

/*=====================================
        HEADER SHADOW
=====================================*/

const header=document.querySelector(".header");

window.addEventListener("scroll",()=>{

if(window.scrollY>50){

header.style.boxShadow="0 15px 40px rgba(0,0,0,.08)";

}else{

header.style.boxShadow="none";

}

});

/*=====================================
        CARD ANIMATION
=====================================*/

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

},{
threshold:.15
});

document.querySelectorAll(".tool-card,.step-card,.feature-card,.faq-item").forEach(el=>{

el.style.opacity="0";

el.style.transform="translateY(40px)";

el.style.transition=".6s ease";

observer.observe(el);

});

/*=====================================
        ACTIVE NAV LINK
=====================================*/

const navLinks=document.querySelectorAll(".navbar a");

window.addEventListener("scroll",()=>{

let current="";

document.querySelectorAll("section").forEach(section=>{

const top=section.offsetTop-120;

if(window.scrollY>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/*=====================================
        LOADER
=====================================*/

window.addEventListener("load",()=>{

const loader=document.querySelector(".loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.remove();

},500);

}

});

/*=====================================
        RIPPLE EFFECT
=====================================*/

document.querySelectorAll(".tool-btn").forEach(btn=>{

btn.addEventListener("click",function(e){

const ripple=document.createElement("span");

const rect=this.getBoundingClientRect();

ripple.style.left=(e.clientX-rect.left)+"px";

ripple.style.top=(e.clientY-rect.top)+"px";

ripple.className="ripple";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

console.log("Quick Tools Hub v2 Loaded Successfully 🚀");
