/* =====================================================
   QUICK TOOLS OFFICIAL
   AGE CALCULATOR — MAIN JAVASCRIPT
===================================================== */

const birthDateInput = document.getElementById("birthDate");
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

const ageYears = document.getElementById("ageYears");
const ageMonths = document.getElementById("ageMonths");
const ageDays = document.getElementById("ageDays");

const totalDays = document.getElementById("totalDays");
const totalWeeks = document.getElementById("totalWeeks");
const totalMonths = document.getElementById("totalMonths");

const nextBirthday = document.getElementById("nextBirthday");
const birthdayCountdown = document.getElementById("birthdayCountdown");

const resultSection = document.getElementById("resultSection");


/* =====================================================
   SET MAXIMUM DATE
===================================================== */

const today = new Date();

if (birthDateInput) {
    birthDateInput.max = today.toISOString().split("T")[0];
}


/* =====================================================
   CALCULATE AGE
===================================================== */

function calculateAge() {

    const birthValue = birthDateInput.value;

    if (!birthValue) {

        alert("Please select your date of birth.");

        birthDateInput.focus();

        return;
    }


    const birthDate = new Date(birthValue + "T00:00:00");

    const currentDate = new Date();


    /* Prevent future date */

    if (birthDate > currentDate) {

        alert("Date of birth cannot be in the future.");

        return;
    }


    /* =================================================
       EXACT AGE
    ================================================= */

    let years =
        currentDate.getFullYear() -
        birthDate.getFullYear();

    let months =
        currentDate.getMonth() -
        birthDate.getMonth();

    let days =
        currentDate.getDate() -
        birthDate.getDate();


    /* Adjust days */

    if (days < 0) {

        months--;

        const previousMonth =
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                0
            );

        days +=
            previousMonth.getDate();
    }


    /* Adjust months */

    if (months < 0) {

        years--;

        months += 12;
    }


    /* =================================================
       DISPLAY EXACT AGE
    ================================================= */

    ageYears.textContent =
        years;

    ageMonths.textContent =
        months;

    ageDays.textContent =
        days;


    /* =================================================
       TOTAL DAYS
    ================================================= */

    const difference =
        currentDate.getTime() -
        birthDate.getTime();

    const daysLived =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    totalDays.textContent =
        daysLived.toLocaleString();


    /* =================================================
       TOTAL WEEKS
    ================================================= */

    const weeksLived =
        Math.floor(
            daysLived / 7
        );


    totalWeeks.textContent =
        weeksLived.toLocaleString();


    /* =================================================
       TOTAL MONTHS
    ================================================= */

    const monthsLived =
        years * 12 +
        months;


    totalMonths.textContent =
        monthsLived.toLocaleString();


    /* =================================================
       NEXT BIRTHDAY
    ================================================= */

    let nextBirthdayDate =
        new Date(
            currentDate.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );


    /* If birthday already passed */

    if (
        nextBirthdayDate <
        currentDate
    ) {

        nextBirthdayDate =
            new Date(
                currentDate.getFullYear() + 1,
                birthDate.getMonth(),
                birthDate.getDate()
            );
    }


    /* =================================================
       DAYS UNTIL BIRTHDAY
    ================================================= */

    const birthdayDifference =
        nextBirthdayDate.getTime() -
        currentDate.getTime();


    const daysUntilBirthday =
        Math.ceil(
            birthdayDifference /
            (1000 * 60 * 60 * 24)
        );


    /* =================================================
       NEXT BIRTHDAY TEXT
    ================================================= */

    if (
        daysUntilBirthday === 0
    ) {

        nextBirthday.textContent =
            "🎉 Happy Birthday!";

        birthdayCountdown.textContent =
            "Your birthday is today!";

    } else {

        nextBirthday.textContent =
            nextBirthdayDate.toLocaleDateString(
                "en-US",
                {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            );

        birthdayCountdown.textContent =
            daysUntilBirthday +
            " days until your next birthday 🎂";
    }


    /* =================================================
       SHOW RESULT
    ================================================= */

    if (resultSection) {

        resultSection.classList.add(
            "show"
        );

        resultSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

}


/* =====================================================
   CALCULATE BUTTON
===================================================== */

if (calculateBtn) {

    calculateBtn.addEventListener(
        "click",
        calculateAge
    );

}


/* =====================================================
   ENTER KEY SUPPORT
===================================================== */

if (birthDateInput) {

    birthDateInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                calculateAge();

            }

        }
    );

}


/* =====================================================
   RESET CALCULATOR
===================================================== */

