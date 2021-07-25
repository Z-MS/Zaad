import Vue from 'vue'
import Vuex from 'vuex'
import todos from './todos'
import notes from './notes'
import projects from './projects'
import tasks from './tasks'
import db from '../db/db'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
    getters: {},
    mutations: {},
    actions: {
        async getItemFromDB(context, payload) {
            const { store, id, indexVal } = payload;
            const item = await db.getItem(store, { id, indexVal });
            return item
        },
        async getItemsFromDB(context, payload) {
            const { store, indexVal  } = payload;
            const items = await db.getItems(store, { indexVal });
            return items;
        }
    },
    modules: {
        todos: todos,
        notes: notes,
        projects: projects,
        tasks: tasks
    }
})
