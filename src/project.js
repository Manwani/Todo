export default class Project{
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

                console.log(whichTodo[val]);
                whichTodo[val] = editedTask[counter].value;
            }
            counter++;
        }

    }

    get Todo(){
        return this.projArray;
    }


    removeTodo(id){
        //let indexToRemove = this.projArray.findIndex((element) => element == todo);
        this.projArray.splice(id, 1);
        
    }

    listTodo(){
        //console.log(this.projArray);
        for(const todo of this.projArray){
            console.log(todo);
        }
    }
}