if (resetBtn) {

    resetBtn.addEventListener(
        "click",
        function() {

            birthDateInput.value =
                "";

            ageYears.textContent =
                "0";

            ageMonths.textContent =
                "0";

            ageDays.textContent =
                "0";

            totalDays.textContent =
                "0";

            totalWeeks.textContent =
                "0";

            totalMonths.textContent =
                "0";

            nextBirthday.textContent =
                "—";

            birthdayCountdown.textContent =
                "Enter your birth date to calculate.";

            if (resultSection) {

                resultSection.classList.remove(
                    "show"
                );

            }

        }
    );

}


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "Age Calculator loaded successfully 🚀"
        );

    }
);
/* =====================================================
   LIVE AGE UPDATE
===================================================== */

function updateLiveAge() {

    if (!birthDateInput.value) {
        return;
    }

    calculateAge();

}


/* =====================================================
   AUTO CALCULATE WHEN DATE CHANGES
===================================================== */

if (birthDateInput) {

    birthDateInput.addEventListener(
        "change",
        function() {

            if (this.value) {

                calculateAge();

            }

        }
    );

}


/* =====================================================
   NUMBER ANIMATION
===================================================== */

function animateNumber(
    element,
    target
) {

    if (!element) {
        return;
    }

    let start = 0;

    const duration = 700;

    const startTime =
        performance.now();


    function updateNumber(
        currentTime
    ) {

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
                1
            );


        const value =
            Math.floor(
                progress *
                target
            );


        element.textContent =
            value.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(
                updateNumber
            );

        } else {

            element.textContent =
                Number(target)
                .toLocaleString();

        }

    }


    requestAnimationFrame(
        updateNumber
    );

}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(
    date
) {

    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}


/* =====================================================
   GET NEXT BIRTHDAY
===================================================== */

function getNextBirthday(
    birthDate
) {

    const currentDate =
        new Date();


    let birthday =
        new Date(
            currentDate.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );


    if (
        birthday <
        currentDate
    ) {

        birthday =
            new Date(
                currentDate.getFullYear() + 1,
                birthDate.getMonth(),
                birthDate.getDate()
            );

    }


    return birthday;

}


/* =====================================================
   AGE VALIDATION
===================================================== */

function validateBirthDate(
    value
) {

    if (!value) {

        return {
            valid: false,
            message:
                "Please select your date of birth."
        };

    }


    const selectedDate =
        new Date(
            value + "T00:00:00"
        );


    const now =
        new Date();


    if (
        selectedDate > now
    ) {

        return {
            valid: false,
            message:
                "Birth date cannot be in the future."
        };

    }


    return {
        valid: true,
        message: ""
    };

}


/* =====================================================
   SAFE CALCULATE
===================================================== */

function safeCalculateAge() {

    const validation =
        validateBirthDate(
            birthDateInput.value
        );


    if (
        !validation.valid
    ) {

        alert(
            validation.message
        );

        return;

    }


    calculateAge();

}


/* =====================================================
   CALCULATE USING BUTTON
===================================================== */

if (calculateBtn) {

    calculateBtn.removeEventListener(
        "click",
        calculateAge
    );


    calculateBtn.addEventListener(
        "click",
        safeCalculateAge
    );

}


/* =====================================================
   COPY AGE RESULT
===================================================== */

const copyAgeBtn =
    document.getElementById(
        "copyAgeBtn"
    );


if (copyAgeBtn) {

    copyAgeBtn.addEventListener(
        "click",
        async function() {

            const ageText =
                `${ageYears.textContent} years, ` +
                `${ageMonths.textContent} months, ` +
                `${ageDays.textContent} days`;


            try {

                await navigator.clipboard.writeText(
                    ageText
                );


                copyAgeBtn.innerHTML =
                    `<i class="fa-solid fa-check"></i> Copied`;


                setTimeout(
                    function() {

                        copyAgeBtn.innerHTML =
                            `<i class="fa-solid fa-copy"></i> Copy Result`;

                    },
                    2000
                );


            } catch (error) {

                alert(
                    "Unable to copy result."
                );

            }

        }
    );

}


/* =====================================================
   SHARE RESULT
===================================================== */

const shareBtn =
    document.getElementById(
        "shareBtn"
    );


if (shareBtn) {

    shareBtn.addEventListener(
        "click",
        async function() {

            const shareText =
                `My exact age is ${ageYears.textContent} years, ` +
                `${ageMonths.textContent} months and ` +
                `${ageDays.textContent} days. ` +
                `Calculated with Quick Tools Official Age Calculator.`;


            if (
                navigator.share
            ) {

                try {

                    await navigator.share({

                        title:
                            "My Age Result",

                        text:
                            shareText

                    });

                } catch (error) {

                    console.log(
                        "Share cancelled."
                    );

                }

            } else {

                try {

                    await navigator.clipboard.writeText(
                        shareText
                    );

                    alert(
                        "Result copied! You can now share it."
                    );

                } catch (error) {

                    alert(
                        shareText
                    );

                }

            }

        }
    );

}


