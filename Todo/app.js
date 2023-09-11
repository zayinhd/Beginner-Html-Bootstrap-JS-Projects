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
addBtn.addEventListener("click", function (e) {
    //prevent default behaviour of event
    e.preventDefault();

    //get value from Input
    const value = todo.value;

    if (value) {
        //use value to create a Todo item
        createListItem(value);

        //show TodoContainer
        todoContainer.classList.add("show-container");

        //show Alert
        showAlert("Todo has been successfully added", "success");
        todo.value = "";

        //add list to local Storage
        addTodoToLocalStorage(value);

        // localStorage.setItem("list", JSON.stringify(value));
    } else {
        showAlert("Please, Enter a Todo", "danger");
    }
});

//****FUNCTIONS

//Create List function
function createListItem(value) {
    // create a new element
    const elem = document.createElement("article");
    elem.classList.add("row", "col-12", "pt-3", "list-item");

    // add innerHtml to new element created
    elem.innerHTML = `<p class="text-left gr-2 col">${value}</p>
    <div class="col-2">
        <button class="btn-cnt px-1 del-btn">
            <i class="bi bi-trash"></i>
        </button>
    </div>`;

    //append element to Todolist
    todoList.appendChild(elem);

    //Add line through to Todo item when clicked
    elem.addEventListener("click", function (e) {
        console.log(e.currentTarget);
        e.currentTarget.classList.toggle("mark-todo");
    });

    const deleteBtn = document.querySelector(".del-btn");

    // Delete the current Todo item when clicked
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

function deleteTodo(e, value) {
    e.preventDefault();
    //get grand parent of button clicked
    const elem = e.currentTarget.parentElement.parentElement;

    // remove the current Todo item
    todoList.removeChild(elem);

    if (todoList.children.length === 0) {
        todoContainer.classList.remove("show-container");
    }

    let items = getItemsFromStorage();
    items = items.filter(function (item) {
        if (item.value !== value) {
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
function addTodoToLocalStorage(value) {
    const todo = { value: value };
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
            createListItem(item.value);
        });

        todoContainer.classList.add("show-container");
    }
}
