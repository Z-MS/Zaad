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
    actions: {
        async fetchNotesFromDB(context, payload) {
            const { indexVal } = payload;
            const notes = await context.dispatch('getItemsFromDB', { store: 'Notes', indexVal });
            payload.notes = notes;
            context.dispatch('setNotes', payload);
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
            context.dispatch('setNote', note);
        },
        async deleteNote(context, payload) {
            if(payload.command) {
                context.dispatch('handleProject', payload);
            }
            await db.deleteItem('Notes', payload.id);
            await context.dispatch('fetchNotesFromDB', { indexVal: payload.indexVal });
        },
        async editNote(context, payload) {
            payload.excerpt = snippet.snip(payload.text);
        
            await db.editItem('Notes', { itemID: payload.id,indexVal: 'regular'}, (data) => {
                data.noteText = payload.text;
                data.excerpt = payload.excerpt;
            });

            // THIS IS WHERE(TIME, I MEAN, NOT PLACE) YOU ADD THE ARRAY INDEX TRACKING STUFF
            // EVERY METHOD OF A STORE THAT UPDATES ITS STATE SHOULD BE RESPONSIBLE FOR FILTERING AFTER CALLING GETFROMDB
            // context.dispatch(setNote,);
        },
        setNote(context, payload) {
            if(payload.indexVal == 'regular')
                context.state.notes.push(payload);
            else
                context.state.filteredNotes.push(payload)
        },
        setNotes(context, payload) {
            if(payload.indexVal == 'regular')
                context.state.notes = payload.notes;
            else
                context.state.filteredNotes = payload.notes;
        }
    }
}