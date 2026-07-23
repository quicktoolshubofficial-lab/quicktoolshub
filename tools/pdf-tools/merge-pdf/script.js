/* =========================================================
   QUICK TOOLS HUB
   MERGE PDF TOOL
   SCRIPT.JS
   PART 1
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {
console.log("SCRIPT LOADED");

const testButton = document.getElementById("browseBtn");
const testInput = document.getElementById("pdfInput");

console.log("Browse Button:", testButton);
console.log("PDF Input:", testInput);

if (testButton && testInput) {
    testButton.addEventListener("click", function () {
        console.log("BUTTON CLICKED");
        testInput.click();
    });
}

        /* =========================
           ELEMENTS
        ========================== */


        const pdfInput =
            document.getElementById("pdfInput");


        const uploadCard =
            document.getElementById("uploadCard");


        const browseBtn =
            document.getElementById("browseBtn");


        const addMoreBtn =
            document.getElementById("addMoreBtn");


        const clearAllBtn =
            document.getElementById("clearAllBtn");


        const filesSection =
            document.getElementById("filesSection");


        const fileList =
            document.getElementById("fileList");


        const fileCount =
            document.getElementById("fileCount");


        const mergePanel =
            document.getElementById("mergePanel");


        const mergeBtn =
            document.getElementById("mergeBtn");


        const progressSection =
            document.getElementById("progressSection");


        const progressFill =
            document.getElementById("progressFill");


        const progressPercent =
            document.getElementById("progressPercent");


        const progressText =
            document.getElementById("progressText");


        const resultSection =
            document.getElementById("resultSection");


        const downloadBtn =
            document.getElementById("downloadBtn");


        const newMergeBtn =
            document.getElementById("newMergeBtn");


        const mobileMenuBtn =
            document.getElementById("mobileMenuBtn");


        const mobileNav =
            document.getElementById("mobileNav");


        const ctaUploadBtn =
            document.getElementById("ctaUploadBtn");



        /* =========================
           VARIABLES
        ========================== */


        let pdfFiles = [];

        let mergedPdfBlob = null;



        /* =========================
           OPEN FILE SELECTOR
        ========================== */


        browseBtn.addEventListener(
            "click",
            () => {

                pdfInput.click();

            }
        );


        if(addMoreBtn){

            addMoreBtn.addEventListener(
                "click",
                () => {

                    pdfInput.click();

                }
            );

        }



        if(ctaUploadBtn){

            ctaUploadBtn.addEventListener(
                "click",
                () => {

                    pdfInput.click();

                }
            );

        }



        /* =========================
           FILE INPUT CHANGE
        ========================== */


        pdfInput.addEventListener(
            "change",
            (event) => {


                const files =
                    Array.from(
                        event.target.files
                    );


                addPdfFiles(files);


                pdfInput.value = "";


            }
        );



        /* =========================
           ADD PDF FILES
        ========================== */


        function addPdfFiles(files){


            const pdfOnly =
                files.filter(
                    file =>
                    file.type === "application/pdf"
                );


            if(pdfOnly.length === 0){

                alert(
                    "Please select PDF files only."
                );

                return;

            }



            pdfFiles =
                [
                    ...pdfFiles,
                    ...pdfOnly
                ];



            updateFileUI();


        }



        /* =========================
           UPDATE FILE UI
        ========================== */


        function updateFileUI(){


            fileList.innerHTML = "";



            pdfFiles.forEach(
                (file,index)=>{


                    const item =
                    document.createElement(
                        "div"
                    );


                    item.className =
                        "file-item";


                    item.draggable =
                        true;



                    item.innerHTML = `

                        <div class="file-number">
                            ${index + 1}
                        </div>


                        <div class="file-icon">
                            <i class="fa-solid fa-file-pdf"></i>
                        </div>


                        <div class="file-info">

                            <div class="file-name">
                                ${file.name}
                            </div>


                            <div class="file-size">
                                ${formatBytes(file.size)}
                            </div>

                        </div>


                        <div class="file-drag-handle">

                            <i class="fa-solid fa-grip-lines"></i>

                        </div>


                        <button
                            class="file-remove-btn"
                            data-index="${index}"
                            type="button"
                        >

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    `;


                    fileList.appendChild(
                        item
                    );


                }
            );



            fileCount.textContent =
                pdfFiles.length;



            toggleSections();


            addRemoveEvents();


            enableDragSorting();


        }



        /* =========================
           FORMAT FILE SIZE
        ========================== */


        function formatBytes(bytes){


            if(bytes === 0)
                return "0 Bytes";



            const sizes =
            [
                "Bytes",
                "KB",
                "MB",
                "GB"
            ];



            const i =
            Math.floor(
                Math.log(bytes)
                /
                Math.log(1024)
            );



            return (
                Math.round(
                    bytes /
                    Math.pow(
                        1024,
                        i
                    )
                )
                +
                " "
                +
                sizes[i]
            );


        }
       /* =========================================================
   SCRIPT.JS
   PART 2
========================================================= */


