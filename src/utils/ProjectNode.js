export default class pNode {
    constructor(project, parentNode, childNodes) {
        this.id = project.id;
        this.name = project.name;
        this.description = project.description;
        this.dates = project.dates;
        this.completed = project.completed;
        this.parentNode = parentNode;
        this.childNodes = childNodes;
        this.images = project.images;
        this.taskIDs = project.taskIDs;
        this.noteIDs = project.noteIDs;
    }

    addPhase(project) {
        this.childNodes.push(new pNode(project, this, null));
    }

    getPhase(id) {
        return this.childNodes.find(elem => elem.id === id);
    }

    handleProject(payload) {
        console.log(payload);
    }

    deletePhase(phaseID) {
        const index = this.childNodes.findIndex(elem => elem.id === phaseID)
        this.childNodes.splice(index, 1);
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