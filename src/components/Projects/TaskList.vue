<template>
    <div class="taskgrid">
        <div class="item" v-for="task in tasks" :key="task.id">
            <!-- <p>{{ task.dateCreated }}</p>
            <p>{{ task.completed }}</p> -->
            <task-page :id="task.id"/>
        </div>
    </div>
</template>

<script>
import TaskPage from './TaskPage'
export default {
    components: {
        TaskPage
    },
    computed: {
        tasks() {
            return this.$store.getters.getTasks
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

    }
</style>