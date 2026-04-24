let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  const input = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;

  if (input.value === "") return;

  const task = {
    text: input.value,
    priority: priority,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  input.value = "";
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let completedTasks = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    // priority
    li.classList.add(task.priority.toLowerCase());

    // completed
    if (task.completed) {
      li.classList.add("completed");
      completedTasks++;
    }

    // toggle complete
    li.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    // delete
    const delBtn = document.createElement("button");
    delBtn.textContent = "X";

    delBtn.onclick = (event) => {
      event.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });

  document.getElementById("progress").textContent =
    `${completedTasks}/${tasks.length} tasks completed`;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// load on start
renderTasks();
