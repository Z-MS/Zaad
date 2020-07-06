<template>
    <div class="container">
        <form @submit.prevent="addTodo">
            <input class="todo-input" type="text" placeholder="Enter a new task" v-model="task"/>
        </form>
        <ul>
            <li v-for="todo in todos"  :key="todo.id"  @dblclick="deleteTodo(todo.id)">
                <todo-item :task="todo.task" :completed="todo.completed" :id="todo.id"/>
            </li>
        </ul>
        <!-- <p> {{ dato }} </p> -->
    </div>
</template>

<script>
import TodoItem from './TodoItem';


export default {
    data: () => ({
        task: "",
        newId: 3,
        completed: false,
    }),
    props: {
        methodList: { type: Object,  required: false }
    },
    components: {
        TodoItem
    },
    computed: {
        todos() {
            var dataStore = this.$store.getters.getTodos;
            if(this.methodList) {
                dataStore = this.$store.getters[this.methodList.dataGetter]
            }
            return dataStore
        }
    },
    methods: {
        addTodo() {
            this.$store.dispatch("addTodo", { newId: String(this.newId), task: this.task, completed: this.completed });
            this.newId++;
            this.task = "";
            this.completed = false;
        }/* ,
        toggleTodo: function(id) {
            this.$store.dispatch("toggleTodo", id);
        } */,
        deleteTodo(id) {
            this.$store.dispatch("deleteTodo", id);
        }
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.container {
    width: 65%;
    margin-left: 33%;
    background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.25);
}

.todo-input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1.25rem;
    outline: none;
    border-radius: 0.25rem;
    border-style: none;
    border: solid 1px lightgray;
    box-sizing: border-box;
}

.completed {
    text-decoration: line-through;
    color: #555;
}

li {
    list-style: none;
    border-bottom: 1px solid rgba(195, 195, 195, 0.5);
    font-size: 1.25rem;
}
</style>