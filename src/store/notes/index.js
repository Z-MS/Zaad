export default {
    state: {
        notes: [
            {
                id: '0',
                noteText: "Beans is delicious"
            },
            {
                id: '1',
                noteText: "Beans is delicious, rice is also good. Fish and chips"
            }
        ]
    },
    mutations: {
        ADD_NOTE: (state, payload) => {
            var newNote = {
                id: payload.id,
                noteText: payload.noteText
            }

            state.notes.push(newNote);
        },
        DELETE_NOTE: (state, payload) => {
            var index = state.notes.findIndex(elem => elem.id === payload);
            state.notes.splice(index, 1);
        }
    },
    actions: {
        addNote: (context, payload) => {
            context.commit("ADD_NOTE", payload)
        },
        deleteNote: (context, payload) => {
            context.commit("DELETE_NOTE", payload)
        }
    },
    getters: {
        getNotes: state => state.notes,
        getNote: (state) => (id) => {
            return state.notes.find(elem => elem.id === id)
        }
    }
}