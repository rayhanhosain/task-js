let taskOrTasks = localStorage.getItem("taskOrTasks") ? JSON.parse(localStorage.getItem("taskOrTasks")) : [];
document.addEventListener("DOMContentLoaded", () => {
  displayTask();
});

const forModalBtn = document.querySelector(".for-modal-btn");
const modalFull = document.querySelector(".modal-full");
const taskNameInput = document.querySelector(".task-input");
const dateInput = document.querySelector(".date-input");
const timeInput = document.querySelector(".time-input");
const addTaskBtnModal = document.querySelector(".add-task-btn-modal");
const hideModalBtn = document.querySelector(".hide-modal-btn");
const normalContainer = document.querySelector(".normal-container");

//function for displaying task
function displayTask() {

  //selecting existing divs containing task info
  let taskDivOrDivs = document.querySelectorAll(".task-div");

  //deleting the previous list of div so that repeat does not happen
  taskDivOrDivs.forEach((currentTaskDiv) => {
    currentTaskDiv.remove();
  });

  //for each object inside the taskOrTasks array, one div containing task info gets made
  taskOrTasks.forEach((task) => {
    makeTaskDiv(task.name, task.date, task.time, task.id, task.tik); //makeTaskDiv function call
  });
}

//modal section appears
forModalBtn.addEventListener("click", () => {
  modalFull.classList.add("modal-section-display");
});

//modal section hides
hideModalBtn.addEventListener("click", () => {
  modalFull.classList.add("modal-section-hide");
  modalFull.classList.remove("modal-section-display");
});

//dynamically adding divs containing task info
function makeTaskDiv(name, date, time, id, tik) {
  let taskDiv = document.createElement("div");
  taskDiv.className = "task-div";

  //if a particular object's tik: false, then normal display of the task info
  if (tik === false) {
    taskDiv.innerHTML = `<div class="task-detail">
            <div class="task-name ">${name}</div>
            <div class="time-date">
              Date: <span class="added-date">${date}</span>
              Time: <span class="added-time">${time}</span>
            </div>
          </div>
    
          <div class="tick-dlt-task">
          <div class="tick-task-btn">&#10004</div>
          <div class="dlt-task-btn">&#215</div>
          </div>`;
  } else {
    //if a particular object's tik: true, the decorated display of the task name
    taskDiv.innerHTML = `<div class="task-detail">
            <div class="task-name lined-task">${name}</div>
            <div class="time-date">
              Date: <span class="added-date">${date}</span>
              Time: <span class="added-time">${time}</span>
            </div>
          </div>
    
          <div class="tick-dlt-task">
          <div class="tick-task-btn">&#10004</div>
          <div class="dlt-task-btn">&#215</div>
          </div>`;
  }
  
//appending div
  if (normalContainer.children.length >= 2) {
    normalContainer.insertBefore(taskDiv, normalContainer.children[1]);
  } else {
    normalContainer.appendChild(taskDiv);
  }

  let taskName = document.querySelector(".task-name");
  let tikBtn = document.querySelector(".tick-task-btn");
  let taskDltBtn = document.querySelector(".dlt-task-btn");

  //after clicking tik button
  tikBtn.addEventListener("click", () => {
  taskName.classList.add('lined-task') //adding new class to make Task Name decorized

  //finding the particular object for making change for clicking tik button
  let particularObject = taskOrTasks.find(obj => {
    return obj.id === id
  })
  particularObject.tik = true
  localStorage.setItem("taskOrTasks", JSON.stringify(taskOrTasks));
  }); //saving array after modifying one property of a particular object

  //delete task
  taskDltBtn.addEventListener("click", () => {
    taskDiv.remove();
    taskOrTasks = taskOrTasks.filter((task) => {
     return task.id !== id;
    });

    localStorage.setItem("taskOrTasks", JSON.stringify(taskOrTasks)); //saving array after deleting one object
    
  });
}

//after clicking Click to add task button
addTaskBtnModal.addEventListener("click", () => {
  if (taskNameInput.value === "") {
    alert("Add task name");
  } else {
    //if there is no other div ...the id is 1
    if (taskOrTasks.length === 0) {
      taskOrTasks.push({
        id: 1,
        name: taskNameInput.value,
        date: dateInput.value,
        time: timeInput.value,
        tik: false,
      });
    } else {

    //id of the current object is 1 more than the taskOrTasks array's last object's id
      taskOrTasks.push({
        id: taskOrTasks[taskOrTasks.length - 1].id + 1,
        name: taskNameInput.value,
        date: dateInput.value,
        time: timeInput.value,
        tik: false,
      });
    }
    displayTask(taskNameInput.value, dateInput.value, timeInput.value); //display task function call
    localStorage.setItem("taskOrTasks", JSON.stringify(taskOrTasks)); //saving taskOrTasks array in the local storage
    
    //clear field
    taskNameInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
    //after clicking the Add Task button, the modal disappears
    modalFull.classList.add("modal-section-hide");
    modalFull.classList.remove("modal-section-display");
  }
});
