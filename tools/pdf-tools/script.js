/* ==========================================
   QUICK TOOLS HUB - PDF TOOLS
   SCRIPT.JS - PART 1
   ========================================== */


/* ==========================================
   DOM READY
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Quick Tools Hub PDF Tools Loaded");


    /* ==========================================
       CATEGORY FILTER
       ========================================== */

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    const toolCards =
        document.querySelectorAll(".pdf-tool-card");


    if (
        categoryButtons.length > 0 &&
        toolCards.length > 0
    ) {

        categoryButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {


                    /* Remove active
                       from all buttons */

                    categoryButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    /* Add active
                       to clicked button */

                    button.classList.add(
                        "active"
                    );


                    /* Get selected category */

                    const selectedCategory =
                        button.getAttribute(
                            "data-category"
                        );


                    /* Filter tool cards */

                    toolCards.forEach(
                        function (card) {

                            const cardCategory =
                                card.getAttribute(
                                    "data-category"
                                );


                            if (
                                selectedCategory ===
                                "all" ||
                                cardCategory ===
                                selectedCategory
                            ) {

                                card.style.display =
                                    "flex";


                                /* Small animation */

                                card.classList.remove(
                                    "tool-card-show"
                                );


                                setTimeout(
                                    function () {

                                        card.classList.add(
                                            "tool-card-show"
                                        );

                                    },
                                    20
                                );

                            } else {

                                card.style.display =
                                    "none";

                            }

                        }
                    );

                }
            );

        });

    }


    /* ==========================================
       SMOOTH SCROLL
       ========================================== */

    const scrollButtons =
        document.querySelectorAll(
            '[data-scroll]'
        );


    scrollButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const targetId =
                        button.getAttribute(
                            "data-scroll"
                        );


                    const targetElement =
                        document.querySelector(
                            targetId
                        );


                    if (targetElement) {

                        targetElement.scrollIntoView(
                            {
                                behavior: "smooth",
                                block: "start"
                            }
                        );

                    }

                }
            );

        }
    );


    /* ==========================================
       SCROLL REVEAL ANIMATION
       ========================================== */

    const revealElements =
        document.querySelectorAll(
            ".pdf-tool-card, .step-card, .privacy-card, .faq-item"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                function (
                    entries,
                    observer
                ) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "reveal-visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "reveal-element"
                );


                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "reveal-visible"
                );

            }
        );

    }


    /* ==========================================
       NAVIGATION HEADER EFFECT
       ========================================== */

    const header =
        document.querySelector(
            ".site-header"
        );


    if (header) {

        window.addEventListener(
            "scroll",
            function () {

                if (
                    window.scrollY > 30
                ) {

                    header.classList.add(
                        "header-scrolled"
                    );

                } else {

                    header.classList.remove(
                        "header-scrolled"
                    );

                }

            }
        );

    }


    /* ==========================================
       TOOL BUTTON CLICK HANDLER
       ========================================== */

    const toolButtons =
        document.querySelectorAll(
            ".tool-btn"
        );


    toolButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    const isDisabled =
                        button.classList.contains(
                            "disabled"
                        );


                    if (isDisabled) {

                        event.preventDefault();

                        showComingSoonMessage(
                            button
                        );

                    }

                }
            );

        }
    );


    /* ==========================================
       COMING SOON MESSAGE
       ========================================== */

    function showComingSoonMessage(
        button
    ) {

        const existingMessage =
            document.querySelector(
                ".coming-soon-message"
            );


        if (existingMessage) {

            existingMessage.remove();

        }


        const message =
            document.createElement(
                "div"
            );


        message.className =
            "coming-soon-message";


        message.innerHTML = `

            <div class="coming-soon-icon">

                <i class="fa-solid fa-wand-magic-sparkles"></i>

            </div>

            <div>

                <strong>
                    Coming Soon
                </strong>

                <p>
                    This PDF tool is currently
                    being prepared for you.
                </p>

            </div>

            <button
                type="button"
                class="close-coming-soon"
                aria-label="Close"
            >

                <i class="fa-solid fa-xmark"></i>

            </button>

        `;


        document.body.appendChild(
            message
        );


        /* Show message */

        setTimeout(
            function () {

                message.classList.add(
                    "show"
                );

            },
            50
        );


        /* Close button */

        const closeButton =
            message.querySelector(
                ".close-coming-soon"
            );


        closeButton.addEventListener(
            "click",
            function () {

                closeComingSoonMessage(
                    message
                );

            }
        );


        /* Auto close */

        setTimeout(
            function () {

                closeComingSoonMessage(
                    message
                );

            },
            5000
        );

    }


    /* ==========================================
       CLOSE COMING SOON MESSAGE
       ========================================== */

    function closeComingSoonMessage(
        message
    ) {

        if (!message) {
            return;
        }


        message.classList.remove(
            "show"
        );


        setTimeout(
            function () {

                if (
                    message.parentNode
                ) {

                    message.remove();

                }

            },
            350
        );

    }


    /* ==========================================
       ACTIVE NAVIGATION LINK
       ========================================== */

    const currentPage =
        window.location.pathname;


    const navLinks =
        document.querySelectorAll(
            ".main-nav a"
        );


    navLinks.forEach(
        function (link) {

            const linkPath =
                link.getAttribute(
                    "href"
                );


            if (
                linkPath &&
                currentPage.includes(
                    "pdf"
                ) &&
                linkPath.includes(
                    "index.html"
                )
            ) {

                link.classList.add(
                    "current-page"
                );

            }

        }
    );


    /* ==========================================
       BUTTON RIPPLE EFFECT
       ========================================== */

    const rippleButtons =
        document.querySelectorAll(
            ".primary-btn, .secondary-btn, .upload-cta-btn, .category-btn"
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


                    ripple.className =
                        "button-ripple";


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


});
/* ==========================================
   QUICK TOOLS HUB - PDF TOOLS
   SCRIPT.JS - PART 2
   ========================================== */


