const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const renderCalendar = () => {
  const monthDays = document.querySelector(".days");
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const lastDayIndex = new Date(currentYear, currentMonth + 1, 0).getDay();
  const nextDays = 7 - lastDayIndex - 1;
  const months = document.querySelector(".month-name");
  
  months.innerHTML = monthNames[currentMonth] + " " + currentYear;
  
  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += "<div class='prev-month'>" + (prevLastDay - x + 1) + "</div>";
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
      days += "<div class='today'>" + i + "</div>";
    } else {
      days += "<div>" + i + "</div>";
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += "<div class='next-month'>" + j + "</div>";
  }

  monthDays.innerHTML = days;
};

renderCalendar();

const prevMonth = document.querySelector(".prev");
const nextMonth = document.querySelector(".next");

prevMonth.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

nextMonth.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

const days = document.querySelectorAll(".days div");

days.forEach((day) => {
  day.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
    const selectedDate = new Date(currentYear, currentMonth, day.textContent);
    const modalTitle = document.querySelector("#todo-date");
    modalTitle.innerHTML = formatDate(selectedDate);
    const taskList = document.getElementById("task-list");
    const tasksForDate = getTasks(formatDate(selectedDate));
    taskList.innerHTML = "";
    tasksForDate.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${task}</span>
        <button class="delete-btn">-</button>
      `;
      // Add margin to the span element
      li.querySelector("span").style.marginRight = "10px";
      // Add margin to the button element
      li.querySelector("button").style.marginLeft = "0px";
      taskList.appendChild(li);
      li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        const date = formatDate(selectedDate);
        const updatedTasks = getTasks(date).filter((t) => t !== task);
        tasks[date] = updatedTasks;
      });
    });
    const taskInput = document.getElementById("task");
    const addBtn = document.getElementById("add-btn");
    addBtn.addEventListener("click", () => {
      const task = taskInput.value;
      if (task !== "") {
        addTask(formatDate(selectedDate), task);
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${task}</span>
          <button class="delete-btn">-</button>
        `;
        // Add margin to the span element
        li.querySelector("span").style.marginRight = "10px";
        // Add margin to the button element
        li.querySelector("button").style.marginLeft = "0px";
        taskList.appendChild(li);
        taskInput.value = "";
        li.querySelector(".delete-btn").addEventListener("click", () => {
          li.remove();
          const date = formatDate(selectedDate);
          const updatedTasks = getTasks(date).filter((t) => t !== task);
          tasks[date] = updatedTasks;
        });
      }
    });
  });
});




const day = document.querySelectorAll(".days div");

days.forEach((day) => {
  day.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
  });
});

const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";

  var dateButtons = document.querySelectorAll(".date-button");
  for (var i = 0; i < dateButtons.length; i++) {
    dateButtons[i].classList.remove("selected");
  }
});

const taskInput = document.getElementById("task");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

addBtn.addEventListener("click", () => {
  const task = taskInput.value;
  if (task !== "") {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task}</span>
      <button class="delete-btn">-</button>
    `;

// Add margin to the span element
li.querySelector('span').style.marginRight = '10px';

// Add margin to the button element
li.querySelector('button').style.marginLeft = '0px';

    taskList.appendChild(li);
    taskInput.value = "";
    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();
    });
  }
});


