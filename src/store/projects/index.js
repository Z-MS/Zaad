import Finder from '../../utils/finder'
import DateTime from '../../utils/DateTime';
import db from '../../db/db'
import pNode from '../../utils/ProjectNode';
import id from '../../utils/idgen';

export default {
    state: {
        projects: [
            {
                id: "1", // constant
                name: "My project", // editable
                description: "Project manager", // editable
                noteIDs: [], // editable
                completed: false, // toggleable
                dates: {
                    startDate: "06-4-2020", // constant
                    expCompletionDate: "TBD" // editable if completionStatus is false - if true, template should display 'Completion date' instead of 'Expected comp...'
                },
                images: [], // editable
                taskIDs: /* Array of task IDs */[] // editable
            },
            {
                id: "2",
                name: "Proj2",
                description: "Project manager for other stuff",
                noteIDs: [], // probably make this an array
                completed: false,
                dates: {
                    startDate: "06-4-2020",
                    expCompletionDate: "TBD"
                },
                images: [],
                taskIDs: /* Array of task IDs */[]
            }
        ]
    },
    getters: {
        getProjects: state => state.projects,
        getProject: state => id => {
            return Finder.findItem(state.projects, 'id', id);
            // return state.projects.find(elem => elem.id === id);
        }
    },
    actions: {
        async addProject(context, payload) {
            var [currentDate] = DateTime.getDateTime();
            var projectID = payload.id ? payload.id : id.generate();

            var newProject = new pNode({
                id: projectID, // constant
                name: payload.name, // editable
                description: payload.description, // editable
                completed: false, // toggleable
                dates: {
                    startDate: currentDate, // constant
                    completionDate: "TBD" // editable if completionStatus is false - of true, template should display 'Completion date' instead of 'Expected comp...'
                },
                // images: payload.images, // editable
                noteIDs: [], // editable
                taskIDs: []/* Array of task IDs */ // editable
            }, null, payload.phases);

            await db.addItem('Projects', newProject);
        },
        async handleProject(context, payload) {
            await db.editItem('Projects', payload.projectID, (project) => {
                project = new pNode(project, project.parentProject, project.phases);
                project.handleProject(payload);
            });
        },
        async deleteProject (context, payload) {
            // DELETE PROJECT NOTES
            payload.noteIDs.forEach(async function(noteID) {
                await db.deleteItem('Notes', noteID);
            });
            // DELETE PROJECT TASKS
            payload.taskIDs.forEach(async function(taskID) {
                await db.deleteItem('Tasks', taskID);
            });
        },
        completeProject: (context, payload) => {
            var project = context.state.projects.find(elem => elem.id === payload.id);
            project.completed = !project.completed;
        },
        async getProjectsFromDB() {
            await db.getItems('Projects');
        },
        setProjects(context, payload) {
            context.state.projects = payload;
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