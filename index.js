let taskOrTasks = localStorage.getItem("taskOrTasks")
  ? JSON.parse(localStorage.getItem("taskOrTasks"))
  : [];






document.addEventListener("DOMContentLoaded", () => {
  displayTask();
  
 

   //after clicking tik button

//delete





   
  


});




//access function
function access(info) {
  return document.querySelector(info)
}


let descriptionInput = access(".description-input")

let forModalBtn = access(".for-modal-btn");

const modalFull = access(".modal-full");
const taskNameInput = access(".task-input");
const dateInput = access(".date-input");
const timeInput = access(".time-input");
const addTaskBtnModal = access(".add-task-btn-modal");
const saveTaskBtn = access('.save-task-btn-modal')

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
    makeTaskDiv(task.name, task.description, task.date, task.time, task.id, task.tik); //makeTaskDiv function call
  });
}



//dynamically adding divs containing task info
function makeTaskDiv(name, description, date, time, id, tik) {
  let taskDiv = document.createElement("div");
  taskDiv.className = "task-div";

  //if a particular object's tik: false, then normal display of the task info
  if (tik === false) {
    taskDiv.innerHTML = `<div class="task-detail">
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

    
          

          </div>`;;
  } else {
    //if a particular object's tik: true, the decorated display of the task name
    taskDiv.innerHTML = `<div class="task-detail">
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

  //appending div
  if (normalContainer.children.length >= 2) {
    normalContainer.insertBefore(taskDiv, normalContainer.children[1]);
  } else {
    normalContainer.appendChild(taskDiv);
  }

  let taskName = access('.task-name')
  let tikBtn = access(".tick-task-btn");
  let editBtn = access('.edit-task-btn')
  let taskDltBtn = access(".dlt-task-btn");
  let descriptionSection = access('.description-txt-window')
 let btnSection = access('.time-date')


taskName.addEventListener('click', ()=> {
  

 if (descriptionSection.classList.contains("description-txt-window-display")) {
  descriptionSection.classList.remove('description-txt-window-display')
  btnSection.classList.remove('time-date-display')
 } else {
  descriptionSection.classList.add('description-txt-window-display')
  btnSection.classList.add('time-date-display')
 }
})


  tikBtn.addEventListener("click", () => {
      taskName.classList.add("lined-task"); //adding new class to make Task Name decorized
  
      //finding the particular object for making change for clicking tik button
      let particularObject = taskOrTasks.find((obj) => {
        return obj.id == parseInt(tikBtn.dataset.id);
      });
      particularObject.tik = true;
      localStorage.setItem("taskOrTasks", JSON.stringify(taskOrTasks));
    }); //saving array after modifying one property of a particular object
  

    taskDltBtn.addEventListener("click", () => {
        taskDiv.remove();
        taskOrTasks = taskOrTasks.filter((task) => {
          return task.id !== id;
        });
        
        localStorage.setItem("taskOrTasks", JSON.stringify(taskOrTasks)); //saving array after deleting one object
      });

     // edit
editBtn.addEventListener('click', (e) => {
    modalFull.classList.add('modal-section-display')

    let object = taskOrTasks.find(obj => {
    return obj.id === id
    })


    saveTaskBtn.classList.add('save-task-btn-display')
    addTaskBtnModal.classList.add('add-task-btn-hide')
    
    taskNameInput.value = object.name
    descriptionInput.value = object.description
    dateInput.value = object.date
    timeInput.value = object.time

   function saveBtn () {
    if (taskNameInput.value.trim() === "") {
      alert("Task Name Input is empty");
    } else {
      object.name = taskNameInput.value
      object.description = descriptionInput.value
      object.date = dateInput.value
      object.time= timeInput.value
    }
    
    
    localStorage.setItem("taskOrTasks", JSON.stringify(taskOrTasks));
  
      //after clicking the Add Task button, the modal disappears
      modalFull.classList.add("modal-section-hide");
      modalFull.classList.remove("modal-section-display");
  
      saveTaskBtn.classList.remove('save-task-btn-display')
      addTaskBtnModal.classList.remove('add-task-btn-hide')
    
  
  //  console.log(taskOrTasks)
    displayTask()
    saveTaskBtn.removeEventListener('click', saveBtn)
   }

    saveTaskBtn.addEventListener('click', saveBtn)


  })


  
}

//after clicking Click to add task button
addTaskBtnModal.addEventListener("click", () => {
      saveTaskBtn.classList.remove('save-task-btn-display')
      addTaskBtnModal.classList.remove('add-task-btn-hide')
    
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
    displayTask(); //display task function call
    localStorage.setItem("taskOrTasks", JSON.stringify(taskOrTasks)); //saving taskOrTasks array in the local storage

  
    //after clicking the Add Task button, the modal disappears
    modalFull.classList.add("modal-section-hide");
    modalFull.classList.remove("modal-section-display");
  }
});


//modal section appears
forModalBtn.addEventListener("click", () => {
  modalFull.classList.add("modal-section-display");
  taskNameInput.value = ""
  descriptionInput.value = ""
  dateInput.value = ""
  timeInput.value = ""
});

//modal section hides
hideModalBtn.addEventListener("click", () => {
  modalFull.classList.add("modal-section-hide");
  modalFull.classList.remove("modal-section-display");
  saveTaskBtn.classList.remove('save-task-btn-display')
  addTaskBtnModal.classList.remove('add-task-btn-hide')
  taskNameInput.value = ""
  descriptionInput.value = ""
  dateInput.value = ""
  timeInput.value = ""
});



