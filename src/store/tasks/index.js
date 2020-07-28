import Find from '../../utils/find'
import db from '../../db/db';
import DateTime from '../../utils/DateTime';

export default {
    state: {
        tasks: [
            {   
                id: '1', // constant
                name: 'Tasko', // editable
                taskNote: 'dk', // editable
                completed: true, // toggleable (if that's even a word :-) )
                dateCreated: '12-3-2010', // constant
                completionDate: '',
                subtasks: [                 // editable
                    {
                        task: 'Subbo', // editable
                        id: '1', // constant
                        completed: true // toggleable
                    },
                    {
                        task: 'Sub and task', // editable
                        id: '3', // constant
                        completed: true // toggleable
                    },
                    {
                        task: 'bbo', // editable
                        id: '4', // constant
                        completed: false // toggleable
                    },
                    {
                        task: 'Surfboard', // editable
                        id: '5', // constant
                        completed: true // toggleable
                    }
                ]
            },
            {   
                id: '2', // constant
                name: 'eTasko', // editable
                taskNote: 'dk', // editable
                completed: true, // toggleable (if that's even a word :-) )
                dateCreated: '12-3-2010', // constant
                completionDate: '',
                subtasks: [                 // editable
                    {
                        task: 'Subbo', // editable
                        id: '1', // constant
                        completed: true // toggleable
                    }
                ]
            },
            {   
                id: '4', // constant
                name: 'Task4', // editable
                taskNote: 'dk', // editable
                completed: true, // toggleable (if that's even a word :-) )
                dateCreated: '12-3-2010', // constant
                completionDate: '',
                subtasks: [                 // editable
                    {
                        task: 'Subbo', // editable
                        id: '1', // constant
                        completed: true // toggleable
                    }
                ]
            },
            {   
                id: '3', // constant
                name: 'Task3', // editable
                taskNote: 'dk', // editable
                completed: true, // toggleable (if that's even a word :-) )
                dateCreated: '12-3-2010', // constant
                completionDate: '',
                subtasks: [                 // editable
                    {
                        task: 'Subbo', // editable
                        id: '1', // constant
                        completed: true // toggleable
                    }
                ]
            }

        ]
      },
      getters: {
        getTask: (state) => (id) => {
            return Find.findItem(state.tasks, id);
            // return state.tasks.find(elem => elem.id === id);
        },
        getTasks: (state) => (taskIDs) => {
            var taskArray = [];
            for(let i = 0; i < taskIDs.length; i++) {
                taskArray.push(state.tasks.find(elem => elem.id === taskIDs[i]));
            }
            return taskArray;
        },
        getFirst: (state) => state.tasks[0].subtasks
      },
      mutations: {
// Since tasks and subtasks are very similar and are coupled together, put their functionalities in the same function for now
        async ADD_TASK(state, payload) {
            var [currentDate] = DateTime.getDateTime();
            var newTask = {
                name: payload.name,
                completed: false,
                dateCreated: currentDate,
                completionDate: '',
                subtasks: payload.subtasks  // should be an array of objects
            }
    
            await db.addItem('Tasks', newTask);
        },
        async EDIT_TASK(state, payload) {
            await db.editItem('Tasks', payload.id, (data) => {
                data.name = payload.text;
            });
        },
        EDIT_SUBTASK(state, {text, subTaskId, taskId}) {
            var parentTask = Find.findItem(state.tasks, taskId);// state.tasks.find(elem => elem.id === taskId);
            var subtask = Find.findItem(parentTask.subtasks, subTaskId);// parentTask.subtasks.find(elem => elem.id === subTaskId);
            subtask.task = text;
        },
        TOGGLE_SUBTASK(state, {subTaskId, taskId}) {           
            var parentTask = Find.findItem(state.tasks, taskId);
            var subtask = Find.findItem(parentTask.subtasks, subTaskId);
            subtask.completed = !subtask.completed;
        },
        async DELETE_TASK(state, {id}) {
            await db.deleteItem('Tasks', id);
        },
        DELETE_SUBTASK(state, {subTaskId, taskId}) {
            var parentTask = Find.findItem(state.tasks, taskId);
            var index = parentTask.subtasks.findIndex(elem => elem.id === subTaskId);
            parentTask.subtasks.splice(index, 1);
        }
    
      },
      actions: {
            addTask: (context, payload) => {
                context.commit("ADD_TASK", payload)
            },
            toggleSubtask: (context, payload) => {
                context.commit("TOGGLE_SUBTASK", payload)
            },
            editTask: (context, payload) => {
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