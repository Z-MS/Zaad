<template>
    <form @submit.prevent="saveChanges">
        <button class="success ico" type="submit">&#xea10;</button>
        <button class="danger ico" type="button" @click="close">&#xea0f;</button>
        <button type="button" class="danger ico" @click="deleteNote(id)">bin</button>
        <!-- Flip the value of willFocus, the binding works one way, so it doesn't change until after the dialog has opened, and not before -->

        <textarea cols="150" rows="20" spellcheck="false" v-model="newText"/>
    </form>
</template>

<script>
// import ResizableText from '../ResizableText'

export default {
    data: () => ({
        editedText: "",
        edited: false
    }),
    props: {
        text: { type: String },
        id: { type: String, required: true }
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
                this.$store.dispatch("editNote", { text: this.editedText, id: Number(this.id) })
                this.$store.dispatch("getNotesFromDB");
            }
            this.close();
        },
        deleteNote(id) {
            this.$store.dispatch("deleteNote", id);
            this.$store.dispatch('getNotesFromDB');
        }
    }
}
</script>

<style>
/* div {
    display: grid;
    grid-template-rows: 1fr, 2fr;
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