/* =========================
   TOGGLE TOOL SECTIONS
========================= */

function toggleSections() {


    if(pdfFiles.length > 0){

        filesSection.style.display =
            "block";


        mergePanel.style.display =
            "block";


    } else {


        filesSection.style.display =
            "none";


        mergePanel.style.display =
            "none";


    }

}



/* =========================
   REMOVE FILE EVENTS
========================= */

function addRemoveEvents(){


    const removeButtons =
        document.querySelectorAll(
            ".file-remove-btn"
        );


    removeButtons.forEach(
        button => {


            button.addEventListener(
                "click",
                () => {


                    const index =
                        Number(
                            button.dataset.index
                        );


                    pdfFiles.splice(
                        index,
                        1
                    );


                    updateFileUI();


                }
            );


        }
    );

}



/* =========================
   DRAG & DROP SORTING
========================= */

function enableDragSorting(){


    const fileItems =
        document.querySelectorAll(
            ".file-item"
        );


    let draggedIndex =
        null;



    fileItems.forEach(
        (item,index) => {


            item.addEventListener(
                "dragstart",
                () => {


                    draggedIndex =
                        index;


                    item.classList.add(
                        "dragging"
                    );


                }
            );



            item.addEventListener(
                "dragend",
                () => {


                    item.classList.remove(
                        "dragging"
                    );


                }
            );



            item.addEventListener(
                "dragover",
                event => {


                    event.preventDefault();


                }
            );



            item.addEventListener(
                "drop",
                event => {


                    event.preventDefault();



                    const targetIndex =
                        index;



                    if(
                        draggedIndex === null
                        ||
                        draggedIndex === targetIndex
                    ){

                        return;

                    }



                    const draggedFile =
                        pdfFiles[
                            draggedIndex
                        ];



                    pdfFiles.splice(
                        draggedIndex,
                        1
                    );



                    pdfFiles.splice(
                        targetIndex,
                        0,
                        draggedFile
                    );



                    updateFileUI();


                    draggedIndex =
                        null;


                }
            );


        }
    );

}



/* =========================
   CLEAR ALL FILES
========================= */

clearAllBtn.addEventListener(
    "click",
    () => {


        if(pdfFiles.length === 0){

            return;

        }



        const confirmClear =
            confirm(
                "Are you sure you want to remove all PDF files?"
            );



        if(!confirmClear){

            return;

        }



        pdfFiles = [];


        mergedPdfBlob = null;


        updateFileUI();


        resultSection.style.display =
            "none";


        progressSection.style.display =
            "none";


    }
);



/* =========================
   MERGE PDF BUTTON
========================= */

mergeBtn.addEventListener(
    "click",
    async () => {


        if(pdfFiles.length < 2){

            alert(
                "Please select at least 2 PDF files to merge."
            );

            return;

        }



        await mergePDFs();


    }
);



/* =========================
   MERGE PDF FUNCTION
========================= */

