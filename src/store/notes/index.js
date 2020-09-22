import snippet from '../../utils/snippet';
import DateTime from '../../utils/DateTime';
import id from '../../utils/idgen';
import db from '../../db/db';

export default {
    state: {
        
        notes:  [/*
            {
                id: '0',
                noteText: "Fries is delicious",
                excerpt: "Beans is...",
                date: "12-3-2019"
            } ,
            {
                id: '1',
                noteText: "Beans is delicious, rice is also good. Fish and chips",
                excerpt: "Beans is delicious, rice...",
                date: "12-3-2020"
            } */
        ] 
    },
    mutations: {
        async ADD_NOTE(state, payload) {
            var [currentDate] = DateTime.getDateTime();
            // add a snippet of the note to randomly generated characters
            var idPrefix = id.generate();

            var newNote = {
                id: idPrefix,
                noteText: payload.noteText,
                excerpt: snippet.snip(payload.noteText),
                date: currentDate,
                tag: payload.tag
            }

            await db.addItem('Notes', newNote);

        },
        async DELETE_NOTE(state, payload) {
            await db.deleteItem('Notes', payload); 
        },
        async EDIT_NOTE(state, payload) {
            payload.excerpt = snippet.snip(payload.text);
        
            await db.editItem('Notes', payload.id, (data) => {
                data.noteText = payload.text;
                data.excerpt = payload.excerpt;
            });
        }
    },
    actions: {
        addNote: (context, payload) => {
            context.commit("ADD_NOTE", payload)
        },
        deleteNote(context, payload) {
            context.commit("DELETE_NOTE", payload);
        },
        editNote: (context, payload) => {
            context.commit("EDIT_NOTE", payload)
        },
        async getNotesFromDB(context) {
            var notes = await db.getItems('Notes');
            context.state.notes = notes;
        }
    },
    getters: {
        getNotes(state) {
            return state.notes;
        },
        getNote: (state) => (id) => {
            return state.notes.find(elem => elem.id === id)
        }
    }
}