// ==========================================
// QUICK TOOLS HUB - BMI CALCULATOR
// COMPLETE SCRIPT.JS
// ==========================================


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const metricBtn = document.getElementById("metricBtn");
const imperialBtn = document.getElementById("imperialBtn");

const metricForm = document.getElementById("metricForm");
const imperialForm = document.getElementById("imperialForm");

const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");

const imperialWeightInput =
    document.getElementById("imperialWeight");

const feetInput =
    document.getElementById("feet");

const inchesInput =
    document.getElementById("inches");

const calculateBtn =
    document.getElementById("calculateBtn");

const resetBtn =
    document.getElementById("resetBtn");

const errorMessage =
    document.getElementById("errorMessage");

const resultSection =
    document.getElementById("resultSection");

const bmiValue =
    document.getElementById("bmiValue");

const bmiCategory =
    document.getElementById("bmiCategory");

const categoryText =
    document.getElementById("categoryText");

const healthyRange =
    document.getElementById("healthyRange");

const recommendationText =
    document.getElementById("recommendationText");

const scaleIndicator =
    document.getElementById("scaleIndicator");


// ==========================================
// CURRENT UNIT
// ==========================================

let currentUnit = "metric";


// ==========================================
// METRIC BUTTON
// ==========================================

metricBtn.addEventListener("click", function () {

    currentUnit = "metric";

    metricBtn.classList.add("active");
    imperialBtn.classList.remove("active");

    metricForm.classList.remove("hidden");
    imperialForm.classList.add("hidden");

    clearError();

});


// ==========================================
// IMPERIAL BUTTON
// ==========================================

imperialBtn.addEventListener("click", function () {

    currentUnit = "imperial";

    imperialBtn.classList.add("active");
    metricBtn.classList.remove("active");

    imperialForm.classList.remove("hidden");
    metricForm.classList.add("hidden");

    clearError();

});


// ==========================================
// CALCULATE BMI
// ==========================================

calculateBtn.addEventListener("click", function () {

    clearError();


    let bmi;


    // ======================================
    // METRIC CALCULATION
    // ======================================

    if (currentUnit === "metric") {

        const weight =
            parseFloat(weightInput.value);

        const height =
            parseFloat(heightInput.value);


        // Validate inputs

        if (
            isNaN(weight) ||
            isNaN(height) ||
            weight <= 0 ||
            height <= 0
        ) {

            showError(
                "Please enter a valid weight and height."
            );

            return;
        }


        // Convert CM to Meters

        const heightInMeters =
            height / 100;


        // BMI Formula

        bmi =
            weight /
            (heightInMeters * heightInMeters);

    }


    // ======================================
    // IMPERIAL CALCULATION
    // ======================================

    else {

        const weight =
            parseFloat(
                imperialWeightInput.value
            );

        const feet =
            parseFloat(
                feetInput.value
            );

        const inches =
            parseFloat(
                inchesInput.value
            ) || 0;


        // Validate Weight

        if (
            isNaN(weight) ||
            weight <= 0
        ) {

            showError(
                "Please enter a valid weight."
            );

            return;
        }


        // Validate Feet

        if (
            isNaN(feet) ||
            feet <= 0
        ) {

            showError(
                "Please enter your height in feet."
            );

            return;
        }


        // Validate Inches

        if (
            inches < 0 ||
            inches > 11
        ) {

            showError(
                "Inches must be between 0 and 11."
            );

            return;
        }


        // Convert Height to Total Inches

        const totalInches =
            (feet * 12) + inches;


        // Imperial BMI Formula

        bmi =
            (weight * 703) /
            (totalInches * totalInches);

    }


    // ======================================
    // DISPLAY BMI RESULT
    // ======================================

    displayBMIResult(bmi);

});


// ==========================================
// DISPLAY BMI RESULT
// ==========================================

