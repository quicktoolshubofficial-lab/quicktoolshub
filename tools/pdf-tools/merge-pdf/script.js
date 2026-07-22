/* =========================================================
   MERGE PDF TOOL - JAVASCRIPT
   PART 1
========================================================= */


/* =========================================================
   PDF LIBRARY CHECK
========================================================= */

const PDFLibAvailable =
    typeof PDFLib !== "undefined";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const fileInput =
    document.getElementById("fileInput");

const uploadArea =
    document.getElementById("uploadArea");

const selectFilesBtn =
    document.getElementById("selectFilesBtn");

const fileList =
    document.getElementById("fileList");

const fileListContainer =
    document.getElementById("fileListContainer");

const emptyState =
    document.getElementById("emptyState");

const mergeBtn =
    document.getElementById("mergeBtn");

const clearBtn =
    document.getElementById("clearBtn");

const toolMessage =
    document.getElementById("toolMessage");

const progressContainer =
    document.getElementById("progressContainer");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const resultSection =
    document.getElementById("resultSection");

const downloadBtn =
    document.getElementById("downloadBtn");


/* =========================================================
   FILE STORAGE
========================================================= */

let selectedFiles = [];

let mergedPdfBytes = null;


/* =========================================================
   INITIAL SETUP
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateFileList();

        updateInterface();

    }
);


/* =========================================================
   SELECT FILE BUTTON
========================================================= */

if (selectFilesBtn && fileInput) {

    selectFilesBtn.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            fileInput.click();

        }
    );

}


/* =========================================================
   FILE INPUT CHANGE
========================================================= */

if (fileInput) {

    fileInput.addEventListener(
        "change",
        (event) => {

            const files =
                Array.from(
                    event.target.files
                );

            addFiles(files);

            fileInput.value = "";

        }
    );

}


/* =========================================================
   ADD FILES FUNCTION
========================================================= */

function addFiles(files) {

    if (!files || files.length === 0) {

        return;

    }


    const pdfFiles =
        files.filter(
            (file) => {

                return (
                    file.type === "application/pdf" ||
                    file.name
                        .toLowerCase()
                        .endsWith(".pdf")
                );

            }
        );


    if (pdfFiles.length === 0) {

        showMessage(
            "Please select valid PDF files.",
            "error"
        );

        return;

    }


    pdfFiles.forEach(
        (file) => {

            const duplicate =
                selectedFiles.some(
                    (existingFile) => {

                        return (
                            existingFile.name === file.name &&
                            existingFile.size === file.size &&
                            existingFile.lastModified ===
                            file.lastModified
                        );

                    }
                );


            if (!duplicate) {

                selectedFiles.push(file);

            }

        }
    );


    updateFileList();

    updateInterface();

    showMessage(
        `${pdfFiles.length} PDF file(s) added successfully.`,
        "success"
    );

}


/* =========================================================
   UPDATE FILE LIST
========================================================= */

function updateFileList() {

    if (!fileList) {

        return;

    }


    fileList.innerHTML = "";


    if (selectedFiles.length === 0) {

        if (emptyState) {

            emptyState.style.display =
                "flex";

        }

        return;

    }


    if (emptyState) {

        emptyState.style.display =
            "none";

    }


    selectedFiles.forEach(
        (file, index) => {

            const fileItem =
                createFileItem(
                    file,
                    index
                );

            fileList.appendChild(
                fileItem
            );

        }
    );

}


/* =========================================================
   CREATE FILE ITEM
========================================================= */

