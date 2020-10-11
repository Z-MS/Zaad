<template>
    <div class="background">
        <div class="sticky">
            <div class="row">
                <p class="large">{{ task.name }}</p>
                <svg @dblclick="deleteTask">
                    <circle stroke-dasharray="0" r="40" cx="60%" cy="50%" stroke="gray" fill="none" stroke-width="5" stroke-linecap="round">
                    </circle>
                    <circle :id="task.id" class="percent-ring" 
                    :stroke-dashoffset="circumference" r="40" cx="60%" cy="50%" stroke="lime" fill="none" stroke-width="3" stroke-linecap="round">
                    </circle>
                    <text :x="shiftX" y="60">{{ getPercentCompleted }}%</text>
                </svg>
            </div>
            <form @submit.prevent="addSubtask">
                <input v-model="subtaskText" type="text" placeholder="Enter a new item"/>
            </form>    
        </div>
        <div>
            <ul v-for="subtask in task.subtasks" :key="subtask.id">
                <li>   
                    <task-item :subtask="subtask" :parentTaskID="task.id" @increase-percentage="increase"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import TaskItem from "./TaskItem";
import id from '../../utils/idgen';

export default {
    data: () => ({
        circumference: 2 * Math.PI * 40,
        subtaskText: ""
    }),
    mounted() {
        this.increase();
    },
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
        shiftX() {
            // this is to centre the text within the circle
            var x = 40; // x-position of percent text when < 100
            if(this.percent === 100) { 
                x = 31; // x-position of percent text when = 100
            }
            return x;
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
        addSubtask() {
            const idPrefix = id.generate();
            this.$store.dispatch("addSubtask", { id: this.id, subtask:  { id: idPrefix, task: this.subtaskText } 
            });
            this.$store.dispatch("getTasksFromDB");

            this.subtaskText = "";
        },
        
        getOffset() {
            var percent = this.getPercentCompleted;
            var offset = this.circumference - percent / 100 * this.circumference;
            var circle = document.getElementById(this.id);
            circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
            circle.style.strokeDashoffset = `${this.circumference}`;

            circle.style.strokeDashoffset = offset; 
        },
        async increase() {
        // for this function to run when mounted, get the task from DB
            await this.$store.dispatch("getTasksFromDB");
            this.getOffset();
        },
        deleteTask() {
            this.$store.dispatch("deleteTask", this.id);
            this.$store.dispatch("getTasksFromDB");
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
    top: 0px;
    background-color: white;
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
    font-family: 'Nunito bold';
    font-size: 2em;
    text-align: center;
}

.medium-text {
    font-size: 1.5rem;
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

svg {
    /* border: 2px solid black; */
    width: 30%;
    height: 15vh;
}

text {
    font-size: 1.5rem;
}

.percent-ring {
    transition: 0.35s stroke-dashoffset;
    /*axis compensation*/
    transform: rotate(-90deg);
    transform-origin: 60% 50%;
}


</style>