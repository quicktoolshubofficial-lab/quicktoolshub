// ==========================================
// BMI CALCULATOR - SCRIPT.JS
// PART 1
// ==========================================

// Get HTML Elements
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const calculateBtn = document.getElementById("calculateBMI");

const bmiResult = document.getElementById("bmiResult");
const bmiCategory = document.getElementById("bmiCategory");


// ==========================================
// CALCULATE BMI
// ==========================================

calculateBtn.addEventListener("click", function () {

    // Get values from inputs
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);


    // Check empty fields
    if (!height || !weight) {
        alert("Please enter your height and weight.");
        return;
    }


    // Check positive values
    if (height <= 0 || weight <= 0) {
        alert("Please enter valid positive numbers.");
        return;
    }


    // Convert height from CM to Meters
    const heightInMeters = height / 100;


    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);


    // Show BMI Result
    bmiResult.textContent = bmi.toFixed(1);


    // ==========================================
    // BMI CATEGORY
    // ==========================================

    if (bmi < 18.5) {

        bmiCategory.textContent = "Underweight";

    } else if (bmi < 25) {

        bmiCategory.textContent = "Normal Weight";

    } else if (bmi < 30) {

        bmiCategory.textContent = "Overweight";

    } else {

        bmiCategory.textContent = "Obesity";

    }

});
// ==========================================
// BMI CALCULATOR - SCRIPT.JS
// PART 2
// ==========================================


// ==========================================
// RESET BUTTON
// ==========================================

const resetBtn = document.getElementById("resetBMI");

if (resetBtn) {

    resetBtn.addEventListener("click", function () {

        // Clear input fields
        heightInput.value = "";
        weightInput.value = "";

        // Reset result
        bmiResult.textContent = "0";

        // Reset category
        bmiCategory.textContent = "";

        // Hide result box if available
        const resultBox = document.getElementById("bmiResultBox");

        if (resultBox) {
            resultBox.style.display = "none";
        }

    });

}


// ==========================================
// ENTER KEY SUPPORT
// ==========================================

heightInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        calculateBtn.click();
    }

});


weightInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        calculateBtn.click();
    }

});


// ==========================================
// INPUT VALIDATION
// ==========================================

heightInput.addEventListener("input", function () {

    // Remove negative sign
    if (heightInput.value < 0) {
        heightInput.value = "";
    }

});


weightInput.addEventListener("input", function () {

    // Remove negative sign
    if (weightInput.value < 0) {
        weightInput.value = "";
    }

});


// ==========================================
// SHOW RESULT BOX
// ==========================================

calculateBtn.addEventListener("click", function () {

    const resultBox =
        document.getElementById("bmiResultBox");

    if (resultBox) {

        // Check if valid values are entered
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (height > 0 && weight > 0) {
            resultBox.style.display = "block";
        }

    }

});
// ==========================================
// BMI CALCULATOR - SCRIPT.JS
// PART 3
// ==========================================


// ==========================================
// BMI DETAILED MESSAGE
// ==========================================

const bmiMessage = document.getElementById("bmiMessage");


// ==========================================
// UPDATE BMI STATUS
// ==========================================

function updateBMIStatus(bmi) {

    if (!bmiMessage) {
        return;
    }


    // Underweight
    if (bmi < 18.5) {

        bmiMessage.textContent =
            "Your BMI is below the normal range. Consider maintaining a balanced and nutritious diet.";

    }

    // Normal Weight
    else if (bmi < 25) {

        bmiMessage.textContent =
            "Your BMI is within the normal range. Keep maintaining a healthy lifestyle!";

    }

    // Overweight
    else if (bmi < 30) {

        bmiMessage.textContent =
            "Your BMI is above the normal range. Regular exercise and a balanced diet may help.";

    }

    // Obesity
    else {

        bmiMessage.textContent =
            "Your BMI is in the obesity range. Consider focusing on a healthy lifestyle and consult a healthcare professional if needed.";

    }

}


// ==========================================
// CONNECT STATUS WITH BMI CALCULATION
// ==========================================

calculateBtn.addEventListener("click", function () {

    const height =
        parseFloat(heightInput.value);

    const weight =
        parseFloat(weightInput.value);


    // Stop if values are invalid
    if (!height || !weight || height <= 0 || weight <= 0) {
        return;
    }


    // Convert CM to Meters
    const heightInMeters =
        height / 100;


    // Calculate BMI
    const bmi =
        weight / (heightInMeters * heightInMeters);


    // Update detailed message
    updateBMIStatus(bmi);

});


// ==========================================
// BMI RANGE INFORMATION
// ==========================================

const bmiRanges = document.getElementById("bmiRanges");

if (bmiRanges) {

    bmiRanges.innerHTML = `
        <div class="bmi-range-item">
            <span>Underweight</span>
            <strong>Below 18.5</strong>
        </div>

        <div class="bmi-range-item">
            <span>Normal Weight</span>
            <strong>18.5 - 24.9</strong>
        </div>

        <div class="bmi-range-item">
            <span>Overweight</span>
            <strong>25 - 29.9</strong>
        </div>

        <div class="bmi-range-item">
            <span>Obesity</span>
            <strong>30 or above</strong>
        </div>
    `;

}