function createFileItem(
    file,
    index
) {

    const item =
        document.createElement("div");


    item.className =
        "file-item";


    item.dataset.index =
        index;


    const fileIcon =
        document.createElement("div");


    fileIcon.className =
        "file-icon";


    fileIcon.innerHTML =
        `<i class="fa-solid fa-file-pdf"></i>`;


    const fileInfo =
        document.createElement("div");


    fileInfo.className =
        "file-info";


    const fileName =
        document.createElement("h4");


    fileName.className =
        "file-name";


    fileName.textContent =
        file.name;


    fileName.title =
        file.name;


    const fileSize =
        document.createElement("span");


    fileSize.className =
        "file-size";


    fileSize.textContent =
        formatFileSize(
            file.size
        );


    fileInfo.appendChild(
        fileName
    );


    fileInfo.appendChild(
        fileSize
    );


    const orderControls =
        document.createElement("div");


    orderControls.className =
        "file-order-controls";


    const upButton =
        document.createElement("button");


    upButton.type =
        "button";


    upButton.className =
        "order-btn";


    upButton.title =
        "Move up";


    upButton.innerHTML =
        `<i class="fa-solid fa-chevron-up"></i>`;


    upButton.addEventListener(
        "click",
        () => {

            moveFileUp(index);

        }
    );


    const downButton =
        document.createElement("button");


    downButton.type =
        "button";


    downButton.className =
        "order-btn";


    downButton.title =
        "Move down";


    downButton.innerHTML =
        `<i class="fa-solid fa-chevron-down"></i>`;


    downButton.addEventListener(
        "click",
        () => {

            moveFileDown(index);

        }
    );


    orderControls.appendChild(
        upButton
    );


    orderControls.appendChild(
        downButton
    );


    const removeButton =
        document.createElement("button");


    removeButton.type =
        "button";


    removeButton.className =
        "remove-file-btn";


    removeButton.title =
        "Remove PDF";


    removeButton.innerHTML =
        `<i class="fa-solid fa-trash"></i>`;


    removeButton.addEventListener(
        "click",
        () => {

            removeFile(index);

        }
    );


    item.appendChild(
        fileIcon
    );


    item.appendChild(
        fileInfo
    );


    item.appendChild(
        orderControls
    );


    item.appendChild(
        removeButton
    );


    return item;

}


/* =========================================================
   REMOVE FILE
========================================================= */

function removeFile(index) {

    if (
        index < 0 ||
        index >= selectedFiles.length
    ) {

        return;

    }


    const removedFile =
        selectedFiles[index];


    selectedFiles.splice(
        index,
        1
    );


    updateFileList();

    updateInterface();


    showMessage(
        `${removedFile.name} removed.`,
        "success"
    );

}


/* =========================================================
   MOVE FILE UP
========================================================= */

function moveFileUp(index) {

    if (index <= 0) {

        return;

    }


    const temp =
        selectedFiles[index];


    selectedFiles[index] =
        selectedFiles[index - 1];


    selectedFiles[index - 1] =
        temp;


    updateFileList();

}


/* =========================================================
   MOVE FILE DOWN
========================================================= */

function moveFileDown(index) {

    if (
        index < 0 ||
        index >= selectedFiles.length - 1
    ) {

        return;

    }


    const temp =
        selectedFiles[index];


    selectedFiles[index] =
        selectedFiles[index + 1];


    selectedFiles[index + 1] =
        temp;


    updateFileList();

}


/* =========================================================
   FORMAT FILE SIZE
========================================================= */

