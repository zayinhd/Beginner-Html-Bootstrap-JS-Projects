const reviews = [
    {
        id: 1,
        name: "Dave Johnson",
        job: "Frontend Developer",
        img: "/imgs/profile_image1.png",
        text: "Quam adipiscing vitae proin sagittis nisl. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Netus et malesuada fames ac turpis egestas sed tempus urna. Mauris ultrices eros in cursus turpis massa tincidunt dui ut.",
    },

    {
        id: 2,
        name: "Matt Helmes",
        job: "Web Designer",
        img: "/imgs/profile_image2.png",
        text: ". Metus aliquam eleifend mi in nulla posuere. Etiam sit amet nisl purus in mollis. Metus dictum at tempor commodo ullamcorper a lacus. Urna nunc id cursus metus. In arcu cursus euismod quis viverra nibh.",
    },

    {
        id: 3,
        name: "Scott Matts",
        job: "Software Engineer",
        img: "/imgs/profile_image3.png",
        text: "Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Massa vitae tortor condimentum lacinia quis vel eros donec. Enim diam vulputate ut pharetra sit amet. Facilisi etiam dignissim diam quis enim lobortis.",
    },

    {
        id: 4,
        name: "John Davies",
        job: "Lead Marketer",
        img: "/imgs/profile_image4.png",
        text: "Quam adipiscing vitae proin sagittis nisl. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Netus et malesuada fames ac turpis egestas sed tempus urna. Mauris ultrices eros in cursus turpis massa tincidunt dui ut.",
    },
];

// Select Id Classes and Buttons
const profileImage = document.getElementById("profile-img");
const fullName = document.getElementById("full-name");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

// Set counter
let currentProfile = 0;

// Load Contents to Window
window.addEventListener("DOMContentLoaded", function () {
    showProfile();
});

// Add Event Listeners to buttons

// Show Previous review
prevBtn.addEventListener("click", function () {
    currentProfile--;

    if (currentProfile < 0) {
        currentProfile = reviews.length - 1;
    }
    showProfile();
});

// Show Next Review
nextBtn.addEventListener("click", function () {
    currentProfile++;

    if (currentProfile > reviews.length - 1) {
        currentProfile = 0;
    }
    showProfile();
});

randomBtn.addEventListener("click", function () {
    currentProfile = getRandomProfile();

    showProfile();
});

// Show profile function
function showProfile() {
    let profile = reviews[currentProfile];

    profileImage.src = profile.img;
    fullName.textContent = profile.name;
    job.textContent = profile.job;
    info.textContent = profile.text;
}

//Random profile function
function getRandomProfile() {
    return Math.floor(Math.random() * reviews.length);
}
