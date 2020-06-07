<template>
	<div>
		<div id="regular" v-if="!isNew">
			<button class="success" @click="toggleNew">Create a new note</button>
			<ul>
				<li v-for="note in notes" :key="note.id">
					<router-link :to="`notes/${note.id}`">{{ note.noteText }}</router-link>
				</li>
			</ul>
		</div>
		<div id="new" v-else>
			<form @submit.prevent="createNote">
				<button class="success" type="submit">Save</button>
				<button class="danger" type="button" @click="cancel">Cancel</button>
				<textarea v-model="noteText" rows="30" cols="150"/>
			</form>
		</div>
	</div>
</template>

<script>

export default {
	data: () => ({
		newId: 2,
		noteText: "",
		isNew: false
	}),
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

<style>
li {
    list-style: none;
    border-bottom: 1px solid rgba(195, 195, 195, 0.5);
    font-size: 1.50rem;
}

textarea {
    box-sizing: border-box;
    max-width: 90%;
    display: block;
    margin-left: 10%;
    color: black;
}
</style>