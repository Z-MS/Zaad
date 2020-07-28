import find from '../../utils/find'
import DateTime from '../../utils/DateTime';
import db from '../../db/db'

export default {
    state: {
        projects: [
            {
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
                taskIDs: /* Array of task IDs */["1", "2"] // editable
            },
            {
                id: "2",
                name: "Proj2",
                description: "Project manager2",
                notes: "notes and stuff", // probably make this an array
                completed: false,
                dates: {
                    startDate: "06-4-2020",
                    expCompletionDate: "TBD"
                },
                images: [],
                taskIDs: /* Array of task IDs */["3", "4"]
            }
        ]
    },
    getters: {
        getProjects: state => state.projects,
        getProject: state => id => {
            return find.findItem(state.projects, id)
            // return state.projects.find(elem => elem.id === id);
        }
    },
    mutations: {
        async ADD_PROJECT(state, payload) {
            var [currentDate] = DateTime.getDateTime();
            var newProject = {
                id: payload.id, // constant
                name: payload.projectName, // editable
                description: payload.description, // editable
                notes: payload.notes, // editable
                completed: false, // toggleable
                dates: {
                    startDate: currentDate, // constant
                    expCompletionDate: "TBD" // editable if completionStatus is false - of true, template should display 'Completion date' instead of 'Expected comp...'
                },
                images: payload.images, // editable
                taskIDs: payload.tasks/* Array of task IDs */ // editable
            }

            await db.addItem('Projects', newProject);
        },
        EDIT_PROJECT(state, payload) {
            // project name, description,notes
            var project = find.findItem(state.projects, payload.id);
            switch(payload.field) {
                case 'name': 
                    project.name = payload.content;
                    break;
                case 'description':
                    project.description = payload.content;
                    break;
                case 'notes':
                    project.notes = payload.content;
            }
        },
        async DELETE_PROJECT(state, payload) {
            await db.deleteItem('Projects', payload);
        },
        COMPLETE_PROJECT(state, payload) {
            var project = state.projects.find(elem => elem.id === payload.id);
            project.completed = !project.completed; 
        }
    },
    actions: {
        addProject: (context, payload) => {
            context.commit("ADD_PROJECT", payload);
        },
        editProject: (context, payload) => {
            context.commit("EDIT_PROJECT", payload);
        },
        deleteProject: (context, payload) => {
            context.commit("DELETE_PROJECT", payload);
        },
        completeProject: (context, payload) => {
            context.commit("COMPLETE_PROJECT", payload);
        },
        async getProjectsFromDB() {
            await db.getItems('Projects');
        }

    }
}
/* 
    
    [
        {
            name: "Proj1",
            description: "Project manager",
            notes: "notes",
            completionLevel: percentage(gotten from number of completed tasks),
            completionStatus: Boolean(should),
            dates: {
                startDate: 77,
                expCompletionDate: 99
            },
            images: optional,
            
        }
    ]
    subtask component should emit edited and completed events to Tasks, which will in turn commit the data to the store
     */