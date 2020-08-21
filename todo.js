// Element Secimleri
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

// All events
function eventListeners() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}

// printing to local todos interface while page is restoring.
function loadAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

// filter todo
function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      //Not found
      listItem.setAttribute("style", "display : none !important");
    } else {
      listItem.setAttribute("style", "display : block");
    }
  });
}

// clear all todos
function clearAllTodos(e) {
  if (confirm("Are You Sure You Want To Delete All?")) {
    // todoList.innerHTML = ""; // the first way,slow method.
    while (todoList.firstElementChild != null) {  //firstchild remove until null
      todoList.removeChild(todoList.firstElementChild);
    } //second way, fast method.

    localStorage.removeItem("todos");
  }
}

function addTodo(e) {
  const newTodo = todoInput.value.trim();
  if (newTodo === "") {
    showAlert("danger", "Please Enter Todo !");
  } else {
    addTodoToUI(newTodo);
    addTodoTostorage(newTodo);
    showAlert("success", "Todo Successfully Added.");
  }
  e.preventDefault();
}


function showAlert(type, message) {
  // <div class="alert alert-danger" role="alert">
  //      This is a danger alert—check it out!
  // </div>

  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  // alert add to first Card
  firstCardBody.appendChild(alert);

  //setTimeout
  setTimeout(function () {
    alert.remove();
  }, 1500);

}

// add todo UI
function addTodoToUI(newTodo) {
  //     <!-- <li class="list-group-item d-flex justify-content-between">
  //     Todo 1
  //     <a href = "#" class ="delete-item">
  //         <i class = "fa fa-remove"></i>
  //     </a>
  // </li>-->

  const listItem = document.createElement("li");
  const link = document.createElement("a");

  listItem.className = "list-group-item d-flex justify-content-between";
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  // adding newtodo as text node to list item;
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  // add todo list to list item;
  todoList.appendChild(listItem);
  todoInput.value = "";
}

//getting todos from storage;
function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

// add to todo storage
function addTodoTostorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//delete element from storage
function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1); 
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// delete todo
function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Todo Successfully Deleted.");
  }
}
