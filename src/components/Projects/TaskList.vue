<template>
    <div>
        <button v-if="!isNew" class="success rounded" @click="toggleNew">Create new task</button>
        <!-- Shows list of tasks -->
        <div class="taskgrid" v-if="!isNew">
            <!-- <button class="success ico">plus</button> -->
            <div class="item rounded" v-for="task in tasks" :key="task.id">
                <task-page :id="task.id" :view="'grid'"/>
            </div>
        </div>
        <!-- Opens a new form for creating new tasks -->
        <div id="new" v-else>
            <div id="form-header" class="row">
                <span id="ed">
                    <input id="name-input" class="r-space" v-show="isEditing"  v-model="taskName" placeholder="Enter task name"/>
                    <span id="task-name" class="r-space" v-show="!isEditing"> {{ taskName }}</span>
                    <span class="ico" @click="toggleEdit">&#xe905;</span>
                </span>
                <span id="cancel" class="ico" @click="toggleNew">&#xea0f;</span>
            </div>

            <!-- <form @submit.prevent="createTask"> -->
                <div id="list-items">
                    <span class="row" v-for="(subtask, index) in subtasks" :key="index">
                        <checkbox :item="subtask" @toggle="toggleComplete(index)"/>
                        <span class="ico" @click="deleteSubtask(index)">&#xea0f;</span>
                    </span>
                </div>    
                <div id="list-control">
                    <span id="add" class="ico" @click="addSubtask">add</span>
                    <input id="new-subtask" v-model="subtaskText" placeholder="Add new item" @keyup="triggerAddButton"/>
                </div>
                <button class="success block" @click="createTask">Submit</button>
            <!-- </form> -->
        </div>
    </div>
</template>

<script>
import TaskPage from './TaskPage';
import Checkbox from '../Checkbox';

export default {
    data: () => ({
        taskName: "Task name",
        subtaskText: "",
        subtasks: [],
        isNew: false,
		isEditing: false 
	}),
    components: {
        TaskPage,
        Checkbox
    },
    mounted() {
        if(!this.$store.getters.getTasks.length) {
            this.$store.dispatch('getItemsFromDB', { store: 'Tasks', index: 'index' });
		}
    },
    computed: {
        tasks() {
            return this.$store.getters.getTasks;
        }
    },
    methods: {
        resetAll() {
            this.taskName = "Task name";
            this.subtaskText = "";
            this.subtasks = [];
        },
        toggleNew() {
            this.resetAll();
            this.isNew = !this.isNew;
        },
        toggleComplete(index) {
            var item = this.subtasks[index];
            item.completed = !item.completed;
        },
        toggleEdit() {
            this.isEditing = !this.isEditing;

            // focus and select all text if user clicks the edit button for the task name
            if(this.isEditing) {
                let nameInput = document.getElementById('name-input'); 
                nameInput.style.display = "inline-block";

                nameInput.focus();
                nameInput.select();    
            }
            //reset if user leaves the task name field empty
            if(this.taskName == "")  this.taskName = "Task name";  
        },
        createTask() {
            this.$store.dispatch("addTask", {
                name: this.taskName, 
                subtasks: this.subtasks,
                index: 'regular'
            }); 
            this.$store.dispatch('getItemsFromDB', { store: 'Tasks', index: 'index' });
            this.toggleNew();
            this.resetAll();
        },
        addSubtask() {
            var subtask = { 
                name: this.subtaskText,
                completed: false
            };

            this.subtasks.push(subtask);
            this.subtaskText = "";
        },
        deleteSubtask(index) {
            // var index = this.subtasks.findIndex(elem => elem.id === id);
            this.subtasks.splice(index, 1);
        },
        triggerAddButton(event) {
            // const input = document.getElementById('new-subtask');
            // input.addEventListener("keyup", (event) => {
                // 13 is the code for the "Enter" key on the keyboard
                if(event.keyCode === 13) {
                    // Cancel the default action, if needed
                    event.preventDefault();
                    // Trigger the add button with a click
                    if(this.subtaskText !== "") {
                        this.addSubtask();
                    }
                }
            // });
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
        box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.25);
    }

    .rounded {
        border-radius: 1em;
    }

    #new {
        margin-left: 25%;
        width: 50%;
        background-color: white;
    }

    #new form {
        margin: 0 auto;
        width: 100%;
        background-color: white;   
    }

    .block {
        display: block;
        margin: 0 auto;
        font-size: 2rem;
        text-transform: uppercase;
    }

    #list-control {
        margin-top: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 0.5rem;
    }

    #list-control span.ico {
        margin-right: 1em;
        color: var(--deepblue);
    }

    #form-header {
        background-color: rgb(204, 204, 35);
    }

    .r-space {
        margin-right: 1em;
    }

    #task-name {
        display: inline-block;
        font-size: 2rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-weight: bold;
    }

    #name-input {
        margin-top: 1.2rem;
        margin-bottom: 1.2rem;        
    }

    #list-items {
        margin-top: 5%;
        margin-left: 20%;
        font-size: 1.35rem;
    }

    #list-items .ico {
        margin-right: 25%;
        padding: 0.2em;
        border: 1px solid gray;
        border-radius: 3.5em;
        background-color: red;
        color: white;
    }

    .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
    }

    #new-subtask {
        width: 50%;
    }

    #ed {
        margin: 0 auto;
    }

    #cancel {
        /*margin-top: 1em;*/
        font-size: 1.25em;
    }
</style>