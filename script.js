document.getElementById("openModalBtn").addEventListener("click", function () {
    document.getElementById("myModal").style.display = "block";
    showStep(1);
});

document.getElementById("openModalBtn1").addEventListener("click", function () {
    document.getElementById("myModal").style.display = "block";
    showStep(1);
});

document.getElementById("openModalBtn2").addEventListener("click", function () {
    document.getElementById("myModal").style.display = "block";
    showStep(1);
});

document.getElementById("openModalBtn3").addEventListener("click", function () {
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
    let canProceed = false;
    for (let i = 0; i < selectedServices.length; i++) {
        if (selectedServices[i] == true) {
            canProceed = true;
            break;
        }
    }
    if (canProceed) {
        showStep(2);
    } else {
        alert("Please select at least one service");
    }
});

document.getElementById("nextStepBtn2").addEventListener("click", function () {
    showStep(3);
});


document.getElementById("nextStepBtn3").addEventListener("click", function () {
    if (document.getElementById("mobile").value.length > 7) {
        showStep(4);
    } else {
        alert("Please enter a valid mobile number");
    }
});

document.getElementById("nextStepBtn4").addEventListener("click", function () {
    document.getElementById("myModal").style.display = "none";
});


function isValidEmail(email) {
    // Regular expression for a valid email address
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}



document.getElementById("submitBtn").addEventListener("click", function () {
    if (document.getElementById("fullname").value.length < 3 || !isValidEmail(document.getElementById("email").value)) {
        alert("Please enter valid details");
    } else {
        postData();
        showStep(5);
    }

});

// You can add validation and form submission logic for step 3 (personal details) here

var selectedServices = [false, false, false, false, false, false, false];
var selectedServicesName = ["Website Design & Development", "App Design & Development", "Content Creation & SEO", "Social Media Marketing", "Pay-Per-Click (PPC) Advertising", "Online Reputation Management & Email Marketing", "Tele Marketing & Support"];
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

    let ServiceString = "";
    for (let i = 0; i < selectedServices.length; i++) {
        if (selectedServices[i] == true) {
            ServiceString += (selectedServicesName[i] + ", ");
        }
    }

    let minPrice = parseInt(priceInput[0].value);
    let maxPrice = parseInt(priceInput[1].value);
    let budget = "$" + minPrice + " - $" + maxPrice;


    var data = {
        fullname: document.getElementById("fullname").value,
        services: ServiceString,
        estimatedBudget: budget,
        phoneNumber: document.getElementById("mobile").value,
        emailAddress: document.getElementById("email").value
    };

    fetch('./storeData.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Adjust the content type as needed
        },
        body: new URLSearchParams(data).toString(),
    })
        .then(response => {
            // Handle the response from PHP if necessary
            console.log('Request to PHP script was successful');
        })
        .catch(error => console.error('Error:', error));

    // fetch('./storeData.php', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded', // Adjust the content type as needed
    //     },
    //     body: new URLSearchParams(data).toString(),
    // })
    //     .then(response => {
    //         // Handle the response from PHP if necessary
    //         console.log('Request to PHP script was successful');
    //     })
    //     .catch(error => console.error('Error:', error));


}












