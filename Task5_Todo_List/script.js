let taskList = document.getElementById("taskList");

window.onload = function () {
    loadTasks();
};

function addTask() {

    let input = document.getElementById("taskInput");

    if (input.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    createTask(input.value, false);

    saveTasks();

    input.value = "";
}

function createTask(taskText, completed) {

    let li = document.createElement("li");

    li.textContent = taskText;

    if (completed) {
        li.classList.add("completed");
    }

    li.onclick = function () {
        li.classList.toggle("completed");
        saveTasks();
    };

    let delBtn = document.createElement("button");

    delBtn.textContent = "Delete";

    delBtn.className = "delete";

    delBtn.onclick = function (e) {
        e.stopPropagation();
        li.remove();
        saveTasks();
    };

    li.appendChild(delBtn);

    taskList.appendChild(li);
}

function saveTasks() {

    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(function (item) {

        tasks.push({
            text: item.firstChild.textContent,
            completed: item.classList.contains("completed")
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (task) {
        createTask(task.text, task.completed);
    });

}