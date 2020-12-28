<template>
    <div id="main">
        <div class="project-head" v-if="!isEditing" @click="toggleItem(isEditing)">
            <h1>{{ project.name }}</h1>
            <p>{{ project.description }}</p>
            <p>{{ project.noteIDs.length }}</p>
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
                <p class="category" >NOTES<span class="ico" @click="reset">add</span></p>
                 
                <!-- <button class="success" @click="show('new-note')">Create new note</button> -->
                <dialog id="new-note">
                    <p>New note</p>
                    <button class="danger" @click="close('new-note')">Close</button>
                </dialog>
                <div>
                    <notes-list :toggle="creatingNote" :projectID="this.id" :noteIDs="project.noteIDs" :isProject="true" @add="createNote" @update="updateState" @toggle="reset"/>
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
        creatingNote: false,
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
        this.$store.dispatch('getItemsFromDB', { store: 'Tasks', itemIDs: this.project.taskIDs, indexVal: 'project' }); 
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
        async updateState() {
            await this.$store.dispatch('getItemsFromDB', { store: 'Projects' });
            await this.$store.dispatch('getItemsFromDB', { store: 'Notes', indexVal: 'project', itemIDs: this.project.noteIDs });
            await this.$store.dispatch('getItemsFromDB', { store: 'Tasks', itemIDs: this.project.taskIDs, indexVal: 'project' });
        },
        reset() {
            this.updateState();
            this.creatingNote = !this.creatingNote;
        },
        toggleEdit() {
            this.isEditing = !this.isEditing
        },
        saveChanges() {
            this.$store.dispatch("editProject", { id: this.id, content: this.project.name, field: "name"});
            this.toggleEdit();
        },
        createNote() {
            // add to note noteIDs
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
    #main {
        margin-left: 20%;
    }

    .project-head {
        background-color: white;
        margin-bottom: 1rem;
    }

    .project-head > p {
        margin-left: 1rem;
        padding: 0;
        color: rgb(83, 97, 126);
    }

    .project-head > h1 {
        text-align: left;
        margin-left: 1rem;
    }

    .category {
        margin: 0;
        text-align: center;
        background-color: grey;
        font-size: 2rem;
        color: var(--deepblue);
    }

    .project-content {
        display: flex;
        justify-content: space-around;
        /* background-color: white; */
    }

    .tasks {
        width: 65%;
        border: 1px solid black;
    }

    .notes {
        width: 30%;
        border: 1px solid black;
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