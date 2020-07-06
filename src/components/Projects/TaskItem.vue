<template>
    <div>
        <span v-if="!isEditing">
            <p class="inner" :class="{completed: subtask.completed}" @click="toggleComplete(subtask.id)">{{ subtask.task }}</p>
            <button class="change" @click="toggleEdit">Edit</button>
        </span>
        <form @submit.prevent="saveChanges" v-else>
            <input type="text" v-model="newText"/>
            <button type="submit" class="success">Save</button>
            <button type="button" class="danger" @click="toggleEdit">Cancel</button>
        </form>
    </div>
</template>

<script>
export default {
    data: () => ({
        isEditing: false
    }),
    computed: {
        newText: {
            get() {
                return this.subtask.task
            },
            set(value) {
                this.$store.dispatch("editSubtask", { text: value, subTaskId: this.subtask.id, taskId: this.parentTaskID })
            }
        } 
    },
    props: {
        subtask: { type: Object, required: true },
        parentTaskID: { type: String, required: true }
    },
    methods: {
        toggleEdit() {
            this.isEditing = !this.isEditing 
        },
        saveChanges() {
            this.toggleEdit();
        },
        toggleComplete(childID) {
            this.$store.dispatch("toggleSubtask", { subTaskId: childID, taskId: this.parentTaskID })
        }
    }
}
</script>

<style scoped>
.inner {
    display: inline;
}

.completed {
    text-decoration: line-through wavy rgb(83, 82, 82);
}
</style>