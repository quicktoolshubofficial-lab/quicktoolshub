/* =========================
   BRAND QR STUDIO
   QUICK TOOLS OFFICIAL
========================= */


/* =========================
   ELEMENTS
========================= */

const qrInput = document.getElementById("qrInput");

const logoInput = document.getElementById("logoInput");

const logoPreview = document.getElementById("logoPreview");

const qrColor = document.getElementById("qrColor");

const bgColor = document.getElementById("bgColor");

const qrContainer = document.getElementById("qrContainer");

const generateBtn = document.getElementById("generateBtn");

const clearBtn = document.getElementById("clearBtn");

const downloadBtn = document.getElementById("downloadBtn");

const styleOptions =
    document.querySelectorAll(".style-option");


/* =========================
   VARIABLES
========================= */

let uploadedLogo = null;

let selectedStyle = "square";

let currentQR = null;


/* =========================
   LOGO UPLOAD
========================= */

logoInput.addEventListener(
    "change",
    function () {

        const file = this.files[0];

        if (!file) {
            return;
        }


        /* Check image type */

        if (!file.type.startsWith("image/")) {

            alert(
                "Please upload a valid image file."
            );

            return;
        }


        /* Check file size */

        if (file.size > 5 * 1024 * 1024) {

            alert(
                "Logo size must be less than 5MB."
            );

            return;
        }


        const reader = new FileReader();


        reader.onload = function (event) {

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

        };


        reader.readAsDataURL(file);

    }
);


/* =========================
   STYLE SELECTOR
========================= */

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


                /* Save selected style */

                selectedStyle =
                    this.dataset.style;


                /* Regenerate */

                if (qrInput.value.trim()) {

                    generateQR();

                }

            }
        );

    }
);


/* =========================
   GENERATE QR
========================= */

function generateQR() {


    const text =
        qrInput.value.trim();


    /* Empty check */

    if (!text) {

        alert(
            "Please enter text or a website URL first."
        );

        qrInput.focus();

        return;
    }


    /* Clear old QR */

    qrContainer.innerHTML = "";


    /* Create QR wrapper */

    const qrWrapper =
        document.createElement("div");


    qrWrapper.className =
        "generated-qr";


    qrContainer.appendChild(
        qrWrapper
    );


    /* Create QR */

    currentQR =
        new QRCode(
            qrWrapper,
            {

                text: text,

                width: 220,

                height: 220,

                colorDark:
                    qrColor.value,

                colorLight:
                    bgColor.value,

                correctLevel:
                    QRCode.CorrectLevel.H

            }
        );


    /* Wait for QR image */

    setTimeout(
        function () {

            addLogoToQR();

            applyQRStyle();

            downloadBtn.style.display =
                "block";

        },
        300
    );

}


/* =========================
   ADD LOGO TO QR
========================= */

function addLogoToQR() {


    if (!uploadedLogo) {

        return;
    }


    const qrImage =
        qrContainer.querySelector(
            "img"
        );


    if (!qrImage) {

        return;
    }


    /* Create canvas */

    const canvas =
        document.createElement(
            "canvas"
        );


    const size =
        qrImage.naturalWidth ||
        220;


    canvas.width =
        size;

    canvas.height =
        size;


    const ctx =
        canvas.getContext(
            "2d"
        );


    /* Draw QR */

    ctx.drawImage(
        qrImage,
        0,
        0,
        size,
        size
    );


    /* Load logo */

    const logo =
        new Image();


    logo.onload =
        function () {


            const logoSize =
                size * 0.22;


            const x =
                (size -
                    logoSize) / 2;


            const y =
                (size -
                    logoSize) / 2;


            /* White logo background */

            ctx.fillStyle =
                "#ffffff";


            ctx.beginPath();

            ctx.roundRect(
                x - 8,
                y - 8,
                logoSize + 16,
                logoSize + 16,
                12
            );

            ctx.fill();


            /* Draw logo */

            ctx.drawImage(
                logo,
                x,
                y,
                logoSize,
                logoSize
            );


            /* Replace QR */

            qrContainer.innerHTML =
                "";


            qrContainer.appendChild(
                canvas
            );


            currentQR =
                canvas;

        };


    logo.src =
        uploadedLogo;

}


