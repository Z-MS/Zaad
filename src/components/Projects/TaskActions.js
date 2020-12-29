import id from '../../utils/idgen';

export default {
	methods: {
		createTask(taskName, subtasks, itemIDs) {
			this.$store.dispatch('addTask', {
                name: taskName, 
                subtasks: subtasks,
                index: 'index'
            }); 
            this.$store.dispatch('getItemsFromDB', { store: 'Tasks', index: 'index', indexVal: 'project', itemIDs: itemIDs });
		},
		createSubtask(parentTaskID, subtaskText, itemIDs) {
			const idPrefix = id.generate();
            this.$store.dispatch('handleTask', {
                taskId: parentTaskID, 
                subtask:  { id: idPrefix, name: subtaskText },
                command: 'ADD_SUBTASK' 
            });
            this.$store.dispatch('getItemsFromDB', { store: 'Tasks', index: 'index', indexVal: 'project', itemIDs: itemIDs });
		},
		getPercentCompleted(task) {
            const total = task.subtasks.length;
            var completedTaskCount = 0;
            task.subtasks.forEach(item => {
                if(item.completed) {
                    completedTaskCount++;
                }
            });

            var percentCompleted = (completedTaskCount / total) * 100;
            if(!Number.isInteger(percentCompleted)) {
               percentCompleted = Math.ceil(percentCompleted);
            }

            return percentCompleted;
        }
	}
}