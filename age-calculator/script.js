/* =====================================================
   QUICK TOOLS OFFICIAL
   AGE CALCULATOR — CLEAN SCRIPT
   PART 1
===================================================== */


/* =====================================================
   GET HTML ELEMENTS
===================================================== */

const birthDateInput =
    document.getElementById("birthDate");

const calculateBtn =
    document.getElementById("calculateBtn");

const resetBtn =
    document.getElementById("resetBtn");


/* =====================================================
   AGE RESULT ELEMENTS
===================================================== */

const ageYears =
    document.getElementById("ageYears");

const ageMonths =
    document.getElementById("ageMonths");

const ageDays =
    document.getElementById("ageDays");


/* =====================================================
   TOTAL RESULT ELEMENTS
===================================================== */

const totalDays =
    document.getElementById("totalDays");

const totalWeeks =
    document.getElementById("totalWeeks");

const totalMonths =
    document.getElementById("totalMonths");


/* =====================================================
   BIRTHDAY ELEMENTS
===================================================== */

const nextBirthday =
    document.getElementById("nextBirthday");

const birthdayCountdown =
    document.getElementById(
        "birthdayCountdown"
    );


/* =====================================================
   OTHER ELEMENTS
===================================================== */

const resultSection =
    document.getElementById(
        "resultSection"
    );

const currentDateElement =
    document.getElementById(
        "currentDate"
    );

const selectedBirthDate =
    document.getElementById(
        "selectedBirthDate"
    );

const copyAgeBtn =
    document.getElementById(
        "copyAgeBtn"
    );

const shareBtn =
    document.getElementById(
        "shareBtn"
    );

const backToTop =
    document.getElementById(
        "backToTop"
    );


/* =====================================================
   SET MAXIMUM BIRTH DATE
===================================================== */

const today =
    new Date();


