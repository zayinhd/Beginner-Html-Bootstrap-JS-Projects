// ***Select Elements***
const username = document.getElementById("username-input");
const email = document.getElementById("email-input");
const password = document.getElementById("password-input");
const confirmPassword = document.getElementById("confirmPassword-input");
const submitBtn = document.querySelector(".submit-btn");

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Validate form inputs
    validateForm();

    // Reset values to defaults
    setDefaults();
});

// ***Functions***
function setDefaults() {
    username.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
}

function validateForm() {
    // Check for validity of Username
    if (username.value.trim() === "") {
        console.log("no username");
    } else {
        console.log(username.value);
    }

    // Check for validity of Email
    if (email.value.trim() === "") {
        console.log("no email");
    } else {
        console.log(email.value);
    }

    // Check for validity of password
    if (password.value === "") {
        console.log("no password");
    } else if (password.value.length < 8) {
        console.log("Password too short, Must be 8 and above");
    } else {
        console.log(password.value);
    }

    // Check for validity of Confirm password
    if (confirmPassword.value === "") {
        console.log("no password");
    } else if (confirmPassword.value !== password.value) {
        console.log("Password does not match");
    } else {
        console.log(confirmPassword.value);
    }
}
