<template>
    <div>
        <button class="success rounded" @click="toggleNew">Create new task</button>
        <div class="taskgrid" v-if="!isNew">
            <!-- <button class="success ico">plus</button> -->
            <div class="item" v-for="task in tasks" :key="task.id">
                <task-page :id="task.id"/>
            </div>
        </div>
        <div id="new" v-else>
            <form @submit.prevent="createTask">
                <button type="submit" class="success ico block">tick</button>
                <input v-model="taskName" placeholder="Task name"/>
                <div id="list-control">
                    <input v-model="subtaskText" placeholder="Add new item"/>
                    <button type="button" class="success ico" @click="addSubtask">add</button>
                </div>
            </form>
            <ul>
                <li v-for="subtask in subtasks" :key="subtask.id">
                    {{ subtask.task }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import TaskPage from './TaskPage'
export default {
    data: () => ({
        taskName: "",
        subtaskText: "",
        subtasks: [],
        isNew: false,
        newId: 1/* ,
		isEditing: false */
	}),
    components: {
        TaskPage
    },
    created() {
        if(!this.$store.getters.getTasks.length) {
			this.$store.dispatch('getTasksFromDB');
		}
    },
    computed: {
        tasks() {
            return this.$store.getters.getTasks
        }
    },
    methods: {
        toggleNew() {
            this.isNew = !this.isNew;
        },
        createTask() {
            this.$store.dispatch("addTask", {name: this.taskName, subtasks: this.subtasks});
            this.$store.dispatch("getTasksFromDB");
            this.toggleNew();
        },
        reset() {
            this.subtaskText = "";
        },
        addSubtask() {
            var subtask = { 
                task: this.subtaskText,
                id: this.newId,
                completed: false
            };

            this.subtasks.push(subtask);
            this.newId++;
            this.reset();
        },
        deleteSubtask(id) {
            var index = this.subtasks.findIndex(elem => elem.id === id);
            this.subtasks.splice(index, 1);
        }
    }
}
</script>

<style scoped>
    .taskgrid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 1fr;
        gap: 10px;
        margin-left: 20%;
    }

    .item {
        display: grid;
        justify-content: center;
        background-color: white;

    }

    .rounded {
        border-radius: 1em;
    }

    #new {
        margin-left: 25%;
        background-color: white;
        width: 50%;
    }

    .block {
        display: block;
        margin-left: 45%;
    }

    #list-control {
        margin-top: 2rem;
        padding-bottom: 0.5rem;
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
    }

    li {
        list-style: square;
        margin-left: 2em;
    }
</style>