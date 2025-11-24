console.log("JS is connected!");
let taskList = document.getElementById("taskList");

// Load saved tasks when page opens
window.onload = function () {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => displayTask(task));
};

// Add new task
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let task = { text: taskText, completed: false };

    displayTask(task);
    saveTask(task);

    taskInput.value = "";
}

// Display task in list
function displayTask(task) {
    let li = document.createElement("li");

    if (task.completed) {
        li.classList.add("completed");
    }

    let span = document.createElement("span");
    span.textContent = task.text;

    let completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.onclick = function () {
        li.classList.toggle("completed");
        updateLocalStorage();
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
        li.remove();
        updateLocalStorage();
    };

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

// Save task in LocalStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update LocalStorage when tasks change
function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