/* ==========================================
   PDF FILE UPLOAD SYSTEM
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ==========================================
       GET UPLOAD ELEMENTS
    ========================================== */

    const uploadArea =
        document.querySelector(
            ".upload-area"
        );


    const pdfInput =
        document.querySelector(
            "#pdfInput"
        );


    const browseButton =
        document.querySelector(
            "#browsePdfBtn"
        );


    const fileList =
        document.querySelector(
            ".file-list"
        );


    /* ==========================================
       SELECTED FILES
    ========================================== */

    let selectedFiles = [];


    /* ==========================================
       MAX FILE SIZE
       50 MB
    ========================================== */

    const MAX_FILE_SIZE =
        50 * 1024 * 1024;


    /* ==========================================
       ALLOWED FILE TYPE
    ========================================== */

    const ALLOWED_TYPE =
        "application/pdf";


    /* ==========================================
       BROWSE BUTTON
    ========================================== */

    if (browseButton && pdfInput) {

        browseButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                pdfInput.click();

            }
        );

    }


    /* ==========================================
       FILE INPUT CHANGE
    ========================================== */

    if (pdfInput) {

        pdfInput.addEventListener(
            "change",
            function (event) {

                const files =
                    Array.from(
                        event.target.files
                    );


                handleSelectedFiles(
                    files
                );


                /* Reset input */

                pdfInput.value = "";

            }
        );

    }


    /* ==========================================
       DRAG OVER
    ========================================== */

    if (uploadArea) {

        uploadArea.addEventListener(
            "dragover",
            function (event) {

                event.preventDefault();

                uploadArea.classList.add(
                    "drag-over"
                );

            }
        );


        /* ==========================================
           DRAG LEAVE
        ========================================== */

        uploadArea.addEventListener(
            "dragleave",
            function () {

                uploadArea.classList.remove(
                    "drag-over"
                );

            }
        );


        /* ==========================================
           DROP FILE
        ========================================== */

        uploadArea.addEventListener(
            "drop",
            function (event) {

                event.preventDefault();


                uploadArea.classList.remove(
                    "drag-over"
                );


                const files =
                    Array.from(
                        event.dataTransfer.files
                    );


                handleSelectedFiles(
                    files
                );

            }
        );

    }


    /* ==========================================
       HANDLE SELECTED FILES
    ========================================== */

    function handleSelectedFiles(
        files
    ) {

        if (
            !files ||
            files.length === 0
        ) {

            return;

        }


        files.forEach(
            function (file) {

                /* Validate file */

                const validation =
                    validatePdfFile(
                        file
                    );


                if (
                    !validation.valid
                ) {

                    showUploadError(
                        validation.message
                    );

                    return;

                }


                /* Check duplicate */

                const alreadyExists =
                    selectedFiles.some(
                        function (
                            existingFile
                        ) {

                            return (
                                existingFile.name ===
                                file.name &&
                                existingFile.size ===
                                file.size
                            );

                        }
                    );


                if (
                    alreadyExists
                ) {

                    showUploadError(
                        "This file has already been added."
                    );

                    return;

                }


                /* Add file */

                selectedFiles.push(
                    file
                );

            }
        );


        renderFileList();

    }


    /* ==========================================
       VALIDATE PDF FILE
    ========================================== */

    function validatePdfFile(
        file
    ) {

        if (!file) {

            return {

                valid: false,

                message:
                    "Please select a valid file."

            };

        }


        /* Check file type */

        const isPdf =
            file.type ===
            ALLOWED_TYPE ||
            file.name
                .toLowerCase()
                .endsWith(
                    ".pdf"
                );


        if (!isPdf) {

            return {

                valid: false,

                message:
                    "Only PDF files are allowed."

            };

        }


        /* Check file size */

        if (
            file.size >
            MAX_FILE_SIZE
        ) {

            return {

                valid: false,

                message:
                    "File size must be less than 50 MB."

            };

        }


        return {

            valid: true

        };

    }


    /* ==========================================
       RENDER FILE LIST
    ========================================== */

    function renderFileList() {

        if (!fileList) {

            return;

        }


        fileList.innerHTML = "";


        if (
            selectedFiles.length === 0
        ) {

            fileList.classList.remove(
                "has-files"
            );

            return;

        }


        fileList.classList.add(
            "has-files"
        );


        selectedFiles.forEach(
            function (
                file,
                index
            ) {

                const fileItem =
                    document.createElement(
                        "div"
                    );


                fileItem.className =
                    "selected-file";


                fileItem.innerHTML = `

                    <div class="selected-file-icon">

                        <i class="fa-solid fa-file-pdf"></i>

                    </div>


                    <div class="selected-file-info">

                        <strong>
                            ${escapeHtml(file.name)}
                        </strong>

                        <span>
                            ${formatFileSize(file.size)}
                        </span>

                    </div>


                    <button
                        type="button"
                        class="remove-file-btn"
                        data-index="${index}"
                        aria-label="Remove file"
                    >

                        <i class="fa-solid fa-xmark"></i>

                    </button>

                `;


                fileList.appendChild(
                    fileItem
                );

            }
        );


        /* Add remove events */

        const removeButtons =
            fileList.querySelectorAll(
                ".remove-file-btn"
            );


        removeButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            parseInt(
                                button.getAttribute(
                                    "data-index"
                                )
                            );


                        removeFile(
                            index
                        );

                    }
                );

            }
        );

    }


    /* ==========================================
       REMOVE FILE
    ========================================== */

    function removeFile(
        index
    ) {

        if (
            index < 0 ||
            index >=
            selectedFiles.length
        ) {

            return;

        }


        selectedFiles.splice(
            index,
            1
        );


        renderFileList();

    }


    /* ==========================================
       FORMAT FILE SIZE
    ========================================== */

    function formatFileSize(
        bytes
    ) {

        if (
            bytes === 0
        ) {

            return "0 Bytes";

        }


        const units = [

            "Bytes",

            "KB",

            "MB",

            "GB"

        ];


        const unitIndex =
            Math.floor(
                Math.log(bytes) /
                Math.log(1024)
            );


        const size =
            bytes /
            Math.pow(
                1024,
                unitIndex
            );


        return (
            size.toFixed(2) +
            " " +
            units[unitIndex]
        );

    }


    /* ==========================================
       ESCAPE HTML
    ========================================== */

    function escapeHtml(
        text
    ) {

        const div =
            document.createElement(
                "div"
            );


        div.textContent =
            text;


        return div.innerHTML;

    }


    /* ==========================================
       UPLOAD ERROR MESSAGE
    ========================================== */

    function showUploadError(
        message
    ) {

        let errorBox =
            document.querySelector(
                ".upload-error"
            );


        if (!errorBox) {

            errorBox =
                document.createElement(
                    "div"
                );


            errorBox.className =
                "upload-error";


            if (uploadArea) {

                uploadArea.appendChild(
                    errorBox
                );

            }

        }


        errorBox.innerHTML = `

            <i class="fa-solid fa-circle-exclamation"></i>

            <span>
                ${escapeHtml(message)}
            </span>

        `;


        errorBox.classList.add(
            "show"
        );


        setTimeout(
            function () {

                errorBox.classList.remove(
                    "show"
                );

            },
            4000
        );

    }


    /* ==========================================
       CLEAR ALL FILES
    ========================================== */

    window.clearPdfFiles =
        function () {

            selectedFiles = [];

            renderFileList();

        };


    /* ==========================================
       GET SELECTED FILES
    ========================================== */

    window.getSelectedPdfFiles =
        function () {

            return [
                ...selectedFiles
            ];

        };


    /* ==========================================
       UPLOAD PROGRESS SIMULATION
    ========================================== */

    window.showPdfProgress =
        function (
            callback
        ) {

            let progress =
                0;


            const interval =
                setInterval(
                    function () {

                        progress +=
                            Math.floor(
                                Math.random() *
                                12
                            ) + 5;


                        if (
                            progress >= 100
                        ) {

                            progress = 100;

                            clearInterval(
                                interval
                            );

                        }


                        if (
                            typeof callback ===
                            "function"
                        ) {

                            callback(
                                progress
                            );

                        }

                    },
                    250
                );

        };


});
/* ==========================================
   QUICK TOOLS HUB - PDF TOOLS
   SCRIPT.JS - PART 3
   ========================================== */