function formatFileSize(bytes) {

    if (bytes === 0) {

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


    const size =
        bytes /
        Math.pow(
            1024,
            index
        );


    return (
        `${size.toFixed(2)} ${units[index]}`
    );

}


/* =========================================================
   UPDATE INTERFACE
========================================================= */

function updateInterface() {

    const hasFiles =
        selectedFiles.length > 0;


    if (mergeBtn) {

        mergeBtn.disabled =
            selectedFiles.length < 2;

    }


    if (clearBtn) {

        clearBtn.disabled =
            !hasFiles;

    }


    if (fileListContainer) {

        fileListContainer.style.display =
            hasFiles
                ? "block"
                : "none";

    }

}


/* =========================================================
   CLEAR ALL FILES
========================================================= */

if (clearBtn) {

    clearBtn.addEventListener(
        "click",
        () => {

            selectedFiles = [];

            mergedPdfBytes = null;

            updateFileList();

            updateInterface();

            hideResult();

            showMessage(
                "All PDF files have been cleared.",
                "success"
            );

        }
    );

}


/* =========================================================
   MESSAGE SYSTEM
========================================================= */

function showMessage(
    message,
    type = "info"
) {

    if (!toolMessage) {

        return;

    }


    toolMessage.textContent =
        message;


    toolMessage.className =
        "tool-message";


    toolMessage.classList.add(
        type
    );


    toolMessage.style.display =
        "block";


    clearTimeout(
        window.messageTimeout
    );


    window.messageTimeout =
        setTimeout(
            () => {

                toolMessage.style.display =
                    "none";

            },
            4000
        );

}


/* =========================================================
   HIDE RESULT
========================================================= */

function hideResult() {

    if (resultSection) {

        resultSection.style.display =
            "none";

    }


    mergedPdfBytes =
        null;

}


/* =========================================================
   FILE DRAG & DROP
========================================================= */

if (uploadArea) {

    uploadArea.addEventListener(
        "dragover",
        (event) => {

            event.preventDefault();

            uploadArea.classList.add(
                "drag-over"
            );

        }
    );


    uploadArea.addEventListener(
        "dragleave",
        () => {

            uploadArea.classList.remove(
                "drag-over"
            );

        }
    );


    uploadArea.addEventListener(
        "drop",
        (event) => {

            event.preventDefault();

            uploadArea.classList.remove(
                "drag-over"
            );


            const files =
                Array.from(
                    event.dataTransfer.files
                );


            addFiles(files);

        }
    );

   
}
/* =========================================================
   MERGE PDF FUNCTION
========================================================= */

if (mergeBtn) {

    mergeBtn.addEventListener(
        "click",
        async () => {

            if (selectedFiles.length < 2) {

                showMessage(
                    "Please select at least 2 PDF files to merge.",
                    "error"
                );

                return;

            }


            if (!PDFLibAvailable) {

                showMessage(
                    "PDF processing library could not be loaded.",
                    "error"
                );

                return;

            }


            try {

                setProcessingState(true);

                hideResult();

                updateProgress(
                    5,
                    "Preparing PDF files..."
                );


                const mergedPdf =
                    await PDFLib.PDFDocument.create();


                for (
                    let i = 0;
                    i < selectedFiles.length;
                    i++
                ) {

                    const file =
                        selectedFiles[i];


                    const progress =
                        10 +
                        Math.round(
                            (
                                i /
                                selectedFiles.length
                            ) *
                            70
                        );


                    updateProgress(
                        progress,
                        `Reading ${file.name}...`
                    );


                    const fileBytes =
                        await readFileAsArrayBuffer(
                            file
                        );


                    const sourcePdf =
                        await PDFLib.PDFDocument.load(
                            fileBytes
                        );


                    const pageCount =
                        sourcePdf.getPageCount();


                    updateProgress(
                        progress + 5,
                        `Processing ${file.name}...`
                    );


                    const copiedPages =
                        await mergedPdf.copyPages(
                            sourcePdf,
                            sourcePdf.getPageIndices()
                        );


                    copiedPages.forEach(
                        (page) => {

                            mergedPdf.addPage(
                                page
                            );

                        }
                    );

                }


                updateProgress(
                    90,
                    "Creating merged PDF..."
                );


                mergedPdfBytes =
                    await mergedPdf.save();


                updateProgress(
                    100,
                    "PDF merged successfully!"
                );


                const totalPages =
                    mergedPdf.getPageCount();


                showResult(
                    totalPages
                );


                showMessage(
                    "Your PDF files have been merged successfully.",
                    "success"
                );


            } catch (error) {

                console.error(
                    "PDF Merge Error:",
                    error
                );


                mergedPdfBytes =
                    null;


                showMessage(
                    getFriendlyErrorMessage(
                        error
                    ),
                    "error"
                );


            } finally {

                setProcessingState(
                    false
                );

            }

        }
    );

}


/* =========================================================
   READ FILE AS ARRAY BUFFER
========================================================= */

function readFileAsArrayBuffer(
    file
) {

    return new Promise(
        (
            resolve,
            reject
        ) => {

            const reader =
                new FileReader();


            reader.onload =
                () => {

                    resolve(
                        reader.result
                    );

                };


            reader.onerror =
                () => {

                    reject(
                        new Error(
                            "Unable to read the selected PDF file."
                        )
                    );

                };


            reader.readAsArrayBuffer(
                file
            );

        }
    );

}


/* =========================================================
   UPDATE PROGRESS
========================================================= */

function updateProgress(
    percentage,
    message
) {

    const safePercentage =
        Math.min(
            100,
            Math.max(
                0,
                percentage
            )
        );


    if (progressContainer) {

        progressContainer.style.display =
            "block";

    }


    if (progressBar) {

        progressBar.style.width =
            `${safePercentage}%`;


        progressBar.setAttribute(
            "aria-valuenow",
            safePercentage
        );

    }


    if (progressText) {

        progressText.textContent =
            message;

    }

}


/* =========================================================
   PROCESSING STATE
========================================================= */

function setProcessingState(
    isProcessing
) {

    if (mergeBtn) {

        mergeBtn.disabled =
            isProcessing ||
            selectedFiles.length < 2;

    }


    if (clearBtn) {

        clearBtn.disabled =
            isProcessing;

    }


    if (selectFilesBtn) {

        selectFilesBtn.disabled =
            isProcessing;

    }


    if (fileInput) {

        fileInput.disabled =
            isProcessing;

    }


    const orderButtons =
        document.querySelectorAll(
            ".order-btn"
        );


    orderButtons.forEach(
        (button) => {

            button.disabled =
                isProcessing;

        }
    );


    const removeButtons =
        document.querySelectorAll(
            ".remove-file-btn"
        );


    removeButtons.forEach(
        (button) => {

            button.disabled =
                isProcessing;

        }
    );


    if (isProcessing) {

        if (mergeBtn) {

            mergeBtn.classList.add(
                "processing"
            );


            mergeBtn.innerHTML =
                `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Merging PDFs...
                `;

        }

    } else {

        if (mergeBtn) {

            mergeBtn.classList.remove(
                "processing"
            );


            mergeBtn.innerHTML =
                `
                <i class="fa-solid fa-code-merge"></i>
                Merge PDF Files
                <i class="fa-solid fa-arrow-right"></i>
                `;

        }

    }

}


/* =========================================================
   SHOW MERGE RESULT
========================================================= */

function showResult(
    totalPages
) {

    if (!resultSection) {

        return;

    }


    resultSection.style.display =
        "block";


    resultSection.classList.add(
        "result-visible"
    );


    const resultPageCount =
        document.getElementById(
            "resultPageCount"
        );


    if (resultPageCount) {

        resultPageCount.textContent =
            `${totalPages} page${totalPages === 1 ? "" : "s"}`;

    }


    resultSection.scrollIntoView(
        {
            behavior: "smooth",
            block: "center"
        }
    );

}


/* =========================================================
   DOWNLOAD MERGED PDF
========================================================= */

if (downloadBtn) {

    downloadBtn.addEventListener(
        "click",
        () => {

            if (
                !mergedPdfBytes ||
                mergedPdfBytes.length === 0
            ) {

                showMessage(
                    "No merged PDF is available yet.",
                    "error"
                );

                return;

            }


            try {

                const blob =
                    new Blob(
                        [
                            mergedPdfBytes
                        ],
                        {
                            type:
                                "application/pdf"
                        }
                    );


                const url =
                    URL.createObjectURL(
                        blob
                    );


                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    url;


                link.download =
                    "quick-tools-hub-merged.pdf";


                document.body.appendChild(
                    link
                );


                link.click();


                link.remove();


                setTimeout(
                    () => {

                        URL.revokeObjectURL(
                            url
                        );

                    },
                    1000
                );


                showMessage(
                    "Your merged PDF download has started.",
                    "success"
                );


            } catch (error) {

                console.error(
                    "Download Error:",
                    error
                );


                showMessage(
                    "Unable to download the merged PDF.",
                    "error"
                );

            }

        }
    );

}


/* =========================================================
   FRIENDLY ERROR MESSAGES
========================================================= */

function getFriendlyErrorMessage(
    error
) {

    if (!error) {

        return "Something went wrong while processing your PDF files.";

    }


    const errorMessage =
        String(
            error.message ||
            error
        ).toLowerCase();


    if (
        errorMessage.includes(
            "encrypted"
        ) ||
        errorMessage.includes(
            "password"
        )
    ) {

        return (
            "One of your PDF files is password protected or encrypted."
        );

    }


    if (
        errorMessage.includes(
            "invalid"
        ) ||
        errorMessage.includes(
            "malformed"
        )
    ) {

        return (
            "One of the selected files appears to be an invalid or damaged PDF."
        );

    }


    if (
        errorMessage.includes(
            "memory"
        )
    ) {

        return (
            "The selected PDF files are too large to process in your browser."
        );

    }


    return (
        "Something went wrong while merging your PDF files. Please try again."
    );

}


/* =========================================================
   RESET PROGRESS
========================================================= */

function resetProgress() {

    if (progressBar) {

        progressBar.style.width =
            "0%";

        progressBar.setAttribute(
            "aria-valuenow",
            "0"
        );

    }


    if (progressText) {

        progressText.textContent =
            "Ready to process your PDF files.";

    }

}


/* =========================================================
   AUTO RESET AFTER SUCCESS
========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        selectedFiles = [];

        mergedPdfBytes = null;

    }
);


/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            selectedFiles.length > 0
        ) {

            if (
                !mergeBtn ||
                !mergeBtn.disabled
            ) {

                hideResult();

            }

        }

    }
);


/* =========================================================
   FINAL INITIALIZATION
========================================================= */

resetProgress();

updateInterface();
/* =========================================================
   MERGE PDF - SCRIPT.JS
   PART 3 - FINAL POLISH & SAFETY
========================================================= */


/* =========================================================
   UPLOAD AREA CLICK SUPPORT
========================================================= */

if (uploadArea) {

    uploadArea.addEventListener(
        "click",
        (event) => {

            if (
                event.target.closest(
                    "button"
                )
            ) {

                return;

            }


            if (
                fileInput &&
                !fileInput.disabled
            ) {

                fileInput.click();

            }

        }
    );

}


/* =========================================================
   DRAG & DROP VISUAL STATE
========================================================= */

if (uploadArea) {

    [
        "dragenter",
        "dragover"
    ].forEach(
        (eventName) => {

            uploadArea.addEventListener(
                eventName,
                (event) => {

                    event.preventDefault();

                    event.stopPropagation();


                    if (
                        fileInput &&
                        fileInput.disabled
                    ) {

                        return;

                    }


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
        (eventName) => {

            uploadArea.addEventListener(
                eventName,
                (event) => {

                    event.preventDefault();

                    event.stopPropagation();


                    uploadArea.classList.remove(
                        "drag-active"
                    );

                }
            );

        }
    );

}


/* =========================================================
   DROP FILE VALIDATION
========================================================= */

if (uploadArea) {

    uploadArea.addEventListener(
        "drop",
        (event) => {

            if (
                fileInput &&
                fileInput.disabled
            ) {

                return;

            }


            const droppedFiles =
                Array.from(
                    event.dataTransfer.files
                );


            if (
                droppedFiles.length === 0
            ) {

                showMessage(
                    "No files were dropped.",
                    "error"
                );

                return;

            }


            const validFiles =
                droppedFiles.filter(
                    (file) => {

                        return isValidPdf(
                            file
                        );

                    }
                );


            const invalidFiles =
                droppedFiles.filter(
                    (file) => {

                        return !isValidPdf(
                            file
                        );

                    }
                );


            if (
                invalidFiles.length > 0
            ) {

                showMessage(
                    `${invalidFiles.length} non-PDF file(s) were ignored.`,
                    "error"
                );

            }


            if (
                validFiles.length > 0
            ) {

                addFiles(
                    validFiles
                );

            }

        }
    );

}


/* =========================================================
   PDF VALIDATION
========================================================= */

function isValidPdf(
    file
) {

    if (!file) {

        return false;

    }


    const fileName =
        file.name
            .toLowerCase();


    const isPdfExtension =
        fileName.endsWith(
            ".pdf"
        );


    const isPdfType =
        file.type ===
        "application/pdf";


    return (
        isPdfExtension ||
        isPdfType
    );

}


/* =========================================================
   FILE INPUT VALIDATION OVERRIDE
========================================================= */

if (fileInput) {

    fileInput.addEventListener(
        "change",
        (event) => {

            const files =
                Array.from(
                    event.target.files
                );


            const validFiles =
                files.filter(
                    (file) => {

                        return isValidPdf(
                            file
                        );

                    }
                );


            const invalidCount =
                files.length -
                validFiles.length;


            if (
                invalidCount > 0
            ) {

                showMessage(
                    `${invalidCount} invalid file(s) were ignored. Please select PDF files only.`,
                    "error"
                );

            }


            if (
                validFiles.length > 0
            ) {

                addFiles(
                    validFiles
                );

            }


            fileInput.value =
                "";

        }
    );

}


/* =========================================================
   PREVENT DUPLICATE FILES
========================================================= */

function isDuplicateFile(
    file
) {

    return selectedFiles.some(
        (existingFile) => {

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

}


/* =========================================================
   SAFE FILE ADDING
========================================================= */

function safelyAddFiles(
    files
) {

    if (
        !Array.isArray(files)
    ) {

        return;

    }


    let addedCount =
        0;


    files.forEach(
        (file) => {

            if (
                !isValidPdf(
                    file
                )
            ) {

                return;

            }


            if (
                isDuplicateFile(
                    file
                )
            ) {

                return;

            }


            selectedFiles.push(
                file
            );


            addedCount++;

        }
    );


    updateFileList();

    updateInterface();


    if (
        addedCount > 0
    ) {

        showMessage(
            `${addedCount} PDF file(s) added successfully.`,
            "success"
        );

    }

}


/* =========================================================
   MAX FILE LIMIT
========================================================= */

const MAX_PDF_FILES =
    20;


/* =========================================================
   FILE COUNT PROTECTION
========================================================= */

function canAddMoreFiles(
    newFilesCount
) {

    return (
        selectedFiles.length +
        newFilesCount <=
        MAX_PDF_FILES
    );

}


/* =========================================================
   SAFE MERGE CHECK
========================================================= */

function canStartMerge() {

    if (
        selectedFiles.length < 2
    ) {

        showMessage(
            "Please select at least 2 PDF files before merging.",
            "error"
        );

        return false;

    }


    if (
        selectedFiles.length >
        MAX_PDF_FILES
    ) {

        showMessage(
            `You can merge a maximum of ${MAX_PDF_FILES} PDF files at once.`,
            "error"
        );

        return false;

    }


    return true;

}


/* =========================================================
   PREVENT ACCIDENTAL DOUBLE MERGE
========================================================= */

let mergeInProgress =
    false;


if (mergeBtn) {

    mergeBtn.addEventListener(
        "click",
        () => {

            if (
                mergeInProgress
            ) {

                return;

            }


            if (
                !canStartMerge()
            ) {

                return;

            }


            mergeInProgress =
                true;


            setTimeout(
                () => {

                    mergeInProgress =
                        false;

                },
                2000
            );

        }
    );

}


/* =========================================================
   UPLOAD AREA ACCESSIBILITY
========================================================= */

if (uploadArea) {

    uploadArea.setAttribute(
        "role",
        "button"
    );


    uploadArea.setAttribute(
        "tabindex",
        "0"
    );


    uploadArea.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();


                if (
                    fileInput &&
                    !fileInput.disabled
                ) {

                    fileInput.click();

                }

            }

        }
    );

}


/* =========================================================
   FILE COUNT DISPLAY
========================================================= */

function updateFileCount() {

    const fileCount =
        document.getElementById(
            "fileCount"
        );


    if (!fileCount) {

        return;

    }


    const count =
        selectedFiles.length;


    if (count === 0) {

        fileCount.textContent =
            "No PDF files selected.";

    } else {

        fileCount.textContent =
            `${count} PDF file${count === 1 ? "" : "s"} selected.`;

    }

}


/* =========================================================
   KEEP FILE COUNT SYNCHRONIZED
========================================================= */

const originalUpdateFileList =
    updateFileList;


updateFileList =
    function () {

        originalUpdateFileList();

        updateFileCount();

    };


/* =========================================================
   PAGE VISIBILITY SAFETY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            progressContainer
        ) {

            progressContainer.classList.add(
                "page-hidden"
            );

        } else if (
            progressContainer
        ) {

            progressContainer.classList.remove(
                "page-hidden"
            );

        }

    }
);


/* =========================================================
   BROWSER SUPPORT CHECK
========================================================= */

function checkBrowserSupport() {

    const supported =
        typeof FileReader !==
            "undefined" &&

        typeof Blob !==
            "undefined" &&

        typeof URL !==
            "undefined";


    if (
        !supported
    ) {

        showMessage(
            "Your browser does not support the required file processing features.",
            "error"
        );

        return false;

    }


    return true;

}


/* =========================================================
   INITIAL BROWSER CHECK
========================================================= */

checkBrowserSupport();


/* =========================================================
   FINAL UI UPDATE
========================================================= */

updateFileList();

updateFileCount();

updateInterface();


/* =========================================================
   MERGE PDF TOOL READY
========================================================= */

console.log(
    "Quick Tools Hub - Merge PDF Tool is ready."
);
