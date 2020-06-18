<template>
    <div>
        <span v-if="!isEditing" class="task" :class="{completed: completed}">
            <p @click="toggleTodo(id)">{{ task }}</p>
            <button class="change" @click="toggleEdit">Edit</button>
        </span> 
      
        <edit-todo :todo-text="task" :id="id" v-else @close-edit="toggleEdit"/>
    </div>
</template>

<script>
import EditTodo from './EditTodo';

export default {
    name: 'TodoItem',
    components: {
        EditTodo
    },
    data: () => ({
        isEditing: false
    }),
    props: {
        task: { required: true, type: String },
        id: { required: true, type: Number },
        completed: { required: true, type: Boolean }
    },
    methods: {
        toggleEdit() {
            this.isEditing = !this.isEditing;
        },
        toggleTodo(id) {
            this.$store.dispatch("toggleTodo", id);
        }   
    }
}
</script>

<style scoped>

.tasks {
    padding-left: 1rem;
}

.task {
    margin-bottom: 0.5rem;
}

.task:hover {
    cursor: pointer;
}

.completed {
    text-decoration: line-through;
    color: #555;
}


p {
    display: inline;
}

</style>
