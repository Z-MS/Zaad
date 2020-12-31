<template>
    <div id="main">
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
                    <div>
                        <input type="text" placeholder="Task name" v-model="newTask.name">
                        <ul>
                            <li v-for="(subtask, index) in newTask.subtasks" :key="index" @dblclick="deleteSubtask(index)"><checkbox :item="subtask"/></li>
                        </ul>

                        <div id="list-control">
                            <span class="ico">add</span>
                            <input type="text" placeholder="Add new item" @keyup="addSubtask" v-model="newTask.subtaskText">
                        </div>

                        <button class="danger" type="button" @click="close('new-task')">Close</button>
                        <button class="success" type="submit" @click="createTask">SUBMIT</button>
                    </div>
                        
                </dialog>
                <div id="task" v-for="task in tasks" :key="task.id">
                    <task-page :id="task.id" :view="'list'" :isProject="true" :projectID="id" @update="updateState('Tasks')"/>
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
                    <notes-list :toggle="creatingNote" :projectID="this.id" :noteIDs="project.noteIDs" :isProject="true" @update="updateState('Notes')" @toggle="reset"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TaskPage from './TaskPage';
import NotesList from '../Notes/NoteList';
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
    computed: {
        project() {
            return this.$store.getters.getProject(this.id)
        },
        tasks() {
            return this.$store.getters.getFilteredTasks;
        }
    },
    methods: {
        async updateState(store) {
            await this.$store.dispatch('getItemsFromDB', { store: 'Projects' });
            if(store === 'Notes') {
                await this.$store.dispatch('getItemsFromDB', { store: 'Notes', indexVal: 'project', itemIDs: this.project.noteIDs });
            } else {
                await this.$store.dispatch('getItemsFromDB', { store: 'Tasks', itemIDs: this.project.taskIDs, indexVal: 'project' });           
            }
        },
        reset() {
            this.updateState('Notes');
            this.creatingNote = !this.creatingNote;
        },
        toggleEdit() {
            this.isEditing = !this.isEditing
        },
        saveChanges() {
            this.$store.dispatch("editProject", { id: this.id, content: this.project.name, field: "name"});
            this.toggleEdit();
        },
        // NOTE: The following four methods are used for new tasks only. The 'TaskPage' component will handle any subsequent subtask creations
        createTask() {
            this.close('new-task');
            this.$store.dispatch('addTask', {
                name: this.newTask.name, 
                subtasks: this.newTask.subtasks,
                index: 'project',
                projectID: this.id,
                command: 'ADD_TASK_ID'
            }); 
            this.updateState('Tasks');
        },
        addSubtask(event) {
            if(event.keyCode === 13) {
                var subtask = { 
                    name: this.newTask.subtaskText,
                    completed: false
                };

            this.newTask.subtasks.push(subtask);
            this.newTask.subtaskText = "";
            }
            return;
        },
        toggleSubtask(index) {
            var item = this.newTask.subtasks[index];
            item.completed = !item.completed;
        },
        deleteSubtask(index) {
            this.newTask.subtasks.splice(index, 1);
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