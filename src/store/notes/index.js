import snippet from '../../utils/snippet';
import DateTime from '../../utils/DateTime';

export default {
    state: {
        
        notes: [
            {
                id: '0',
                noteText: "Beans is delicious",
                excerpt: "Beans is...",
                date: "12-3-2019"
            },
            {
                id: '1',
                noteText: "Beans is delicious, rice is also good. Fish and chips",
                excerpt: "Beans is delicious, rice...",
                date: "12-3-2020"
            }
        ]
    },
    mutations: {
        ADD_NOTE: (state, payload) => {
            var [currentDate] = DateTime.getDateTime() 
            var newNote = {
                id: payload.id,
                noteText: payload.noteText,
                excerpt: snippet.snip(payload.noteText),
                date: currentDate
            }

            state.notes.push(newNote);
        },
        DELETE_NOTE: (state, payload) => {
            var index = state.notes.findIndex(elem => elem.id === payload);
            state.notes.splice(index, 1);
        },
        EDIT_NOTE: (state, payload) => {
            var note = state.notes.find(elem => elem.id === payload.id);
            note.noteText = payload.text;
            note.excerpt = snippet.snip(payload.text);
        }
    },
    actions: {
        addNote: (context, payload) => {
            context.commit("ADD_NOTE", payload)
        },
        deleteNote: (context, payload) => {
            context.commit("DELETE_NOTE", payload)
        },
        editNote: (context, payload) => {
            context.commit("EDIT_NOTE", payload)
        }
    },
    getters: {
        getNotes: state => state.notes,
        getNote: (state) => (id) => {
            return state.notes.find(elem => elem.id === id)
        }
    }
}