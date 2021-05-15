<template>
    <div class="background">
        <div class="list">
            <div class="sticky">
                <div class="row">
                    <p class="large" @dblclick="deleteTask">{{ task.name }}</p>
                </div>
            </div>
            <div>
                <ul v-for="subtask in task.subtasks" :key="subtask.id">
                    <li>   
                        <task-item :subtask="subtask" :parent-taskid="task.id" @update="updateState"/>
                    </li>
                </ul>
                <div id="form-controls">
                    <form id="subtask-form" @submit.prevent="addSubtask" v-show="newSubtask">
                        <input id="subtask-input" ref="subtask-input" v-model="subtaskText" type="text" placeholder="New item"/>
                    </form>
                    <span @click="toggleNewSubtask">
                        <span class="ico add-icon add-icon--list">add</span>
                        <span class="add-text">Add a new item</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import TaskItem from "./TaskItem";
// import PercentCircle from "../PercentCircle"

export default {
    data: () => ({
        circumference: 2 * Math.PI * 40,
        subtaskText: "",
        newSubtask: false

    })/* ,
    mounted() {
        this.updateState();
    } */,
    components: {
        TaskItem,
        // PercentCircle
    },
    props: {
        id: { type: String, required: true },
        isProject: { type: Boolean, required: false },
        projectID: { type: String, required: false },
        taskIDs: { type: Array, required: false }
    },
    computed: {
        task() {
            if(this.isProject) {
                return this.$store.getters.getFilteredTask(this.id);
            } else {
                return this.$store.getters.getTask(this.id);
            }
        },
        subtasks() {
            return this.task.subtasks;
        },
        getPercentCompleted() {
            const total = this.subtasks.length;
            var completedTaskCount = 0;
            this.subtasks.forEach(task => {
                if(task.completed) {
                    completedTaskCount++;
                }
            });

            var percentCompleted = (completedTaskCount / total) * 100;
            if(!Number.isInteger(percentCompleted)) {
               percentCompleted = Math.ceil(percentCompleted);
            }

            return percentCompleted;
        }
    },
    methods: {
        async updateState() {
            if(this.isProject) {
                this.$emit('update'); 
            }  else {
                await this.$store.dispatch('getItemsFromDB', { store: 'Tasks', index: 'index' });
            }  
        },
        addSubtask() {
            this.$store.dispatch('handleTask', {
                taskID: this.id, 
                subtask:  { name: this.subtaskText },
                command: 'ADD_SUBTASK' 
            });
            this.updateState();

            this.subtaskText = "";
            this.toggleNewSubtask();
        },
        deleteTask() {
            var task = { id: this.id }
            if(this.isProject) {
                task.command = 'DELETE_TASK_ID';
                task.projectID = this.projectID;
            }
            this.$store.dispatch('deleteTask', task);
            this.updateState();
        },
        toggleNewSubtask() {
            this.newSubtask = !this.newSubtask;
            if(this.newSubtask) {
                this.$nextTick(() => {
                    this.$refs['subtask-input'].focus();
                });
            }
            
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

.sticky {
    position: sticky;
    margin-bottom: 1rem;
    top: 0px;
    background-color: white;
}

.list .sticky  {
    background-color: #F3F6F9;
}
 
.row {
    display: flex;
    justify-content: space-around;
}

.background {
    background-color: white;
    /*height: 50vh;*/
	overflow: auto;
    border-radius: 1rem;
}

.large {
    /* width: 60%; */
    font-family: 'Nunito bold';
    font-size: 1.35rem;
    text-align: center;
}

.medium-text {
    font-size: 1.5rem;
}

ul {
    display: block;
    /*margin-bottom: 1rem;*/
    margin-left: 0.5rem;
    /* centre this and make the bottom reasonably spaced */
}

li {
    list-style: none;
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

#form-controls {
    margin-left: 1.6rem;
}

#subtask-input {
    margin-right: 9.5rem;
    font-size: 1.33rem;
}

.add-text {
    display: inline-block;
    margin-top: 0.5rem;
    /* margin-right: -2rem; */
    font-size: 1.15rem;
    font-weight: 500;
    color: rgb(37, 182, 37);
}

.add-icon {
    padding-right: 1rem;
    color: rgb(37, 182, 37);
}

.add-icon--list {
    margin-left: -15rem;
}

/* svg {
    width: 30%;
    height: 15vh;
}

text {
    font-size: 1.5rem;
}

.percent-ring {
    transition: 0.35s stroke-dashoffset;
    axis compensation
    transform: rotate(-90deg);
    transform-origin: 60% 50%;
} */


</style>