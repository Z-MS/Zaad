export default class pNode {
    constructor(project, parentProject, phases) {
        this.id = project.id;
        this.name = project.name;
        this.description = project.description;
        this.dates = project.dates;
        this.completed = project.completed;
        this.parentProject = parentProject;
        this.phases = phases;
        // this.images = project.images;
        this.taskIDs = project.taskIDs;
        this.noteIDs = project.noteIDs;
    }

    addPhase(project) {
        this.phases.push(new pNode(project, this, null));
    }

    getPhase(id) {
        return this.phases.find(elem => elem.id === id);
    }

    deletePhase(phaseID) {
        const index = this.phases.findIndex(elem => elem.id === phaseID)
        this.phases.splice(index, 1);
    }
 
    deleteNote(noteID) {
        const index = this.noteIDs.findIndex(elem => elem === noteID);
        this.noteIDs.splice(index, 1);
    }

    deleteTask(taskID) {
        const index = this.taskIDs.findIndex(elem => elem === taskID)
        this.taskIDs.splice(index, 1);
    }

    handleProject(payload) {
        var project = this;
        if(payload.phaseID) {
            project = this.getPhase(payload.phaseID);
        }

        switch(payload.command) {
            case 'ADD_PHASE':
                this.addPhase(payload.phase);
                break;
            case 'ADD_NOTE_ID':
                project.noteIDs.push(payload.id);
                break;
            case 'DELETE_NOTE_ID':
                this.deleteNote(payload.id);
                break;   
            case 'ADD_TASK_ID':
                project.taskIDs.push(payload.id);
                break;
            case 'DELETE_TASK_ID':
                this.deleteTask(payload.id);
                break;
            case 'TOGGLE':
                project.completed = !project.completed;
                break;
            case 'EDIT':
                project.name = payload.name;
                break;
            case 'DELETE_PHASE':
                this.deletePhase(payload.phaseID);
                break;
        }
    }
}
/* {
    id: "1", // constant
    name: "My project", // editable
    description: "Project manager", // editable
    notes: "notes", // editable
    completed: false, // toggleable
    dates: {
        startDate: "06-4-2020", // constant
        expCompletionDate: "TBD" // editable if completionStatus is false - if true, template should display 'Completion date' instead of 'Expected comp...'
    },
    images: [], // editable
    taskIDs: /* Array of task IDs["1", "2"] // editable 
}
*/