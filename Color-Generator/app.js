const hexColors = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
];

// Select elements
const colorValue = document.querySelector(".input-value");
const bodyBg = document.querySelector("body");
const generateBtn = document.querySelector(".generate-btn");
const copyBtn = document.querySelector(".copy-btn");

generateBtn.addEventListener("click", () => {
    let value = "";
    // generate hex values
    for (let i = 0; i < 6; i++) {
        let randomValue = hexColors[getRandomValue()];
        value += randomValue;
    }
    colorValue.value = `#${value}`;

    let newValue = "#" + `${value}`;
    document.body.style.backgroundColor = newValue;
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(colorValue.value);
});
// ***Functions***
function getRandomValue() {
    return Math.floor(Math.random() * hexColors.length);
}
