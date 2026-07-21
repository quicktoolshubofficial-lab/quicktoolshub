
/* =========================
   AGE CALCULATOR
   QUICK TOOLS HUB
========================= */


/* =========================
   GET ELEMENTS
========================= */

const birthDateInput = document.getElementById("birthDate");

const calculateBtn = document.getElementById("calculateBtn");

const resetBtn = document.getElementById("resetBtn");

const resultSection = document.getElementById("resultSection");

const dateError = document.getElementById("dateError");


/* Age Results */

const yearsResult = document.getElementById("yearsResult");

const monthsResult = document.getElementById("monthsResult");

const daysResult = document.getElementById("daysResult");


/* Detailed Results */

const totalDays = document.getElementById("totalDays");

const totalWeeks = document.getElementById("totalWeeks");

const totalHours = document.getElementById("totalHours");

const totalMinutes = document.getElementById("totalMinutes");


/* Birthday */

const nextBirthday = document.getElementById("nextBirthday");


/* =========================
   SET MAXIMUM DATE
========================= */

const today = new Date();

const todayFormatted =
    today.toISOString().split("T")[0];

birthDateInput.max = todayFormatted;


/* =========================
   CALCULATE AGE
========================= */

calculateBtn.addEventListener("click", function () {

    /* Clear previous error */

    dateError.textContent = "";

    /* Get selected date */

    const birthDateValue =
        birthDateInput.value;


    /* Check empty date */

    if (!birthDateValue) {

        dateError.textContent =
            "Please select your date of birth.";

        resultSection.style.display = "none";

        return;

    }


    /* Convert birth date */

    const birthDate =
        new Date(birthDateValue + "T00:00:00");


    /* Get today's date */

    const currentDate =
        new Date();


    /* Check future date */

    if (birthDate > currentDate) {

        dateError.textContent =
            "Date of birth cannot be in the future.";

        resultSection.style.display = "none";

        return;

    }


    /* Calculate exact age */

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


    /* =========================
       DISPLAY AGE
    ========================== */

    yearsResult.textContent =
        years.toLocaleString();

    monthsResult.textContent =
        months.toLocaleString();

    daysResult.textContent =
        days.toLocaleString();


    /* =========================
       TOTAL TIME CALCULATION
    ========================== */

    const differenceInMilliseconds =
        currentDate.getTime() -
        birthDate.getTime();


    const millisecondsInMinute =
        1000 * 60;


    const millisecondsInHour =
        millisecondsInMinute * 60;


    const millisecondsInDay =
        millisecondsInHour * 24;


    const millisecondsInWeek =
        millisecondsInDay * 7;


    /* Total Days */

    const calculatedTotalDays =
        Math.floor(
            differenceInMilliseconds /
            millisecondsInDay
        );


    /* Total Weeks */

    const calculatedTotalWeeks =
        Math.floor(
            calculatedTotalDays / 7
        );


    /* Total Hours */

    const calculatedTotalHours =
        Math.floor(
            differenceInMilliseconds /
            millisecondsInHour
        );


    /* Total Minutes */

    const calculatedTotalMinutes =
        Math.floor(
            differenceInMilliseconds /
            millisecondsInMinute
        );


    /* Display Detailed Results */

    totalDays.textContent =
        calculatedTotalDays.toLocaleString();


    totalWeeks.textContent =
        calculatedTotalWeeks.toLocaleString();


    totalHours.textContent =
        calculatedTotalHours.toLocaleString();


    totalMinutes.textContent =
        calculatedTotalMinutes.toLocaleString();


    /* =========================
       NEXT BIRTHDAY
    ========================== */

    calculateNextBirthday(
        birthDate,
        currentDate
    );


    /* =========================
       SHOW RESULTS
    ========================== */

    resultSection.style.display =
        "block";


    /* Scroll to result */

    setTimeout(function () {

        resultSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

});


/* =========================
   NEXT BIRTHDAY FUNCTION
========================= */

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


    /* If birthday already passed */

    if (nextBirthdayDate < currentDate) {

        nextBirthdayDate =
            new Date(
                currentDate.getFullYear() + 1,
                birthDate.getMonth(),
                birthDate.getDate()
            );

    }


    /* Calculate remaining time */

    const difference =
        nextBirthdayDate.getTime() -
        currentDate.getTime();


    const daysRemaining =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    /* Birthday is today */

    if (
        nextBirthdayDate.getDate() ===
        currentDate.getDate() &&

        nextBirthdayDate.getMonth() ===
        currentDate.getMonth()
    ) {

        nextBirthday.textContent =
            "🎉 Happy Birthday! Today is your birthday!";

        return;

    }


    /* Calculate months approximately */

    const monthsRemaining =
        Math.floor(
            daysRemaining / 30
        );


    const remainingDays =
        daysRemaining % 30;


    /* Display birthday information */

    if (monthsRemaining > 0) {

        nextBirthday.textContent =
            `Your next birthday is in approximately ${monthsRemaining} month(s) and ${remainingDays} day(s).`;

    } else {

        nextBirthday.textContent =
            `Your next birthday is in ${daysRemaining} day(s).`;

    }

}


/* =========================
   RESET CALCULATOR
========================= */

resetBtn.addEventListener(
    "click",
    function () {

        /* Clear input */

        birthDateInput.value = "";


        /* Clear error */

        dateError.textContent = "";


        /* Hide results */

        resultSection.style.display =
            "none";


        /* Reset values */

        yearsResult.textContent = "0";

        monthsResult.textContent = "0";

        daysResult.textContent = "0";

        totalDays.textContent = "0";

        totalWeeks.textContent = "0";

        totalHours.textContent = "0";

        totalMinutes.textContent = "0";


        nextBirthday.textContent =
            "Your next birthday information will appear here.";

    }
);


/* =========================
   ENTER KEY SUPPORT
========================= */

birthDateInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            calculateBtn.click();

        }

    }
);
