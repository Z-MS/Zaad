<template>
    <div>
        <button class="success" @click="saveChanges">Done</button>
        <button class="danger" @click="cancel">Cancel</button>
        <textarea rows="30" cols="150" v-model="newText"/>
    </div>
</template>

<script>
// TODO: EDIT NOTE, DATE & TIME STUFF, NOTE CONTENT STYLING, STORAGE
export default {
    props: {
        text: { type: String },
        id: { type: String, required: true }
    },
    computed: {
        newText: {
            get() {
                return this.text
            },
            set(value) {
                console.log(value)
            }
        }
    },
    methods: {
        saveChanges() {
            this.$router.push({name: 'Notes'});
        },
        cancel() {
            this.$router.push({name: 'Notes'});
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
    font-size: 1.3rem;
}
</style>