/* =====================================================
   QUICK TOOLS OFFICIAL
   BRAND QR STUDIO — MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const qrInput = document.getElementById("qrInput");

const logoInput = document.getElementById("logoInput");

const logoPreview = document.getElementById("logoPreview");

const qrColor = document.getElementById("qrColor");

const bgColor = document.getElementById("bgColor");

const gradientToggle =
    document.getElementById("gradientToggle");

const gradientControls =
    document.getElementById("gradientControls");

const gradientColor =
    document.getElementById("gradientColor");

const qrSize =
    document.getElementById("qrSize");

const qrSizeValue =
    document.getElementById("qrSizeValue");

const logoSize =
    document.getElementById("logoSize");

const logoSizeValue =
    document.getElementById("logoSizeValue");

const cornerStyle =
    document.getElementById("cornerStyle");

const qrContainer =
    document.getElementById("qrContainer");

const generateBtn =
    document.getElementById("generateBtn");

const clearBtn =
    document.getElementById("clearBtn");

const downloadPngBtn =
    document.getElementById("downloadPngBtn");

const downloadSvgBtn =
    document.getElementById("downloadSvgBtn");

const scanStatus =
    document.getElementById("scanStatus");

const styleOptions =
    document.querySelectorAll(".style-option");


/* =====================================================
   VARIABLES
===================================================== */

let selectedDotStyle = "square";

let uploadedLogo = "";

let qrCode = null;


/* =====================================================
   QR STYLE MAPPING
===================================================== */

const dotStyleMap = {

    square: "square",

    rounded: "rounded",

    dots: "dots",

    classy: "classy",

    "classy-rounded":
        "classy-rounded",

    "extra-rounded":
        "extra-rounded"

};


/* =====================================================
   INITIAL QR CODE
===================================================== */

function createQR() {


    qrCode =
        new QRCodeStyling({

            width:
                Number(qrSize.value),

            height:
                Number(qrSize.value),

            type:
                "canvas",

            data:
                qrInput.value.trim() ||
                "https://quicktoolsofficial.com",

            image:
                uploadedLogo || undefined,

            margin:
                15,

            qrOptions: {

                errorCorrectionLevel:
                    "H"

            },

            dotsOptions: {

                color:
                    qrColor.value,

                type:
                    selectedDotStyle

            },

            backgroundOptions: {

                color:
                    bgColor.value

            },

            cornersSquareOptions: {

                type:
                    cornerStyle.value,

                color:
                    qrColor.value

            },

            cornersDotOptions: {

                type:
                    cornerStyle.value === "square"
                        ? "square"
                        : "dot",

                color:
                    qrColor.value

            },

            imageOptions: {

                crossOrigin:
                    "anonymous",

                margin:
                    8,

                imageSize:
                    Number(logoSize.value) / 100,

                hideBackgroundDots:
                    true

            }

        });


    renderQR();

}


/* =====================================================
   RENDER QR
===================================================== */

function renderQR() {


    if (!qrCode) {

        return;

    }


    qrContainer.innerHTML =
        "";


    qrCode.append(
        qrContainer
    );


    downloadPngBtn.style.display =
        "inline-flex";


    downloadSvgBtn.style.display =
        "inline-flex";


    updateScanStatus();

}


/* =====================================================
   GENERATE QR
===================================================== */

function generateQR() {


    const text =
        qrInput.value.trim();


    if (!text) {

        alert(
            "Please enter a website URL or text first."
        );

        qrInput.focus();

        return;

    }


    updateQRCode();

}


/* =====================================================
   UPDATE QR
===================================================== */

function updateQRCode() {


    if (!qrCode) {

        createQR();

        return;

    }


    let dotsOptions = {

        color:
            qrColor.value,

        type:
            selectedDotStyle

    };


    /* =================================================
       GRADIENT MODE
    ================================================= */

    if (
        gradientToggle.checked
    ) {

        dotsOptions = {

            type:
                selectedDotStyle,

            gradient: {

                type:
                    "linear",

                rotation:
                    0.8,

                colorStops: [

                    {
                        offset: 0,
                        color:
                            qrColor.value
                    },

                    {
                        offset: 1,
                        color:
                            gradientColor.value
                    }

                ]

            }

        };

    }


    /* =================================================
       UPDATE QR
    ================================================= */

    qrCode.update({

        width:
            Number(qrSize.value),

        height:
            Number(qrSize.value),

        data:
            qrInput.value.trim() ||
            "https://quicktoolsofficial.com",

        image:
            uploadedLogo || undefined,

        dotsOptions:
            dotsOptions,

        backgroundOptions: {

            color:
                bgColor.value

        },

        cornersSquareOptions: {

            type:
                cornerStyle.value,

            color:
                qrColor.value

        },

        cornersDotOptions: {

            type:
                cornerStyle.value ===
                "square"

                    ? "square"

                    : "dot",

            color:
                qrColor.value

        },

        imageOptions: {

            crossOrigin:
                "anonymous",

            margin:
                8,

            imageSize:
                Number(logoSize.value) / 100,

            hideBackgroundDots:
                true

        }

    });


    renderQR();

}


/* =====================================================
   LOGO UPLOAD
===================================================== */

logoInput.addEventListener(
    "change",
    function () {


        const file =
            this.files[0];


        if (!file) {

            return;

        }


        /* Check image */

        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            alert(
                "Please upload a valid image file."
            );

            this.value =
                "";

            return;

        }


        /* File size limit */

        if (
            file.size >
            5 * 1024 * 1024
        ) {

            alert(
                "Logo size must be less than 5MB."
            );

            this.value =
                "";

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function (event) {


                uploadedLogo =
                    event.target.result;


                /* Logo Preview */

                logoPreview.style.display =
                    "block";


                logoPreview.innerHTML = `

                    <img
                        src="${uploadedLogo}"
                        alt="Brand Logo Preview"
                    >

                `;


                /* Update QR */

                updateQRCode();

            };


        reader.readAsDataURL(
            file
        );

    }
);


