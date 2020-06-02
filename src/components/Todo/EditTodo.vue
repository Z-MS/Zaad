<template>
    <form @submit.prevent="saveChanges">
        <input type="text" v-model="newText"/>

        <button type="submit" class="success">Save</button>
        <button type="button" @click="cancelEdit" class="danger">Cancel</button>    
    </form>
</template>

<script>
export default {
    
    props: {
        todoText: { required: true, type: String },
        id: { required: true, type: Number }
    },
    computed: {
        newText: {
            get() {
                return this.todoText
            },
            set(value) {
                this.$store.dispatch("editTodo", { text: value, id: this.id })
            }
        } 
    },
    methods: {
        cancelEdit() {
            this.$emit('close-edit');
        },
        saveChanges() {
            this.$emit('close-edit');
        }
    }
}
</script>


<style>
input {
    font-size: 1.20rem;
}
</style>