async function mergePDFs(){


    try {


        /* =========================
           CHECK PDF-LIB
        ========================== */


        if(
            typeof PDFLib ===
            "undefined"
        ){

            throw new Error(
                "PDF library could not be loaded."
            );

        }



        /* =========================
           SHOW PROGRESS
        ========================== */

        mergePanel.style.display =
            "none";


        filesSection.style.display =
            "none";


        progressSection.style.display =
            "block";


        resultSection.style.display =
            "none";


        updateProgress(
            5,
            "Preparing your PDF documents..."
        );



        /* =========================
           CREATE NEW PDF
        ========================== */

        const mergedPdf =
            await PDFLib.PDFDocument.create();



        /* =========================
           PROCESS EACH FILE
        ========================== */

        for(
            let i = 0;
            i < pdfFiles.length;
            i++
        ){


            const file =
                pdfFiles[i];



            updateProgress(
                Math.round(
                    10
                    +
                    (
                        i /
                        pdfFiles.length
                    )
                    *
                    75
                ),
                `Processing ${file.name}...`
            );



            const arrayBuffer =
                await file.arrayBuffer();



            const pdf =
                await PDFLib.PDFDocument.load(
                    arrayBuffer
                );



            const pageIndices =
                pdf
                .getPageIndices();



            const copiedPages =
                await mergedPdf.copyPages(
                    pdf,
                    pageIndices
                );



            copiedPages.forEach(
                page => {

                    mergedPdf.addPage(
                        page
                    );

                }
            );


        }



        /* =========================
           SAVE MERGED PDF
        ========================== */

        updateProgress(
            90,
            "Creating your final PDF..."
        );



        const mergedPdfBytes =
            await mergedPdf.save();



        /* =========================
           CREATE BLOB
        ========================== */

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



        /* =========================
           COMPLETE
        ========================== */

        updateProgress(
            100,
            "Your PDF has been successfully merged!"
        );



        setTimeout(
            () => {


                progressSection.style.display =
                    "none";


                resultSection.style.display =
                    "block";


                resultSection.scrollIntoView(
                    {
                        behavior:
                            "smooth",
                        block:
                            "center"
                    }
                );


            },
            600
        );


    }
    catch(error){


        console.error(
            "PDF Merge Error:",
            error
        );


        progressSection.style.display =
            "none";


        filesSection.style.display =
            "block";


        mergePanel.style.display =
            "block";


        alert(
            "Something went wrong while merging the PDF files. Please try again."
        );


    }

}



/* =========================
   UPDATE PROGRESS
========================= */

function updateProgress(
    percent,
    message
){


    progressFill.style.width =
        `${percent}%`;


    progressPercent.textContent =
        `${percent}%`;


    progressText.textContent =
        message;


   }
       /* =========================================================
   SCRIPT.JS
   PART 3 - FINAL
========================================================= */


/* =========================
   DOWNLOAD MERGED PDF
========================= */

downloadBtn.addEventListener(
    "click",
    () => {


        if(!mergedPdfBlob){

            alert(
                "No merged PDF is available."
            );

            return;

        }



        const downloadUrl =
            URL.createObjectURL(
                mergedPdfBlob
            );



        const link =
            document.createElement(
                "a"
            );


        link.href =
            downloadUrl;


        link.download =
            "Quick-Tools-Hub-Merged.pdf";


        document.body.appendChild(
            link
        );


        link.click();


        document.body.removeChild(
            link
        );



        setTimeout(
            () => {

                URL.revokeObjectURL(
                    downloadUrl
                );

            },
            1000
        );


    }
);



/* =========================
   NEW MERGE
========================= */

newMergeBtn.addEventListener(
    "click",
    () => {


        pdfFiles = [];


        mergedPdfBlob =
            null;



        pdfInput.value =
            "";



        updateFileUI();



        resultSection.style.display =
            "none";



        progressSection.style.display =
            "none";



        filesSection.style.display =
            "none";



        mergePanel.style.display =
            "none";



        uploadCard.scrollIntoView(
            {
                behavior:
                    "smooth",
                block:
                    "center"
            }
        );


    }
);