/* =====================================================
   STYLE BUTTONS
===================================================== */

styleOptions.forEach(
    function (button) {


        button.addEventListener(
            "click",
            function () {


                /* Remove active */

                styleOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                /* Add active */

                this.classList.add(
                    "active"
                );


                /* Save style */

                selectedDotStyle =
                    dotStyleMap[
                        this.dataset.dot
                    ] ||
                    "square";


                /* Update QR */

                updateQRCode();

            }
        );

    }
);


/* =====================================================
   GENERATE BUTTON
===================================================== */

generateBtn.addEventListener(
    "click",
    function () {

        generateQR();

    }
);


/* =====================================================
   LIVE TEXT UPDATE
===================================================== */

qrInput.addEventListener(
    "input",
    function () {


        if (
            qrInput.value.trim()
        ) {

            updateQRCode();

        }

    }
);


/* =====================================================
   QR COLOR
===================================================== */

qrColor.addEventListener(
    "input",
    function () {

        updateQRCode();

    }
);


/* =====================================================
   BACKGROUND COLOR
===================================================== */

bgColor.addEventListener(
    "input",
    function () {

        updateQRCode();

    }
);


/* =====================================================
   GRADIENT TOGGLE
===================================================== */

gradientToggle.addEventListener(
    "change",
    function () {


        if (
            this.checked
        ) {

            gradientControls.classList.add(
                "active"
            );

        }

        else {

            gradientControls.classList.remove(
                "active"
            );

        }


        updateQRCode();

    }
);


/* =====================================================
   GRADIENT COLOR
===================================================== */

gradientColor.addEventListener(
    "input",
    function () {

        updateQRCode();

    }
);


/* =====================================================
   QR SIZE SLIDER
===================================================== */

qrSize.addEventListener(
    "input",
    function () {


        qrSizeValue.textContent =
            this.value +
            "px";


        updateQRCode();

    }
);


/* =====================================================
   LOGO SIZE SLIDER
===================================================== */

logoSize.addEventListener(
    "input",
    function () {


        logoSizeValue.textContent =
            this.value +
            "%";


        updateQRCode();

    }
);


/* =====================================================
   CORNER STYLE
===================================================== */

cornerStyle.addEventListener(
    "change",
    function () {

        updateQRCode();

    }
);


/* =====================================================
   DOWNLOAD PNG
===================================================== */

downloadPngBtn.addEventListener(
    "click",
    function () {


        if (!qrCode) {

            alert(
                "Please generate a QR code first."
            );

            return;

        }


        qrCode.download({

            name:
                "quick-tools-brand-qr",

            extension:
                "png"

        });

    }
);


/* =====================================================
   DOWNLOAD SVG
===================================================== */

downloadSvgBtn.addEventListener(
    "click",
    function () {


        if (!qrCode) {

            alert(
                "Please generate a QR code first."
            );

            return;

        }


        qrCode.download({

            name:
                "quick-tools-brand-qr",

            extension:
                "svg"

        });

    }
);


/* =====================================================
   RESET
===================================================== */

clearBtn.addEventListener(
    "click",
    function () {


        /* Reset input */

        qrInput.value =
            "";


        /* Reset logo */

        logoInput.value =
            "";

        uploadedLogo =
            "";


        logoPreview.innerHTML =
            "";

        logoPreview.style.display =
            "none";


        /* Reset colors */

        qrColor.value =
            "#0f172a";

        bgColor.value =
            "#ffffff";

        gradientColor.value =
            "#7c3aed";


        /* Disable gradient */

        gradientToggle.checked =
            false;

        gradientControls.classList.remove(
            "active"
        );


        /* Reset size */

        qrSize.value =
            "300";

        qrSizeValue.textContent =
            "300px";


        /* Reset logo size */

        logoSize.value =
            "25";

        logoSizeValue.textContent =
            "25%";


        /* Reset corner */

        cornerStyle.value =
            "square";


        /* Reset dot style */

        selectedDotStyle =
            "square";


        styleOptions.forEach(
            function (item) {

                item.classList.remove(
                    "active"
                );

            }
        );


        styleOptions[0].classList.add(
            "active"
        );


        /* Clear QR */

        qrContainer.innerHTML = `

            <div class="qr-placeholder">

                <div class="placeholder-icon">

                    <i class="fa-solid fa-qrcode"></i>

                </div>

                <h3>

                    Your QR Code

                </h3>

                <p>

                    Enter your website or text
                    to create your branded QR code.

                </p>

            </div>

        `;


        /* Hide download */

        downloadPngBtn.style.display =
            "none";

        downloadSvgBtn.style.display =
            "none";


        /* Reset status */

        scanStatus.innerHTML = `

            <i class="fa-solid fa-shield-check"></i>

            <span>

                Your QR code will be generated
                with high error correction.

            </span>

        `;


        qrCode =
            null;

    }
);


/* =====================================================
   SCAN STATUS
===================================================== */

function updateScanStatus() {


    scanStatus.innerHTML = `

        <i class="fa-solid fa-shield-check"></i>

        <span>

            High error correction enabled.
            Your branded QR is optimized
            for reliable scanning.

        </span>

    `;

}


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* Make sure first style is active */

        if (
            styleOptions.length > 0
        ) {

            styleOptions[0].classList.add(
                "active"
            );

        }


        console.log(
            "Brand QR Studio loaded successfully 🚀"
        );

    }
);
