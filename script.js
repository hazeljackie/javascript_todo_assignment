// 1. Select elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");
const counter = document.getElementById("counter");
const emptyMsg = document.getElementById("emptyMsg");
const clearBtn = document.getElementById("clearBtn");

// 2. Data: an array of { text, completed }, loaded from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 3. Draw the whole list from the array
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    if (task.completed) {
      li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.append(checkbox, span, deleteBtn);
    taskList.appendChild(li);
  });

  counter.textContent = "Total tasks: " + tasks.length;
  emptyMsg.style.display = tasks.length === 0 ? "block" : "none";
}

// 4. Add a task (with validation)
function addTask() {
  const text = taskInput.value.trim(); // remove extra spaces

  if (text === "") {
    message.textContent = "Please enter a task before adding.";
    return;
  }

  message.textContent = "";
  tasks.push({ text: text, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
  taskInput.focus();
}

// 5. Events
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

clearBtn.addEventListener("click", function () {
  tasks = [];
  saveTasks();
  renderTasks();
});

// 6. First draw when the page loads
renderTasks();
