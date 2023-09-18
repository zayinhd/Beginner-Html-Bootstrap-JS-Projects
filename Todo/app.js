//Select Items
const todo = document.querySelector(".list");
const form = document.querySelector(".form-btn");
const addBtn = document.querySelector(".add-btn");
const alert = document.querySelector(".alert-btn");

const todoContainer = document.querySelector(".todo-container");
const todoList = document.querySelector(".todo-list");

//clear all Todos button
const clearBtn = document.querySelector(".clear-btn");

//Clear all Todos when button clicked
clearBtn.addEventListener("click", function () {
    let items = document.querySelectorAll(".list-item");

    //remove each Todo item from its container (todoList)
    if (items.length > 0) {
        items.forEach(function (item) {
            todoList.removeChild(item);
        });
    }

    //remove show-container from todoContainer
    todoContainer.classList.remove("show-container");

    //show alert when items are removed
    showAlert("Removed all Todo", "danger");
    //remove List from local storage
    localStorage.removeItem("list");
});

//Display Todo list from local storage when window loads
window.addEventListener("DOMContentLoaded", setupItems);

//Create a Todo when Add button is clicked
form.addEventListener("submit", function (e) {
    //prevent default behaviour of event
    e.preventDefault();

    //get value from Input
    const value = todo.value;

    //create a new Id for each element
    const id = new Date().getTime().toString();

    if (value) {
        //use value to create a Todo item
        createListItem(id, value);

        //show Alert
        showAlert("Todo has been successfully added", "success");

        //show TodoContainer
        todoContainer.classList.add("show-container");

        //add list to local Storage
        addTodoToLocalStorage(id, value);

        todo.value = "";
    } else {
        showAlert("Please, Enter a Todo", "danger");
    }
});

//****FUNCTIONS

//Create List function
function createListItem(id, value) {
    // create a new element
    const elem = document.createElement("article");
    elem.classList.add("row", "col-12", "pt-3", "list-item");

    // add ID
    const attr = document.createAttribute("data-id");
    attr.value = id;
    elem.setAttributeNode(attr);

    // add innerHtml to new element created
    elem.innerHTML = `<div class="col-1">
        <i class="bi bi-check-circle-fill bi-check-circle check-btn"></i> 
    </div>
    <p class="text-left  col">${value}</p>
    <div class="col-2">
        <button class="btn-cnt px-1 del-btn">
            <i class="bi bi-trash"></i>
        </button>
    </div>`;

    //append element to Todolist
    todoList.appendChild(elem);

    //Check Todo item
    const checkBtn = elem.querySelector(".check-btn");
    checkBtn.addEventListener("click", checkTodo);

    // Delete the current Todo item when clicked
    const deleteBtn = document.querySelector(".del-btn");
    deleteBtn.addEventListener("click", deleteTodo);
}

//Show Alert function
function showAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // unshow alert message after one second
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

function checkTodo(e) {
    const element = e.currentTarget;

    // strike through Todo item
    element.parentElement.nextElementSibling.classList.toggle("mark-todo");

    //toggle Check button
    if (element.classList.contains("bi-check-circle")) {
        element.classList.remove("bi-check-circle");
    } else {
        element.classList.add("bi-check-circle");
    }
}
//Delete Todo item function
function deleteTodo(e) {
    //get grand parent of button clicked
    const elem = e.currentTarget.parentElement.parentElement;
    const id = elem.dataset.id;

    // remove the current Todo item
    todoList.removeChild(elem);

    if (todoList.children.length === 0) {
        todoContainer.classList.remove("show-container");
    }

    let items = getItemsFromStorage();
    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
    });

    localStorage.setItem("list", JSON.stringify(items));

    showAlert("Todo deleted", "danger");
}

//****LOCAL STORAGE
//Get Todo list from local storage
function getItemsFromStorage() {
    return localStorage.getItem("list")
        ? JSON.parse(localStorage.getItem("list"))
        : [];
}

//Add Todo Item to Local Storage
function addTodoToLocalStorage(id, value) {
    const todo = { id: id, value: value };
    let items = getItemsFromStorage();
    //add Todo value to local storage
    items.push(todo);

    //send the list to local storage as String
    localStorage.setItem("list", JSON.stringify(items));
}

//Setup Items function when User Reloads page
function setupItems() {
    let items = getItemsFromStorage();

    if (items.length > 0) {
        items.forEach(function (item) {
            createListItem(item.id, item.value);
        });

        todoContainer.classList.add("show-container");
    }
}
