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
                <p class="category">TASKS</p>
                <task-list/>
                <p class="category">NOTES</p>
                <note-list/>
            </div>
        </div>
    </div>
</template>

<script>

import TaskList from './TaskList';
import NoteList from '../Notes/NoteList';

export default {
    data: () => ({
        isEditing: false
    }),
    components: {
        TaskList,
        NoteList
    },
    props: {
        id: { type: String, required: true }
    },
    computed: {
        project() {
            return this.$store.getters.getProject(this.id)
        }
    },
    methods: {
        toggleEdit() {
            this.isEditing = !this.isEditing
        },
        saveChanges() {
            this.$store.dispatch("editProject", { id: this.id, content: this.project.name, field: "name"});
            this.toggleEdit();
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
</style>