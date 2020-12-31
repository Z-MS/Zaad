import DateTime from '../../utils/DateTime';
import id from '../../utils/idgen';
import db from '../../db/db';
import TaskNode from '../../utils/TaskNode';

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

        ],
        filteredTasks: []
    },
    getters: {
        getTask: (state) => (id) => state.tasks.find(elem => elem.id === id),
        getFilteredTask: (state) => (id) => state.filteredTasks.find(elem => elem.id === id),
        getTasks: (state) => state.tasks,
        getFilteredTasks: (state) => state.filteredTasks
    },  
    actions: {
        async addTask (context, payload) {
            var [currentDate] = DateTime.getDateTime();
            var taskID = payload.id ? payload.id : id.generate();
            payload.subtasks.forEach(subtask => subtask.id = id.generate());

            if(payload.command) {
                payload.id = taskID;
                context.dispatch('handleProject', payload);
            }

            var newTask = new TaskNode({
                id: taskID,
                name: payload.name,
                completed: false,
                dateCreated: currentDate,
                completionDate: ''  // should be an array of objects
            }, 
            null, payload.subtasks, payload.index);  
            await db.addItem('Tasks', newTask); 
        },
        async handleTask(context, payload) {
            await db.editItem('Tasks', payload.taskID, (task) => {
                // the task object must be re-linked to TaskNode since IndexedDB removes that link
                task = new TaskNode(task, task.parentTask, task.subtasks);
                task.handleTask(payload);
            });
        },
        async deleteTask(context, payload) {
            if(payload.command) {
                context.dispatch('handleProject', payload);
            }
            await db.deleteItem('Tasks', payload.id);
        },
        /* async getTasksFromDB(context, payload) {
            const tasks = await db.getItems('Tasks', payload.index, payload.indexVal);
            context.state.tasks = tasks; 
        } ,
        async filterTasks(context, payload) {
            context.state.filteredTasks = [];
            var fetchedTasks = await db.getItems('Tasks', 'index', payload.indexVal);

            for(const id of payload.taskIDs) {
                for(let i = 0; i < fetchedTasks.length; i++) {
                    let elem = fetchedTasks[i];
                    if(elem.id === id) 
                        context.state.filteredTasks.push(elem);
                }
            }
        },*/
        setTasks(context, payload) {
            context.state.tasks = payload;
        },
        setFilteredTasks(context, payload) {
            context.state.filteredTasks = payload;
        }
    }
}
/* TASK: Create a utility for generating or at least incrementing IDs(if created manually)
OR get a library to do it
*/ 