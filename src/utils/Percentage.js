export default {
	calcPercentage(arr) {
		var totalLength = arr.length;
		var completedCount = 0;

		arr.forEach(task => {
			if(task.completed) {
				completedCount++;
			}
		})

		var percentCompleted = (completedCount / totalLength) * 100;

        if(!Number.isInteger(percentCompleted)) {
            percentCompleted = Math.ceil(percentCompleted);
        }

        return percentCompleted;
	}
}