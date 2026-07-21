/* =====================================================
   QUICK TOOLS OFFICIAL
   AGE CALCULATOR — CORRECTED JAVASCRIPT
   PART 1
===================================================== */


/* =====================================================
   GET HTML ELEMENTS
===================================================== */

const birthDateInput =
    document.getElementById("birthDate");

const currentDateInput =
    document.getElementById("currentDate");

const calculateBtn =
    document.getElementById("calculateBtn");

const resetBtn =
    document.getElementById("resetBtn");


/* =====================================================
   AGE RESULT ELEMENTS
===================================================== */

const yearsValue =
    document.getElementById("yearsValue");

const monthsValue =
    document.getElementById("monthsValue");

const daysValue =
    document.getElementById("daysValue");


/* =====================================================
   DETAILED RESULT ELEMENTS
===================================================== */

const totalDays =
    document.getElementById("totalDays");

const totalWeeks =
    document.getElementById("totalWeeks");

const totalMonths =
    document.getElementById("totalMonths");

const totalHours =
    document.getElementById("totalHours");


/* =====================================================
   BIRTHDAY ELEMENTS
===================================================== */

const birthdayMessage =
    document.getElementById("birthdayMessage");

const birthdayCountdown =
    document.getElementById("birthdayCountdown");


/* =====================================================
   RESULT ELEMENTS
===================================================== */

const ageResult =
    document.getElementById("ageResult");

const resultPanel =
    document.querySelector(".result-panel");

const resultStatus =
    document.querySelector(".result-status");


/* =====================================================
   VARIABLES
===================================================== */

let calculatedBirthDate = null;

let calculatedCurrentDate = null;


/* =====================================================
   GET TODAY'S DATE
===================================================== */

function getTodayDate() {

    const today =
        new Date();

    return today;

}


/* =====================================================
   FORMAT DATE FOR INPUT
===================================================== */

function formatInputDate(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );

    return (
        year +
        "-" +
        month +
        "-" +
        day
    );

}


/* =====================================================
   FORMAT DATE FOR DISPLAY
===================================================== */

