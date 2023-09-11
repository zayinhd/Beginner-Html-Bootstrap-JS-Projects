//**** */ SELECTING ELEMENTS***

const grocery = document.querySelector(".grocery");
const form = document.querySelector(".form-btn");
const submitBtn = document.querySelector(".submit-btn");
const groceryContainer = document.querySelector(".grocery-container");
const groceryList = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert-btn");
const clearBtn = document.querySelector(".clear-btn");

// Editing option
let editElement;
let editFlag = false;
let editID = "";

// ***LOAD GROCERY LIST***
window.addEventListener("DOMContentLoaded", setupItems);

// Submitting grocery list
form.addEventListener("submit", addList);

// Clearing Items
clearBtn.addEventListener("click", clearItems);

//**** */ FUNCTIONS****
function addList(e) {
    e.preventDefault();

    const value = grocery.value;
    const id = new Date().getTime().toString();

    // Adding Grocery Items
    if (value && !editFlag) {
        // Create list Items
        createListItems(id, value);

        // display alert
        displayAlert("Item added", "success");
        // show grocery container
        groceryContainer.classList.add("show-container");

        // add to local storage
        addToLocalStorage(id, value);

        // set back to default
        setBackToDefault();
    }

    // editing Grocery Item
    else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert("Grocery changed", "success");

        // edit local Storage
        editLocalStorage(editID, value);

        setBackToDefault();
    } else {
        displayAlert("Please Enter an Item", "danger");
    }
}

// Display Alert function

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

// Set back to default function
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.value = "Submit";
}

// Edit button function
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;

    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;

    // set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.value = "Edit";
}

// Delete button function
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    groceryList.removeChild(element);

    // remove grocery list container when empty

    if (groceryList.children.length === 0) {
        groceryContainer.classList.remove("show-container");
    }

    displayAlert("Item removed", "danger");
    setBackToDefault();

    // remove from Local Storage
    removeFromLocalStorage(id);
}

// Clear all Grocery Items function
function clearItems() {
    const items = document.querySelectorAll(".grocery-item");

    if (items.length > 0) {
        items.forEach(function (item) {
            groceryList.removeChild(item);
        });
    }

    //remove grocery container
    groceryContainer.classList.remove("show-container");
    displayAlert("Cleared Grocery List", "danger");
    setBackToDefault();

    // local Storage for clear items
    localStorage.removeItem("list");
}

// **** LOCAL STORAGE****

// Add grocery to localStorage
function addToLocalStorage(id, value) {
    const grocery = { id: id, value: value };

    let items = getLocalStorage();

    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}

// Remove grocery from localStorage
function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
    });

    localStorage.setItem("list", JSON.stringify(items));
}

// Edit grocery in local storage
function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function (item) {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    });

    localStorage.setItem("list", JSON.stringify(items));
}

// get local storage
function getLocalStorage() {
    return localStorage.getItem("list")
        ? JSON.parse(localStorage.getItem("list"))
        : [];
}

// ***SETUP ITEMS***

function setupItems() {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach(function (item) {
            createListItems(item.id, item.value);
        });

        groceryContainer.classList.add("show-container");
    }
}

function createListItems(id, value) {
    const element = document.createElement("article");
    // add class
    element.classList.add("grocery-item", "row", "col-12", "pt-3");

    // add ID
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);

    //add Item
    element.innerHTML = `<p class="text-left gr-2 col">${value}</p>
        <div class= "col-3">
            <button class=" btn-cnt edit-btn">
                <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn-cnt del-btn">
                <i class="bi bi-trash"></i>
            </button>
        </div>`;

    const editBtn = element.querySelector(".edit-btn");
    const deleteBtn = element.querySelector(".del-btn");

    editBtn.addEventListener("click", editItem);
    deleteBtn.addEventListener("click", deleteItem);

    // append Item to grocery List
    groceryList.appendChild(element);
}
