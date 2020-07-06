<template>
    <div class="container">
        <button class="success">Create a new project</button>
        <div class="grid">
            <div @click="$router.push({name: 'ProjectPage', params: { id: project.id }})" class="item" v-for="project in projects" :key="project.id">
                <div class="projectHead">
                    <h1>{{ project.name }}</h1><span>70%</span>
                    <p>{{ project.description }}</p>
                    
                </div>
                <ul v-for="task in tasks(project.taskIDs)" :key="task.id">
                    <li>{{ task.name }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
// import ProjectPage from './ProjectPage'

export default {
    data: () => ({
        isEditing: false
    }),
    /* components: {
        ProjectPage
    } ,*/
    computed: {
        projects() {
            return this.$store.getters.getProjects
        }
    },
    methods: {
        tasks(taskIDs) {
            return this.$store.getters.getTasks(taskIDs)
        }
    }
}
</script>

<style scoped>
    * {
    box-sizing: border-box;
    }

    .grid {
        width: 65%;
        margin-left: 33%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-auto-rows: 1fr;
        gap: 10px;
    }

    .item {
        display: grid;
        background-color: white;
        position: relative;
    }

    .projectHead {
        background-color: black;
    }
    
    .projectHead > p {
        text-align: center;
        color: rgb(83, 97, 126);
    }

    .projectHead > span {
        position: absolute;
        border: 1px solid white;
        right: 0px;
        color: wheat;
    }

    h1 {
        display: inline;
        color: white;
    }

</style>