/* =========================================
   PASSWORD GENERATOR
   QUICK TOOLS HUB
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const strengthText =
    document.getElementById("strengthText");

const strengthFill =
    document.getElementById("strengthFill");

const password =
    document.getElementById("password");

const length =
    document.getElementById("length");

const lengthValue =
    document.getElementById("lengthValue");

const uppercase =
    document.getElementById("uppercase");

const lowercase =
    document.getElementById("lowercase");

const numbers =
    document.getElementById("numbers");

const symbols =
    document.getElementById("symbols");


/* =========================================
   CHARACTER SETS
========================================= */

const upperChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lowerChars =
    "abcdefghijklmnopqrstuvwxyz";

const numberChars =
    "0123456789";

const symbolChars =
    "!@#$%^&*()_+{}[]<>?/|";


/* =========================================
   PASSWORD LENGTH
========================================= */

length.addEventListener(
    "input",
    function () {

        lengthValue.textContent =
            length.value;

        // Update strength preview
        if (password.value !== "") {

            checkPasswordStrength(
                password.value
            );

        }

    }
);


/* =========================================
   PASSWORD STRENGTH CHECKER
========================================= */

function checkPasswordStrength(pass) {

    let score = 0;


    /* LENGTH */

    if (
        pass.length >= 12
    ) {

        score++;

    }


    /* UPPERCASE */

    if (
        /[A-Z]/.test(pass)
    ) {

        score++;

    }


    /* LOWERCASE */

    if (
        /[a-z]/.test(pass)
    ) {

        score++;

    }


    /* NUMBERS */

    if (
        /[0-9]/.test(pass)
    ) {

        score++;

    }


    /* SYMBOLS */

    if (
        /[^A-Za-z0-9]/.test(pass)
    ) {

        score++;

    }


    /* =====================================
       WEAK
    ===================================== */

    if (
        score <= 2
    ) {

        strengthText.textContent =
            "Weak";

        strengthText.style.color =
            "#ef4444";

        strengthFill.style.width =
            "25%";

        strengthFill.style.background =
            "#ef4444";

    }


    /* =====================================
       MEDIUM
    ===================================== */

    else if (
        score === 3
    ) {

        strengthText.textContent =
            "Medium";

        strengthText.style.color =
            "#f59e0b";

        strengthFill.style.width =
            "50%";

        strengthFill.style.background =
            "#f59e0b";

    }


    /* =====================================
       STRONG
    ===================================== */

    else if (
        score === 4
    ) {

        strengthText.textContent =
            "Strong";

        strengthText.style.color =
            "#10b981";

        strengthFill.style.width =
            "75%";

        strengthFill.style.background =
            "#10b981";

    }


    /* =====================================
       VERY STRONG
    ===================================== */

    else {

        strengthText.textContent =
            "Very Strong";

        strengthText.style.color =
            "#059669";

        strengthFill.style.width =
            "100%";

        strengthFill.style.background =
            "#059669";

    }

}


/* =========================================
   GENERATE PASSWORD
========================================= */

function generatePassword() {

    let chars = "";


    /* =====================================
       ADD UPPERCASE
    ===================================== */

    if (
        uppercase.checked
    ) {

        chars +=
            upperChars;

    }


    /* =====================================
       ADD LOWERCASE
    ===================================== */

    if (
        lowercase.checked
    ) {

        chars +=
            lowerChars;

    }


    /* =====================================
       ADD NUMBERS
    ===================================== */

    if (
        numbers.checked
    ) {

        chars +=
            numberChars;

    }


    /* =====================================
       ADD SYMBOLS
    ===================================== */

    if (
        symbols.checked
    ) {

        chars +=
            symbolChars;

    }


    /* =====================================
       NO OPTION SELECTED
    ===================================== */

    if (
        chars === ""
    ) {

        alert(
            "Please select at least one option."
        );

        return;

    }


    /* =====================================
       CREATE PASSWORD
    ===================================== */

    let pass = "";


    for (
        let i = 0;
        i < Number(length.value);
        i++
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                chars.length
            );


        pass +=
            chars.charAt(
                randomIndex
            );

    }


    /* =====================================
       SHOW PASSWORD
    ===================================== */

    password.value =
        pass;


    /* =====================================
       UPDATE STRENGTH
    ===================================== */

    checkPasswordStrength(
        pass
    );

}


/* =========================================
   GENERATE BUTTON
========================================= */

generateBtn.addEventListener(
    "click",
    function () {

        generatePassword();

    }
);


/* =========================================
   COPY PASSWORD
========================================= */

copyBtn.addEventListener(
    "click",
    async function () {

        if (
            password.value === ""
        ) {

            alert(
                "Please generate a password first."
            );

            return;

        }


        try {

            await navigator.clipboard.writeText(
                password.value
            );


            copyBtn.innerText =
                "Copied!";


            setTimeout(
                function () {

                    copyBtn.innerText =
                        "Copy";

                },
                2000
            );


        } catch (error) {

            /* =================================
               FALLBACK COPY METHOD
            ================================= */

            password.select();

            password.setSelectionRange(
                0,
                99999
            );


            document.execCommand(
                "copy"
            );


            copyBtn.innerText =
                "Copied!";


            setTimeout(
                function () {

                    copyBtn.innerText =
                        "Copy";

                },
                2000
            );

        }

    }
);


/* =========================================
   INITIAL PASSWORD
========================================= */

generatePassword();
