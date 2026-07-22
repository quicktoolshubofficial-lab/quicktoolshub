/* =========================================================
   QUICK TOOLS HUB - PDF TOOLS
   SCRIPT.JS - PART 1
========================================================= */


/* =========================================================
   1. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       2. ELEMENT SELECTORS
    ===================================================== */

    const categoryButtons = document.querySelectorAll(
        ".category-btn"
    );

    const toolCards = document.querySelectorAll(
        ".pdf-tool-card"
    );

    const toolsGrid = document.querySelector(
        ".tools-grid"
    );

    const noResults = document.querySelector(
        ".no-results"
    );

    const resetSearchButton = document.querySelector(
        ".reset-search-btn"
    );

    const toolCount = document.querySelector(
        ".tool-count strong"
    );


    /* =====================================================
       3. TOOL DATA
    ===================================================== */

    const tools = Array.from(toolCards).filter(function (card) {

        return !card.classList.contains(
            "no-results"
        );

    });


    /* =====================================================
       4. UPDATE TOOL COUNT
    ===================================================== */

    function updateToolCount(count) {

        if (!toolCount) {
            return;
        }

        toolCount.textContent = count;

    }


    /* =====================================================
       5. SHOW / HIDE NO RESULTS
    ===================================================== */

    function toggleNoResults(show) {

        if (!noResults) {
            return;
        }

        if (show) {

            noResults.classList.add(
                "show"
            );

        } else {

            noResults.classList.remove(
                "show"
            );

        }

    }


    /* =====================================================
       6. FILTER TOOLS BY CATEGORY
    ===================================================== */

    function filterTools(category) {

        let visibleCount = 0;


        tools.forEach(function (card) {

            const cardCategory =
                card.getAttribute(
                    "data-category"
                );


            if (
                category === "all" ||
                category === cardCategory
            ) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        updateToolCount(
            visibleCount
        );


        toggleNoResults(
            visibleCount === 0
        );

    }


    /* =====================================================
       7. CATEGORY BUTTON EVENTS
    ===================================================== */

    categoryButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                categoryButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );


                const selectedCategory =
                    this.getAttribute(
                        "data-category"
                    );


                filterTools(
                    selectedCategory || "all"
                );

            }
        );

    });


    /* =====================================================
       8. RESET FILTER
    ===================================================== */

    if (resetSearchButton) {

        resetSearchButton.addEventListener(
            "click",
            function () {

                categoryButtons.forEach(
                    function (button) {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


                const allButton =
                    document.querySelector(
                        '.category-btn[data-category="all"]'
                    );


                if (allButton) {

                    allButton.classList.add(
                        "active"
                    );

                }


                filterTools(
                    "all"
                );

            }
        );

    }


    /* =====================================================
       9. INITIALIZE TOOLS
    ===================================================== */

    filterTools(
        "all"
    );


    /* =====================================================
       10. TOOL CARD HOVER EFFECT
    ===================================================== */

    tools.forEach(function (card) {

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
       11. SMOOTH SCROLL FOR INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


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


                    if (targetElement) {

                        event.preventDefault();


                        targetElement.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }
    );

});
/* =========================================================
   QUICK TOOLS HUB - PDF TOOLS
   SCRIPT.JS - PART 2
========================================================= */


/* =========================================================
   12. SEARCH FUNCTIONALITY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.querySelector(
        "#toolSearch"
    );

    const searchButton = document.querySelector(
        ".search-btn"
    );

    const toolCards = document.querySelectorAll(
        ".pdf-tool-card"
    );

    const noResults = document.querySelector(
        ".no-results"
    );

    const toolCount = document.querySelector(
        ".tool-count strong"
    );


    /* =====================================================
       13. SEARCH TOOLS
    ===================================================== */

    function searchTools() {

        if (!searchInput) {
            return;
        }


        const searchValue =
            searchInput.value
                .toLowerCase()
                .trim();


        let visibleCount = 0;


        toolCards.forEach(function (card) {

            if (
                card.classList.contains(
                    "no-results"
                )
            ) {

                return;

            }


            const titleElement =
                card.querySelector(
                    ".tool-title"
                );


            const descriptionElement =
                card.querySelector(
                    ".tool-description"
                );


            const keywords =
                card.getAttribute(
                    "data-keywords"
                ) || "";


            const title =
                titleElement
                    ? titleElement.textContent.toLowerCase()
                    : "";


            const description =
                descriptionElement
                    ? descriptionElement.textContent.toLowerCase()
                    : "";


            const searchableText =
                title +
                " " +
                description +
                " " +
                keywords.toLowerCase();


            if (
                searchableText.includes(
                    searchValue
                )
            ) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        if (toolCount) {

            toolCount.textContent =
                visibleCount;

        }


        if (noResults) {

            if (
                visibleCount === 0
            ) {

                noResults.classList.add(
                    "show"
                );

            } else {

                noResults.classList.remove(
                    "show"
                );

            }

        }

    }


    /* =====================================================
       14. SEARCH BUTTON EVENT
    ===================================================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function () {

                searchTools();

            }
        );

    }


    /* =====================================================
       15. SEARCH ON ENTER KEY
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    searchTools();

                }

            }
        );

    }


    /* =====================================================
       16. LIVE SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                searchTools();

            }
        );

    }


    /* =====================================================
       17. CLEAR SEARCH
    ===================================================== */

    const clearSearchButton =
        document.querySelector(
            ".clear-search-btn"
        );


    if (clearSearchButton) {

        clearSearchButton.addEventListener(
            "click",
            function () {

                if (searchInput) {

                    searchInput.value = "";

                    searchInput.focus();

                }


                toolCards.forEach(
                    function (card) {

                        if (
                            !card.classList.contains(
                                "no-results"
                            )
                        ) {

                            card.style.display = "";

                        }

                    }
                );


                if (noResults) {

                    noResults.classList.remove(
                        "show"
                    );

                }


                if (toolCount) {

                    let totalTools = 0;


                    toolCards.forEach(
                        function (card) {

                            if (
                                !card.classList.contains(
                                    "no-results"
                                )
                            ) {

                                totalTools++;

                            }

                        }
                    );


                    toolCount.textContent =
                        totalTools;

                }

            }
        );

    }


    /* =====================================================
       18. ESCAPE KEY TO CLEAR SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    searchInput.value = "";

                    searchTools();

                    searchInput.blur();

                }

            }
        );

    }


    /* =====================================================
       19. TOOL CARD CLICK ANIMATION
    ===================================================== */

    toolCards.forEach(function (card) {

        if (
            card.classList.contains(
                "no-results"
            )
        ) {

            return;

        }


        card.addEventListener(
            "click",
            function () {

                this.classList.add(
                    "card-clicked"
                );


                setTimeout(
                    function () {

                        card.classList.remove(
                            "card-clicked"
                        );

                    },
                    300
                );

            }
        );

    });


    /* =====================================================
       20. BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            "button"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.classList.add(
                    "ripple-effect"
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


                setTimeout(
                    function () {

                        ripple.remove();

                    },
                    600
                );

            }
        );

    });


    /* =====================================================
       21. BACK TO TOP BUTTON
    ===================================================== */

    const backToTop =
        document.querySelector(
            ".back-to-top"
        );


    if (backToTop) {

        window.addEventListener(
            "scroll",
            function () {

                if (
                    window.scrollY > 500
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

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       22. PAGE LOAD ANIMATION
    ===================================================== */

    const pageElements =
        document.querySelectorAll(
            ".pdf-tool-card, .category-btn"
        );


    pageElements.forEach(
        function (element, index) {

            element.style.animationDelay =
                (index * 0.05) + "s";


            element.classList.add(
                "page-load-animation"
            );

        }
    );


    /* =====================================================
       23. MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );


    const mainNavigation =
        document.querySelector(
            ".main-navigation"
        );


    if (
        menuToggle &&
        mainNavigation
    ) {

        menuToggle.addEventListener(
            "click",
            function () {

                mainNavigation.classList.toggle(
                    "mobile-open"
                );


                menuToggle.classList.toggle(
                    "active"
                );

            }
        );

    }


    /* =====================================================
       24. CLOSE MOBILE MENU
    ===================================================== */

    if (mainNavigation) {

        const navigationLinks =
            mainNavigation.querySelectorAll(
                "a"
            );


        navigationLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        mainNavigation.classList.remove(
                            "mobile-open"
                        );


                        if (menuToggle) {

                            menuToggle.classList.remove(
                                "active"
                            );

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       25. PREVENT EMPTY SEARCH SUBMISSION
    ===================================================== */

    const searchForm =
        document.querySelector(
            ".search-form"
        );


    if (searchForm) {

        searchForm.addEventListener(
            "submit",
            function (event) {

                if (
                    !searchInput ||
                    searchInput.value.trim() === ""
                ) {

                    event.preventDefault();

                    if (searchInput) {

                        searchInput.focus();

                    }

                }

            }
        );

    }


    /* =====================================================
       26. WINDOW RESIZE HANDLER
    ===================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        function () {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    function () {

                        if (
                            window.innerWidth > 768 &&
                            mainNavigation
                        ) {

                            mainNavigation.classList.remove(
                                "mobile-open"
                            );


                            if (menuToggle) {

                                menuToggle.classList.remove(
                                    "active"
                                );

                            }

                        }

                    },
                    250
                );

        }
    );


    /* =====================================================
       27. CONSOLE STATUS
    ===================================================== */

    console.log(
        "Quick Tools Hub PDF Tools loaded successfully."
    );


});
/* =========================================================
   QUICK TOOLS HUB - PDF TOOLS
   SCRIPT.JS - PART 3
   MERGE PDF TOOL ENGINE
========================================================= */


/* =========================================================
   28. MERGE PDF TOOL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       29. PDF ELEMENT SELECTORS
    ===================================================== */

    const pdfInput =
        document.querySelector("#pdfInput");

    const uploadArea =
        document.querySelector("#uploadArea");

    const selectPdfButton =
        document.querySelector("#selectPdfButton");

    const pdfFileList =
        document.querySelector("#pdfFileList");

    const mergePdfButton =
        document.querySelector("#mergePdfButton");

    const clearPdfButton =
        document.querySelector("#clearPdfButton");

    const pdfStatus =
        document.querySelector("#pdfStatus");

    const selectedFileCount =
        document.querySelector("#selectedFileCount");


    /* =====================================================
       30. PDF FILE STORAGE
    ===================================================== */

    let selectedPdfFiles = [];


    /* =====================================================
       31. CHECK REQUIRED ELEMENTS
    ===================================================== */

    if (
        !pdfInput ||
        !uploadArea ||
        !pdfFileList ||
        !mergePdfButton
    ) {

        console.warn(
            "Merge PDF elements were not found on this page."
        );

        return;

    }


    /* =====================================================
       32. OPEN FILE SELECTOR
    ===================================================== */

    if (selectPdfButton) {

        selectPdfButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                pdfInput.click();

            }
        );

    }


    /* =====================================================
       33. UPLOAD AREA CLICK
    ===================================================== */

    uploadArea.addEventListener(
        "click",
        function (event) {

            if (
                event.target.closest(
                    "button"
                )
            ) {

                return;

            }


            pdfInput.click();

        }
    );


    /* =====================================================
       34. FILE INPUT CHANGE
    ===================================================== */

    pdfInput.addEventListener(
        "change",
        function () {

            const files =
                Array.from(
                    this.files
                );


            addPdfFiles(
                files
            );


            this.value = "";

        }
    );


    /* =====================================================
       35. ADD PDF FILES
    ===================================================== */

    function addPdfFiles(files) {

        if (
            !files ||
            files.length === 0
        ) {

            return;

        }


        files.forEach(
            function (file) {

                const isPdf =
                    file.type === "application/pdf" ||
                    file.name
                        .toLowerCase()
                        .endsWith(".pdf");


                if (!isPdf) {

                    showPdfStatus(
                        "Only PDF files are allowed.",
                        "error"
                    );

                    return;

                }


                const alreadyExists =
                    selectedPdfFiles.some(
                        function (existingFile) {

                            return (
                                existingFile.name ===
                                file.name &&

                                existingFile.size ===
                                file.size &&

                                existingFile.lastModified ===
                                file.lastModified
                            );

                        }
                    );


                if (
                    alreadyExists
                ) {

                    return;

                }


                selectedPdfFiles.push(
                    file
                );

            }
        );


        renderPdfFiles();

    }


    /* =====================================================
       36. RENDER PDF FILE LIST
    ===================================================== */

    function renderPdfFiles() {

        pdfFileList.innerHTML = "";


        if (
            selectedPdfFiles.length === 0
        ) {

            updatePdfInterface();

            return;

        }


        selectedPdfFiles.forEach(
            function (file, index) {

                const fileItem =
                    document.createElement(
                        "div"
                    );


                fileItem.className =
                    "pdf-file-item";


                fileItem.setAttribute(
                    "data-index",
                    index
                );


                fileItem.draggable =
                    true;


                const fileNumber =
                    document.createElement(
                        "span"
                    );


                fileNumber.className =
                    "pdf-file-number";


                fileNumber.textContent =
                    index + 1;


                const fileIcon =
                    document.createElement(
                        "span"
                    );


                fileIcon.className =
                    "pdf-file-icon";


                fileIcon.innerHTML =
                    '<i class="fas fa-file-pdf"></i>';


                const fileDetails =
                    document.createElement(
                        "div"
                    );


                fileDetails.className =
                    "pdf-file-details";


                const fileName =
                    document.createElement(
                        "strong"
                    );


                fileName.className =
                    "pdf-file-name";


                fileName.textContent =
                    file.name;


                const fileSize =
                    document.createElement(
                        "small"
                    );


                fileSize.className =
                    "pdf-file-size";


                fileSize.textContent =
                    formatFileSize(
                        file.size
                    );


                fileDetails.appendChild(
                    fileName
                );


                fileDetails.appendChild(
                    fileSize
                );


                const dragHandle =
                    document.createElement(
                        "span"
                    );


                dragHandle.className =
                    "pdf-drag-handle";


                dragHandle.innerHTML =
                    '<i class="fas fa-grip-vertical"></i>';


                const removeButton =
                    document.createElement(
                        "button"
                    );


                removeButton.type =
                    "button";


                removeButton.className =
                    "remove-pdf-btn";


                removeButton.setAttribute(
                    "aria-label",
                    "Remove PDF"
                );


                removeButton.innerHTML =
                    '<i class="fas fa-times"></i>';


                removeButton.addEventListener(
                    "click",
                    function () {

                        removePdfFile(
                            index
                        );

                    }
                );


                fileItem.appendChild(
                    fileNumber
                );


                fileItem.appendChild(
                    fileIcon
                );


                fileItem.appendChild(
                    fileDetails
                );


                fileItem.appendChild(
                    dragHandle
                );


                fileItem.appendChild(
                    removeButton
                );


                addDragEvents(
                    fileItem
                );


                pdfFileList.appendChild(
                    fileItem
                );

            }
        );


        updatePdfInterface();

    }


    /* =====================================================
       37. REMOVE PDF FILE
    ===================================================== */

    function removePdfFile(index) {

        if (
            index < 0 ||
            index >= selectedPdfFiles.length
        ) {

            return;

        }


        selectedPdfFiles.splice(
            index,
            1
        );


        renderPdfFiles();


        showPdfStatus(
            "PDF removed successfully.",
            "success"
        );

    }


    /* =====================================================
       38. CLEAR ALL PDF FILES
    ===================================================== */

    if (clearPdfButton) {

        clearPdfButton.addEventListener(
            "click",
            function () {

                if (
                    selectedPdfFiles.length === 0
                ) {

                    return;

                }


                selectedPdfFiles = [];


                renderPdfFiles();


                showPdfStatus(
                    "All selected PDFs have been cleared.",
                    "success"
                );

            }
        );

    }


    /* =====================================================
       39. UPDATE PDF INTERFACE
    ===================================================== */

    function updatePdfInterface() {

        const totalFiles =
            selectedPdfFiles.length;


        if (selectedFileCount) {

            selectedFileCount.textContent =
                totalFiles;

        }


        if (mergePdfButton) {

            mergePdfButton.disabled =
                totalFiles < 2;

        }


        if (clearPdfButton) {

            clearPdfButton.disabled =
                totalFiles === 0;

        }

    }


    /* =====================================================
       40. FORMAT FILE SIZE
    ===================================================== */

    function formatFileSize(bytes) {

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


        const index =
            Math.floor(
                Math.log(bytes) /
                Math.log(1024)
            );


        return (
            parseFloat(
                (
                    bytes /
                    Math.pow(
                        1024,
                        index
                    )
                ).toFixed(2)
            ) +
            " " +
            units[index]
        );

    }


    /* =====================================================
       41. DRAG AND DROP EVENTS
    ===================================================== */

    [
        "dragenter",
        "dragover"
    ].forEach(
        function (eventName) {

            uploadArea.addEventListener(
                eventName,
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    uploadArea.classList.add(
                        "drag-active"
                    );

                }
            );

        }
    );


    [
        "dragleave",
        "drop"
    ].forEach(
        function (eventName) {

            uploadArea.addEventListener(
                eventName,
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    uploadArea.classList.remove(
                        "drag-active"
                    );

                }
            );

        }
    );


    /* =====================================================
       42. DROP PDF FILES
    ===================================================== */

    uploadArea.addEventListener(
        "drop",
        function (event) {

            const droppedFiles =
                Array.from(
                    event.dataTransfer.files
                );


            addPdfFiles(
                droppedFiles
            );

        }
    );


    /* =====================================================
       43. DRAG TO REORDER
    ===================================================== */

    let draggedIndex = null;


    function addDragEvents(element) {

        element.addEventListener(
            "dragstart",
            function () {

                draggedIndex =
                    Number(
                        this.getAttribute(
                            "data-index"
                        )
                    );


                this.classList.add(
                    "dragging"
                );

            }
        );


        element.addEventListener(
            "dragend",
            function () {

                this.classList.remove(
                    "dragging"
                );


                draggedIndex =
                    null;

            }
        );


        element.addEventListener(
            "dragover",
            function (event) {

                event.preventDefault();

            }
        );


        element.addEventListener(
            "drop",
            function (event) {

                event.preventDefault();


                const targetIndex =
                    Number(
                        this.getAttribute(
                            "data-index"
                        )
                    );


                if (
                    draggedIndex === null ||
                    draggedIndex === targetIndex
                ) {

                    return;

                }


                const draggedFile =
                    selectedPdfFiles[
                        draggedIndex
                    ];


                selectedPdfFiles.splice(
                    draggedIndex,
                    1
                );


                selectedPdfFiles.splice(
                    targetIndex,
                    0,
                    draggedFile
                );


                renderPdfFiles();

            }
        );

    }


    /* =====================================================
       44. PDF STATUS MESSAGE
    ===================================================== */

    function showPdfStatus(
        message,
        type
    ) {

        if (!pdfStatus) {

            return;

        }


        pdfStatus.textContent =
            message;


        pdfStatus.className =
            "pdf-status";


        if (type) {

            pdfStatus.classList.add(
                type
            );

        }


        pdfStatus.classList.add(
            "show"
        );


        setTimeout(
            function () {

                pdfStatus.classList.remove(
                    "show"
                );

            },
            4000
        );

    }


    /* =====================================================
       45. INITIAL PDF UI STATE
    ===================================================== */

    updatePdfInterface();


    /* =====================================================
       46. MERGE BUTTON PRE-CHECK
    ===================================================== */

    mergePdfButton.addEventListener(
        "click",
        function () {

            if (
                selectedPdfFiles.length < 2
            ) {

                showPdfStatus(
                    "Please select at least 2 PDF files to merge.",
                    "error"
                );


                return;

            }


            showPdfStatus(
                "Preparing your PDF files for merging...",
                "success"
            );

        }
    );


    /* =====================================================
       47. PDF FILE TYPE VALIDATION
    ===================================================== */

    function validatePdfFiles() {

        return selectedPdfFiles.every(
            function (file) {

                return (
                    file.type ===
                    "application/pdf" ||

                    file.name
                        .toLowerCase()
                        .endsWith(
                            ".pdf"
                        )
                );

            }
        );

    }


    /* =====================================================
       48. FINAL VALIDATION
    ===================================================== */

    function validateBeforeMerge() {

        if (
            selectedPdfFiles.length < 2
        ) {

            showPdfStatus(
                "Select at least two PDF files.",
                "error"
            );


            return false;

        }


        if (
            !validatePdfFiles()
        ) {

            showPdfStatus(
                "One or more selected files are not valid PDF files.",
                "error"
            );


            return false;

        }


        return true;

    }


    /* =====================================================
       49. EXPOSE PDF DATA
    ===================================================== */

    window.quickToolsPDF = {

        getFiles:
            function () {

                return selectedPdfFiles;

            },


        clear:
            function () {

                selectedPdfFiles = [];

                renderPdfFiles();

            },


        validate:
            function () {

                return validateBeforeMerge();

            }

    };


});
/* =========================================================
   QUICK TOOLS HUB - PDF TOOLS
   SCRIPT.JS - PART 4
   ACTUAL PDF MERGE ENGINE
========================================================= */


/* =========================================================
   50. PDF MERGE ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       51. MERGE ELEMENT SELECTORS
    ===================================================== */

    const mergePdfButton =
        document.querySelector("#mergePdfButton");

    const progressContainer =
        document.querySelector("#mergeProgressContainer");

    const progressBar =
        document.querySelector("#mergeProgressBar");

    const progressText =
        document.querySelector("#mergeProgressText");

    const pdfStatus =
        document.querySelector("#pdfStatus");

    const downloadSection =
        document.querySelector("#downloadSection");

    const downloadPdfButton =
        document.querySelector("#downloadPdfButton");


    /* =====================================================
       52. CHECK MERGE BUTTON
    ===================================================== */

    if (!mergePdfButton) {

        console.warn(
            "Merge PDF button not found."
        );

        return;

    }


    /* =====================================================
       53. MERGED PDF STORAGE
    ===================================================== */

    let mergedPdfBlob = null;

    let mergedPdfFileName =
        "quick-tools-hub-merged.pdf";


    /* =====================================================
       54. SHOW STATUS
    ===================================================== */

    function setMergeStatus(
        message,
        type
    ) {

        if (!pdfStatus) {

            return;

        }


        pdfStatus.textContent =
            message;


        pdfStatus.className =
            "pdf-status";


        if (type) {

            pdfStatus.classList.add(
                type
            );

        }


        pdfStatus.classList.add(
            "show"
        );

    }


    /* =====================================================
       55. UPDATE PROGRESS
    ===================================================== */

    function updateProgress(
        percentage,
        message
    ) {

        if (progressContainer) {

            progressContainer.classList.add(
                "show"
            );

        }


        if (progressBar) {

            progressBar.style.width =
                percentage + "%";

        }


        if (progressText) {

            progressText.textContent =
                message ||
                percentage + "%";

        }

    }


    /* =====================================================
       56. HIDE PROGRESS
    ===================================================== */

    function hideProgress() {

        if (progressContainer) {

            progressContainer.classList.remove(
                "show"
            );

        }

    }


    /* =====================================================
       57. SHOW DOWNLOAD SECTION
    ===================================================== */

    function showDownloadSection() {

        if (!downloadSection) {

            return;

        }


        downloadSection.classList.add(
            "show"
        );

    }


    /* =====================================================
       58. HIDE DOWNLOAD SECTION
    ===================================================== */

    function hideDownloadSection() {

        if (!downloadSection) {

            return;

        }


        downloadSection.classList.remove(
            "show"
        );

    }


    /* =====================================================
       59. GET SELECTED PDF FILES
    ===================================================== */

    function getSelectedFiles() {

        if (
            window.quickToolsPDF &&
            typeof window.quickToolsPDF.getFiles ===
            "function"
        ) {

            return window.quickToolsPDF.getFiles();

        }


        return [];

    }


    /* =====================================================
       60. CHECK PDF-LIB
    ===================================================== */

    function checkPdfLib() {

        if (
            typeof PDFLib ===
            "undefined"
        ) {

            return false;

        }


        if (
            !PDFLib.PDFDocument
        ) {

            return false;

        }


        return true;

    }


    /* =====================================================
       61. MERGE PDF FILES
    ===================================================== */

    async function mergePDFs() {

        const files =
            getSelectedFiles();


        /* =================================================
           VALIDATE FILE COUNT
        ================================================= */

        if (
            files.length < 2
        ) {

            setMergeStatus(
                "Please select at least 2 PDF files to merge.",
                "error"
            );


            return;

        }


        /* =================================================
           CHECK PDF-LIB
        ================================================= */

        if (
            !checkPdfLib()
        ) {

            setMergeStatus(
                "PDF merge engine is not loaded. Please refresh the page and try again.",
                "error"
            );


            return;

        }


        /* =================================================
           RESET PREVIOUS RESULT
        ================================================= */

        mergedPdfBlob =
            null;


        hideDownloadSection();


        /* =================================================
           DISABLE MERGE BUTTON
        ================================================= */

        mergePdfButton.disabled =
            true;


        mergePdfButton.classList.add(
            "processing"
        );


        try {

            /* =============================================
               START PROGRESS
            ============================================= */

            updateProgress(
                5,
                "Starting PDF merge..."
            );


            setMergeStatus(
                "Reading your PDF files...",
                "success"
            );


            /* =============================================
               CREATE NEW PDF
            ============================================= */

            const mergedPdf =
                await PDFLib.PDFDocument.create();


            /* =============================================
               PROCESS EACH PDF
            ============================================= */

            for (
                let i = 0;
                i < files.length;
                i++
            ) {

                const file =
                    files[i];


                const percentage =
                    Math.round(
                        10 +
                        (
                            i /
                            files.length
                        ) *
                        80
                    );


                updateProgress(
                    percentage,
                    "Processing PDF " +
                    (i + 1) +
                    " of " +
                    files.length +
                    "..."
                );


                setMergeStatus(
                    "Processing: " +
                    file.name,
                    "success"
                );


                /* =========================================
                   READ FILE
                ========================================= */

                const fileBytes =
                    await file.arrayBuffer();


                /* =========================================
                   LOAD SOURCE PDF
                ========================================= */

                const sourcePdf =
                    await PDFLib.PDFDocument.load(
                        fileBytes,
                        {
                            ignoreEncryption: false
                        }
                    );


                /* =========================================
                   GET ALL PAGES
                ========================================= */

                const pageIndices =
                    sourcePdf
                        .getPageIndices();


                /* =========================================
                   COPY PAGES
                ========================================= */

                const copiedPages =
                    await mergedPdf.copyPages(
                        sourcePdf,
                        pageIndices
                    );


                /* =========================================
                   ADD COPIED PAGES
                ========================================= */

                copiedPages.forEach(
                    function (page) {

                        mergedPdf.addPage(
                            page
                        );

                    }
                );


                /* =========================================
                   CLEANUP
                ========================================= */

                await new Promise(
                    function (resolve) {

                        setTimeout(
                            resolve,
                            10
                        );

                    }
                );

            }


            /* =================================================
               FINALIZE PDF
            ================================================= */

            updateProgress(
                92,
                "Finalizing merged PDF..."
            );


            setMergeStatus(
                "Creating your final PDF file...",
                "success"
            );


            const mergedPdfBytes =
                await mergedPdf.save();


            /* =================================================
               CREATE BLOB
            ================================================= */

            mergedPdfBlob =
                new Blob(
                    [
                        mergedPdfBytes
                    ],
                    {
                        type:
                            "application/pdf"
                    }
                );


            /* =================================================
               CREATE FILE NAME
            ================================================= */

            const currentDate =
                new Date();


            const dateString =
                currentDate
                    .toISOString()
                    .slice(
                        0,
                        10
                    );


            mergedPdfFileName =
                "quick-tools-hub-merged-" +
                dateString +
                ".pdf";


            /* =================================================
               COMPLETE PROGRESS
            ================================================= */

            updateProgress(
                100,
                "PDF merge completed successfully!"
            );


            setMergeStatus(
                "Success! Your PDF files have been merged.",
                "success"
            );


            /* =================================================
               SHOW DOWNLOAD
            ================================================= */

            showDownloadSection();


            /* =================================================
               AUTO SCROLL
            ================================================= */

            if (
                downloadSection
            ) {

                setTimeout(
                    function () {

                        downloadSection.scrollIntoView({
                            behavior:
                                "smooth",
                            block:
                                "center"
                        });

                    },
                    300
                );

            }


        } catch (error) {

            console.error(
                "PDF Merge Error:",
                error
            );


            mergedPdfBlob =
                null;


            hideDownloadSection();


            updateProgress(
                0,
                "Merge failed."
            );


            let errorMessage =
                "Unable to merge PDF files. Please try again.";


            if (
                error &&
                error.message
            ) {

                const message =
                    error.message.toLowerCase();


                if (
                    message.includes(
                        "encrypted"
                    )
                ) {

                    errorMessage =
                        "One of your PDF files is password protected or encrypted.";

                } else if (
                    message.includes(
                        "invalid"
                    )
                ) {

                    errorMessage =
                        "One of the selected files appears to be an invalid PDF.";

                }

            }


            setMergeStatus(
                errorMessage,
                "error"
            );


        } finally {

            /* =============================================
               ENABLE BUTTON
            ============================================= */

            mergePdfButton.disabled =
                false;


            mergePdfButton.classList.remove(
                "processing"
            );


        }

    }


    /* =====================================================
       62. MERGE BUTTON EVENT
    ===================================================== */

    mergePdfButton.addEventListener(
        "click",
        async function (event) {

            event.preventDefault();


            await mergePDFs();

        }
    );


    /* =====================================================
       63. DOWNLOAD MERGED PDF
    ===================================================== */

    if (downloadPdfButton) {

        downloadPdfButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                if (
                    !mergedPdfBlob
                ) {

                    setMergeStatus(
                        "No merged PDF is available yet.",
                        "error"
                    );


                    return;

                }


                try {

                    /* =====================================
                       CREATE DOWNLOAD URL
                    ===================================== */

                    const downloadUrl =
                        URL.createObjectURL(
                            mergedPdfBlob
                        );


                    /* =====================================
                       CREATE TEMP LINK
                    ===================================== */

                    const downloadLink =
                        document.createElement(
                            "a"
                        );


                    downloadLink.href =
                        downloadUrl;


                    downloadLink.download =
                        mergedPdfFileName;


                    downloadLink.style.display =
                        "none";


                    document.body.appendChild(
                        downloadLink
                    );


                    /* =====================================
                       START DOWNLOAD
                    ===================================== */

                    downloadLink.click();


                    /* =====================================
                       CLEANUP
                    ===================================== */

                    setTimeout(
                        function () {

                            document.body.removeChild(
                                downloadLink
                            );


                            URL.revokeObjectURL(
                                downloadUrl
                            );

                        },
                        1000
                    );


                    setMergeStatus(
                        "Your merged PDF download has started.",
                        "success"
                    );


                } catch (error) {

                    console.error(
                        "Download Error:",
                        error
                    );


                    setMergeStatus(
                        "Unable to download the merged PDF.",
                        "error"
                    );

                }

            }
        );

    }


    /* =====================================================
       64. RESET MERGE RESULT
    ===================================================== */

    window.resetMergedPdf =
        function () {

            mergedPdfBlob =
                null;


            hideDownloadSection();


            hideProgress();


            setMergeStatus(
                "",
                ""
            );

        };


    /* =====================================================
       65. INITIALIZE MERGE ENGINE
    ===================================================== */

    hideProgress();


    hideDownloadSection();


    console.log(
        "Quick Tools Hub PDF Merge Engine initialized."
    );

});
