<template>
    <div id="main">
        <div>
            <div class="project-head" v-if="!isEditing" @click="toggleItem(isEditing)">
                <h1>{{ project.name }}</h1>
                <p>{{ project.description }}</p>
            </div>
            <form @submit.prevent="saveChanges" v-else>
                <input type="text" v-model="project.name"/>
                <input type="text" v-model="project.description"/>
                <button type="submit" class="success">Save</button>
                <button type="button" class="danger" @click="toggleEdit">Cancel</button>
            </form>
            <div class="project-content">
                <div class="tasks">
                    <p class="category">TASKS</p>
                    <button class="success" @click="show('new-task')">Create new task</button>
                        <dialog id="new-task">
                            <p>New task</p>
                            <form @submit.prevent="createTask(newTask.taskName, newTask.subtasks, newTask.index)">
                                <input type="text" placeholder="Task name" v-model="newTask.name">
                                <ul>
                                    <li v-for="subtask in newTask.subtasks" :key="subtask.id"><checkbox :item="subtask"/></li>
                                </ul>
                                <span class="ico">add</span>
                                <input type="text" placeholder="Add new item" @keyup="addSubtask" v-model="newTask.subtaskText">
                            </form>
                            <button class="danger" @click="close('new-task')">Close</button>
                        </dialog>
                    <div id="task" v-for="task in tasks" :key="task.id">
                        <task-page :id="task.id" :view="'list'" @add="createSubtask(task.id, 'sweet')"/>
                    </div>
                </div>
                <div class="notes">
                    <p class="category">NOTES</p> 
                    <button class="success" @click="show('new-note')">Create new note</button>
                    <dialog id="new-note">
                        <p>New note</p>
                        <button class="danger" @click="close('new-note')">Close</button>
                    </dialog>
                    <div>
                        <notes-list :noteIDs="project.noteIDs" :indexVal="project"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TaskPage from './TaskPage';
import NotesList from '../Notes/NoteList';
import id from '../../utils/idgen';
import TaskActions from './TaskActions';
import Checkbox from '../Checkbox';

export default {
    data: () => ({
        isEditing: false,
        newTask: { subtasks: [] } /* create properties taskName, subtasks and index so I can easily use the createTask
        function from the mixin */
    }),
    components: {
        TaskPage, Checkbox, NotesList
    },
    props: {
        id: { type: String, required: true }
    },
    mounted() {
        if(!this.$store.getters.getFilteredTasks.length) {
            this.$store.dispatch('getItemsFromDB', { store: 'Tasks', itemIDs: this.project.taskIDs, indexVal: 'project' });
        } 
    },
    mixins: [TaskActions],
    computed: {
        project() {
            return this.$store.getters.getProject(this.id)
        },
        tasks() {
            return this.$store.getters.getFilteredTasks;
        }
    },
    methods: {
        // async updateState() {},
        toggleEdit() {
            this.isEditing = !this.isEditing
        },
        saveChanges() {
            this.$store.dispatch("editProject", { id: this.id, content: this.project.name, field: "name"});
            this.toggleEdit();
        },
        createNote() {
            this.$store.dispatch("addNote", {
                noteText: "New note that says things about things",
                index: 'project'
            });
        },
        addSubtask(event) { // This is different from 'createSubtask' in the mixin as it does not push the subtask to the DB
            if(event.keyCode === 13) {
                var subtask = { 
                    name: this.newTask.subtaskText,
                    id: id.generate(),
                    completed: false
                };

            this.newTask.subtasks.push(subtask);
            this.newTask.subtaskText = "";
            }
            return;
        },
        show(id) {
			var diag = document.getElementById(id);
			diag.showModal();
		}, 
		close(id) {
			var diag = document.getElementById(id);
			diag.close();
		}
    }
    
}
</script>

<style scoped>
    .grid {
        display: grid;
        width: 80%;
        margin-left: 20%;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 10px;
        background-color: wheat;
    }

    .item {
        display: grid;
        justify-content: center;
        background-color: white;
        
    }

    .one {
        grid-column: span 2
    }

    /* #main {
        min-height: 100vh;
    } */

    .project-head {
        background-color: white;
    }

    .project-head > p {
        margin: 0;
        padding: 0;
        text-align: center;
        color: rgb(83, 97, 126);
    }

    .category {
        width: 80%;
        padding-top: 3rem;
        padding-left: 50%;
        font-size: 2rem;
        color: var(--deepblue);
    }

    .project-content {
        background-color: white;
    }

    input {
        margin: auto;
        display: block;
    }

    #task {
        margin-left: 20%;
        width: 70%;
    }

    .background {
        border-radius: 0;
    }
</style>