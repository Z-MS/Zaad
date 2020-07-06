<template>
    <div class="taskgrid">
        <div @click="$router.push({name: 'TaskPage', params: { id: task.id }})" class="item" v-for="task in tasks" :key="task.id">
            <h1>{{ task.name }}</h1>
            <p>{{ task.taskNote }}</p>
            <p>{{ task.dateCreated }}</p>
            <p>{{ task.completed }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        taskIDs: { type: Array, required: true }
    },
    computed: {
        tasks() {
            return this.$store.getters.getTasks(this.taskIDs)
        }
    }
}
</script>

<style scoped>
    .taskgrid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }

    .item {
        display: grid;
        justify-content: center;
        background-color: chartreuse;

    }
</style>