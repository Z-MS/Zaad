import id from './idgen';

export default class TaskNode {
    constructor(task, parentTask, subtasks, index) {
        this.id = task.id;
        this.name = task.name;
        this.completed = task.completed;
        this.dates = task.dates;
        this.parentTask = parentTask;
        this.subtasks = subtasks;
        this.index = index;
    }

    get subtaskCount() {
        return this.subtasks.length;
    }

    getSubtask(id) {
        return this.subtasks.find(elem => elem.id === id);
    }

    addSubtask(task) {
        this.subtasks.push(new TaskNode(task, this, null, null));
    }

    deleteSubtask(subtaskID) {
        const index = this.subtasks.findIndex(elem => elem.id === subtaskID)
        this.subtasks.splice(index, 1);
    }

    handleTask(payload) {
        var task = this;
        if(payload.subtaskID) {
            task = this.getSubtask(payload.subtaskID);
        }

        switch(payload.command) {
            case 'ADD_SUBTASK':
                payload.subtask.id = id.generate();
                this.addSubtask(payload.subtask);
                break;
            case 'TOGGLE':
                task.completed = !task.completed;
                break;
            case 'EDIT':
                task.name = payload.name;
                break;
            case 'DELETE_SUBTASK':
                this.deleteSubtask(payload.subtaskID);
                break;
        }
    }

    static getPercentCompleted(taskArray) {
        var count = 0;

        taskArray.forEach(element => {
            if(element.completed) count++;
        });
        const percentCompleted = (count / taskArray.length) * 100;
        return percentCompleted;
    }
}

/*                  id: idPrefix,
                    name: payload.name,
                    completed: false,
                    dateCreated: currentDate,
                    completionDate: '',
                    subtasks: payload.subtasks */