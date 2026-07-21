/* =========================
   QR CODE GENERATOR
   QUICK TOOLS HUB
========================= */

const qrInput = document.getElementById("qrInput");
const qrContainer = document.getElementById("qrContainer");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");

let qrCode = null;

/* =========================
   GENERATE QR CODE
========================= */

generateBtn.addEventListener("click", function () {

    const text = qrInput.value.trim();

    if (text === "") {
        alert("Please enter text or a URL first.");
        qrInput.focus();
        return;
    }

    qrContainer.innerHTML = "";

    qrCode = new QRCode(qrContainer, {
        text: text,
        width: 220,
        height: 220,
        colorDark: "#0f172a",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    downloadBtn.style.display = "block";
});

/* =========================
   DOWNLOAD QR CODE
========================= */

downloadBtn.addEventListener("click", function () {

    const canvas = qrContainer.querySelector("canvas");
    const image = qrContainer.querySelector("img");

    let qrImage;

    if (canvas) {
        qrImage = canvas.toDataURL("image/png");
    } else if (image) {
        qrImage = image.src;
    }

    if (!qrImage) {
        alert("Please generate a QR code first.");
        return;
    }

    const link = document.createElement("a");

    link.href = qrImage;
    link.download = "quick-tools-hub-qr-code.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

/* =========================
   CLEAR QR CODE
========================= */

clearBtn.addEventListener("click", function () {

    qrInput.value = "";
    qrContainer.innerHTML = "";

    downloadBtn.style.display = "none";

    qrCode = null;

    qrInput.focus();
});

/* =========================
   ENTER KEY SUPPORT
========================= */

qrInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        generateBtn.click();
    }

});
