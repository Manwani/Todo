import "./style.css";
import Todo from "./todo.js";
import Project from "./project.js";
import { compareAsc } from "date-fns";
import Master from "./master.js";



let kont = new Todo("proj1", "fds", "2024-10-01", "not high");
let ppcaca = new Todo("proj1 2", "fdssss", "2024-10-02", "high");
let ppcaca2 = new Todo("proj1 3", "fdssss", "2024-10-03", "high");
let ppcaca3 = new Todo("PROJ2", "fdssss", "2024-10-04", "LOW");
let ppcaca4 = new Todo("PROJ3", "fdssss", "2024-10-05", "LOW");
let ppcaca5 = new Todo("PROJ3 2", "fdssss", "2024-10-06", "LOW");
let proj = new Project("Vacation");
let proj2 = new Project("Goals");
let proj3 = new Project("Dentist");

Master.addToMaster(proj);
Master.addToMaster(proj2);
Master.addToMaster(proj3);


proj.addTodo(kont);
proj.addTodo(ppcaca);
proj.addTodo(ppcaca2);
proj2.addTodo(ppcaca3);
proj3.addTodo(ppcaca4);
proj3.addTodo(ppcaca5);
//proj.removeTodo(ppcaca2);
//proj.listTodo();


const projectBox = document.getElementById("projectBox");
const todoBox = document.getElementById("todoBox");
const addTaskArea = document.getElementById("addTaskArea")
const todosArea = document.getElementById("todosArea");

const inboxButton = document.createElement("button");
inboxButton.textContent = "Inbox";
projectBox.prepend(inboxButton);

inboxButton.addEventListener("click", function(){
    showAllProjects();
});


const addNewTaskButton = document.createElement("button");
addNewTaskButton.textContent = "+ Add Todo";


addNewTaskButton.addEventListener("click", function(){
    if(document.getElementsByClassName("addTaskDiv").length > 0){
        closeTodoForm();
    } else {
        openTodoForm();
    }
});


function populateProjects(){

    let projectId = 0;
    for(const project of Master.getMaster()){
            let projectButton = document.createElement("button");
            projectButton.id = projectId;
            projectButton.textContent = project.name;
            projectId++;
            projectButton.addEventListener("click",function(){
                refreshScreen();
                addTaskArea.appendChild(addNewTaskButton);
                populateTodos(project);
                Master.setCurrentMasterElement(projectButton.id);
                
            });
            projectBox.appendChild(projectButton);
        }
    showAllProjects();
}


    


function populateTodos(project){

 

    let todoArray = project.Todo;
    sortArrayByDate(todoArray);
    let todoId = 0;

    for(const result of todoArray){
        
        let taskDiv = document.createElement("div");
        taskDiv.className = "divTasks";
        taskDiv.classList.add(project.name);
        taskDiv.id = todoId;

       /*  for(const detail in result){
            let para = document.createElement("input");
            para.className = "inputy";
            para.value = result[detail];
            taskDiv.appendChild(para);
        } */

        let para = document.createElement("input");
        para.className = "inputy";
        para.value = result["title"];

        let para2 = document.createElement("input");
        para2.className = "inputy";
        para2.value = result["description"];

        let para3 = document.createElement("input");
        para3.type = "date";
        para3.className = "inputy";
        para3.value = result["dueDate"];
        

        let para4 = document.createElement("input");
        para4.className = "inputy";
        para4.value = result["priority"];


        let para5 = document.createElement("select");
        para5.className = "projectList";
        let opt1 = document.createElement("option");
        opt1.value = project.name;
        opt1.textContent = project.name;
        para5.appendChild(opt1);
        loadOtherProjectsForSelectBox(para5);
       


        taskDiv.appendChild(para);
        taskDiv.appendChild(para2);
        taskDiv.appendChild(para3);
        taskDiv.appendChild(para4);
        taskDiv.appendChild(para5);



        let addButton = document.createElement("button");
        addButton.textContent = "add";

        let editButton = document.createElement("button");
        editButton.textContent = "edit";

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";

        editButton.addEventListener("click", function(){
            let parentDiv = this.parentElement;
            let collectionArray = parentDiv.querySelectorAll("input");
            project.editTodo(parentDiv.id, collectionArray);
            //if project is different from parent class change project.
            if(parentDiv.classList[1] !== parentDiv.querySelector("select").value){
                changeProject(parentDiv, project);
            }
            
        });

        deleteButton.addEventListener("click", function(){
            let parentDiv = this.parentElement;
            project.removeTodo(parentDiv.id);
            parentDiv.remove();
            if(checkForAddTaskButton()){
                refreshScreen();
                populateTodos(project);

            } else{
                showAllProjects();
            }
            
        });

        addButton.addEventListener("click", function(){
            let parentDiv = this.parentElement;
            let collectionArray = parentDiv.querySelectorAll("input");
            let newTodo = new Todo (collectionArray[0].value,collectionArray[1].value,
                                    collectionArray[2].value,collectionArray[3].value);
            project.addTodo(newTodo); 
            refreshScreen();
            populateTodos(project);
              
        });
 
        taskDiv.appendChild(addButton);
        taskDiv.appendChild(editButton);
        taskDiv.appendChild(deleteButton);
        todosArea.appendChild(taskDiv);
        todoId++;
        
    }

}

