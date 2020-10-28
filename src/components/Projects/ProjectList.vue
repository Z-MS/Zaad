<template>
    <div class="grid">
        <div class="item" v-for="project in projects" :key="project.id">
            <div class="project-head">
                <span class="ico info-icon">radio-button2</span>
                <h1>{{ project.name }}</h1>
                <p id="description">{{ project.description }}</p>
            </div>
            <div>
                <ul>
                    <li><span class="ico">flag</span><p class="info-text">{{ project.dates.startDate }}</p>
                    <li><span class="ico">todo</span><p class="info-text">{{ project.taskIDs.length }} tasks </p></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
// import ProjectPage from './ProjectPage'

export default {
    data: () => ({
        
    }),
    components: {
    },
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
        width: 70%;
        margin-left: 25%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-auto-rows: 1fr;
        gap: 10px;
    }

    .item {
        display: grid;
        background-color: white;
        border-radius: 0.5rem;
    }


    .project-head {
        background-color: rgb(53, 51, 51);
        color: white;
    }

    .info-text {
        display: inline-block;
        margin-left: 1rem;
    }

    .info-icon {
        color: red;
    }

    #description {
        text-align: center;
    }
</style>