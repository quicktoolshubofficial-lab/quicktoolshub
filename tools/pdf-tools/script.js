/* =========================================================
   PDF TOOLS - SCRIPT.JS
   PART 1
   ========================================================= */


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENT SELECTORS
    ===================================================== */

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    const toolCards =
        document.querySelectorAll(".pdf-tool-card");

    const faqItems =
        document.querySelectorAll(".faq-item");

    const primaryButtons =
        document.querySelectorAll(".primary-btn");

    const toolButtons =
        document.querySelectorAll(".tool-btn");


    /* =====================================================
       PDF TOOL CATEGORY FILTER
    ===================================================== */

    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {


            /* REMOVE ACTIVE FROM ALL BUTTONS */

            categoryButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            /* ADD ACTIVE TO CLICKED BUTTON */

            this.classList.add("active");


            /* GET SELECTED CATEGORY */

            const selectedCategory =
                this.textContent
                .trim()
                .toLowerCase();


            /* SHOW / HIDE TOOL CARDS */

            toolCards.forEach(function (card) {


                const cardCategory =
                    card.dataset.category;


                /* ALL TOOLS */

                if (
                    selectedCategory === "all tools"
                ) {

                    showToolCard(card);

                }


                /* MATCH CATEGORY */

                else if (
                    cardCategory === selectedCategory
                ) {

                    showToolCard(card);

                }


                /* HIDE OTHER CATEGORIES */

                else {

                    hideToolCard(card);

                }

            });

        });

    });


    /* =====================================================
       SHOW TOOL CARD
    ===================================================== */

    function showToolCard(card) {

        card.style.display = "block";


        /* Small animation */

        card.style.opacity = "0";

        card.style.transform =
            "translateY(15px)";


        requestAnimationFrame(function () {

            card.style.transition =
                "opacity 0.3s ease, transform 0.3s ease";

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0)";

        });

    }


    /* =====================================================
       HIDE TOOL CARD
    ===================================================== */

    function hideToolCard(card) {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(15px)";


        setTimeout(function () {

            card.style.display = "none";

        }, 250);

    }


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    faqItems.forEach(function (item) {


        item.addEventListener("toggle", function () {


            /* Only run when opened */

            if (!item.open) {

                return;

            }


            /* Close other FAQ items */

            faqItems.forEach(function (otherItem) {

                if (
                    otherItem !== item &&
                    otherItem.open
                ) {

                    otherItem.open = false;

                }

            });

        });

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const smoothScrollLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    smoothScrollLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {


            const targetId =
                this.getAttribute("href");


            /* Ignore empty hash */

            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const targetElement =
                document.querySelector(targetId);


            /* If target exists */

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
       TOOL CARD HOVER EFFECT
    ===================================================== */

    toolCards.forEach(function (card) {


        card.addEventListener(
            "mouseenter",
            function () {

                this.classList.add(
                    "is-hovered"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                this.classList.remove(
                    "is-hovered"
                );

            }
        );

    });


    /* =====================================================
       BUTTON CLICK EFFECT
    ===================================================== */

    const allButtons =
        document.querySelectorAll(
            "button, .primary-btn, .secondary-btn, .tool-btn, .upload-cta-btn"
        );


    allButtons.forEach(function (button) {


        button.addEventListener(
            "mousedown",
            function () {

                this.classList.add(
                    "button-pressed"
                );

            }
        );


        button.addEventListener(
            "mouseup",
            function () {

                this.classList.remove(
                    "button-pressed"
                );

            }
        );


        button.addEventListener(
            "mouseleave",
            function () {

                this.classList.remove(
                    "button-pressed"
                );

            }
        );

    });


    /* =====================================================
       SCROLL REVEAL OBSERVER
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".pdf-tool-card, .step-card, .privacy-card, .faq-item"
        );


    const revealObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {


                    if (
                        entry.isIntersecting
                    ) {

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


    revealElements.forEach(function (element) {

        element.classList.add(
            "reveal-hidden"
        );


        revealObserver.observe(
            element
        );

    });


});
/* =========================================================
   PDF TOOLS - SCRIPT.JS
   PART 2
   ========================================================= */


/* =========================================================
   FAQ ICON ANIMATION
   ========================================================= */

const faqList =
    document.querySelectorAll(".faq-item");


faqList.forEach(function (faq) {

    const icon =
        faq.querySelector("summary i");


    if (!icon) {

        return;

    }


    faq.addEventListener("toggle", function () {


        if (faq.open) {

            icon.classList.remove(
                "fa-plus"
            );

            icon.classList.add(
                "fa-minus"
            );

        }

        else {

            icon.classList.remove(
                "fa-minus"
            );

            icon.classList.add(
                "fa-plus"
            );

        }

    });

});



/* =========================================================
   ACTIVE NAVIGATION ON SCROLL
   ========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navigationLinks =
    document.querySelectorAll(
        ".main-nav a"
    );


window.addEventListener(
    "scroll",
    function () {


        let currentSection = "";


        sections.forEach(function (section) {


            const sectionTop =
                section.offsetTop - 150;


            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(
            function (link) {


                link.classList.remove(
                    "active"
                );


                const linkTarget =
                    link.getAttribute(
                        "href"
                    );


                if (
                    linkTarget &&
                    linkTarget.includes(
                        "#" + currentSection
                    )
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);



/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

const header =
    document.querySelector(
        ".site-header"
    );


window.addEventListener(
    "scroll",
    function () {


        if (!header) {

            return;

        }


        if (window.scrollY > 50) {

            header.classList.add(
                "header-scrolled"
            );

        }

        else {

            header.classList.remove(
                "header-scrolled"
            );

        }

    }
);



/* =========================================================
   TOOL CARD STAGGER ANIMATION
   ========================================================= */

const cards =
    document.querySelectorAll(
        ".pdf-tool-card"
    );


cards.forEach(
    function (card, index) {


        card.style.setProperty(
            "--card-delay",
            (index * 0.05) + "s"
        );


    }
);



/* =========================================================
   BUTTON RIPPLE EFFECT
   ========================================================= */

const rippleButtons =
    document.querySelectorAll(
        ".primary-btn, .secondary-btn, .tool-btn, .upload-cta-btn, .category-btn"
    );


rippleButtons.forEach(
    function (button) {


        button.addEventListener(
            "click",
            function (event) {


                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.classList.add(
                    "button-ripple"
                );


                const rect =
                    button.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                ripple.style.width =
                    size + "px";


                ripple.style.height =
                    size + "px";


                ripple.style.left =
                    (
                        event.clientX -
                        rect.left -
                        size / 2
                    ) + "px";


                ripple.style.top =
                    (
                        event.clientY -
                        rect.top -
                        size / 2
                    ) + "px";


                button.appendChild(
                    ripple
                );


                setTimeout(
                    function () {

                        ripple.remove();

                    },
                    600
                );


            }
        );

    }
);



/* =========================================================
   BACK TO TOP BUTTON
   ========================================================= */

const backToTop =
    document.createElement(
        "button"
    );


backToTop.className =
    "back-to-top";


backToTop.setAttribute(
    "type",
    "button"
);


backToTop.setAttribute(
    "aria-label",
    "Back to top"
);


backToTop.innerHTML =
    '<i class="fa-solid fa-arrow-up"></i>';


document.body.appendChild(
    backToTop
);



/* =========================================================
   BACK TO TOP VISIBILITY
   ========================================================= */

window.addEventListener(
    "scroll",
    function () {


        if (
            window.scrollY > 500
        ) {

            backToTop.classList.add(
                "show"
            );

        }

        else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);



/* =========================================================
   BACK TO TOP ACTION
   ========================================================= */

backToTop.addEventListener(
    "click",
    function () {


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);



/* =========================================================
   PREVENT EMPTY TOOL LINKS
   ========================================================= */

toolButtons.forEach(
    function (button) {


        button.addEventListener(
            "click",
            function (event) {


                const href =
                    this.getAttribute(
                        "href"
                    );


                if (
                    !href ||
                    href === "#"
                ) {

                    event.preventDefault();

                }

            }
        );

    }
);



/* =========================================================
   PAGE LOADED ANIMATION
   ========================================================= */

window.addEventListener(
    "load",
    function () {


        document.body.classList.add(
            "page-loaded"
        );


    }
);



/* =========================================================
   REDUCE MOTION ACCESSIBILITY
   ========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (
    prefersReducedMotion.matches
) {


    document.documentElement.style.scrollBehavior =
        "auto";


    revealElements.forEach(
        function (element) {

            element.classList.add(
                "reveal-visible"
            );

        }
    );

}



/* =========================================================
   PDF TOOL SEARCH SUPPORT
   ========================================================= */

function searchPDFTools(
    searchTerm
) {


    const search =
        searchTerm
        .toLowerCase()
        .trim();


    toolCards.forEach(
        function (card) {


            const title =
                card.querySelector(
                    "h3"
                );


            const description =
                card.querySelector(
                    "p"
                );


            if (
                !title ||
                !description
            ) {

                return;

            }


            const titleText =
                title.textContent
                .toLowerCase();


            const descriptionText =
                description.textContent
                .toLowerCase();


            if (
                titleText.includes(search) ||
                descriptionText.includes(search)
            ) {

                showToolCard(card);

            }

            else {

                hideToolCard(card);

            }

        }
    );

}



/* =========================================================
   GLOBAL PDF TOOLS OBJECT
   ========================================================= */

window.PDFTools =
    {

        search:
            searchPDFTools,


        showAll:
            function () {


                toolCards.forEach(
                    function (card) {

                        showToolCard(card);

                    }
                );

            },


        scrollToTools:
            function () {


                const toolsSection =
                    document.querySelector(
                        "#pdf-tools"
                    );


                if (
                    toolsSection
                ) {

                    toolsSection.scrollIntoView({

                        behavior: "smooth"

                    });

                }

            }

    };
/* =========================================================
   PDF TOOLS - SCRIPT.JS
   PART 3 - FINAL
   ========================================================= */


/* =========================================================
   TOOL CARD KEYBOARD ACCESSIBILITY
   ========================================================= */

toolCards.forEach(function (card) {

    card.setAttribute(
        "tabindex",
        "0"
    );


    card.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                const toolLink =
                    card.querySelector(
                        ".tool-btn"
                    );


                if (toolLink) {

                    event.preventDefault();

                    toolLink.click();

                }

            }

        }
    );

});



/* =========================================================
   CATEGORY BUTTON KEYBOARD SUPPORT
   ========================================================= */

categoryButtons.forEach(function (button) {

    button.addEventListener(
        "keydown",
        function (event) {


            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                this.click();

            }

        }
    );

});



/* =========================================================
   HERO PARALLAX EFFECT
   ========================================================= */

const heroSection =
    document.querySelector(
        ".hero-section"
    );


const floatingIcons =
    document.querySelectorAll(
        ".floating-pdf-icon"
    );


if (
    heroSection &&
    floatingIcons.length > 0
) {


    heroSection.addEventListener(
        "mousemove",
        function (event) {


            const rect =
                heroSection.getBoundingClientRect();


            const mouseX =
                event.clientX -
                rect.left;


            const mouseY =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const moveX =
                (mouseX - centerX) /
                centerX;


            const moveY =
                (mouseY - centerY) /
                centerY;


            floatingIcons.forEach(
                function (icon, index) {


                    const intensity =
                        (index + 1) * 5;


                    icon.style.transform =
                        "translate(" +
                        (moveX * intensity) +
                        "px, " +
                        (moveY * intensity) +
                        "px)";

                }
            );


        }
    );


    heroSection.addEventListener(
        "mouseleave",
        function () {


            floatingIcons.forEach(
                function (icon) {


                    icon.style.transform =
                        "";

                }
            );

        }
    );

}



/* =========================================================
   UPLOAD CTA HOVER EFFECT
   ========================================================= */

const uploadSection =
    document.querySelector(
        ".premium-upload-section"
    );


if (
    uploadSection
) {


    uploadSection.addEventListener(
        "mouseenter",
        function () {

            this.classList.add(
                "upload-active"
            );

        }
    );


    uploadSection.addEventListener(
        "mouseleave",
        function () {

            this.classList.remove(
                "upload-active"
            );

        }
    );

}



/* =========================================================
   PRIVACY CARD INTERACTION
   ========================================================= */

const privacyCard =
    document.querySelector(
        ".privacy-card"
    );


if (
    privacyCard
) {


    privacyCard.addEventListener(
        "mouseenter",
        function () {

            this.classList.add(
                "privacy-active"
            );

        }
    );


    privacyCard.addEventListener(
        "mouseleave",
        function () {

            this.classList.remove(
                "privacy-active"
            );

        }
    );

}



/* =========================================================
   SECTION REVEAL ANIMATION
   ========================================================= */

const sectionsToReveal =
    document.querySelectorAll(
        ".section-heading, .premium-upload-section, .final-cta-content"
    );


const sectionObserver =
    new IntersectionObserver(

        function (entries) {


            entries.forEach(
                function (entry) {


                    if (
                        entry.isIntersecting
                    ) {


                        entry.target.classList.add(
                            "section-visible"
                        );


                        sectionObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {

            threshold: 0.15

        }

    );


sectionsToReveal.forEach(
    function (element) {


        element.classList.add(
            "section-hidden"
        );


        sectionObserver.observe(
            element
        );

    }
);



/* =========================================================
   MOBILE MENU FALLBACK
   ========================================================= */

const mainNav =
    document.querySelector(
        ".main-nav"
    );


if (
    mainNav
) {


    window.addEventListener(
        "resize",
        function () {


            if (
                window.innerWidth > 768
            ) {

                mainNav.classList.remove(
                    "mobile-nav-open"
                );

            }

        }
    );

}



/* =========================================================
   TOOL CARD LINK PRELOADER
   ========================================================= */

toolButtons.forEach(
    function (button) {


        button.addEventListener(
            "click",
            function () {


                const originalText =
                    this.innerHTML;


                this.classList.add(
                    "loading"
                );


                this.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Opening...';


                setTimeout(
                    function () {


                        button.classList.remove(
                            "loading"
                        );


                        button.innerHTML =
                            originalText;


                    },
                    1500
                );

            }
        );

    }
);



/* =========================================================
   ESCAPE KEY SUPPORT
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {


        if (
            event.key === "Escape"
        ) {


            faqItems.forEach(
                function (item) {


                    if (
                        item.open
                    ) {

                        item.open =
                            false;

                    }

                }
            );


        }

    }
);



/* =========================================================
   INITIALIZE DEFAULT CATEGORY
   ========================================================= */

function initializePDFTools() {


    categoryButtons.forEach(
        function (button) {


            if (
                button.classList.contains(
                    "active"
                )
            ) {

                return;

            }

        }
    );


    toolCards.forEach(
        function (card) {

            card.style.display =
                "block";

        }
    );

}



/* =========================================================
   INITIALIZE FAQ ICONS
   ========================================================= */

function initializeFAQIcons() {


    faqItems.forEach(
        function (item) {


            const icon =
                item.querySelector(
                    "summary i"
                );


            if (
                !icon
            ) {

                return;

            }


            if (
                item.open
            ) {


                icon.classList.remove(
                    "fa-plus"
                );


                icon.classList.add(
                    "fa-minus"
                );

            }

            else {


                icon.classList.remove(
                    "fa-minus"
                );


                icon.classList.add(
                    "fa-plus"
                );

            }

        }
    );

}



/* =========================================================
   INITIAL PAGE SETUP
   ========================================================= */

initializePDFTools();

initializeFAQIcons();



/* =========================================================
   CONSOLE STATUS
   ========================================================= */

console.log(
    "Quick Tools Hub PDF Tools loaded successfully."
);

console.log(
    "PDF Tools:",
    toolCards.length
);

console.log(
    "Categories:",
    categoryButtons.length
);

console.log(
    "FAQ Items:",
    faqItems.length
);



/* =========================================================
   FINAL INITIALIZATION
   ========================================================= */

document.body.classList.add(
    "pdf-tools-ready"
);
