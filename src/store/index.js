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
        async getItemsFromDB(context, payload) {
            var items;
            var action;
            if(!payload.itemIDs) {
                // replace with context.state['storeprop']
                action = `set${payload.store}`;
                items = await db.getItems(payload.store, 'index', 'regular');
                context.dispatch(action, items);
            } else {
                // decide whether or not you'll keep filteredItems
                let filteredItems = [];
                action = `setFiltered${payload.store}`;
                items = await db.getItems(payload.store, 'index', payload.indexVal);

                for(const id of payload.itemIDs) {
                    for(let i = 0; i < items.length; i++) {
                        let elem = items[i];
                        if(elem.id === id) 
                            filteredItems.push(elem);
                    }
                }
                context.dispatch(action, filteredItems);
            }
        } // there should be a store prop in the payload obj
    },
    modules: {
        todos: todos,
        notes: notes,
        projects: projects,
        tasks: tasks
    }
})
