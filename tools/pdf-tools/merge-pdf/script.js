/* =========================================================
   QUICK TOOLS HUB
   PDF TOOLS - JAVASCRIPT
   PART 1
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Quick Tools Hub PDF Tools Loaded");


    /* =====================================================
       CATEGORY FILTER ELEMENTS
    ===================================================== */

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    const toolCards =
        document.querySelectorAll(".pdf-tool-card");


    /* =====================================================
       CATEGORY FILTER FUNCTION
    ===================================================== */

    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {


            /* ---------------------------------------------
               REMOVE ACTIVE FROM ALL BUTTONS
            --------------------------------------------- */

            categoryButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            /* ---------------------------------------------
               ADD ACTIVE TO CLICKED BUTTON
            --------------------------------------------- */

            this.classList.add("active");


            /* ---------------------------------------------
               GET SELECTED CATEGORY
            --------------------------------------------- */

            const selectedCategory =
                this.textContent
                    .trim()
                    .toLowerCase();


            /* ---------------------------------------------
               SHOW ALL TOOLS
            --------------------------------------------- */

            if (
                selectedCategory.includes("all")
            ) {

                toolCards.forEach(function (card) {

                    card.style.display = "flex";

                });

                return;

            }


            /* ---------------------------------------------
               FILTER TOOLS
            --------------------------------------------- */

            let categoryName = "";


            if (
                selectedCategory.includes("organize")
            ) {

                categoryName = "organize";

            }

            else if (
                selectedCategory.includes("convert")
            ) {

                categoryName = "convert";

            }

            else if (
                selectedCategory.includes("optimize")
            ) {

                categoryName = "optimize";

            }

            else if (
                selectedCategory.includes("security")
            ) {

                categoryName = "security";

            }


            /* ---------------------------------------------
               CHECK EACH TOOL
            --------------------------------------------- */

            toolCards.forEach(function (card) {

                const cardCategory =
                    card.getAttribute(
                        "data-category"
                    );


                if (
                    cardCategory === categoryName
                ) {

                    card.style.display =
                        "flex";

                }

                else {

                    card.style.display =
                        "none";

                }

            });

        });

    });



    /* =====================================================
       HERO SMOOTH SCROLL
    ===================================================== */

    const heroButtons =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    heroButtons.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const targetElement =
                    document.querySelector(
                        targetId
                    );


                if (
                    targetElement
                ) {

                    event.preventDefault();


                    targetElement.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            }
        );

    });



    /* =====================================================
       TOOL CARD ENTRANCE ANIMATION
    ===================================================== */

    const observerOptions = {

        threshold: 0.12

    };


    const toolObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                        }

                    }
                );

            },

            observerOptions

        );


    toolCards.forEach(function (card) {

        toolObserver.observe(card);

    });



    /* =====================================================
       FAQ ICON ANIMATION
    ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(function (faq) {

        faq.addEventListener(
            "toggle",
            function () {

                const icon =
                    faq.querySelector(
                        "summary i"
                    );


                if (
                    !icon
                ) {

                    return;

                }


                if (
                    faq.open
                ) {

                    icon.classList.add(
                        "faq-open"
                    );

                }

                else {

                    icon.classList.remove(
                        "faq-open"
                    );

                }

            }
        );

    });



    /* =====================================================
       ACTIVE NAVIGATION EFFECT
    ===================================================== */

    const currentPage =
        window.location.pathname;


    const navigationLinks =
        document.querySelectorAll(
            ".main-nav a"
        );


    navigationLinks.forEach(
        function (link) {

            const linkPath =
                link.getAttribute(
                    "href"
                );


            if (
                linkPath &&
                currentPage.includes(
                    "pdf-tools"
                )
            ) {

                if (
                    link.textContent
                        .trim()
                        .toLowerCase()
                        .includes("all tools")
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }

        }
    );



    /* =====================================================
       TOOL BUTTON HOVER EFFECT
    ===================================================== */

    const toolButtons =
        document.querySelectorAll(
            ".tool-btn"
        );


    toolButtons.forEach(function (button) {

        button.addEventListener(
            "mouseenter",
            function () {

                const arrow =
                    this.querySelector(
                        "i:last-child"
                    );


                if (
                    arrow
                ) {

                    arrow.style.transform =
                        "translateX(5px)";

                }

            }
        );


        button.addEventListener(
            "mouseleave",
            function () {

                const arrow =
                    this.querySelector(
                        "i:last-child"
                    );


                if (
                    arrow
                ) {

                    arrow.style.transform =
                        "translateX(0)";

                }

            }
        );

    });



    /* =====================================================
       PAGE LOAD COMPLETE
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


});
/* =====================================================
   PDF TOOLKIT - SCRIPT.JS
   PART 2
   CATEGORY FILTER SYSTEM
===================================================== */


/* =====================================================
   CATEGORY FILTER
===================================================== */

const categoryButtons = document.querySelectorAll(".category-btn");

const pdfToolCards = document.querySelectorAll(".pdf-tool-card");


categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {


        /* =========================
           REMOVE ACTIVE CLASS
        ========================== */

        categoryButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        /* =========================
           ADD ACTIVE CLASS
        ========================== */

        this.classList.add("active");


        /* =========================
           GET CATEGORY
        ========================== */

        const selectedCategory =
            this.textContent.trim().toLowerCase();


        /* =========================
           FILTER TOOLS
        ========================== */

        pdfToolCards.forEach(function(card) {


            const cardCategory =
                card.getAttribute("data-category");


            /* =========================
               ALL TOOLS
            ========================== */

            if (
                selectedCategory === "all tools"
            ) {

                card.style.display = "flex";

                setTimeout(function() {

                    card.classList.remove("filter-hidden");

                }, 10);

            }


            /* =========================
               SELECTED CATEGORY
            ========================== */

            else if (
                cardCategory === selectedCategory
            ) {

                card.style.display = "flex";

                setTimeout(function() {

                    card.classList.remove("filter-hidden");

                }, 10);

            }


            /* =========================
               HIDE OTHER CARDS
            ========================== */

            else {

                card.classList.add("filter-hidden");

                setTimeout(function() {

                    card.style.display = "none";

                }, 250);

            }

        });

    });

});



