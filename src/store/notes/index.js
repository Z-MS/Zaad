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
        ],
        filteredNotes: [] 
    },
    getters: {
        getNotes: (state) => state.notes,
        getNote: (state) => (id) => {
            return state.notes.find(elem => elem.id === id)
        },
        getFilteredNotes: (state) => state.filteredNotes
    },
    mutations: {
        updateNotes(state, payload) {
            var arrIndex;
            var filterStr; 
            switch(payload.action) {
                case 'NEW':
                    filterStr = payload.note.indexVal == 'regular' ? "notes" : "filteredNotes";
                    state[filterStr].push(payload.note);
                    break;
                case 'EDIT':
                    filterStr = payload.editedNote.indexVal == 'regular' ? "notes" : "filteredNotes";
                    arrIndex = state[filterStr].findIndex(note => note.id === payload.editedNote.id);
                    if(arrIndex == -1)
                        console.error(`NO ITEM FOUND AT ${arrIndex}`);
                    state[filterStr].splice(arrIndex, 1, payload.editedNote);
                    break;
                case 'DELETE':
                    filterStr = payload.indexVal == 'regular' ? "notes" : "filteredNotes";
                    arrIndex = state[filterStr].findIndex(note => note.id === payload.id);
                    state[filterStr].splice(arrIndex, 1);
                    break;
                case 'ALL':
                    filterStr = payload.indexVal == 'regular' ? "notes" : "filteredNotes";
                    state[filterStr] = payload.notes;
                    break;
            }
        },
        setNote(state, payload) {
            if(payload.indexVal == 'regular')
                state.notes.push(payload);
            else
                state.filteredNotes.push(payload)
        },
        setNotes(state, payload) {
            if(payload.indexVal == 'regular')
                state.notes = payload.notes;
            else
                state.filteredNotes = payload.notes;
        }
    },
    actions: {
        async fetchNotesFromDB(context, payload) {
            const { indexVal } = payload;
            const notes = await context.dispatch('getItemsFromDB', { store: 'Notes', indexVal });
            payload.notes = notes;
            context.commit('updateNotes', { ...payload, action: 'ALL' });
        },
        async createNote(context, payload) {
            var [currentDate] = DateTime.getDateTime();
            // add a snippet of the note to randomly generated characters
            var idPrefix = id.generate();
            if(payload.command) {
                payload.id = idPrefix;
                context.dispatch('handleProject', payload);
            }

            var note = {
                id: idPrefix,
                noteText: payload.noteText,
                excerpt: snippet.snip(payload.noteText),
                date: currentDate,
                indexVal: payload.indexVal
            }
            
            await db.addItem('Notes', note);
            context.commit('updateNotes', { note, action: 'NEW' });
        },
        async deleteNote(context, payload) {
            if(payload.command) {
                context.dispatch('handleProject', payload);
            }
            await db.deleteItem('Notes', payload.id);
            context.dispatch('updateNotes', { ...payload, action: 'DELETE' });
        },
        async editNote(context, payload) {
            payload.excerpt = snippet.snip(payload.text);
            var editedNote;
            await db.editItem('Notes', { itemID: payload.id, indexVal: payload.indexVal}, (data) => {
                data.noteText = payload.text;
                data.excerpt = payload.excerpt;
                editedNote = data;
            });    

            await context.commit('updateNotes', { editedNote, action: 'EDIT' });
        }
    }
}