/* ==========================================
   PDF TOOL INTERACTIONS
   ========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ==========================================
           TOOL SEARCH
        ========================================== */

        const toolSearch =
            document.querySelector(
                "#toolSearch"
            );


        const allToolCards =
            document.querySelectorAll(
                ".pdf-tool-card"
            );


        if (
            toolSearch &&
            allToolCards.length > 0
        ) {

            toolSearch.addEventListener(
                "input",
                function () {

                    const searchText =
                        toolSearch.value
                            .toLowerCase()
                            .trim();


                    allToolCards.forEach(
                        function (card) {

                            const cardTitle =
                                card.querySelector(
                                    "h3"
                                );


                            const cardDescription =
                                card.querySelector(
                                    "p"
                                );


                            const titleText =
                                cardTitle
                                    ? cardTitle
                                        .textContent
                                        .toLowerCase()
                                    : "";


                            const descriptionText =
                                cardDescription
                                    ? cardDescription
                                        .textContent
                                        .toLowerCase()
                                    : "";


                            const matches =
                                titleText.includes(
                                    searchText
                                ) ||
                                descriptionText.includes(
                                    searchText
                                );


                            if (matches) {

                                card.style.display =
                                    "flex";

                            } else {

                                card.style.display =
                                    "none";

                            }

                        }
                    );

                }
            );

        }


        /* ==========================================
           PDF TOOL OPEN BUTTONS
        ========================================== */

        const openToolButtons =
            document.querySelectorAll(
                "[data-tool-url]"
            );


        openToolButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        const toolUrl =
                            button.getAttribute(
                                "data-tool-url"
                            );


                        if (
                            !toolUrl ||
                            toolUrl === "#"
                        ) {

                            event.preventDefault();


                            showToolNotification(
                                "This PDF tool is coming soon."
                            );


                            return;

                        }

                    }
                );

            }
        );


        /* ==========================================
           TOOL NOTIFICATION
        ========================================== */

        function showToolNotification(
            message
        ) {

            const oldNotification =
                document.querySelector(
                    ".tool-notification"
                );


            if (
                oldNotification
            ) {

                oldNotification.remove();

            }


            const notification =
                document.createElement(
                    "div"
                );


            notification.className =
                "tool-notification";


            notification.innerHTML = `

                <div class="notification-icon">

                    <i class="fa-solid fa-circle-info"></i>

                </div>


                <div class="notification-content">

                    <strong>
                        Quick Tools Hub
                    </strong>

                    <span>
                        ${message}
                    </span>

                </div>


                <button
                    type="button"
                    class="notification-close"
                >

                    <i class="fa-solid fa-xmark"></i>

                </button>

            `;


            document.body.appendChild(
                notification
            );


            setTimeout(
                function () {

                    notification.classList.add(
                        "show"
                    );

                },
                50
            );


            const closeButton =
                notification.querySelector(
                    ".notification-close"
                );


            closeButton.addEventListener(
                "click",
                function () {

                    hideNotification(
                        notification
                    );

                }
            );


            setTimeout(
                function () {

                    hideNotification(
                        notification
                    );

                },
                4500
            );

        }


        /* ==========================================
           HIDE NOTIFICATION
        ========================================== */

        function hideNotification(
            notification
        ) {

            if (
                !notification
            ) {

                return;

            }


            notification.classList.remove(
                "show"
            );


            setTimeout(
                function () {

                    if (
                        notification.parentNode
                    ) {

                        notification.remove();

                    }

                },
                350
            );

        }


        /* ==========================================
           FAQ ACCORDION
        ========================================== */

        const faqItems =
            document.querySelectorAll(
                ".faq-item"
            );


        faqItems.forEach(
            function (item) {

                item.addEventListener(
                    "toggle",
                    function () {

                        if (
                            item.open
                        ) {

                            faqItems.forEach(
                                function (
                                    otherItem
                                ) {

                                    if (
                                        otherItem !==
                                        item
                                    ) {

                                        otherItem.open =
                                            false;

                                    }

                                }
                            );

                        }

                    }
                );

            }
        );


        /* ==========================================
           BACK TO TOP BUTTON
        ========================================== */

        const backToTop =
            document.querySelector(
                "#backToTop"
            );


        if (backToTop) {

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

                    } else {

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
                            top: 0,
                            behavior: "smooth"
                        }
                    );

                }
            );

        }


        /* ==========================================
           ANIMATED COUNTERS
        ========================================== */

        const counters =
            document.querySelectorAll(
                "[data-counter]"
            );


        if (
            counters.length > 0 &&
            "IntersectionObserver"
            in window
        ) {

            const counterObserver =
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

                                    animateCounter(
                                        entry.target
                                    );


                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.5
                    }
                );


            counters.forEach(
                function (counter) {

                    counterObserver.observe(
                        counter
                    );

                }
            );

        }


        /* ==========================================
           COUNTER ANIMATION FUNCTION
        ========================================== */

        function animateCounter(
            element
        ) {

            const target =
                parseInt(
                    element.getAttribute(
                        "data-counter"
                    )
                );


            if (
                isNaN(target)
            ) {

                return;

            }


            let current = 0;


            const duration =
                1500;


            const increment =
                target /
                (duration / 16);


            const timer =
                setInterval(
                    function () {

                        current +=
                            increment;


                        if (
                            current >=
                            target
                        ) {

                            current =
                                target;

                            clearInterval(
                                timer
                            );

                        }


                        element.textContent =
                            Math.floor(
                                current
                            ).toLocaleString();

                    },
                    16
                );

        }


        /* ==========================================
           PREVENT EMPTY SEARCH SUBMISSION
        ========================================== */

        const searchForms =
            document.querySelectorAll(
                ".tool-search-form"
            );


        searchForms.forEach(
            function (form) {

                form.addEventListener(
                    "submit",
                    function (event) {

                        const input =
                            form.querySelector(
                                "input"
                            );


                        if (
                            input &&
                            input.value
                                .trim() === ""
                        ) {

                            event.preventDefault();

                            input.focus();

                        }

                    }
                );

            }
        );


        /* ==========================================
           ESC KEY
           CLOSE NOTIFICATIONS
        ========================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    const notification =
                        document.querySelector(
                            ".tool-notification.show"
                        );


                    if (
                        notification
                    ) {

                        notification.classList.remove(
                            "show"
                        );

                    }

                }

            }
        );


        /* ==========================================
           PAGE LOADED
        ========================================== */

        document.body.classList.add(
            "page-loaded"
        );


        console.log(
            "PDF Tools JavaScript initialized successfully."
        );


    }
);


/* ==========================================
   GLOBAL PDF TOOL FUNCTION
   ========================================== */

function openPdfTool(
    toolName
) {

    if (
        !toolName
    ) {

        return;

    }


    console.log(
        "Opening PDF Tool:",
        toolName
    );


    /*

    Future PDF tools can be connected here.

    Example:

    if (toolName === "merge") {

        window.location.href =
            "merge-pdf/index.html";

    }

    if (toolName === "compress") {

        window.location.href =
            "compress-pdf/index.html";

    }

    */

}


/* ==========================================
   PAGE VISIBILITY
   ========================================== */

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.hidden
        ) {

            console.log(
                "User switched away from PDF Tools."
            );

        } else {

            console.log(
                "User returned to PDF Tools."
            );

        }

    }
);
