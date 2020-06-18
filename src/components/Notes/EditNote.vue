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
                this.$store.dispatch("editNote", { text: value, id: this.id })
            }
        }
    },
    methods: {
        close() {
            this.$router.push({name: 'Notes'});
        },
        saveChanges() {
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
    max-width: 90%;
    display: block;
    margin-left: 5%;
    color: black;
	resize: none;
	font-size: 1.5rem;
}
</style>