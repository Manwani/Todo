import "./style.css";
import Todo from "./todo.js";
import Project from "./project.js";
import { compareAsc } from "date-fns";
import Master from "./master.js";



let kont = new Todo("val0", "fds", "zatey", "not high");
let ppcaca = new Todo("val2", "fdssss", "datsy", "high");
let ppcaca2 = new Todo("val1", "fdssss", "datsy", "high");
let proj = new Project("Inbox");
let proj2 = new Project("Goals")

Master.addToMaster(proj);
Master.addToMaster(proj2);


proj.addTodo(kont);
proj.addTodo(ppcaca2);
proj.addTodo(ppcaca);
proj2.addTodo(kont);
//proj.removeTodo(ppcaca2);
//proj.listTodo();


let projectDiv = document.getElementById("projectBox");
let todoDiv = document.getElementById("todoBox");

function populateProjects(){
    let buttonId = 0;
    for(const project of Master.getMaster()){
            let projectButton = document.createElement("button");
            projectButton.id = buttonId;
            projectButton.textContent = project.name;
            buttonId++;

            projectButton.addEventListener("click",function(){
                refreshScreen();
                populateTodos(project);
            });

            projectDiv.appendChild(projectButton);
        }
}

    



function populateTodos(project){

    let todoArray = project.Todo;
    sortArrayByDate(todoArray);
    let divId = 0;

    for(const result of todoArray){
        
        let taskDiv = document.createElement("div");
        taskDiv.className = "divTasks"
        taskDiv.id = divId;

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
        para4.value = result["title"];

        taskDiv.appendChild(para);
        taskDiv.appendChild(para2);
        taskDiv.appendChild(para3);
        taskDiv.appendChild(para4);


        let addButton = document.createElement("button");
        addButton.textContent = "add";


        let testButton = document.createElement("button");
        testButton.textContent = "subby";

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";

        testButton.addEventListener("click", function(){
            let parentDiv = this.parentElement;
            let collectionArray = parentDiv.querySelectorAll("input");
            project.editTodo(parentDiv.id, collectionArray);
            
        });

        deleteButton.addEventListener("click", function(){
            let parentDiv = this.parentElement;
            project.removeTodo(parentDiv.id);
            parentDiv.remove();            
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
        taskDiv.appendChild(testButton);
        taskDiv.appendChild(deleteButton);
        todoDiv.appendChild(taskDiv);
        divId++;
        
    }

}

populateTodos(proj);
populateProjects();

function refreshScreen(){
    let screen = document.getElementById("todoBox");
    while(screen.firstChild){
        screen.lastChild.remove();
    }
}

function sortArrayByDate(arr){
    arr.sort((a,b) => compareAsc(a.dueDate, b.dueDate));
}