function displayBMIResult(bmi) {

    // Round BMI

    const roundedBMI =
        bmi.toFixed(1);


    // Display BMI

    bmiValue.textContent =
        roundedBMI;


    // Get Category

    let category;


    if (bmi < 18.5) {

        category = "Underweight";

    }

    else if (bmi < 25) {

        category = "Normal Weight";

    }

    else if (bmi < 30) {

        category = "Overweight";

    }

    else {

        category = "Obesity";

    }


    // Display Category

    bmiCategory.textContent =
        category;

    categoryText.textContent =
        category;


    // Calculate Healthy Weight Range

    calculateHealthyWeight();


    // Show Recommendation

    showRecommendation(bmi);


    // Update Scale

    updateScale(bmi);


    // Show Result Section

    resultSection.classList.remove("hidden");


    // Scroll to Result

    resultSection.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


// ==========================================
// HEALTHY WEIGHT RANGE
// ==========================================

function calculateHealthyWeight() {

    let minWeight;
    let maxWeight;


    // ======================================
    // METRIC HEALTHY WEIGHT
    // ======================================

    if (currentUnit === "metric") {

        const height =
            parseFloat(heightInput.value);


        const heightInMeters =
            height / 100;


        minWeight =
            18.5 *
            (heightInMeters * heightInMeters);


        maxWeight =
            24.9 *
            (heightInMeters * heightInMeters);


        healthyRange.textContent =
            minWeight.toFixed(1) +
            " – " +
            maxWeight.toFixed(1) +
            " kg";

    }


    // ======================================
    // IMPERIAL HEALTHY WEIGHT
    // ======================================

    else {

        const feet =
            parseFloat(feetInput.value);

        const inches =
            parseFloat(inchesInput.value) || 0;


        const totalInches =
            (feet * 12) + inches;


        minWeight =
            (18.5 *
                totalInches *
                totalInches) /
            703;


        maxWeight =
            (24.9 *
                totalInches *
                totalInches) /
            703;


        healthyRange.textContent =
            minWeight.toFixed(1) +
            " – " +
            maxWeight.toFixed(1) +
            " lbs";

    }

}


// ==========================================
// BMI RECOMMENDATION
// ==========================================

function showRecommendation(bmi) {

    if (bmi < 18.5) {

        recommendationText.textContent =
            "Your BMI is below the typical healthy range. A balanced diet and healthy lifestyle may help you reach a healthier weight. Consider speaking with a healthcare professional for personalized advice.";

    }

    else if (bmi < 25) {

        recommendationText.textContent =
            "Your BMI falls within the typical healthy range. Continue maintaining a balanced diet, regular physical activity, and a healthy lifestyle.";

    }

    else if (bmi < 30) {

        recommendationText.textContent =
            "Your BMI is above the typical healthy range. Regular physical activity and a balanced diet may help support a healthier weight.";

    }

    else {

        recommendationText.textContent =
            "Your BMI is in the obesity range. Consider discussing your health and lifestyle with a qualified healthcare professional for personalized guidance.";

    }

}


// ==========================================
// BMI SCALE INDICATOR
// ==========================================

function updateScale(bmi) {

    let percentage;


    if (bmi < 18.5) {

        percentage =
            (bmi / 18.5) * 25;

    }

    else if (bmi < 25) {

        percentage =
            25 +
            ((bmi - 18.5) / 6.5) * 25;

    }

    else if (bmi < 30) {

        percentage =
            50 +
            ((bmi - 25) / 5) * 25;

    }

    else {

        percentage =
            75 +
            Math.min(
                ((bmi - 30) / 20) * 25,
                25
            );

    }


    // Keep indicator between 0 and 100

    percentage =
        Math.max(
            0,
            Math.min(
                percentage,
                100
            )
        );


    // Move Indicator

    scaleIndicator.style.left =
        percentage + "%";

}


// ==========================================
// RESET BMI CALCULATOR
// ==========================================

resetBtn.addEventListener("click", function () {

    // Clear Metric Inputs

    weightInput.value = "";

    heightInput.value = "";


    // Clear Imperial Inputs

    imperialWeightInput.value = "";

    feetInput.value = "";

    inchesInput.value = "";


    // Reset Result

    bmiValue.textContent =
        "0.0";

    bmiCategory.textContent =
        "--";

    categoryText.textContent =
        "--";

    healthyRange.textContent =
        "--";

    recommendationText.textContent =
        "Your personalized BMI interpretation will appear here.";


    // Reset Scale

    scaleIndicator.style.left =
        "0%";


    // Hide Result

    resultSection.classList.add("hidden");


    // Clear Error

    clearError();

});


// ==========================================
// ERROR MESSAGE
// ==========================================

function showError(message) {

    errorMessage.textContent =
        message;

    errorMessage.classList.add("show");

}


// ==========================================
// CLEAR ERROR
// ==========================================

function clearError() {

    errorMessage.textContent =
        "";

    errorMessage.classList.remove("show");

}
