/* =====================================================
   QUICK TOOLS OFFICIAL
   BRAND QR STUDIO — JAVASCRIPT
   PART 1
===================================================== */


/* =====================================================
   GET HTML ELEMENTS
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
   BRAND COLOR DETECTION ELEMENTS
===================================================== */

const autoBrandColorBtn =
    document.getElementById("autoBrandColorBtn");

const detectedColorPreview =
    document.getElementById("detectedColorPreview");

const detectedColorText =
    document.getElementById("detectedColorText");


/* =====================================================
   VARIABLES
===================================================== */

let selectedDotStyle = "square";

let uploadedLogo = "";

let qrCode = null;

let detectedBrandColor = null;


/* =====================================================
   QR DOT STYLE MAP
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
   DEFAULT QR DATA
===================================================== */

const defaultQRData =
    "https://quicktoolsofficial.com";


/* =====================================================
   CREATE QR CODE
===================================================== */

function createQR() {

    if (
        typeof QRCodeStyling ===
        "undefined"
    ) {

        alert(
            "QR Code library failed to load. Please refresh the page."
        );

        return;

    }


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
                defaultQRData,

            image:
                uploadedLogo ||
                undefined,

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
                    Number(
                        logoSize.value
                    ) / 100,

                hideBackgroundDots:
                    true

            }

        });


    renderQR();

}


/* =====================================================
   RENDER QR CODE
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
   UPDATE QR CODE
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

                        offset:
                            0,

                        color:
                            qrColor.value

                    },

                    {

                        offset:
                            1,

                        color:
                            gradientColor.value

                    }

                ]

            }

        };

    }


    /* =================================================
       UPDATE EXISTING QR
    ================================================= */

    qrCode.update({

        width:
            Number(qrSize.value),

        height:
            Number(qrSize.value),

        data:
            qrInput.value.trim() ||
            defaultQRData,

        image:
            uploadedLogo ||
            undefined,

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
                Number(
                    logoSize.value
                ) / 100,

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


        /* Check file type */

        if (
            !file.type.startsWith("image/")
        ) {

            alert(
                "Please upload a valid image file."
            );

            this.value = "";

            return;

        }


        /* Check file size */

        if (
            file.size >
            5 * 1024 * 1024
        ) {

            alert(
                "Logo size must be less than 5MB."
            );

            this.value = "";

            return;

        }


        /* Read uploaded logo */

        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                uploadedLogo =
                    event.target.result;


                /* Show logo preview */

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


        reader.readAsDataURL(file);

    }
);


/* =====================================================
   QR DOT STYLE BUTTONS
===================================================== */