/* =====================================================
   RESET BUTTON ANIMATION
===================================================== */

if (resetBtn) {

    resetBtn.addEventListener(
        "click",
        function() {

            this.classList.add(
                "reset-animation"
            );


            setTimeout(
                () => {

                    this.classList.remove(
                        "reset-animation"
                    );

                },
                500
            );

        }
    );

}


/* =====================================================
   PAGE LOAD
===================================================== */

window.addEventListener(
    "load",
    function() {

        document.body.classList.add(
            "page-loaded"
        );

    }
);


/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log(
    "Quick Tools Official — Age Calculator Ready 🚀"
);
/* =====================================================
   AGE CALCULATOR — PART 3
   EXTRA FEATURES & FINAL POLISH
===================================================== */


/* =====================================================
   CURRENT DATE DISPLAY
===================================================== */

const currentDateElement =
    document.getElementById(
        "currentDate"
    );


function showCurrentDate() {

    if (!currentDateElement) {
        return;
    }


    const now =
        new Date();


    currentDateElement.textContent =
        formatDate(now);

}


showCurrentDate();


/* =====================================================
   BIRTH DATE DISPLAY
===================================================== */

const selectedBirthDate =
    document.getElementById(
        "selectedBirthDate"
    );


function showBirthDate() {

    if (
        !selectedBirthDate ||
        !birthDateInput
    ) {

        return;

    }


    if (
        !birthDateInput.value
    ) {

        selectedBirthDate.textContent =
            "—";

        return;

    }


    const date =
        new Date(
            birthDateInput.value +
            "T00:00:00"
        );


    selectedBirthDate.textContent =
        formatDate(date);

}


if (birthDateInput) {

    birthDateInput.addEventListener(
        "change",
        showBirthDate
    );

}


/* =====================================================
   UPDATE BIRTH DATE AFTER CALCULATION
===================================================== */

if (calculateBtn) {

    calculateBtn.addEventListener(
        "click",
        function() {

            setTimeout(
                function() {

                    showBirthDate();

                },
                100
            );

        }
    );

}


/* =====================================================
   AGE CALCULATOR ENTER KEY
===================================================== */

if (birthDateInput) {

    birthDateInput.addEventListener(
        "keypress",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                safeCalculateAge();

            }

        }
    );

}


/* =====================================================
   RESET BIRTH DATE DISPLAY
===================================================== */

if (resetBtn) {

    resetBtn.addEventListener(
        "click",
        function() {

            if (selectedBirthDate) {

                selectedBirthDate.textContent =
                    "—";

            }

        }
    );

}


/* =====================================================
   BACK TO TOP BUTTON
===================================================== */

const backToTop =
    document.getElementById(
        "backToTop"
    );


if (backToTop) {

    window.addEventListener(
        "scroll",
        function() {

            if (
                window.scrollY >
                400
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
        function() {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =====================================================
   SMOOTH ANIMATION FOR RESULT
===================================================== */

function animateResultCards() {

    const resultCards =
        document.querySelectorAll(
            ".result-card"
        );


    resultCards.forEach(
        function(card, index) {

            card.style.animationDelay =
                (index * 0.1) +
                "s";

            card.classList.add(
                "result-card-visible"
            );

        }
    );

}


/* =====================================================
   RUN RESULT ANIMATION
===================================================== */

if (calculateBtn) {

    calculateBtn.addEventListener(
        "click",
        function() {

            setTimeout(
                animateResultCards,
                300
            );

        }
    );

}


/* =====================================================
   PREVENT FUTURE DATE MANUALLY
===================================================== */

if (birthDateInput) {

    birthDateInput.addEventListener(
        "input",
        function() {

            const selectedDate =
                new Date(
                    this.value +
                    "T00:00:00"
                );


            const now =
                new Date();


            if (
                selectedDate >
                now
            ) {

                this.setCustomValidity(
                    "Birth date cannot be in the future."
                );

            } else {

                this.setCustomValidity(
                    ""
                );

            }

        }
    );

}


/* =====================================================
   ACCESSIBILITY
===================================================== */

if (calculateBtn) {

    calculateBtn.setAttribute(
        "aria-label",
        "Calculate your exact age"
    );

}


if (resetBtn) {

    resetBtn.setAttribute(
        "aria-label",
        "Reset age calculator"
    );

}


/* =====================================================
   FINAL INITIALIZATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showCurrentDate();

        showBirthDate();


        console.log(
            "Age Calculator initialized successfully."
        );

    }
);


/* =====================================================
   FINAL MESSAGE
===================================================== */

console.log(
    "🚀 Quick Tools Official Age Calculator is ready!"
);
