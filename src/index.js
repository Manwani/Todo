import "./style.css";
import Todo from "./todo.js";
import Project from "./project.js";


let kont = new Todo("val0", "fds", "datey", "not high");
let ppcaca = new Todo("val2", "fdssss", "datsy", "high");
let ppcaca2 = new Todo("val1", "fdssss", "datsy", "high");
let proj = new Project("inbox");

proj.addTodo(kont);
proj.addTodo(ppcaca2);
proj.addTodo(ppcaca);
//proj.removeTodo(ppcaca2);
//proj.listTodo();

let mainDiv = document.getElementById("todoBox")


function populateTodos(project){

    let todoArray = project.Todo;
    let divId = 0;

    for(const result of todoArray){
        
        let taskDiv = document.createElement("div");
        taskDiv.className = "divTasks"
        taskDiv.id = divId;

        for(const detail in result){
            let para = document.createElement("input");
            para.className = "inputy";
            para.value = result[detail];
            taskDiv.appendChild(para);
        }

        let testButton = document.createElement("button");
        testButton.textContent = "subby";

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";

        testButton.addEventListener("click", function(){
            let parentDiv = this.parentElement;
            let collectionArray = parentDiv.querySelectorAll("input");
            proj.editTodo(parentDiv.id, collectionArray);
            
        });

        deleteButton.addEventListener("click", function(){
            let parentDiv = this.parentElement;
            proj.removeTodo(parentDiv.id);
            parentDiv.remove();            
        });

        taskDiv.appendChild(testButton);
        taskDiv.appendChild(deleteButton);
        mainDiv.appendChild(taskDiv);
        divId++;
        
    }

}

populateTodos(proj);