//populateTodos(proj);
populateProjects();


function refreshScreen(){
    let screen = document.getElementById("todosArea");
    while(screen.firstChild){
        screen.lastChild.remove();
    }
}

function sortArrayByDate(arr){
    arr.sort((a,b) => compareAsc(a.dueDate, b.dueDate));
}

function openTodoForm(){
    
    let para = document.createElement("input");
    para.className = "inputy";
   
    let para2 = document.createElement("input");
    para2.className = "inputy";

    let para3 = document.createElement("input");
    para3.type = "date";
    para3.className = "inputy";

    let para4 = document.createElement("input");
    para4.className = "inputy";

    let addButton = document.createElement("button");
    addButton.textContent = "add";

    let cancelButton = document.createElement("button");
    cancelButton.textContent = "cancel"; 

    let addTaskDiv = document.createElement("div");
    addTaskDiv.className = "addTaskDiv";

    addButton.addEventListener("click", function(){
        let currentProject = Master.getCurrentMasterElement();
        console.log(para3.value);
        let newTodo = new Todo(para.value, para2.value, para3.value, para4.value);
        currentProject.addTodo(newTodo);
        refreshScreen();
        populateTodos(currentProject);
    });

    cancelButton.addEventListener("click", function(){
        closeTodoForm();
    });
    

    addTaskDiv.appendChild(para);
    addTaskDiv.appendChild(para2);
    addTaskDiv.appendChild(para3);
    addTaskDiv.appendChild(para4);
    addTaskDiv.appendChild(addButton);
    addTaskDiv.appendChild(cancelButton);

    todosArea.prepend(addTaskDiv);
}

function closeTodoForm(){
    todosArea.firstChild.remove();
}

function showAllProjects(){
    refreshScreen();
    removeAddTaskButton();
    for(const project of Master.getMaster()){
        populateTodos(project);
    }
}


function loadOtherProjectsForSelectBox(selectOptions){

    let checkCurrentValue = selectOptions.firstChild.value;

    for(const project of Master.getMaster()){
        if(checkCurrentValue !== project.name){
            let opt = document.createElement("option");
            opt.value = project.name;
            opt.textContent = project.name;
            selectOptions.appendChild(opt);
        }
    }

}

function changeProject(parentDiv, oldProject){
    for(const project of Master.getMaster()){
        if(project.name == parentDiv.querySelector("select").value){
            project.addTodo(oldProject.Todo[parentDiv.id]);
            oldProject.removeTodo(parentDiv.id);
            if(checkForAddTaskButton()){

                refreshScreen();
                populateTodos(oldProject);

            } else{
                showAllProjects();
            }
        }
    }
}

function removeAddTaskButton(){
    if(checkForAddTaskButton()){
        addTaskArea.firstChild.remove();
    }
}

function checkForAddTaskButton(){
    if(addTaskArea.firstChild){
        return true;
    }
        return false;
}



