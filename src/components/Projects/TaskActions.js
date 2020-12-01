import id from '../../utils/idgen';

export default {
	methods: {
		createTask(taskName, subtasks, index) {
			this.$store.dispatch("addTask", {
                name: taskName, 
                subtasks: subtasks,
                index: index
            }); 
            this.$store.dispatch("getTasksFromDB");
		},
		createSubtask(parentTaskID, subtaskText) {
			const idPrefix = id.generate();
            this.$store.dispatch("handleTask", {
                taskId: parentTaskID, 
                subtask:  { id: idPrefix, name: subtaskText },
                command: 'ADD_SUBTASK' 
            });
            this.$store.dispatch("getTasksFromDB");
		},
		toggleItem(item) {
			item = !item;
			return item;
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