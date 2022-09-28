// Start Get Element From Html 
let inputTask = document.querySelector(".input");
let addTask = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

// End Get Element From Html 

// Empty Array To Sotre Tasks 

let arrayOfTasks = [];

// Check If There Is Tasks In Local Storage
if(localStorage.getItem("task")){
  arrayOfTasks = JSON.parse(localStorage.getItem("task"));
}

// Trigger Get Data From Local Storage
getData();




//Start Function To Get Input Value
addTask.onclick = function(){
      if(inputTask.value !== ""){
        addTaskToArray(inputTask.value);
        inputTask.value = ""; // Empty Input Field
      }
}
//End Function To Get Input Value

// Start Add Task To Array 
function addTaskToArray(inputValue){

  const task = {
    id : Date.now(),
    title: inputValue,
    completed: false
  }
  arrayOfTasks.push(task);
  // Create Task And Add It To The Page
  addElementsToPageFrom(arrayOfTasks);

  // Add Data To Local Storage Form 
  addToLocal(arrayOfTasks);

}
// End Add Task To Array 

// Start Add Elements To Page From Fucntion 
function addElementsToPageFrom(arrayOfTasks){

  tasks.innerHTML = "";

  let deleteBox = document.createElement("div");
  deleteBox.className = "delete-box";

  arrayOfTasks.forEach((task) => {
    // Create Main Div For Task 
    let div = document.createElement("div");
    let taskText = document.createElement("p")
    div.className = "task-box";
    taskText.className = "tast-text";

    // Check If Task Done 
    if(task.completed){
      div.className = "task-box done";
    }
    taskText.innerHTML = task.title;
    div.setAttribute("data-id",task.id);
    div.appendChild(taskText);
    // Create Delete Button
    let delt = document.createElement("span");
    delt.className="delete-task";
    delt.appendChild(document.createTextNode("Delete"));
    
    // Append Delete Button To The Main Div
    div.appendChild(delt);
    // Append task To Main Tasks Box 
    tasks.appendChild(div);

  });

}


// End Add Elements To Page From Fucntion 



function addToLocal(arrayOfTasks){
  window.localStorage.setItem("task", JSON.stringify(arrayOfTasks));
}

// Get Data From Local Storage 
function getData(){
  
  let data = window.localStorage.getItem("task");
  if(data){
    let dataStored = JSON.parse(data);
    addElementsToPageFrom(dataStored);
  }
}



// Click On Task Element
tasks.addEventListener("click" , (e) =>{
  // Delete Button 
  if(e.target.classList.contains("delete-task")){

    // Remove Element From Local Storage 
    removeFromLocal(e.target.parentElement.getAttribute("data-id"));

    // Remove Element From Page Body 
    e.target.parentElement.remove();
  }


  if(e.target.classList.contains("task-box")){

    // Toggle Completed For The Task 
    toggleTaskStatus(e.target.getAttribute("data-id"));

    // Toggle Done Class 
    e.target.classList.toggle("done")
  }



})


function removeFromLocal(taskId){
  // Return All Tasks Expet Which == To Deleted "data-id" Attribute 
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addToLocal(arrayOfTasks);
}

function toggleTaskStatus(taskId){
  for(let i = 0 ; i <arrayOfTasks.length;i++){
    if(arrayOfTasks[i].id == taskId){
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addToLocal(arrayOfTasks);
}


// window.localStorage.clear()
