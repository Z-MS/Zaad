<template>
    <div class="background">
        <div class="taskgrid">
            <p class="large">{{ task.name }}</p>    
        </div>
        <p class="large">{{ subtaskCount }} subtask(s) completed</p>
        <ul v-for="subtask in task.subtasks" :key="subtask.id">
            <li>   
                <task-item :subtask="subtask" :parentTaskID="task.id"/>
            </li>
        </ul>
        <div><b class="medium-text">DATE CREATED:</b> <b class="date">{{ task.dateCreated }}</b></div>
    </div>
</template>

<script>

import TaskItem from "./TaskItem";
export default {

    components: {
        TaskItem
    },
    props: {
        id: { type: String, required: true }
    },
    computed: {
        task() {
            return this.$store.getters.getTask(this.id)
        },
        subtaskCount() {
            var count = 0
            this.task.subtasks.forEach(elem => {
                if(elem.completed) {
                    count++
                }
            });
            return count
        }
    }
}
</script>

<style scoped>
.taskgrid {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    gap: 10px;
    background-color: chartreuse;
}

.item {
    display: grid;
    justify-content: center;    
}

.background {
    background-color: white;
    min-height: 100vh;
	overflow: auto;
    width: 70%;
    margin-left: 30%;
}

.large {
    font-size: 2em;
    text-align: center;
}

li {
    list-style: none;
    border-bottom: 1px solid rgba(195, 195, 195, 0.5);
    font-size: 1.25rem;
}

.completed {
    text-decoration: line-through;
    color: #555;
}

.date {
    background-color: blue;
    border-radius: 0.5rem;
    color: white;
    padding: 1%;
    font-size: 1.5rem;
}

.medium-text {
    font-size: 1.5rem;
}
</style>