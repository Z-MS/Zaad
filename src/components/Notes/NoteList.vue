<template>
	<div>
		<div id="regular" v-if="!isNew">
			<button class="success" @click="toggleNew">Create a new note</button>
			<ul>
				<li v-for="note in notes" :key="note.id">
					<p><router-link :to="`notes/${note.id}`">{{ note.excerpt }}</router-link></p>
					<small>{{ note.date }}</small>
				</li>
			</ul>
		</div>
		<div id="new" v-else>
			<form @submit.prevent="createNote">
				<button class="success" type="submit">Save</button>
				<button class="danger" type="button" @click="cancel">Cancel</button>
				<resizable-text>
					<textarea v-model="noteText" cols="150"/>
				</resizable-text>
			</form>
		</div>
	</div>
</template>

<script>
import ResizableText from '../ResizableText'
// import DateTime from '../../utils/DateTime';

export default {
	data: () => ({
		newId: 2,
		noteText: "",
		isNew: false
	}),
	components: {
		ResizableText
	},
	computed: {
		notes() {
			// returns an array of objects
			return this.$store.getters.getNotes
		}
	},
	methods: {
		toggleNew() {
			this.noteText = "";
			this.isNew = !this.isNew;
		},
		createNote() {
			if(this.noteText) {
				this.$store.dispatch("addNote", { noteText: this.noteText, id: String(this.newId) });
				this.newId++;
			} 
			this.toggleNew();
		},
		cancel() {
			this.toggleNew();
		}
	}

}
</script>

<style scoped>
li {
    list-style: none;
    border-bottom: 1px solid rgba(195, 195, 195, 0.5);
    font-size: 1.50rem;
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

#regular {
	width: 50rem;
    margin: auto;
    background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.25);
}

p {
	display: inline;
	position: relative;
	right: 25%;
}

small {
	position: absolute;
	left: 70%;
}
</style>