function formatDisplayDate(date) {

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
   SET CURRENT DATE
===================================================== */

function setCurrentDate() {

    if (!currentDateInput) {

        return;

    }

    const today =
        getTodayDate();

    currentDateInput.value =
        formatInputDate(
            today
        );

}


/* =====================================================
   SET MAXIMUM BIRTH DATE
===================================================== */

function setBirthDateLimit() {

    if (!birthDateInput) {

        return;

    }

    const today =
        getTodayDate();

    birthDateInput.max =
        formatInputDate(
            today
        );

}


/* =====================================================
   VALIDATE DATES
===================================================== */

function validateDates() {

    if (
        !birthDateInput ||
        !currentDateInput
    ) {

        return {

            valid: false,

            message:
                "Required date fields were not found."

        };

    }


    const birthValue =
        birthDateInput.value;

    const currentValue =
        currentDateInput.value;


    /* Check birth date */

    if (!birthValue) {

        return {

            valid: false,

            message:
                "Please select your date of birth."

        };

    }


    /* Check calculation date */

    if (!currentValue) {

        return {

            valid: false,

            message:
                "Please select the calculation date."

        };

    }


    const birthDate =
        new Date(
            birthValue +
            "T00:00:00"
        );


    const currentDate =
        new Date(
            currentValue +
            "T00:00:00"
        );


    /* Check valid dates */

    if (
        isNaN(
            birthDate.getTime()
        ) ||
        isNaN(
            currentDate.getTime()
        )
    ) {

        return {

            valid: false,

            message:
                "Please enter valid dates."

        };

    }


    /* Birth date cannot be after calculation date */

    if (
        birthDate >
        currentDate
    ) {

        return {

            valid: false,

            message:
                "Date of birth cannot be after the calculation date."

        };

    }


    return {

        valid: true,

        message: "",

        birthDate:
            birthDate,

        currentDate:
            currentDate

    };

}


/* =====================================================
   CALCULATE EXACT AGE
===================================================== */

function calculateExactAge(
    birthDate,
    currentDate
) {

    let years =
        currentDate.getFullYear() -
        birthDate.getFullYear();


    let months =
        currentDate.getMonth() -
        birthDate.getMonth();


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


    return {

        years:
            years,

        months:
            months,

        days:
            days

    };

}


/* =====================================================
   DISPLAY EXACT AGE
===================================================== */

function displayExactAge(
    age
) {

    if (yearsValue) {

        yearsValue.textContent =
            age.years.toLocaleString();

    }


    if (monthsValue) {

        monthsValue.textContent =
            age.months.toLocaleString();

    }


    if (daysValue) {

        daysValue.textContent =
            age.days.toLocaleString();

    }

}


/* =====================================================
   CALCULATE TOTAL DAYS
===================================================== */

function calculateTotalDays(
    birthDate,
    currentDate
) {

    const difference =
        currentDate.getTime() -
        birthDate.getTime();


    return Math.floor(
        difference /
        (
            1000 *
            60 *
            60 *
            24
        )
    );

}


/* =====================================================
   DISPLAY TOTAL TIME
===================================================== */

function displayTotalTime(
    birthDate,
    currentDate,
    age
) {

    const daysLived =
        calculateTotalDays(
            birthDate,
            currentDate
        );


    const weeksLived =
        Math.floor(
            daysLived / 7
        );


    const monthsLived =
        (
            age.years * 12
        ) +
        age.months;


    const hoursLived =
        daysLived * 24;


    if (totalDays) {

        totalDays.textContent =
            daysLived.toLocaleString();

    }


    if (totalWeeks) {

        totalWeeks.textContent =
            weeksLived.toLocaleString();

    }


    if (totalMonths) {

        totalMonths.textContent =
            monthsLived.toLocaleString();

    }


    if (totalHours) {

        totalHours.textContent =
            hoursLived.toLocaleString();

    }

}


/* =====================================================
   SHOW RESULT PANEL
===================================================== */

function showResults() {

    if (resultPanel) {

        resultPanel.classList.add(
            "active"
        );

    }


    if (ageResult) {

        ageResult.classList.add(
            "show"
        );

    }


    if (resultStatus) {

        resultStatus.innerHTML = `

            <span class="status-dot"></span>

            Calculated

        `;

    }

}


/* =====================================================
   MAIN CALCULATION FUNCTION
===================================================== */

function calculateAge() {

    const validation =
        validateDates();


    if (
        !validation.valid
    ) {

        alert(
            validation.message
        );

        return;

    }


    const birthDate =
        validation.birthDate;


    const currentDate =
        validation.currentDate;


    const age =
        calculateExactAge(
            birthDate,
            currentDate
        );


    calculatedBirthDate =
        birthDate;


    calculatedCurrentDate =
        currentDate;


    /* Display exact age */

    displayExactAge(
        age
    );


    /* Display total time */

    displayTotalTime(
        birthDate,
        currentDate,
        age
    );


    /* Show result */

    showResults();


    /* Continue with birthday calculation */

    calculateNextBirthday(
        birthDate,
        currentDate
    );


    console.log(
        "Age calculated successfully:",
        age
    );

}


/* =====================================================
   INITIAL SETUP
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setCurrentDate();

        setBirthDateLimit();

        console.log(
            "Age Calculator loaded successfully 🚀"
        );

    }
);
/* =====================================================
   NEXT BIRTHDAY CALCULATOR
===================================================== */

function calculateNextBirthday(
    birthDate,
    currentDate
) {

    /* =================================================
       CREATE NEXT BIRTHDAY
    ================================================= */

    let nextBirthday =
        new Date(
            currentDate.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );


    /* =================================================
       HANDLE FEBRUARY 29
    ================================================= */

    if (
        birthDate.getMonth() === 1 &&
        birthDate.getDate() === 29
    ) {

        if (
            !isLeapYear(
                nextBirthday.getFullYear()
            )
        ) {

            nextBirthday =
                new Date(
                    nextBirthday.getFullYear(),
                    1,
                    28
                );

        }

    }


    /* =================================================
       IF BIRTHDAY HAS PASSED
    ================================================= */

    if (
        nextBirthday <
        currentDate
    ) {

        nextBirthday =
            new Date(
                currentDate.getFullYear() + 1,
                birthDate.getMonth(),
                birthDate.getDate()
            );


        /* Handle February 29 */

        if (
            birthDate.getMonth() === 1 &&
            birthDate.getDate() === 29
        ) {

            if (
                !isLeapYear(
                    nextBirthday.getFullYear()
                )
            ) {

                nextBirthday =
                    new Date(
                        nextBirthday.getFullYear(),
                        1,
                        28
                    );

            }

        }

    }


    /* =================================================
       CALCULATE DAYS UNTIL BIRTHDAY
    ================================================= */

    const difference =
        nextBirthday.getTime() -
        currentDate.getTime();


    const daysUntilBirthday =
        Math.ceil(
            difference /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    /* =================================================
       CHECK IF TODAY IS BIRTHDAY
    ================================================= */

    const isBirthdayToday =
        (
            birthDate.getMonth() ===
            currentDate.getMonth()
        ) &&
        (
            birthDate.getDate() ===
            currentDate.getDate()
        );


    /* =================================================
       DISPLAY BIRTHDAY MESSAGE
    ================================================= */

    if (birthdayMessage) {

        birthdayMessage.textContent =
            nextBirthday.toLocaleDateString(
                "en-US",
                {
                    month:
                        "long",

                    day:
                        "numeric",

                    year:
                        "numeric"
                }
            );

    }


    /* =================================================
       DISPLAY COUNTDOWN
    ================================================= */

    if (birthdayCountdown) {

        if (
            isBirthdayToday
        ) {

            birthdayCountdown.textContent =
                "🎉 Happy Birthday! Your birthday is today!";

        }

        else {

            birthdayCountdown.textContent =
                daysUntilBirthday +
                " days until your next birthday 🎂";

        }

    }

}


/* =====================================================
   LEAP YEAR CHECK
===================================================== */

function isLeapYear(
    year
) {

    return (
        (
            year % 4 === 0 &&
            year % 100 !== 0
        ) ||
        year % 400 === 0
    );

}


/* =====================================================
   CALCULATE BUTTON
===================================================== */

if (
    calculateBtn
) {

    calculateBtn.addEventListener(
        "click",
        function() {

            calculateAge();

        }
    );

}


/* =====================================================
   DATE OF BIRTH CHANGE
===================================================== */

if (
    birthDateInput
) {

    birthDateInput.addEventListener(
        "change",
        function() {

            /*
               Do not calculate automatically.
               User can select date first
               and then click Calculate.
            */

            if (
                resultStatus
            ) {

                resultStatus.innerHTML = `

                    <span class="status-dot"></span>

                    Ready

                `;

            }

        }
    );

}


/* =====================================================
   CALCULATION DATE CHANGE
===================================================== */

if (
    currentDateInput
) {

    currentDateInput.addEventListener(
        "change",
        function() {

            /*
               Make sure calculation date
               is not before birth date.
            */

            if (
                birthDateInput &&
                birthDateInput.value &&
                currentDateInput.value
            ) {

                const birthDate =
                    new Date(
                        birthDateInput.value +
                        "T00:00:00"
                    );


                const selectedDate =
                    new Date(
                        currentDateInput.value +
                        "T00:00:00"
                    );


                if (
                    selectedDate <
                    birthDate
                ) {

                    alert(
                        "Calculation date cannot be before your date of birth."
                    );


                    currentDateInput.value =
                        formatInputDate(
                            getTodayDate()
                        );

                }

            }

        }
    );

}


/* =====================================================
   ENTER KEY SUPPORT
===================================================== */

if (
    birthDateInput
) {

    birthDateInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key ===
                "Enter"
            ) {

                event.preventDefault();

                calculateAge();

            }

        }
    );

}


