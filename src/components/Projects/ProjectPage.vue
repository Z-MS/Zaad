<template>
    <div id="main">
        <div>
            <div class="project-head" v-if="!isEditing" @click="toggleEdit">
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
                <p class="category" @click="createTask">TASKS</p>
                    <div id="task" v-for="task in tasks" :key="task.id">
                        <task-page :id="task.id">Beans</task-page>
                    </div>
                <p class="category" @click="createNote">NOTES</p> 
                    <div>{{ notes }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import TaskPage from './TaskPage';
import id from '../../utils/idgen';

export default {
    data: () => ({
        isEditing: false
    }),
    components: {
        TaskPage
    },
    mounted() {
        
        this.$store.dispatch('filterTasks', this.project.taskIDs, 'project');
    },
    props: {
        id: { type: String, required: true }
    },
    computed: {
        project() {
            return this.$store.getters.getProject(this.id)
        },
        tasks() {
            return this.$store.getters.getFilteredTasks;
        },
        notes() {
            this.$store.dispatch('filterNotes', this.project.noteIDs);
            return this.$store.getters.getFilteredNotes;
        }
    },
    methods: {
        toggleEdit() {
            this.isEditing = !this.isEditing
        },
        saveChanges() {
            this.$store.dispatch("editProject", { id: this.id, content: this.project.name, field: "name"});
            this.toggleEdit();
        },
        createTask() {
            let taskID = id.generate();
            this.project.taskIDs.push(taskID);

            this.$store.dispatch("addTask", {
                id: taskID,
                name: "New task",
                subtasks: [{ name: "subtask", id: id.generate(), completed: false}],
                index: 'project'
            });
                      
        },
        createNote() {
            this.$store.dispatch("addNote", {
                noteText: "New note that says things about things",
                index: 'project'
            });
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
        margin: 0 auto;
        width: 35%;
    }
</style>