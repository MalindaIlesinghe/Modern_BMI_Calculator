function toggleHeightInputs() {
    let heightUnit = document.getElementById('heightUnit').value;
    let heightCm = document.getElementById('heightCm');
    let heightFtIn = document.getElementById('heightFtIn');

    if (heightUnit === 'cm') {
        heightCm.style.display = 'block';
        heightFtIn.style.display = 'none';
    } else {
        heightCm.style.display = 'none';
        heightFtIn.style.display = 'block';
    }
}

function calculateBMI() {
    let heightUnit = document.getElementById('heightUnit').value;
    let height, weight;
    let errorMessage = '';

    if (heightUnit === 'cm') {
        height = parseFloat(document.getElementById('height').value);
        if (isNaN(height) || height <= 0) {
            errorMessage += 'Please enter a valid height in cm. ';
        } else {
            height /= 100; // Convert cm to meters
        }
    } else {
        let feet = parseFloat(document.getElementById('heightFt').value);
        let inches = parseFloat(document.getElementById('heightIn').value);
        if (isNaN(feet) || isNaN(inches) || feet < 0 || inches < 0) {
            errorMessage += 'Please enter valid height in feet and inches. ';
        } else {
            height = (feet * 0.3048) + (inches * 0.0254); // Convert feet and inches to meters
        }
    }

    weight = parseFloat(document.getElementById('weight').value);
    let weightUnit = document.getElementById('weightUnit').value;

    if (isNaN(weight) || weight <= 0) {
        errorMessage += 'Please enter a valid weight. ';
    }

    if (errorMessage) {
        document.getElementById('result').innerHTML = errorMessage;
        document.getElementById('result').style.color = '#EF476F';
        return;
    }

    // Convert weight to kilograms if in pounds
    if (weightUnit === 'lbs') {
        weight = weight * 0.453592;
    }

    // Calculate BMI
    let bmi = weight / (height * height);

    // Determine BMI category and set background color
    let category, background;
    if (bmi < 18.5) {
        category = "Underweight";
        background = "#FFD166";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal weight";
        background = "#06D6A0";
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
        background = "#F78C6B";
    } else {
        category = "Obesity";
        background = "#EF476F";
    }

    // Display result
    document.getElementById('result').innerHTML = `Your BMI is ${bmi.toFixed(2)} (${category})`;
    document.getElementById('result').style.color = '#073B4C';

    // Change background color with smooth transition
    document.body.style.setProperty('--target-background', background);
    document.body.classList.add('changing-background');
    
    // After the transition is complete, set the background color directly
    setTimeout(() => {
        document.body.style.background = background;
        document.body.classList.remove('changing-background');
    }, 500); // 500ms matches the transition duration in CSS
}

function focusNext(event, nextElementId, isLast = false) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default action (form submission)

        if (isLast) {
            calculateBMI(); // Calculate BMI if it's the last input field
        } else {
            const nextElement = document.getElementById(nextElementId);
            if (nextElement) {
                nextElement.focus(); // Focus on the next input field
            }
        }
    }
}

// Initialize height inputs
toggleHeightInputs();