if (birthDateInput) {

    birthDateInput.max =
        today
        .toISOString()
        .split("T")[0];

}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(date) {

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
   DISPLAY CURRENT DATE
===================================================== */

function showCurrentDate() {

    if (!currentDateElement) {

        return;

    }


    currentDateElement.textContent =
        formatDate(
            new Date()
        );

}


/* =====================================================
   VALIDATE BIRTH DATE
===================================================== */

function validateBirthDate(value) {

    if (!value) {

        return {

            valid: false,

            message:
                "Please select your date of birth."

        };

    }


    const birthDate =
        new Date(
            value + "T00:00:00"
        );


    const currentDate =
        new Date();


    if (
        isNaN(
            birthDate.getTime()
        )
    ) {

        return {

            valid: false,

            message:
                "Please enter a valid date."

        };

    }


    if (
        birthDate >
        currentDate
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
   CALCULATE EXACT AGE
===================================================== */

function calculateAge() {

    if (!birthDateInput) {

        return;

    }


    const birthValue =
        birthDateInput.value;


    const validation =
        validateBirthDate(
            birthValue
        );


    if (
        !validation.valid
    ) {

        alert(
            validation.message
        );

        return;

    }


    const birthDate =
        new Date(
            birthValue +
            "T00:00:00"
        );


    const currentDate =
        new Date();


    /* =================================================
       YEARS
    ================================================= */

    let years =
        currentDate.getFullYear() -
        birthDate.getFullYear();


    /* =================================================
       MONTHS
    ================================================= */

    let months =
        currentDate.getMonth() -
        birthDate.getMonth();


    /* =================================================
       DAYS
    ================================================= */

    let days =
        currentDate.getDate() -
        birthDate.getDate();


    /* =================================================
       ADJUST DAYS
    ================================================= */

    if (
        days < 0
    ) {

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


    /* =================================================
       ADJUST MONTHS
    ================================================= */

    if (
        months < 0
    ) {

        years--;

        months += 12;

    }


    /* =================================================
       DISPLAY AGE
    ================================================= */

    if (ageYears) {

        ageYears.textContent =
            years;

    }


    if (ageMonths) {

        ageMonths.textContent =
            months;

    }


    if (ageDays) {

        ageDays.textContent =
            days;

    }


    /* =================================================
       TOTAL DAYS LIVED
    ================================================= */

    const difference =
        currentDate.getTime() -
        birthDate.getTime();


    const daysLived =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    if (totalDays) {

        totalDays.textContent =
            daysLived.toLocaleString();

    }


    /* =================================================
       TOTAL WEEKS LIVED
    ================================================= */

    const weeksLived =
        Math.floor(
            daysLived /
            7
        );


    if (totalWeeks) {

        totalWeeks.textContent =
            weeksLived.toLocaleString();

    }


    /* =================================================
       TOTAL MONTHS LIVED
    ================================================= */

    const monthsLived =
        years * 12 +
        months;


    if (totalMonths) {

        totalMonths.textContent =
            monthsLived.toLocaleString();

    }


    /* =================================================
       UPDATE BIRTH DATE
    ================================================= */

    if (selectedBirthDate) {

        selectedBirthDate.textContent =
            formatDate(
                birthDate
            );

    }


    /* =================================================
       CALCULATE NEXT BIRTHDAY
    ================================================= */

    calculateNextBirthday(
        birthDate,
        currentDate
    );


    /* =================================================
       SHOW RESULTS
    ================================================= */

    if (resultSection) {

        resultSection.classList.add(
            "show"
        );

    }

}


/* =====================================================
   CALCULATE NEXT BIRTHDAY
===================================================== */

function calculateNextBirthday(
    birthDate,
    currentDate
) {

    let nextBirthdayDate =
        new Date(
            currentDate.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );


    /* Birthday already passed */

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
       DAYS UNTIL NEXT BIRTHDAY
    ================================================= */

    const difference =
        nextBirthdayDate.getTime() -
        currentDate.getTime();


    const daysUntilBirthday =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    /* =================================================
       DISPLAY NEXT BIRTHDAY
    ================================================= */

    if (nextBirthday) {

        nextBirthday.textContent =
            nextBirthdayDate.toLocaleDateString(
                "en-US",
                {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            );

    }


    /* =================================================
       DISPLAY COUNTDOWN
    ================================================= */

    if (birthdayCountdown) {

        if (
            daysUntilBirthday === 0
        ) {

            birthdayCountdown.textContent =
                "🎉 Happy Birthday! Your birthday is today!";

        } else {

            birthdayCountdown.textContent =
                daysUntilBirthday +
                " days until your next birthday 🎂";

        }

    }

}


/* =====================================================
   CALCULATE BUTTON
===================================================== */

if (calculateBtn) {

    calculateBtn.addEventListener(
        "click",
        function() {

            calculateAge();

        }
    );

}


/* =====================================================
   DATE CHANGE
===================================================== */

if (birthDateInput) {

    birthDateInput.addEventListener(
        "change",
        function() {

            if (
                this.value
            ) {

                calculateAge();

            }

        }
    );

}


/* =====================================================
   ENTER KEY
===================================================== */

if (birthDateInput) {

    birthDateInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                calculateAge();

            }

        }
    );

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showCurrentDate();

        console.log(
            "Age Calculator Part 1 loaded successfully 🚀"
        );

    }
);
/* =====================================================
   QUICK TOOLS OFFICIAL
   AGE CALCULATOR — CLEAN SCRIPT
   PART 2
===================================================== */


/* =====================================================
   RESET CALCULATOR
===================================================== */

if (resetBtn) {

    resetBtn.addEventListener(
        "click",
        function() {

            /* Clear birth date */

            if (birthDateInput) {

                birthDateInput.value =
                    "";

            }


            /* Reset age results */

            if (ageYears) {

                ageYears.textContent =
                    "0";

            }

            if (ageMonths) {

                ageMonths.textContent =
                    "0";

            }

            if (ageDays) {

                ageDays.textContent =
                    "0";

            }


            /* Reset total results */

            if (totalDays) {

                totalDays.textContent =
                    "0";

            }

            if (totalWeeks) {

                totalWeeks.textContent =
                    "0";

            }

            if (totalMonths) {

                totalMonths.textContent =
                    "0";

            }


            /* Reset birthday information */

            if (nextBirthday) {

                nextBirthday.textContent =
                    "--";

            }

            if (birthdayCountdown) {

                birthdayCountdown.textContent =
                    "Enter your date of birth to calculate your next birthday.";

            }


            /* Reset selected birth date */

            if (selectedBirthDate) {

                selectedBirthDate.textContent =
                    "--";

            }


            /* Hide result section */

            if (resultSection) {

                resultSection.classList.remove(
                    "show"
                );

            }


            /* Scroll to top of calculator */

            if (birthDateInput) {

                birthDateInput.focus();

            }

        }
    );

}


/* =====================================================
   COPY AGE RESULT
===================================================== */

if (copyAgeBtn) {

    copyAgeBtn.addEventListener(
        "click",
        async function() {


            /* Get displayed values */

            const years =
                ageYears
                    ? ageYears.textContent
                    : "0";


            const months =
                ageMonths
                    ? ageMonths.textContent
                    : "0";


            const days =
                ageDays
                    ? ageDays.textContent
                    : "0";


            /* Create copy text */

            const ageText =
                `My age is ${years} years, ${months} months and ${days} days.`;


            try {

                await navigator.clipboard.writeText(
                    ageText
                );


                /* Change button text */

                const originalText =
                    copyAgeBtn.innerHTML;


                copyAgeBtn.innerHTML =
                    '<i class="fa-solid fa-check"></i> Copied!';


                setTimeout(
                    function() {

                        copyAgeBtn.innerHTML =
                            originalText;

                    },
                    2000
                );


            } catch (error) {

                /* Fallback */

                alert(
                    "Unable to copy. Please try again."
                );

            }

        }
    );

}


/* =====================================================
   SHARE AGE RESULT
===================================================== */

if (shareBtn) {

    shareBtn.addEventListener(
        "click",
        async function() {


            /* Get age values */

            const years =
                ageYears
                    ? ageYears.textContent
                    : "0";


            const months =
                ageMonths
                    ? ageMonths.textContent
                    : "0";


            const days =
                ageDays
                    ? ageDays.textContent
                    : "0";


            /* Share message */

            const shareText =
                `My exact age is ${years} years, ${months} months and ${days} days. Calculated with Quick Tools Official Age Calculator.`;


            /* Native share */

            if (
                navigator.share
            ) {

                try {

                    await navigator.share({

                        title:
                            "My Age",

                        text:
                            shareText,

                        url:
                            window.location.href

                    });

                } catch (error) {

                    console.log(
                        "Share cancelled."
                    );

                }

            } else {

                /* Browser without Web Share API */

                try {

                    await navigator.clipboard.writeText(
                        shareText
                    );

                    alert(
                        "Age result copied! You can now share it anywhere."
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
   BACK TO TOP BUTTON
===================================================== */

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
   AUTO UPDATE CURRENT DATE
===================================================== */

setInterval(
    function() {

        showCurrentDate();

    },
    60000
);


/* =====================================================
   PREVENT FUTURE DATE
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


            const currentDate =
                new Date();


            if (
                selectedDate >
                currentDate
            ) {

                this.value =
                    "";

                alert(
                    "Please select a valid birth date."
                );

            }

        }
    );

}


/* =====================================================
   AGE CALCULATOR KEYBOARD SUPPORT
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        /* Ctrl + Enter = Calculate */

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            event.preventDefault();

            calculateAge();

        }


        /* Escape = Reset */

        if (
            event.key === "Escape"
        ) {

            if (
                document.activeElement !==
                birthDateInput
            ) {

                if (resetBtn) {

                    resetBtn.click();

                }

            }

        }

    }
);


/* =====================================================
   FINAL INITIALIZATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /* Show current date */

        showCurrentDate();


        /* Make sure result is hidden */

        if (resultSection) {

            resultSection.classList.remove(
                "show"
            );

        }


        /* Default values */

        if (ageYears) {

            ageYears.textContent =
                "0";

        }

        if (ageMonths) {

            ageMonths.textContent =
                "0";

        }

        if (ageDays) {

            ageDays.textContent =
                "0";

        }


        console.log(
            "Age Calculator Part 2 loaded successfully 🚀"
        );

    }
);
/* =====================================================
   QUICK TOOLS OFFICIAL
   AGE CALCULATOR — CLEAN SCRIPT
   PART 3
===================================================== */


/* =====================================================
   RESULT ANIMATION
===================================================== */

function animateResults() {

    if (!resultSection) {
        return;
    }

    resultSection.classList.remove(
        "show"
    );


    /* Force browser reflow */

    void resultSection.offsetWidth;


    resultSection.classList.add(
        "show"
    );

}


/* =====================================================
   UPDATE RESULT WITH ANIMATION
===================================================== */

function showAgeResults() {

    if (!resultSection) {
        return;
    }

    animateResults();

}


/* =====================================================
   COPY BUTTON FEEDBACK
===================================================== */

function showCopyFeedback() {

    if (!copyAgeBtn) {
        return;
    }


    const originalHTML =
        copyAgeBtn.innerHTML;


    copyAgeBtn.innerHTML = `
        <i class="fa-solid fa-check"></i>
        Copied Successfully
    `;


    copyAgeBtn.classList.add(
        "success"
    );


    setTimeout(
        function() {

            copyAgeBtn.innerHTML =
                originalHTML;

            copyAgeBtn.classList.remove(
                "success"
            );

        },
        2000
    );

}


/* =====================================================
   SAFE COPY AGE FUNCTION
===================================================== */

async function copyAgeResult() {

    if (
        !ageYears ||
        !ageMonths ||
        !ageDays
    ) {

        return;

    }


    const years =
        ageYears.textContent;


    const months =
        ageMonths.textContent;


    const days =
        ageDays.textContent;


    const text =
        `My exact age is ${years} years, ${months} months and ${days} days.`;


    try {

        await navigator.clipboard.writeText(
            text
        );


        showCopyFeedback();


    } catch (error) {

        /* Fallback for older browsers */

        const textArea =
            document.createElement(
                "textarea"
            );


        textArea.value =
            text;


        textArea.style.position =
            "fixed";


        textArea.style.left =
            "-9999px";


        document.body.appendChild(
            textArea
        );


        textArea.select();


        try {

            document.execCommand(
                "copy"
            );

            showCopyFeedback();

        } catch (copyError) {

            alert(
                "Unable to copy age result."
            );

        }


        document.body.removeChild(
            textArea
        );

    }

}


/* =====================================================
   CONNECT COPY BUTTON
===================================================== */

if (copyAgeBtn) {

    copyAgeBtn.addEventListener(
        "click",
        function() {

            copyAgeResult();

        }
    );

}


/* =====================================================
   SHARE RESULT FUNCTION
===================================================== */

async function shareAgeResult() {

    if (
        !ageYears ||
        !ageMonths ||
        !ageDays
    ) {

        return;

    }


    const years =
        ageYears.textContent;


    const months =
        ageMonths.textContent;


    const days =
        ageDays.textContent;


    const shareText =
        `My exact age is ${years} years, ${months} months and ${days} days. Calculated using Quick Tools Official Age Calculator.`;


    if (
        navigator.share
    ) {

        try {

            await navigator.share({

                title:
                    "My Exact Age",

                text:
                    shareText,

                url:
                    window.location.href

            });

        } catch (error) {

            console.log(
                "Sharing cancelled."
            );

        }

    } else {

        try {

            await navigator.clipboard.writeText(
                shareText
            );


            alert(
                "Age result copied. You can now share it!"
            );


        } catch (error) {

            alert(
                shareText
            );

        }

    }

}


/* =====================================================
   CONNECT SHARE BUTTON
===================================================== */

if (shareBtn) {

    shareBtn.addEventListener(
        "click",
        function() {

            shareAgeResult();

        }
    );

}


/* =====================================================
   BACK TO TOP VISIBILITY
===================================================== */

function updateBackToTop() {

    if (!backToTop) {
        return;
    }


    if (
        window.scrollY >
        300
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


window.addEventListener(
    "scroll",
    updateBackToTop
);


/* =====================================================
   BACK TO TOP CLICK
===================================================== */

if (backToTop) {

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
   RESET SCROLL POSITION
===================================================== */

if (resetBtn) {

    resetBtn.addEventListener(
        "click",
        function() {

            setTimeout(
                function() {

                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });

                },
                100
            );

        }
    );

}


/* =====================================================
   CURRENT DATE REFRESH
===================================================== */

function refreshCurrentDate() {

    if (
        currentDateElement
    ) {

        currentDateElement.textContent =
            formatDate(
                new Date()
            );

    }

}


/* Update date every minute */

setInterval(
    refreshCurrentDate,
    60000
);


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        refreshCurrentDate();

        updateBackToTop();


        /* Set default result values */

        if (ageYears) {

            ageYears.textContent =
                "0";

        }


        if (ageMonths) {

            ageMonths.textContent =
                "0";

        }


        if (ageDays) {

            ageDays.textContent =
                "0";

        }


        if (totalDays) {

            totalDays.textContent =
                "0";

        }


        if (totalWeeks) {

            totalWeeks.textContent =
                "0";

        }


        if (totalMonths) {

            totalMonths.textContent =
                "0";

        }


        console.log(
            "Quick Tools Official Age Calculator is ready 🚀"
        );

    }
);


/* =====================================================
   FINAL SAFETY CHECK
===================================================== */

window.addEventListener(
    "error",
    function(event) {

        console.error(
            "Age Calculator Error:",
            event.error
        );

    }
);
