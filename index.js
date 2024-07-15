let taskOrTasks = localStorage.getItem("taskOrTasks")
  ? JSON.parse(localStorage.getItem("taskOrTasks"))
  : [];

document.addEventListener("DOMContentLoaded", () => {
  displayTask();

});

const descriptionInput = access(".description-input");
const forModalBtn = access(".for-modal-btn");
const modalFull = access(".modal-full");
const taskNameInput = access(".task-input");
const dateInput = access(".date-input");
const timeInput = access(".time-input");
const addTaskBtnModal = access(".add-task-btn-modal");
const saveTaskBtn = access(".save-task-btn-modal");
const hideModalBtn = access(".hide-modal-btn");
const normalContainer = access(".normal-container");

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
    makeTaskDiv(
      task.name,
      task.description,
      task.date,
      task.time,
      task.id,
      task.tik
    );
  });
}

//dynamically adding divs containing task info
function makeTaskDiv(name, description, date, time, id, tik) {
  let taskDiv = document.createElement("div");
  taskDiv.className = "task-div";

  //inside of taskDiv
  html(name, description, date, time, id, tik, taskDiv);

  //appending div
  if (normalContainer.children.length >= 2) {
    normalContainer.insertBefore(taskDiv, normalContainer.children[1]);
  } else {
    normalContainer.appendChild(taskDiv);
  }

  let taskName = access(".task-name");
  let tikBtn = access(".tick-task-btn");
  let editBtn = access(".edit-task-btn");
  let taskDltBtn = access(".dlt-task-btn");
  let descriptionSection = access(".description-txt-window");
  let btnSection = access(".time-date");

  //hide or display of description and other things
  taskName.addEventListener("click", () => {
    if (
      descriptionSection.classList.contains("description-txt-window-display")
    ) {
      descriptionSection.classList.remove("description-txt-window-display");
      btnSection.classList.remove("time-date-display");
    } else {
      descriptionSection.classList.add("description-txt-window-display");
      btnSection.classList.add("time-date-display");
    }
  });

  //marking of done task
  tikBtn.addEventListener("click", () => {
    taskName.classList.add("lined-task"); //adding new class to make Task Name decorized

    //finding the particular object for making change for clicking tik button
    let particularObject = taskOrTasks.find((obj) => {
      return obj.id == parseInt(tikBtn.dataset.id);
    });
    particularObject.tik = true;

    saveData();
  });

  //deleting task
  taskDltBtn.addEventListener("click", () => {
    taskDiv.remove();
    taskOrTasks = taskOrTasks.filter((task) => {
      return task.id !== id;
    });

    saveData();
  });

  // edit
  editBtn.addEventListener("click", (e) => {
    modalVisible();
    saveTaskBtnVisible();

    let object = taskOrTasks.find((obj) => {
      return obj.id === id;
    });

    taskNameInput.value = object.name;
    descriptionInput.value = object.description;
    dateInput.value = object.date;
    timeInput.value = object.time;

    saveTaskBtn.addEventListener("click", saveBtn);

    function saveBtn() {
      if (taskNameInput.value.trim() === "") {
        alert("Task Name Input is empty");
      } else {
        entryFromField(object);
        saveData();
      }

      modalDisappearance();
      saveBtnNotVisible();
      displayTask();
      saveTaskBtn.removeEventListener("click", saveBtn);
    }
  });
}

//after clicking Click to add task button
addTaskBtnModal.addEventListener("click", () => {
  saveBtnNotVisible();

  if (!taskNameInput.value.trim()) {
    alert("Add task name");
  } else {
    //if there is no other div ...the id is 1
    if (taskOrTasks.length === 0) {
      taskOrTasks.push({
        id: 1,
        name: taskNameInput.value,
        description: descriptionInput.value,
        date: dateInput.value,
        time: timeInput.value,
        tik: false,
      });
    } else {
      //id of the current object is 1 more than the taskOrTasks array's last object's id
      taskOrTasks.push({
        id: taskOrTasks[taskOrTasks.length - 1].id + 1,
        name: taskNameInput.value,
        description: descriptionInput.value,
        date: dateInput.value,
        time: timeInput.value,
        tik: false,
      });
    }

    displayTask();
    //saving taskOrTasks array in the local storage
    saveData();
    //after clicking the Add Task button, the modal disappears
    modalDisappearance();
  }
});

//modal disappearance after clicking outside of the modal
modalFull.addEventListener('click', (e)=> {
  if (e.target === modalFull) {
    modalDisappearance();
  saveBtnNotVisible();
  clearInput();
  }
})



//modal section appears
forModalBtn.addEventListener("click", () => {
  modalVisible();
  clearInput();
});


//Save Task or Add Task button click for Enter key press
window.addEventListener("keypress", (e) => {
  console.log(e.key)
  if (e.key === "Enter" && modalFull.classList.contains('modal-section-display')) {
    console.log('sra')
    if (saveTaskBtn.classList.contains('save-task-btn-display')) {
      saveTaskBtn.click()
    } else {
      addTaskBtnModal.click()
    }
  }
}
)



//modal section hides
hideModalBtn.addEventListener("click", () => {
  modalDisappearance();
  saveBtnNotVisible();
  clearInput();
});

//modal section visible
function modalVisible() {
  modalFull.classList.add("modal-section-display");
}




//clear input field
function clearInput() {
  taskNameInput.value = "";
  descriptionInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
}

//save button visible
function saveTaskBtnVisible() {
  saveTaskBtn.classList.add("save-task-btn-display");
  addTaskBtnModal.classList.add("add-task-btn-hide");
}
//save Button not visible in modal
function saveBtnNotVisible() {
  saveTaskBtn.classList.remove("save-task-btn-display");
  addTaskBtnModal.classList.remove("add-task-btn-hide");
}

//function..entry from field
function entryFromField(object) {
  object.name = taskNameInput.value;
  object.description = descriptionInput.value;
  object.date = dateInput.value;
  object.time = timeInput.value;
}

//save data
function saveData() {
  localStorage.setItem("taskOrTasks", JSON.stringify(taskOrTasks));
}

//access function
function access(info) {
  return document.querySelector(info);
}

//modal section hide
function modalDisappearance() {
  modalFull.classList.add("modal-section-hide");
  modalFull.classList.remove("modal-section-display");
}

//innerHtml
function html(name, description, date, time, id, tik, div) {
  if (tik === false) {
    div.innerHTML = `<div class="task-detail">
            <div class="task-name">${name}</div>

            <div class="description-txt-window">${description}</span> </div>
            <div class="time-date">
              Date: <span class="added-date">${date}</span>
              Time: <span class="added-time">${time}</span>
              <div class="tick-edit-dlt-task">
          <button class="tick-task-btn" data-id="${id}">&#10004</button>
          <button class="edit-task-btn" data-id="${id}">&#9998</button>
          <button class="dlt-task-btn" data-id="${id}">&#215</button>
            </div>
          </div>
          </div>`;
  } else {
    //if a particular object's tik: true, the decorated display of the task name
    div.innerHTML = `<div class="task-detail">
            <div class="task-name lined-task">${name}</div>

            <div class="description-txt-window">${description}</span> </div>
            <div class="time-date">
              Date: <span class="added-date">${date}</span>
              Time: <span class="added-time">${time}</span>
              <div class="tick-edit-dlt-task">
          <button class="tick-task-btn" data-id="${id}">&#10004</button>
          <button class="edit-task-btn" data-id="${id}">&#9998</button>
          <button class="dlt-task-btn" data-id="${id}">&#215</button>
            </div>
          </div>

          </div>`;
  }
}




