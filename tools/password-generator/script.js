const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const strengthText = document.getElementById("strengthText");
const strengthFill = document.getElementById("strengthFill");
const password = document.getElementById("password");
const length = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+{}[]<>?/|";

length.addEventListener("input", () => {
    lengthValue.textContent = length.value;
});

function generatePassword() {
// ===============================
// Password Strength Checker
// ===============================

function checkPasswordStrength(pass) {

    let score = 0;

    if (pass.length >= 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) {

        strengthText.textContent = "Weak";
        strengthText.style.color = "#ef4444";
        strengthFill.style.width = "25%";
        strengthFill.style.background = "#ef4444";

    } else if (score === 3) {

        strengthText.textContent = "Medium";
        strengthText.style.color = "#f59e0b";
        strengthFill.style.width = "50%";
        strengthFill.style.background = "#f59e0b";

    } else if (score === 4) {

        strengthText.textContent = "Strong";
        strengthText.style.color = "#10b981";
        strengthFill.style.width = "75%";
        strengthFill.style.background = "#10b981";

    } else {

        strengthText.textContent = "Very Strong";
        strengthText.style.color = "#059669";
        strengthFill.style.width = "100%";
        strengthFill.style.background = "#059669";

    }

}
    let chars = "";

    if (uppercase.checked) chars += upperChars;
    if (lowercase.checked) chars += lowerChars;
    if (numbers.checked) chars += numberChars;
    if (symbols.checked) chars += symbolChars;

    if (chars === "") {
        alert("Please select at least one option.");
        return;
    }

    let pass = "";

    for (let i = 0; i < length.value; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    password.value = pass;
    checkPasswordStrength(pass);
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {

    if (password.value === "") return;

    navigator.clipboard.writeText(password.value);

    copyBtn.innerText = "Copied!";

    setTimeout(() => {
        copyBtn.innerText = "Copy";
    }, 2000);

});

generatePassword();
