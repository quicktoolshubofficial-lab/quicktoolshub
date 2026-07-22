/* ==========================================
   QUICK TOOLS HUB
   PDF TOOLS - SCRIPT.JS
   PART 1
========================================== */


/* ==========================================
   PAGE READY
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        console.log(
            "Quick Tools Hub PDF Tools Loaded"
        );


        /* ==========================================
           CATEGORY BUTTONS
        ========================================== */

        const categoryButtons =
            document.querySelectorAll(
                ".category-btn"
            );


        /* ==========================================
           PDF TOOL CARDS
        ========================================== */

        const toolCards =
            document.querySelectorAll(
                ".pdf-tool-card"
            );


        /* ==========================================
           CATEGORY FILTER SYSTEM
        ========================================== */

        categoryButtons.forEach(
            function (button) {


                button.addEventListener(
                    "click",
                    function () {


                        /* ==========================
                           REMOVE ACTIVE CLASS
                        ========================== */

                        categoryButtons.forEach(
                            function (btn) {

                                btn.classList.remove(
                                    "active"
                                );

                            }
                        );


                        /* ==========================
                           ACTIVE BUTTON
                        ========================== */

                        button.classList.add(
                            "active"
                        );


                        /* ==========================
                           GET CATEGORY NAME
                        ========================== */

                        const categoryName =
                            button.textContent
                                .trim()
                                .toLowerCase();


                        /* ==========================
                           SHOW ALL TOOLS
                        ========================== */

                        if (
                            categoryName.includes(
                                "all tools"
                            )
                        ) {


                            toolCards.forEach(
                                function (card) {

                                    showCard(
                                        card
                                    );

                                }
                            );


                            return;

                        }


                        /* ==========================
                           FILTER CATEGORY
                        ========================== */

                        toolCards.forEach(
                            function (card) {


                                const cardCategory =
                                    card.getAttribute(
                                        "data-category"
                                    );


                                if (
                                    categoryName.includes(
                                        cardCategory
                                    )
                                ) {


                                    showCard(
                                        card
                                    );


                                }

                                else {


                                    hideCard(
                                        card
                                    );


                                }

                            }
                        );


                    }
                );

            }
        );


        /* ==========================================
           SHOW TOOL CARD
        ========================================== */

        function showCard(
            card
        ) {


            card.style.display =
                "flex";


            /* Reset animation */

            card.classList.remove(
                "filter-card-show"
            );


            /* Trigger animation */

            setTimeout(
                function () {

                    card.classList.add(
                        "filter-card-show"
                    );

                },
                20
            );


        }


        /* ==========================================
           HIDE TOOL CARD
        ========================================== */

        function hideCard(
            card
        ) {


            card.classList.remove(
                "filter-card-show"
            );


            card.style.display =
                "none";


        }


        /* ==========================================
           SMOOTH SCROLL
        ========================================== */

        const anchorLinks =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        anchorLinks.forEach(
            function (link) {


                link.addEventListener(
                    "click",
                    function (event) {


                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        /* Ignore empty links */

                        if (
                            !targetId ||
                            targetId === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (
                            target
                        ) {


                            event.preventDefault();


                            target.scrollIntoView(
                                {
                                    behavior:
                                        "smooth",

                                    block:
                                        "start"
                                }
                            );


                        }

                    }
                );

            }
        );


        /* ==========================================
           TOOL CARD REVEAL ANIMATION
        ========================================== */

        if (
            "IntersectionObserver"
            in window
        ) {


            const cardObserver =
                new IntersectionObserver(
                    function (
                        entries,
                        observer
                    ) {


                        entries.forEach(
                            function (
                                entry
                            ) {


                                if (
                                    entry.isIntersecting
                                ) {


                                    entry.target.classList.add(
                                        "card-visible"
                                    );


                                    observer.unobserve(
                                        entry.target
                                    );


                                }

                            }
                        );


                    },
                    {
                        threshold:
                            0.15
                    }
                );


            toolCards.forEach(
                function (card) {


                    cardObserver.observe(
                        card
                    );


                }
            );


        }


        /* ==========================================
           HEADER SCROLL EFFECT
        ========================================== */

        const header =
            document.querySelector(
                ".site-header"
            );


        if (
            header
        ) {


            window.addEventListener(
                "scroll",
                function () {


                    if (
                        window.scrollY >
                        50
                    ) {


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


        }


        /* ==========================================
           PAGE LOADED
        ========================================== */

        document.body.classList.add(
            "page-loaded"
        );


        console.log(
            "PDF Tools Script Part 1 Ready"
        );


    }
);
/* ==========================================
   PDF TOOL BUTTON HANDLER
   PART 2
========================================== */


/* ==========================================
   GET ALL TOOL BUTTONS
========================================== */

const toolButtons =
    document.querySelectorAll(
        ".pdf-tool-card .tool-btn"
    );


/* ==========================================
   TOOL BUTTON CLICK EFFECT
========================================== */

toolButtons.forEach(
    function (button) {


        button.addEventListener(
            "click",
            function (event) {


                /* ==========================
                   GET TOOL CARD
                ========================== */

                const toolCard =
                    button.closest(
                        ".pdf-tool-card"
                    );


                /* ==========================
                   GET TOOL NAME
                ========================== */

                let toolName =
                    "PDF Tool";


                if (
                    toolCard
                ) {


                    const heading =
                        toolCard.querySelector(
                            "h3"
                        );


                    if (
                        heading
                    ) {

                        toolName =
                            heading.textContent
                                .trim();

                    }

                }


                /* ==========================
                   ADD CLICKING EFFECT
                ========================== */

                button.classList.add(
                    "tool-btn-clicked"
                );


                /* ==========================
                   REMOVE EFFECT
                ========================== */

                setTimeout(
                    function () {

                        button.classList.remove(
                            "tool-btn-clicked"
                        );

                    },
                    500
                );


                console.log(
                    "Opening:",
                    toolName
                );


            }
        );

    }
);


/* ==========================================
   PREVENT BROKEN EMPTY LINKS
========================================== */

const allToolLinks =
    document.querySelectorAll(
        ".pdf-tool-card a.tool-btn"
    );


allToolLinks.forEach(
    function (link) {


        link.addEventListener(
            "click",
            function (event) {


                const href =
                    link.getAttribute(
                        "href"
                    );


                /* ==========================
                   CHECK EMPTY LINK
                ========================== */

                if (
                    !href ||
                    href === "#" ||
                    href === "#!"
                ) {


                    event.preventDefault();


                    console.warn(
                        "This PDF tool is not available yet."
                    );


                    /* ==========================
                       GET CARD
                    ========================== */

                    const card =
                        link.closest(
                            ".pdf-tool-card"
                        );


                    if (
                        card
                    ) {


                        card.classList.add(
                            "tool-unavailable"
                        );


                        setTimeout(
                            function () {

                                card.classList.remove(
                                    "tool-unavailable"
                                );

                            },
                            1000
                        );


                    }

                }

            }
        );

    }
);


/* ==========================================
   TOOL CARD HOVER INTERACTION
========================================== */

toolCards.forEach(
    function (card) {


        card.addEventListener(
            "mouseenter",
            function () {


                card.classList.add(
                    "card-hover-active"
                );


            }
        );


        card.addEventListener(
            "mouseleave",
            function () {


                card.classList.remove(
                    "card-hover-active"
                );


            }
        );


    }
);


/* ==========================================
   PDF TOOL COUNT
========================================== */

const totalPdfTools =
    toolCards.length;


console.log(
    "Total PDF Tools:",
    totalPdfTools
);


/* ==========================================
   UPDATE TOOL COUNT IF ELEMENT EXISTS
========================================== */

const toolCountElement =
    document.querySelector(
        ".tool-count"
    );


if (
    toolCountElement
) {


    toolCountElement.textContent =
        totalPdfTools;


}


/* ==========================================
   PART 2 COMPLETE
========================================== */

console.log(
    "PDF Tools Script Part 2 Ready"
);
/* ==========================================
   PDF TOOLS - SCRIPT.JS
   PART 3
   PREMIUM SECTIONS & INTERACTIONS
========================================== */


/* ==========================================
   PREMIUM UPLOAD CTA
========================================== */

const uploadCtaButton =
    document.querySelector(
        ".upload-cta-btn"
    );


if (
    uploadCtaButton
) {


    uploadCtaButton.addEventListener(
        "click",
        function (event) {


            const pdfToolsSection =
                document.querySelector(
                    "#pdf-tools"
                );


            if (
                pdfToolsSection
            ) {


                event.preventDefault();


                pdfToolsSection.scrollIntoView(
                    {
                        behavior:
                            "smooth",

                        block:
                            "start"
                    }
                );


            }

        }
    );

}


/* ==========================================
   HOW IT WORKS STEP CARDS
========================================== */

const stepCards =
    document.querySelectorAll(
        ".step-card"
    );


if (
    stepCards.length > 0
) {


    stepCards.forEach(
        function (
            card,
            index
        ) {


            /* ==========================
               STEP CARD HOVER
            ========================== */

            card.addEventListener(
                "mouseenter",
                function () {

                    card.classList.add(
                        "step-active"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.classList.remove(
                        "step-active"
                    );

                }
            );


            /* ==========================
               STEP CARD DELAY
            ========================== */

            card.style.setProperty(
                "--step-delay",
                `${index * 100}ms`
            );


        }
    );

}


/* ==========================================
   PRIVACY POINTS
========================================== */

const privacyPoints =
    document.querySelectorAll(
        ".privacy-point"
    );


privacyPoints.forEach(
    function (
        point
    ) {


        point.addEventListener(
            "mouseenter",
            function () {


                point.classList.add(
                    "privacy-point-active"
                );


            }
        );


        point.addEventListener(
            "mouseleave",
            function () {


                point.classList.remove(
                    "privacy-point-active"
                );


            }
        );


    }
);


/* ==========================================
   PRIVACY CARD REVEAL
========================================== */

const privacyCard =
    document.querySelector(
        ".privacy-card"
    );


if (
    privacyCard &&
    "IntersectionObserver"
    in window
) {


    const privacyObserver =
        new IntersectionObserver(
            function (
                entries,
                observer
            ) {


                entries.forEach(
                    function (
                        entry
                    ) {


                        if (
                            entry.isIntersecting
                        ) {


                            privacyCard.classList.add(
                                "privacy-visible"
                            );


                            observer.unobserve(
                                privacyCard
                            );


                        }

                    }
                );


            },
            {
                threshold:
                    0.15
            }
        );


    privacyObserver.observe(
        privacyCard
    );

}


/* ==========================================
   UPLOAD SECTION REVEAL
========================================== */

const uploadSection =
    document.querySelector(
        ".premium-upload-section"
    );


if (
    uploadSection &&
    "IntersectionObserver"
    in window
) {


    const uploadObserver =
        new IntersectionObserver(
            function (
                entries,
                observer
            ) {


                entries.forEach(
                    function (
                        entry
                    ) {


                        if (
                            entry.isIntersecting
                        ) {


                            uploadSection.classList.add(
                                "upload-section-visible"
                            );


                            observer.unobserve(
                                uploadSection
                            );


                        }

                    }
                );


            },
            {
                threshold:
                    0.15
            }
        );


    uploadObserver.observe(
        uploadSection
    );

}


/* ==========================================
   PDF TOOL CARDS
   ADD TOOL NAME TO BUTTON
========================================== */

toolCards.forEach(
    function (
        card
    ) {


        const title =
            card.querySelector(
                "h3"
            );


        const button =
            card.querySelector(
                ".tool-btn"
            );


        if (
            title &&
            button
        ) {


            const toolName =
                title.textContent
                    .trim();


            button.setAttribute(
                "aria-label",
                `Open ${toolName}`
            );


        }

    }
);


/* ==========================================
   KEYBOARD ACCESSIBILITY
========================================== */

toolCards.forEach(
    function (
        card
    ) {


        card.setAttribute(
            "tabindex",
            "0"
        );


        card.addEventListener(
            "keydown",
            function (
                event
            ) {


                if (
                    event.key ===
                    "Enter"
                ) {


                    const button =
                        card.querySelector(
                            ".tool-btn"
                        );


                    if (
                        button
                    ) {


                        button.click();


                    }

                }

            }
        );


    }
);


/* ==========================================
   BACK TO TOP BUTTON
   CREATE ONLY IF NEEDED
========================================== */

const backToTop =
    document.querySelector(
        ".back-to-top"
    );


if (
    backToTop
) {


    window.addEventListener(
        "scroll",
        function () {


            if (
                window.scrollY >
                500
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


    backToTop.addEventListener(
        "click",
        function () {


            window.scrollTo(
                {
                    top:
                        0,

                    behavior:
                        "smooth"
                }
            );


        }
    );

}


/* ==========================================
   PDF TOOLS READY
========================================== */

console.log(
    "PDF Tools Script Part 3 Ready"
);
/* ==========================================
   PDF TOOLS - SCRIPT.JS
   PART 4 - FINAL
   FAQ & FINAL CTA
========================================== */


/* ==========================================
   FAQ ACCORDION
========================================== */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(
    function (faq) {


        const summary =
            faq.querySelector(
                "summary"
            );


        const icon =
            summary.querySelector(
                "i"
            );


        summary.addEventListener(
            "click",
            function () {


                /* ==========================
                   CLOSE OTHER FAQ ITEMS
                ========================== */

                faqItems.forEach(
                    function (
                        otherFaq
                    ) {


                        if (
                            otherFaq !== faq &&
                            otherFaq.open
                        ) {


                            otherFaq.open =
                                false;


                            const otherIcon =
                                otherFaq.querySelector(
                                    "summary i"
                                );


                            if (
                                otherIcon
                            ) {


                                otherIcon.classList.remove(
                                    "fa-minus"
                                );


                                otherIcon.classList.add(
                                    "fa-plus"
                                );


                            }

                        }

                    }
                );


                /* ==========================
                   UPDATE CURRENT ICON
                ========================== */

                setTimeout(
                    function () {


                        if (
                            faq.open
                        ) {


                            if (
                                icon
                            ) {


                                icon.classList.remove(
                                    "fa-plus"
                                );


                                icon.classList.add(
                                    "fa-minus"
                                );


                            }

                        }

                        else {


                            if (
                                icon
                            ) {


                                icon.classList.remove(
                                    "fa-minus"
                                );


                                icon.classList.add(
                                    "fa-plus"
                                );


                            }

                        }


                    },
                    10
                );


            }
        );


    }
);


/* ==========================================
   FINAL CTA BUTTON
========================================== */

const finalCtaButton =
    document.querySelector(
        ".final-cta-section .primary-btn"
    );


if (
    finalCtaButton
) {


    finalCtaButton.addEventListener(
        "click",
        function (event) {


            const pdfToolsSection =
                document.querySelector(
                    "#pdf-tools"
                );


            if (
                pdfToolsSection
            ) {


                event.preventDefault();


                pdfToolsSection.scrollIntoView(
                    {
                        behavior:
                            "smooth",

                        block:
                            "start"
                    }
                );


            }

        }
    );

}


/* ==========================================
   CTA ICON ANIMATION
========================================== */

const ctaIcon =
    document.querySelector(
        ".cta-icon"
    );


if (
    ctaIcon
) {


    ctaIcon.addEventListener(
        "mouseenter",
        function () {


            ctaIcon.classList.add(
                "cta-icon-active"
            );


        }
    );


    ctaIcon.addEventListener(
        "mouseleave",
        function () {


            ctaIcon.classList.remove(
                "cta-icon-active"
            );


        }
    );


}


/* ==========================================
   FOOTER PDF TOOLS LINK
========================================== */

const footerPdfLink =
    document.querySelector(
        '.footer-links a[href="#pdf-tools"]'
    );


if (
    footerPdfLink
) {


    footerPdfLink.addEventListener(
        "click",
        function (event) {


            const pdfToolsSection =
                document.querySelector(
                    "#pdf-tools"
                );


            if (
                pdfToolsSection
            ) {


                event.preventDefault();


                pdfToolsSection.scrollIntoView(
                    {
                        behavior:
                            "smooth",

                        block:
                            "start"
                    }
                );


            }

        }
    );

}


/* ==========================================
   FAQ ACCESSIBILITY
========================================== */

faqItems.forEach(
    function (
        faq
    ) {


        faq.setAttribute(
            "role",
            "group"
        );


    }
);


/* ==========================================
   FINAL PAGE LOAD
========================================== */

window.addEventListener(
    "load",
    function () {


        document.body.classList.add(
            "fully-loaded"
        );


        console.log(
            "Quick Tools Hub PDF Tools Fully Loaded"
        );


    }
);


/* ==========================================
   FINAL STATUS
========================================== */

console.log(
    "================================"
);

console.log(
    "PDF TOOLS SCRIPT.JS COMPLETE"
);

console.log(
    "Category Filter: READY"
);

console.log(
    "Tool Cards: READY"
);

console.log(
    "Smooth Scroll: READY"
);

console.log(
    "FAQ Accordion: READY"
);

console.log(
    "CTA Buttons: READY"
);

console.log(
    "Privacy Section: READY"
);

console.log(
    "================================"
);
