import Finder from '../../utils/finder'
import DateTime from '../../utils/DateTime';
import db from '../../db/db'
import pNode from '../../utils/ProjectNode';

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
                description: "Project manager for other stuff",
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
        getProjects: (state) => {

            return state.projects;
        },
        getProject: state => id => {
            return Finder.findItem(state.projects, 'id', id);
            // return state.projects.find(elem => elem.id === id);
        }
    },
    actions: {
        async addProject(context, payload) {
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
        async editProject(context, payload) {
            // project name, description,notes
            var project = Finder.findItem(context.state.projects, 'id', payload.id);
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
        async deleteProject (context, payload) {
            await db.deleteItem('Projects', payload);
        },
        completeProject: (context, payload) => {
            var project = context.state.projects.find(elem => elem.id === payload.id);
            project.completed = !project.completed;
        },
        async getProjectsFromDB() {
            await db.getItems('Projects');
            console.log(pNode);
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