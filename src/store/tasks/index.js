import Finder from '../../utils/finder'
import DateTime from '../../utils/DateTime';
import id from '../../utils/idgen';
import db from '../../db/db';

export default { 
    state: {

        tasks: [/* 
            {   
                id: '1', // constant
                name: 'Tasko',
                completed: true, // toggleable (if that's even a word :-) )
                dateCreated: '12-3-2010', // constant
                completionDate: '',
                subtasks: [                 // editable
                    {
                        task: 'Subbo', // editable
                        id: '1', // constant
                        completed: false // toggleable
                    },
                    {
                        task: 'Srffbo', // editable
                        id: '2', // constant
                        completed: false // toggleable
                    },
                    {
                        task: 'Suecrtr', // editable
                        id: '4', // constant
                        completed: false // toggleable
                    },{
                        task: 'Suggbo', // editable
                        id: '14', // constant
                        completed: false // toggleable
                    },{
                        task: 'Surbo', // editable
                        id: '15', // constant
                        completed: false // toggleable
                    },{
                        task: 'Surfboard', // editable
                        id: '6', // constant
                        completed: false // toggleable
                    }
                ]
            },
            {   
                id: '2', // constant
                name: 'Other task',
                completed: true, // toggleable (if that's even a word :-) )
                dateCreated: '12-3-2009', // constant
                completionDate: '',
                subtasks: [                 // editable
                    {
                        task: 'Other task', // editable
                        id: '1', // constant
                        completed: true // toggleable
                    },
                    {
                       task: 'Yet another task', // editable
                        id: '2', // constant
                        completed: true // toggleable 
                    }
                ]
            },
            {   
                id: '3', // constant
                name: 'Taskerson',
                completed: true, // toggleable (if that's even a word :-) )
                dateCreated: '12-3-2009', // constant
                completionDate: '',
                subtasks: [                 // editable
                    {
                        task: 'Other task', // editable
                        id: '1', // constant
                        completed: true // toggleable
                    },
                    {
                        task: 'Yet another task', // editable
                        id: '2', // constant
                        completed: true // toggleable 
                    }
                ]
            },
            {   
                id: '6', // constant
                name: 'Taskenator',
                completed: true, // toggleable (if that's even a word :-) )
                dateCreated: '12-3-2009', // constant
                completionDate: '',
                subtasks: [                 // editable
                    {
                        task: 'Other task', // editable
                        id: '1', // constant
                        completed: true // toggleable
                    },
                    {
                       task: 'Yet another task', // editable
                        id: '2', // constant
                        completed: true // toggleable 
                    }
                ]
            } */

        ]
      },
      getters: {
        getTask: (state) => (id) => {
            return Finder.findItem(state.tasks, id);            // return state.tasks.find(elem => elem.id === id);
        },
        getTasks: state =>  state.tasks //rewrite this function to accept args
      },
      mutations: {
// Since tasks and subtasks are very similar and are coupled together, put their functionalities in the same function for now
        async ADD_TASK(state, payload) {
            var [currentDate] = DateTime.getDateTime();
            var idPrefix = id.generate();

            var newTask = {
                id: idPrefix,
                name: payload.name,
                completed: false,
                dateCreated: currentDate,
                completionDate: '',
                subtasks: payload.subtasks  // should be an array of objects
            }
    
            await db.addItem('Tasks', newTask);
        },
        async RENAME_TASK(state, payload) {
            await db.editItem('Tasks', payload.id, (task) => {
                task.name = payload.text;
            });
        },
        async ADD_SUBTASK(state, payload) {
            await db.editItem('Tasks', payload.id, (task) => {
                task.subtasks.push(payload.subtask);
            })
        },
        async EDIT_SUBTASK(state, {text, subtaskId, taskId}) {
            await db.editItem('Tasks', taskId, (parentTask) => {
                var subtask = Finder.findItem(parentTask.subtasks, subtaskId);
                subtask.task = text;

            });
        },
        async TOGGLE_SUBTASK(state, {subtaskId, taskId}) {           
            await db.editItem('Tasks', taskId, (parentTask) => {
                var subtask = Finder.findItem(parentTask.subtasks, subtaskId);
                subtask.completed = !subtask.completed;
            });
        },
        async DELETE_TASK(state, payload) {
            await db.deleteItem('Tasks', payload);
        },
        async DELETE_SUBTASK(state, {subtaskId, taskId}) {
            await db.editItem('Tasks', taskId, (parentTask) => {
                var index = parentTask.subtasks.findIndex(elem => elem.id === subtaskId);
                parentTask.subtasks.splice(index, 1);
            });
        }
    
      },
      actions: {
            addTask: (context, payload) => {
                context.commit("ADD_TASK", payload)
            },
            addSubtask: (context, payload) => {
                context.commit("ADD_SUBTASK", payload)
            },
            toggleSubtask: (context, payload) => {
                context.commit("TOGGLE_SUBTASK", payload)
            } ,
            renameTask: (context, payload) => {
                context.commit("EDIT_TASK", payload)
            },
            editSubtask: (context, payload) => {
                context.commit("EDIT_SUBTASK", payload)
            },
            deleteTask: (context, payload) => {
                context.commit("DELETE_TASK", payload)
            },
            deleteSubtask: (context, payload) => {
                context.commit("DELETE_SUBTASK", payload)
            },
            async getTasksFromDB(context) {
                var tasks = await db.getItems('Tasks');
                context.state.tasks = tasks;
            }

      }
}
/* TASK: Create a utility for generating or at least incrementing IDs(if created manually)
OR get a library to do it
*/ 