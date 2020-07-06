import Vue from 'vue'
import Vuex from 'vuex'
import todos from './todos'
import notes from './notes'
import projects from './projects'
import tasks from './tasks'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        todos: todos,
        notes: notes,
        projects: projects,
        tasks: tasks
    }
})
