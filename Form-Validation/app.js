// ***Select Elements***
const username = document.getElementById("username-input");
const email = document.getElementById("email-input");
const password = document.getElementById("password-input");
const confirmPassword = document.getElementById("confirmPassword-input");
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector(".form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate form inputs
    validateForm();
});

// ***Functions***

function validateForm() {
    // Check for validity of Username
    if (username.value.trim() === "") {
        error(username, "Please enter your username");
    } else {
        success(username);
    }

    // Check for validity of Email
    if (email.value.trim() === "") {
        error(email, "Please enter your Email");
    } else if (!validEmail(email.value.trim())) {
        error(email, "Please enter a valid Email");
    } else {
        success(email);
    }

    // Check for validity of password
    if (password.value === "") {
        error(password, "Please enter a Password");
    } else if (password.value.length < 8) {
        error(password, "Password must be atleast 8");
    } else {
        success(password);
    }

    // Check for validity of Confirm password
    if (confirmPassword.value === "") {
        error(confirmPassword, "Please reenter your password");
    } else if (confirmPassword.value !== password.value) {
        error(confirmPassword, "Password does not match");
    } else {
        success(confirmPassword);
    }
}
function error(element, message) {
    const inputControl = element.parentElement;

    const errorMessage = inputControl.querySelector(".input-alert");

    element.style.borderColor = "red";
    errorMessage.innerText = message;
    errorMessage.classList.add("text-danger");
    errorMessage.classList.remove("text-success");
}

function success(element) {
    const inputControl = element.parentElement;

    const successControl = inputControl.querySelector(".input-alert");

    element.style.borderColor = "green";
    successControl.innerText = "";
}

function validEmail(email) {
    const valid =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return valid.test(String(email).toLowerCase());
}
