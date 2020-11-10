
class TaskNode {
    constructor(task, parentTask, subtasks) {
        this.id = task.id;
        this.name = task.name;
        this.completed = task.completed;
        this.dates = task.dates;
        this.completionDate = task.completionDate;
        this.parentTask = parentTask;
        this.subtasks = subtasks;
    }

    addSubtask(task) {
        this.subtasks.push(new TaskNode(task, this, null));
    }

    handleTask(id, command, payload) {
        var task = this;
        if(id !== null) {
            task = task.subtasks.find(elem => this.id === elem.id);
        }

        switch(command) {
            case 'TOGGLE':
                task.completed = !task.completed;
                break;
            case 'EDIT':
                task.name = payload;
                break;
            case 'DELETE':
                delete task;
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