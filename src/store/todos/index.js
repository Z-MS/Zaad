import db from "../../db/db";

// import db from '../../db/db'

export default {
    state: {
        todos: [
          {
            id: '0',
            task: "Buy food",
            completed: false
          },
          {
            id: '1',
            task: "Eat beans",
            completed: false
          }
        ]
      },
      getters: {
        getTodos: state => state.todos
      },
      mutations: {
        async ADD_TODO(state, payload) { 
            var newTask = {
                id: payload.newId,
                task: payload.task,
                completed: false
            }
    
            state.todos.unshift(newTask)
        },
        async TOGGLE_TODO(state, payload) {
            var item = state.todos.find(todo => todo.id === payload);
            item.completed = !item.completed;
        },
        async EDIT_TODO(state, {text, id}) {
            var item = state.todos.find(todo => todo.id === id);
            item.task = text;
        },
        async DELETE_TODO(state, payload) {
            var index = state.todos.findIndex(todo => todo.id === payload);
            state.todos.splice(index, 1);
        }
    
      },
      actions: {
            addTodo: (context, payload) => {
                context.commit("ADD_TODO", payload)
            },
            toggleTodo: (context, payload) => {
                context.commit("TOGGLE_TODO", payload)
            },
            editTodo: (context, payload) => {
                context.commit("EDIT_TODO", payload)
            },
            deleteTodo: (context, payload) => {
                context.commit("DELETE_TODO", payload)
            },
            async getToDosFromDB(context) {
                var todos = await db.getItems('ToDos');
                context.state.todos = todos;
            }
      }
}

