import "./style.css";

class Todo{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        //this.dueDate = new Date();
        this.dueDate = dueDate;
        this.priority =priority;
    }

    get name(){
        return this.title;
    }

}

class Project{
    constructor(name){
        this.name = name;
        this.projArray = [];
    }

    addTodo(todo){
        this.projArray.push(todo);
    }

    editTodo(id, editedTodo){
        let whichTodo = this.projArray[id];
        let editedTask = editedTodo;
        let counter = 0;

        for(const val in whichTodo){
            if(editedTask[counter].value !== whichTodo[val]){
                console.log("we have an edity");
            }
            counter++;
        }

    }

    get Todo(){
        return this.projArray;
    }


    removeTodo(todo){
        let indexToRemove = this.projArray.findIndex((element) => element == todo);
        this.projArray.splice(indexToRemove, 1);
        
    }

    listTodo(){
        //console.log(this.projArray);
        for(const todo of this.projArray){
            console.log(todo);
        }
    }
}


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

        testButton.addEventListener("click", function(){
            let parentDiv = this.parentElement;
            let collectionArray = parentDiv.querySelectorAll("input");
            proj.editTodo(parentDiv.id, collectionArray);
            
        });

        taskDiv.appendChild(testButton);
        mainDiv.appendChild(taskDiv);
        divId++;
        
    }

}

populateTodos(proj);