if (
    currentDateInput
) {

    currentDateInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key ===
                "Enter"
            ) {

                event.preventDefault();

                calculateAge();

            }

        }
    );

           }
/* =====================================================
   RESET CALCULATOR
===================================================== */

if (
    resetBtn
) {

    resetBtn.addEventListener(
        "click",
        function() {

            /* =========================================
               CLEAR BIRTH DATE
            ========================================== */

            if (
                birthDateInput
            ) {

                birthDateInput.value =
                    "";

            }


            /* =========================================
               RESET CURRENT DATE
            ========================================== */

            setCurrentDate();


            /* =========================================
               RESET AGE RESULTS
            ========================================== */

            if (
                yearsValue
            ) {

                yearsValue.textContent =
                    "0";

            }


            if (
                monthsValue
            ) {

                monthsValue.textContent =
                    "0";

            }


            if (
                daysValue
            ) {

                daysValue.textContent =
                    "0";

            }


            /* =========================================
               RESET DETAILED RESULTS
            ========================================== */

            if (
                totalDays
            ) {

                totalDays.textContent =
                    "0";

            }


            if (
                totalWeeks
            ) {

                totalWeeks.textContent =
                    "0";

            }


            if (
                totalMonths
            ) {

                totalMonths.textContent =
                    "0";

            }


            if (
                totalHours
            ) {

                totalHours.textContent =
                    "0";

            }


            /* =========================================
               RESET BIRTHDAY MESSAGE
            ========================================== */

            if (
                birthdayMessage
            ) {

                birthdayMessage.textContent =
                    "Calculate your age to see your next birthday.";

            }


            if (
                birthdayCountdown
            ) {

                birthdayCountdown.textContent =
                    "Your birthday countdown will appear here.";

            }


            /* =========================================
               RESET RESULT STATUS
            ========================================== */

            if (
                resultStatus
            ) {

                resultStatus.innerHTML = `

                    <span class="status-dot"></span>

                    Ready

                `;

            }


            /* =========================================
               RESET RESULT VISIBILITY
            ========================================== */

            if (
                resultPanel
            ) {

                resultPanel.classList.remove(
                    "active"
                );

            }


            if (
                ageResult
            ) {

                ageResult.classList.remove(
                    "show"
                );

                ageResult.innerHTML = `

                    <div class="result-placeholder">

                        <div class="placeholder-icon">

                            <i class="fa-solid fa-hourglass-half"></i>

                        </div>


                        <h3>

                            Enter Your Date of Birth

                        </h3>


                        <p>

                            Select your date of birth
                            and click Calculate Age.

                        </p>

                    </div>

                `;

            }


            /* =========================================
               RESET VARIABLES
            ========================================== */

            calculatedBirthDate =
                null;


            calculatedCurrentDate =
                null;


            /* =========================================
               RESET INPUT FOCUS
            ========================================== */

            if (
                birthDateInput
            ) {

                birthDateInput.focus();

            }


            console.log(
                "Age Calculator has been reset."
            );

        }
    );

}