/* =========================
   QR STYLE
========================= */

function applyQRStyle() {


    const qrImage =
        qrContainer.querySelector(
            "img"
        );


    if (!qrImage) {

        return;
    }


    /* Rounded */

    if (
        selectedStyle ===
        "rounded"
    ) {

        qrImage.style.borderRadius =
            "18px";

    }


    /* Dots */

    else if (
        selectedStyle ===
        "dots"
    ) {

        qrImage.style.borderRadius =
            "50%";

    }


    /* Diamond */

    else if (
        selectedStyle ===
        "diamond"
    ) {

        qrImage.style.transform =
            "rotate(45deg) scale(0.72)";

        qrImage.style.borderRadius =
            "8px";

    }


    /* Square */

    else {

        qrImage.style.borderRadius =
            "0";

        qrImage.style.transform =
            "none";

    }

}


/* =========================
   GENERATE BUTTON
========================= */

generateBtn.addEventListener(
    "click",
    function () {

        generateQR();

    }
);


/* =========================
   LIVE QR GENERATION
========================= */

qrInput.addEventListener(
    "input",
    function () {

        if (
            qrInput.value.trim()
        ) {

            generateQR();

        }

    }
);


/* =========================
   COLOR CHANGE
========================= */

qrColor.addEventListener(
    "input",
    function () {

        if (
            qrInput.value.trim()
        ) {

            generateQR();

        }

    }
);


bgColor.addEventListener(
    "input",
    function () {

        if (
            qrInput.value.trim()
        ) {

            generateQR();

        }

    }
);


/* =========================
   DOWNLOAD QR
========================= */

downloadBtn.addEventListener(
    "click",
    function () {


        const canvas =
            qrContainer.querySelector(
                "canvas"
            );


        const image =
            qrContainer.querySelector(
                "img"
            );


        let downloadURL;


        /* Canvas download */

        if (canvas) {

            downloadURL =
                canvas.toDataURL(
                    "image/png"
                );

        }


        /* Image download */

        else if (image) {

            downloadURL =
                image.src;

        }


        else {

            alert(
                "Please generate a QR code first."
            );

            return;
        }


        /* Create download link */

        const link =
            document.createElement(
                "a"
            );


        link.href =
            downloadURL;


        link.download =
            "brand-qr-code.png";


        document.body.appendChild(
            link
        );


        link.click();


        document.body.removeChild(
            link
        );

    }
);


/* =========================
   RESET
========================= */

clearBtn.addEventListener(
    "click",
    function () {


        /* Clear input */

        qrInput.value =
            "";


        /* Clear logo */

        logoInput.value =
            "";


        uploadedLogo =
            null;


        logoPreview.innerHTML =
            "";


        logoPreview.style.display =
            "none";


        /* Reset colors */

        qrColor.value =
            "#0f172a";


        bgColor.value =
            "#ffffff";


        /* Reset style */

        selectedStyle =
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


        /* Reset preview */

        qrContainer.innerHTML = `

            <div class="qr-placeholder">

                <div class="placeholder-icon">

                    <i class="fa-solid fa-qrcode"></i>

                </div>

                <h3>
                    Your QR Code
                </h3>

                <p>
                    Enter your URL or text
                    to generate your QR code.
                </p>

            </div>

        `;


        /* Hide download */

        downloadBtn.style.display =
            "none";


        currentQR =
            null;

    }
);


/* =========================
   ENTER KEY
========================= */

qrInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key ===
            "Enter" &&
            event.ctrlKey
        ) {

            generateQR();

        }

    }
);


/* =========================
   INITIAL LOG
========================= */

console.log(
    "Brand QR Studio Loaded Successfully 🚀"
);
