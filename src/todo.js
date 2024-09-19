export default class Todo{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        //this.dueDate = new Date();
        this.dueDate = dueDate;
        this.priority =priority;
    }
}
