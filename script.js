document.getElementById("openModalBtn").addEventListener("click", function () {
    document.getElementById("myModal").style.display = "block";
    showStep(1);
});

document.getElementById("closeModalBtn").addEventListener("click", function () {
    document.getElementById("myModal").style.display = "none";
});

let currentStep = 1;

function showStep(stepNumber) {
    document.querySelectorAll(".step").forEach(step => step.style.display = "none");
    document.getElementById("step" + stepNumber).style.display = "block";
    currentStep = stepNumber;
}

document.getElementById("nextStepBtn1").addEventListener("click", function () {
    showStep(2);
});

document.getElementById("nextStepBtn2").addEventListener("click", function () {
    showStep(3);
});

document.getElementById("nextStepBtn3").addEventListener("click", function () {
    showStep(4);
});



document.getElementById("submitBtn").addEventListener("click", function () {
    postData();
});

// You can add validation and form submission logic for step 3 (personal details) here

var selectedServices = [false, false, false, false, false, false];
var budget = 0;

function chooseService(index) {

    selectedServices[index] = !selectedServices[index];
    if (selectedServices[index] == true) {
        document.getElementById("service" + index).style.backgroundColor = "#435DE129";
    } else {
        document.getElementById("service" + index).style.backgroundColor = "white";
    }
}



const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-input input"),
    range = document.querySelector(".slider .progress");
let priceGap = 500;

priceInput.forEach((input) => {
    input.addEventListener("input", (e) => {
        let minPrice = parseInt(priceInput[0].value),
            maxPrice = parseInt(priceInput[1].value);

        if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
            if (e.target.className === "input-min") {
                rangeInput[0].value = minPrice;
                range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
            } else {
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < priceGap) {
            if (e.target.className === "range-min") {
                rangeInput[0].value = maxVal - priceGap;
            } else {
                rangeInput[1].value = minVal + priceGap;
            }
        } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});


function postData() {

    var data = {
        fullname: document.getElementById("fullname").value,
        services: "Web Development",
        estimatedBudget: "$5000",
        phoneNumber: document.getElementById("mobile").value,
        emailAddress: document.getElementById("email").value
    };
    fetch('https://script.google.com/macros/s/AKfycbyxaxcu05wDi_wKnibk9u0W6p4iHTcKwZhgmLZ5Xo8WmceUSFCEPKhx79MDik4N0CUt/exec', {
        redirect: "follow",
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        }
    })
        .then(response => alert(response.text()))
        .then(text => console.log(text))
        .catch(error => console.log('Error:', error));


}



