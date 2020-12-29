<template>
    <div class="background">
        <div v-show="view === 'grid'">
            <div class="sticky">
                <div class="row">
                    <p class="large" @dblclick="deleteTask">{{ task.name }}</p>
     
                   <percent-circle :id="task.id" :radius="40" :progress="getPercentCompleted" />
                </div>
                <form @submit.prevent="addSubtask">
                    <input v-model="subtaskText" type="text" placeholder="Enter a new item"/>
                </form>    
            </div>
            <div>
                <ul v-for="subtask in task.subtasks" :key="subtask.id">
                    <li>   
                        <task-item :subtask="subtask" :parentTaskID="task.id" @update="updateState"/>
                    </li>
                </ul>
            </div>
        </div>
        <div class="list" v-show="view === 'list'">
            <div class="sticky">
                <div class="row">
                    <p class="large" @dblclick="deleteTask">{{ task.name }}</p>
                    <p>{{ getPercentCompleted }}</p>
                </div>
            </div>
            <div>
                <ul v-for="subtask in task.subtasks" :key="subtask.id">
                    <li>   
                        <task-item :subtask="subtask" :parentTaskID="task.id" @increase-percentage="updateState"/>
                    </li>
                </ul>
                <span>Add a new item</span><span class="ico" @click="$emit('add')">add</span>
            </div>
        </div>
    </div>
</template>

<script>

import TaskItem from "./TaskItem";
import id from '../../utils/idgen';
import PercentCircle from "../PercentCircle"

export default {
    data: () => ({
        circumference: 2 * Math.PI * 40,
        subtaskText: ""
    })/* ,
    mounted() {
        this.updateState();
    } */,
    components: {
        TaskItem,
        PercentCircle
    },
    props: {
        id: { type: String, required: true },
        view: { type: String, required: true },
        isProject: { type: Boolean, required: false },
        projectID: { type: String, required: false }
    },
    computed: {
        task() {
            return this.$store.getters.getTask(this.id)
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
                await this.$store.dispatch('getItemsFromDB', { store: 'Tasks' });
            }  
        },
        addSubtask() {
            const idPrefix = id.generate();
            this.$store.dispatch('handleTask', {
                taskId: this.id, 
                subtask:  { id: idPrefix, name: this.subtaskText },
                command: 'ADD_SUBTASK' 
            });
            this.updateState();

            this.subtaskText = "";
        },
        deleteTask() {
            var task = { id: this.id }
            if(this.isProject) {
                task.command = 'DELETE_SUBTASK';
                task.projectID = this.projectID;
            }
            this.$store.dispatch('deleteTask', task);
            this.updateState();
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
    background-color: grey;
}

.row {
    display: flex;
    justify-content: space-around;
}

.item {
    display: grid;
    justify-content: center;    
}

.background {
    background-color: white;
    /*height: 50vh;*/
	overflow: auto;
    border-radius: 1rem;
}

.large {
    width: 60%;
    font-family: 'Nunito bold';
    font-size: 2em;
    text-align: center;
}

.medium-text {
    font-size: 1.5rem;
}

ul {
    margin-bottom: 1rem;
    margin-left: 1.6rem;
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