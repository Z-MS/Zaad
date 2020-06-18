<template>
    <div>
        <div id="reading" v-if="!isEditing">
            <button class="change" @click="toggleEdit">Edit</button>
            <button class="danger" @click="deleteNote(id)">Delete</button>
            <p @click="toggleEdit"> {{ note.noteText }} </p>
        </div>
        <edit-note v-else :text="note.noteText" :id="id"/>
    </div>
</template>

<script>
import EditNote from './EditNote'

export default {
    name: 'NoteContent',
    components: {
        EditNote
    },
    data: () => ({
        isEditing: false
    }),
    props: {
        id: { type: String, required: true }
    },
    methods: {
        toggleEdit() {
            this.isEditing = !this.isEditing
        },
        deleteNote(id) {
            this.$store.dispatch("deleteNote", id)
            this.$router.push({name: 'Notes'});
        }
    },
    computed: {
        note() {
            return this.$store.getters.getNote(this.id)
        }
    }
}
</script>

<style>
a {
    color: black;
}

p {
    font-size: 1.30rem;
    text-align: left;
}

#reading {
    border-radius: 0.2rem;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.25);
    background-color: white;
    padding-left: 1rem; 
}
</style>