/* =====================================================
   FAQ ACCORDION
===================================================== */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(function(item) {


    item.addEventListener("toggle", function() {


        if (item.open) {


            faqItems.forEach(function(otherItem) {


                if (otherItem !== item) {

                    otherItem.removeAttribute("open");

                }

            });

        }

    });

});



/* =====================================================
   SMOOTH SCROLL
===================================================== */

const smoothScrollLinks =
    document.querySelectorAll('a[href^="#"]');


smoothScrollLinks.forEach(function(link) {


    link.addEventListener("click", function(event) {


        const targetId =
            this.getAttribute("href");


        if (
            targetId === "#" ||
            targetId === ""
        ) {

            return;

        }


        const targetElement =
            document.querySelector(targetId);


        if (targetElement) {


            event.preventDefault();


            targetElement.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});



/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".pdf-tool-card, .step-card, .privacy-card, .faq-item, .final-cta-content"
    );


const revealObserver =
    new IntersectionObserver(

        function(entries) {


            entries.forEach(function(entry) {


                if (entry.isIntersecting) {


                    entry.target.classList.add(
                        "reveal-visible"
                    );


                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {

            threshold: 0.12

        }

    );


revealElements.forEach(function(element) {


    element.classList.add(
        "reveal-element"
    );


    revealObserver.observe(
        element
    );

});



/* =====================================================
   BUTTON RIPPLE EFFECT
===================================================== */

const actionButtons =
    document.querySelectorAll(
        ".primary-btn, .secondary-btn, .tool-btn, .upload-cta-btn"
    );


actionButtons.forEach(function(button) {


    button.addEventListener(
        "click",
        function(event) {


            const ripple =
                document.createElement(
                    "span"
                );


            ripple.classList.add(
                "button-ripple"
            );


            const rect =
                button.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            ripple.style.left =
                x + "px";


            ripple.style.top =
                y + "px";


            button.appendChild(
                ripple
            );


            setTimeout(function() {

                ripple.remove();

            }, 600);

        }

    );

});



/* =====================================================
   END OF PART 2
===================================================== */

/* =====================================================
   PDF TOOLKIT - SCRIPT.JS
   PART 3
   PREMIUM INTERACTIONS + FINAL POLISH
===================================================== */


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

const siteHeader =
    document.querySelector(".site-header");


window.addEventListener("scroll", function() {

    if (!siteHeader) {
        return;
    }


    if (window.scrollY > 30) {

        siteHeader.classList.add(
            "header-scrolled"
        );

    } else {

        siteHeader.classList.remove(
            "header-scrolled"
        );

    }

});



/* =====================================================
   ACTIVE NAVIGATION EFFECT
===================================================== */

const navLinks =
    document.querySelectorAll(
        ".main-nav a"
    );


navLinks.forEach(function(link) {


    link.addEventListener(
        "click",
        function() {


            navLinks.forEach(
                function(navLink) {

                    navLink.classList.remove(
                        "nav-active"
                    );

                }
            );


            this.classList.add(
                "nav-active"
            );

        }
    );

});



/* =====================================================
   TOOL CARD HOVER EFFECT
===================================================== */

pdfToolCards.forEach(function(card) {


    card.addEventListener(
        "mouseenter",
        function() {

            this.classList.add(
                "card-hover-active"
            );

        }
    );


    card.addEventListener(
        "mouseleave",
        function() {

            this.classList.remove(
                "card-hover-active"
            );

        }
    );

});



/* =====================================================
   PARALLAX BACKGROUND EFFECT
===================================================== */

const floatingShapes =
    document.querySelectorAll(
        ".floating-shape"
    );


window.addEventListener(
    "mousemove",
    function(event) {


        const mouseX =
            (event.clientX /
                window.innerWidth) -
            0.5;


        const mouseY =
            (event.clientY /
                window.innerHeight) -
            0.5;


        floatingShapes.forEach(
            function(shape, index) {


                const movement =
                    (index + 1) * 10;


                shape.style.transform =
                    "translate(" +
                    (mouseX * movement) +
                    "px, " +
                    (mouseY * movement) +
                    "px)";

            }
        );

    }
);



/* =====================================================
   HERO PDF ICON PARALLAX
===================================================== */

const floatingPdfIcons =
    document.querySelectorAll(
        ".floating-pdf-icon"
    );


window.addEventListener(
    "mousemove",
    function(event) {


        const x =
            (event.clientX /
                window.innerWidth) -
            0.5;


        const y =
            (event.clientY /
                window.innerHeight) -
            0.5;


        floatingPdfIcons.forEach(
            function(icon, index) {


                const speed =
                    (index + 1) * 8;


                icon.style.marginLeft =
                    (x * speed) + "px";


                icon.style.marginTop =
                    (y * speed) + "px";

            }
        );

    }
);



/* =====================================================
   BUTTON LOADING EFFECT
===================================================== */

const toolButtons =
    document.querySelectorAll(
        ".tool-btn"
    );


toolButtons.forEach(function(button) {


    button.addEventListener(
        "click",
        function() {


            const originalText =
                this.innerHTML;


            this.classList.add(
                "button-loading"
            );


            this.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Opening...';


            const currentButton =
                this;


            setTimeout(
                function() {


                    currentButton.classList.remove(
                        "button-loading"
                    );


                    currentButton.innerHTML =
                        originalText;


                },
                1200
            );

        }
    );

});



/* =====================================================
   ESC KEY - CLOSE FAQ
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {


        if (
            event.key === "Escape"
        ) {


            faqItems.forEach(
                function(item) {

                    item.removeAttribute(
                        "open"
                    );

                }
            );

        }

    }
);



/* =====================================================
   PAGE LOAD ANIMATION
===================================================== */

window.addEventListener(
    "load",
    function() {


        document.body.classList.add(
            "page-loaded"
        );


        setTimeout(
            function() {


                const heroContent =
                    document.querySelector(
                        ".hero-content"
                    );


                if (heroContent) {

                    heroContent.classList.add(
                        "hero-loaded"
                    );

                }


            },
            150
        );

    }
);



/* =====================================================
   PREVENT EMPTY ANCHOR JUMP
===================================================== */

document.querySelectorAll(
    'a[href="#"]'
).forEach(function(link) {


    link.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

        }
    );

});



/* =====================================================
   MOBILE MENU FALLBACK
===================================================== */

if (
    window.innerWidth <= 768
) {


    document.body.classList.add(
        "mobile-device"
    );

}



/* =====================================================
   WINDOW RESIZE HANDLER
===================================================== */

window.addEventListener(
    "resize",
    function() {


        if (
            window.innerWidth <= 768
        ) {

            document.body.classList.add(
                "mobile-device"
            );

        } else {

            document.body.classList.remove(
                "mobile-device"
            );

        }

    }
);



/* =====================================================
   CONSOLE STATUS
===================================================== */

console.log(
    "Quick Tools Hub PDF Toolkit loaded successfully."
);


console.log(
    "PDF Tools: " +
    pdfToolCards.length
);


console.log(
    "Category Filters: " +
    categoryButtons.length
);


console.log(
    "FAQ Items: " +
    faqItems.length
);



/* =====================================================
   END OF PDF TOOLKIT SCRIPT
===================================================== */
