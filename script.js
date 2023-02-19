const taskInput = document.getElementById("task");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

addBtn.addEventListener("click", () => {
  const task = taskInput.value;
  if (task !== "") {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task}</span>
      <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(li);
    taskInput.value = "";
    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();
    });
  }
});
