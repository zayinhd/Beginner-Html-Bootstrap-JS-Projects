const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

// Select Deadline Items
const countdownContainer = document.querySelector(".countdown-container");
const deadline = document.querySelector(".deadline");
const deadlineItems = document.querySelectorAll(".deadline-format h5");

//Add 10 days everytime user Loads the Page
let newDate = new Date();
let newYear = newDate.getFullYear();
let newMonth = newDate.getMonth();
let newDay = newDate.getDate() + 5;

//Set Future date - CHANGE THE DATE VALUES TO SEE EFFECTS
let futureDate = new Date(newYear, newMonth, newDay, 20, 30, 0);

//Get the year, month, weekday, date, hours and minutes
const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const weekday = weekdays[futureDate.getDay()];
const date = futureDate.getDate();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

//Display Values on the page in CountDown Info
countdownContainer.innerHTML = `<h5>Countdown ends on ${weekday}, ${date} ${month} ${year} at ${hours}:${minutes}.</h5>`;

//Get future Time
const futureTime = futureDate.getTime();

//Function - Get the Time left Between the future time and the current time
function getTimeLeft() {
    const today = new Date().getTime();
    const t = futureTime - today;

    // 1sec = 1000ms
    // 1min = 60s
    // 1hour = 60min
    // 1day = 24hrs

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    //calculate the remaining days, hours,minutes and seconds
    let days = t / oneDay;
    days = Math.floor(days);
    let hours = Math.floor((t % oneDay) / oneHour);
    let minutes = Math.floor((t % oneHour) / oneMinute);
    let seconds = Math.floor((t % oneMinute) / 1000);

    //Format function - add 0 when remaining value is less than 10
    function format(value) {
        if (value < 10) {
            return `0${value}`;
        }
        return value;
    }
    //Set an Array for Remaining values
    const values = [days, hours, minutes, seconds];

    deadlineItems.forEach(function (item, index) {
        item.innerHTML = format(values[index]);
    });

    //clear interval when the Deadline Ends
    if (t < 0) {
        clearInterval(timeInterval);
        deadline.innerHTML = `<h5 class="text-danger">Sorry, the Deadline has Ended!</h5>`;
    }
}

//Set time Interval
let timeInterval = setInterval(getTimeLeft, 1000);

//call Deadline time left function
getTimeLeft();
