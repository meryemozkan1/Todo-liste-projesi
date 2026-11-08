//Tüm Elementleri Seçmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];

runEvents();

function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", removeTodoToUI);
  clearButton.addEventListener("click", allTodosEverywhere);
  filterInput.addEventListener("input", filter);
}

function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function filter(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todoItems = document.querySelectorAll(".list-group-item");

  todoItems.forEach(function (todo) {
    todo.hidden = !todo.textContent.toLowerCase().trim().includes(filterValue);
  });
}

function allTodosEverywhere() {
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    todoList.innerHTML = "";
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    showAlert("success", "Başarılı bir şekilde silindi");
  } else {
    showAlert("warning", "Silmek için en az bir todo olmalıdır");
  }
}

function removeTodoToUI(e) {
  const deleteButton = e.target.closest(".delete-item");
  if (!deleteButton) return;

  const todo = deleteButton.closest(".list-group-item");
  if (!todo) return;

  const todoText = todo.querySelector(".todo-text").textContent;
  todo.remove();
  removeTodoToStorage(todoText);
  showAlert("success", "Todo başarıyla silindi.");
}

function removeTodoToStorage(removeTodo) {
  checkTodosFromStorage();
  const todoIndex = todos.indexOf(removeTodo);
  if (todoIndex !== -1) todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
  e.preventDefault();
  const inputText = addInput.value.trim();
  if (!inputText) {
    showAlert("warning", "Lütfen boş bırakmayınız!");
  } else {
    //Arayüze ekleme
    addTodoToUI(inputText);
    addTodoToStorage(inputText);
    showAlert("success", "Todo Eklendi.");
  }

}

function addTodoToUI(newTodo) {
  const li = document.createElement("li");
  li.className = "list-group-item";

  const text = document.createElement("span");
  text.className = "todo-text";
  text.textContent = newTodo;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "delete-item";
  button.setAttribute("aria-label", `${newTodo} görevini sil`);
  button.textContent = "×";

  li.appendChild(text);
  li.appendChild(button);
  todoList.appendChild(li);

  addInput.value = "";
}

function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function showAlert(type, message) {
  /*
    <div class="alert alert-warning" role="alert">
    This is a warning alert—check it out!
  </div>*/
  const div = document.createElement("div");
  //   div.className="alert alert-"+type;
  div.className = `alert alert-${type}`; //litirel template
  div.textContent = message;

  firstCardBody.appendChild(div);

  setTimeout(function () {
    div.remove();
  }, 2500);
}
