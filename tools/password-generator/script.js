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