/* =====================================================
   UPDATE CURRENT DATE DAILY
===================================================== */

function updateCurrentDateAutomatically() {

    if (
        !currentDateInput
    ) {

        return;

    }


    const today =
        getTodayDate();


    const todayString =
        formatInputDate(
            today
        );


    /*
       Only update automatically
       if user has not changed it.
    */

    if (
        !calculatedCurrentDate
    ) {

        currentDateInput.value =
            todayString;

    }

}


/* =====================================================
   SETUP DAILY DATE UPDATE
===================================================== */

setInterval(
    function() {

        updateCurrentDateAutomatically();

    },
    60000
);


/* =====================================================
   INITIAL PAGE SETUP
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /* Set today's date */

        setCurrentDate();


        /* Set maximum birth date */

        setBirthDateLimit();


        /* Make sure result starts clean */

        if (
            yearsValue
        ) {

            yearsValue.textContent =
                "0";

        }


        if (
            monthsValue
        ) {

            monthsValue.textContent =
                "0";

        }


        if (
            daysValue
        ) {

            daysValue.textContent =
                "0";

        }


        /* Console message */

        console.log(
            "Quick Tools Official Age Calculator is ready 🚀"
        );

    }
);


/* =====================================================
   ERROR CHECK
===================================================== */

window.addEventListener(
    "error",
    function(event) {

        console.error(
            "Age Calculator Error:",
            event.message
        );

    }
);


/* =====================================================
   FINAL MESSAGE
===================================================== */

console.log(
    "Age Calculator JavaScript loaded successfully ✅"
);