/* =========================
   DRAG & DROP UPLOAD
========================= */

uploadCard.addEventListener(
    "dragover",
    (event) => {


        event.preventDefault();


        uploadCard.classList.add(
            "drag-over"
        );


    }
);



uploadCard.addEventListener(
    "dragleave",
    (event) => {


        if(
            !uploadCard.contains(
                event.relatedTarget
            )
        ){

            uploadCard.classList.remove(
                "drag-over"
            );

        }


    }
);



uploadCard.addEventListener(
    "drop",
    (event) => {


        event.preventDefault();


        uploadCard.classList.remove(
            "drag-over"
        );



        const files =
            Array.from(
                event.dataTransfer.files
            );



        addPdfFiles(
            files
        );


    }
);



/* =========================
   MOBILE MENU
========================= */

if(mobileMenuBtn){


    mobileMenuBtn.addEventListener(
        "click",
        () => {


            mobileNav.classList.toggle(
                "active"
            );


            mobileMenuBtn.classList.toggle(
                "active"
            );


        }
    );


}



/* =========================
   CLOSE MOBILE MENU
   WHEN LINK IS CLICKED
========================= */

if(mobileNav){


    const mobileLinks =
        mobileNav.querySelectorAll(
            "a"
        );


    mobileLinks.forEach(
        link => {


            link.addEventListener(
                "click",
                () => {


                    mobileNav.classList.remove(
                        "active"
                    );


                    mobileMenuBtn.classList.remove(
                        "active"
                    );


                }
            );


        }
    );


}



/* =========================
   FAQ ACCORDION
========================= */

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );



faqQuestions.forEach(
    question => {


        question.addEventListener(
            "click",
            () => {


                const currentItem =
                    question.closest(
                        ".faq-item"
                    );



                const isActive =
                    currentItem.classList.contains(
                        "active"
                    );



                /* =========================
                   CLOSE OTHER FAQS
                ========================== */

                document
                    .querySelectorAll(
                        ".faq-item.active"
                    )
                    .forEach(
                        item => {


                            if(
                                item !==
                                currentItem
                            ){

                                item.classList.remove(
                                    "active"
                                );

                            }


                        }
                    );



                /* =========================
                   TOGGLE CURRENT FAQ
                ========================== */

                if(isActive){

                    currentItem.classList.remove(
                        "active"
                    );

                }
                else{

                    currentItem.classList.add(
                        "active"
                    );

                }


            }
        );


    }
);



/* =========================
   INITIAL UI STATE
========================= */

filesSection.style.display =
    "none";


mergePanel.style.display =
    "none";


progressSection.style.display =
    "none";


resultSection.style.display =
    "none";



/* =========================
   INITIAL FILE COUNT
========================= */

fileCount.textContent =
    "0";



/* =========================
   INITIAL PROGRESS
========================= */

progressFill.style.width =
    "0%";


progressPercent.textContent =
    "0%";


progressText.textContent =
    "Ready to merge your PDFs";



/* =========================
   PREVENT DEFAULT FILE DROP
   ON ENTIRE PAGE
========================= */

document.addEventListener(
    "dragover",
    (event) => {

        event.preventDefault();

    }
);



document.addEventListener(
    "drop",
    (event) => {

        event.preventDefault();

    }
);



/* =========================
   KEYBOARD SHORTCUT
   CTRL + O
========================= */

document.addEventListener(
    "keydown",
    (event) => {


        if(
            (event.ctrlKey ||
             event.metaKey)
            &&
            event.key.toLowerCase()
            ===
            "o"
        ){


            event.preventDefault();


            pdfInput.click();


        }


    }
);



/* =========================================================
   MERGE PDF TOOL INITIALIZED
   QUICK TOOLS HUB
========================================================= */


console.log(
    "Quick Tools Hub - Merge PDF Tool Loaded Successfully."
);
