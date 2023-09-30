// ***Select elements***
let inputDisplay = document.getElementById("input-value");
const btns = document.querySelectorAll(".btn");

btns.forEach((btn) => {
    btn.addEventListener("click", calculateAns);
});
// ***Functions***
function calculateAns(e) {
    let value = e.target.dataset.num;

    if (value !== "AC" && value !== "DEL" && value !== "=") {
        inputDisplay.value += value;
        let updatedValue = [...inputDisplay.value];
    } else if (value === "AC") {
        inputDisplay.value = "";
    } else if (value === "DEL") {
        if (inputDisplay.value === "") {
            inputDisplay.value = "";
        }
        //remove last element
        else {
            let updatedValue = [...inputDisplay.value];
            updatedValue.pop();

            let newUpdatedValue = updatedValue;

            inputDisplay.value = newUpdatedValue
                .filter((elem) => {
                    if (elem) {
                        return elem;
                    }
                    return elem;
                })
                .join("");
        }
    }
    // Perform calculation
    else {
        inputDisplay.value = eval(inputDisplay.value);
    }
}