styleOptions.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {


                /* Remove active class */

                styleOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                /* Add active class */

                this.classList.add(
                    "active"
                );


                /* Save selected style */

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
   AUTO BRAND COLOR BUTTON
===================================================== */

if (
    autoBrandColorBtn
) {

    autoBrandColorBtn.addEventListener(
        "click",
        function () {

            if (!uploadedLogo) {

                alert(
                    "Please upload your brand logo first."
                );

                return;

            }


            detectBrandColor();

        }
    );

}


/* =====================================================
   DETECT BRAND COLOR
===================================================== */

function detectBrandColor() {

    const image =
        new Image();


    image.onload =
        function () {

            const canvas =
                document.createElement(
                    "canvas"
                );


            const context =
                canvas.getContext(
                    "2d"
                );


            canvas.width =
                100;

            canvas.height =
                100;


            context.drawImage(
                image,
                0,
                0,
                100,
                100
            );


            const imageData =
                context.getImageData(
                    0,
                    0,
                    100,
                    100
                ).data;


            let red =
                0;

            let green =
                0;

            let blue =
                0;

            let count =
                0;


            /* Analyze logo pixels */

            for (
                let i = 0;
                i < imageData.length;
                i += 4
            ) {

                const r =
                    imageData[i];

                const g =
                    imageData[i + 1];

                const b =
                    imageData[i + 2];

                const alpha =
                    imageData[i + 3];


                /* Ignore transparent pixels */

                if (
                    alpha < 100
                ) {

                    continue;

                }


                /* Ignore almost white pixels */

                if (
                    r > 240 &&
                    g > 240 &&
                    b > 240
                ) {

                    continue;

                }


                red += r;

                green += g;

                blue += b;

                count++;

            }


            if (
                count === 0
            ) {

                alert(
                    "Could not detect a suitable brand color."
                );

                return;

            }


            /* Calculate average color */

            red =
                Math.round(
                    red / count
                );

            green =
                Math.round(
                    green / count
                );

            blue =
                Math.round(
                    blue / count
                );


            detectedBrandColor =
                rgbToHex(
                    red,
                    green,
                    blue
                );


            /* Apply detected color */

            qrColor.value =
                detectedBrandColor;


            /* Update color preview */

            if (
                detectedColorPreview
            ) {

                detectedColorPreview.style.background =
                    detectedBrandColor;

            }


            /* Show color text */

            if (
                detectedColorText
            ) {

                detectedColorText.textContent =
                    detectedBrandColor;

            }


            /* Update QR */

            updateQRCode();

        };


    image.src =
        uploadedLogo;

}


/* =====================================================
   RGB TO HEX
===================================================== */

function rgbToHex(
    r,
    g,
    b
) {

    return "#" +
        [r, g, b]
            .map(
                function (value) {

                    return value
                        .toString(16)
                        .padStart(
                            2,
                            "0"
                        );

                }
            )
            .join("");

       }
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
   RESET BUTTON
===================================================== */

clearBtn.addEventListener(
    "click",
    function () {


        /* Reset QR input */

        qrInput.value =
            "";


        /* Reset logo */

        logoInput.value =
            "";

        uploadedLogo =
            "";


        /* Reset logo preview */

        logoPreview.innerHTML =
            "";

        logoPreview.style.display =
            "none";


        /* Reset detected brand color */

        detectedBrandColor =
            null;


        if (
            detectedColorPreview
        ) {

            detectedColorPreview.style.background =
                "transparent";

        }


        if (
            detectedColorText
        ) {

            detectedColorText.textContent =
                "No brand color detected";

        }


        /* Reset colors */

        qrColor.value =
            "#0f172a";

        bgColor.value =
            "#ffffff";

        gradientColor.value =
            "#7c3aed";


        /* Reset gradient */

        gradientToggle.checked =
            false;


        gradientControls.classList.remove(
            "active"
        );


        /* Reset QR size */

        qrSize.value =
            "300";


        qrSizeValue.textContent =
            "300px";


        /* Reset logo size */

        logoSize.value =
            "25";


        logoSizeValue.textContent =
            "25%";


        /* Reset corner style */

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


        if (
            styleOptions.length > 0
        ) {

            styleOptions[0].classList.add(
                "active"
            );

        }


        /* Reset QR container */

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


        /* Hide download buttons */

        downloadPngBtn.style.display =
            "none";


        downloadSvgBtn.style.display =
            "none";


        /* Reset scan status */

        scanStatus.innerHTML = `

            <i class="fa-solid fa-shield-check"></i>

            <span>

                Your QR code will be generated
                with high error correction.

            </span>

        `;


        /* Destroy current QR */

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


        /* Set first style active */

        if (
            styleOptions.length > 0
        ) {

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

        }


        /* Set initial slider values */

        if (
            qrSizeValue
        ) {

            qrSizeValue.textContent =
                qrSize.value +
                "px";

        }


        if (
            logoSizeValue
        ) {

            logoSizeValue.textContent =
                logoSize.value +
                "%";

        }


        /* Hide gradient controls */

        if (
            gradientControls
        ) {

            gradientControls.classList.remove(
                "active"
            );

        }


        /* Hide logo preview */

        if (
            logoPreview
        ) {

            logoPreview.style.display =
                "none";

        }


        /* Hide download buttons */

        if (
            downloadPngBtn
        ) {

            downloadPngBtn.style.display =
                "none";

        }


        if (
            downloadSvgBtn
        ) {

            downloadSvgBtn.style.display =
                "none";

        }


        console.log(
            "Brand QR Studio loaded successfully 🚀"
        );

    }
);


/* =====================================================
   ERROR HANDLING
===================================================== */

window.addEventListener(
    "error",
    function (event) {

        console.error(
            "Brand QR Studio Error:",
            event.error
        );

    }
);


/* =====================================================
   BRAND QR STUDIO READY
===================================================== */

console.log(
    "⚡ Quick Tools Official — Brand QR Studio Ready"
);
