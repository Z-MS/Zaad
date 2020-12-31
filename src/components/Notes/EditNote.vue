<template>
    <div>
        <form @submit.prevent="saveChanges">
            <button class="success ico" type="submit">&#xea10;</button>
            <button class="danger ico" type="button" @click="close">&#xea0f;</button>
            <button type="button" class="danger ico" @click="toggleDialog">bin</button>

            <textarea cols="150" rows="20" spellcheck="false" v-model="newText"/>
        </form>
        <confirm-dialog v-if="isOpen" :open="isOpen" @close="getMessage">delete this note</confirm-dialog>
    </div>
</template>

<script>
import ConfirmDialog from '../ConfirmDialog';

export default {
    data: () => ({
        editedText: "",
        edited: false,
        isOpen: false
    }),
    props: {
        text: { type: String },
        id: { type: String, required: true },
        isProject: { type: Boolean, required: false, default: false },
        projectID: { type: String, required: false }
    },
    components: {
        ConfirmDialog
    },
    computed: {
        newText: {
            get() {
                return this.text;
            },
            set(value) {
                this.edited = true;
                this.editedText = value;
            }
        }
    }, 
    methods: {
        close() {
            this.$emit('close-edit');
        },
        saveChanges() {
            if(this.edited) {
                this.$store.dispatch('editNote', { text: this.editedText, id: this.id })
                this.$emit('update');
            }
            this.close();
        },
        deleteNote(id) {
            var note = { id: id };
            if(this.isProject) {
                note.projectID = this.projectID;
                note.command = 'DELETE_NOTE_ID';
            }

            this.$store.dispatch('deleteNote', note);
            this.$emit('update');
            this.close();
        },
        toggleDialog() {
            this.isOpen = !this.isOpen;
        },
        getMessage(message) {
            if(message) {
                this.deleteNote(this.id);
            }
            this.toggleDialog();
        }
    }
}
</script>

<style>
/* div {
    display: grid;
    grid-template-rows: 1fr, 2fr;\\\
} */
::-webkit-scrollbar {
        display: none;
}

a {
    text-decoration: none;
    color: beige;
}

textarea {   

    box-sizing: border-box;
    /* max-width: 90%; */
    width: 100%;
    margin: 0 auto;
    border: 0.5px solid rgba(163, 159, 159, 0.5);
    border-radius: 0.5rem;
    display: block;
    color: black;
	resize: none;
	font-size: 1.5rem;
}
</style>