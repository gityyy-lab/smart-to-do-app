let completedTasks = 0;
let totalTasks = 0;

function addTask() {
  const input = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;
  const taskText = input.value;

  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;

  // add priority class
  if (priority === "High") li.classList.add("high");
  if (priority === "Medium") li.classList.add("medium");
  if (priority === "Low") li.classList.add("low");

  // complete toggle
  li.onclick = function () {
    li.classList.toggle("completed");

    if (li.classList.contains("completed")) {
      completedTasks++;
    } else {
      completedTasks--;
    }

    updateProgress();
  };

  // delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "X";

 delBtn.onclick = function (event) {
  event.stopPropagation(); // 🔥 THIS FIXES THE BUG

  if (li.classList.contains("completed")) {
    completedTasks--;
  }

  li.remove();
  totalTasks--;
  updateProgress();
};

  li.appendChild(delBtn);

  document.getElementById("taskList").appendChild(li);

  totalTasks++;
  updateProgress();

  input.value = "";
}

function updateProgress() {
  document.getElementById("progress").textContent =
    `${completedTasks}/${totalTasks} tasks completed`;
}
