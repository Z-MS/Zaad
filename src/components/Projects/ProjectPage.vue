<template>
    <div>
        <div class="grid">
            <div class="projectHead" v-if="!isEditing" @click="toggleEdit">
                <h1>{{ project.name }}</h1>
                <p>{{ project.description }}</p>
            </div>
            <form @submit.prevent="saveChanges" v-else>
                <input type="text" v-model="project.name"/>
                <input type="text" v-model="project.description"/>
                <button type="submit" class="success">Save</button>
                <button type="button" class="danger" @click="toggleEdit">Cancel</button>
            </form>
            <task-list :taskIDs="project.taskIDs"/>
        </div>
    </div>
</template>

<script>

import TaskList from './TaskList'

export default {
    data: () => ({
        isEditing: false
    }),
    components: {
        TaskList
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
        width: 65%;
        margin-left: 33%;
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

    .projectHead {
        background-color: black;
    }

    .projectHead > p {
        text-align: center;
        color: rgb(83, 97, 126);
    }

    input {
        margin: auto;
        display: block;
    }
</style>