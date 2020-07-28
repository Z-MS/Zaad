<template>
    <div>
        <form @submit.prevent="saveChanges">
            <button class="success" type="submit">Done</button>
            <button class="danger" type="button" @click="close">Cancel</button>
            <resizable-text>
                <textarea cols="150" v-model="newText"/>
            </resizable-text>
        </form>
    </div>
</template>

<script>
import ResizableText from '../ResizableText'

export default {
    data: () => ({
        editedText: "",
        edited: false
    }),
    props: {
        text: { type: String },
        id: { type: String, required: true }
    },
    components: {
        ResizableText
    },
    computed: {
        newText: {
            get() {
                return this.text
            },
            set(value) {
                this.edited = true;
                this.editedText = value;
            }
        }
    },
    methods: {
        close() {
            this.$router.push({name: 'Notes'});
        },
        saveChanges() {
            if(this.edited) {
                this.$store.dispatch("editNote", { text: this.editedText, id: Number(this.id) })
                this.$store.dispatch("getNotesFromDB");
            }
            this.close();
        }
    }
}
</script>

<style>
/* div {
    display: grid;
    grid-template-rows: 1fr, 2fr;
} */
a {
    text-decoration: none;
    color: beige;
}

textarea {
    box-sizing: border-box;
    /* max-width: 90%; */
    width: 60%;
    margin-left: 35%;
    display: block;
    color: black;
	resize: none;
	font-size: 1.5rem;
}
</style>