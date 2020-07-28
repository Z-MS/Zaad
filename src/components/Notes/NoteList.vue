<template>
	<div class="note-container">
		<div id="regular" v-if="!isNew">
			<button class="success" @click="toggleNew">Create a new note</button>
			<!-- <div class="list"> -->
				<div class="grid">
					<div v-for="note in notes" :key="note.id" class="item">
					<!-- <div class="row"> -->
						<p class="note-text"><router-link :to="`note/${note.id}`">{{ note.excerpt }}</router-link></p>
						<small class="note-bottom">{{ note.date }}</small>
					<!-- </div> -->
					</div>
					<div id="editor" class="item">
						<p>
							ffddddddddd
						</p>
					</div>
				<!-- </div> -->
			</div>
			
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

export default {
	data: () => ({
		newId: 2,
		noteText: "",
		isNew: false
	}),
	components: {
		ResizableText
	},
	created() {
		if(!this.$store.getters.getNotes.length) {
			this.$store.dispatch('getNotesFromDB');
		}
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

			this.$store.dispatch('getNotesFromDB');
			this.toggleNew();
		},
		cancel() {
			this.toggleNew();
		}
	}

}
</script>

<style scoped>

.note-container {
	margin-left: 20%;
}

textarea {
    box-sizing: border-box;
    display: block;
    width: 85%;
    margin-left: 10%;
    color: black;
	resize: none;
	font-size: 1.5rem;
}

#regular {
	width: 95%;
    margin: auto;
    /* background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.25); */
}

.grid {
	display: grid;
	grid-template-columns: repeat(2, 30%) 1fr;
	grid-auto-rows: 1fr;
	gap: 1rem;
	border: 2px solid yellow;	 
}

.item {
	display: grid; 
	justify-content: center;
	align-content: center;
	border: 2px solid red;
	background-color: white;
	border-radius: 0.5rem;
	/*padding: 1rem 1rem 0;*/
}

.list {
	width: 60%;
	border: 2px solid black;
}

.row {
	display: flex;
	flex-direction: column;
}

.note-bottom {
	/* display: flex; */
	background-color: gray;
	width: 100%;
}

.note-text {
	color: yellow;
	/* text-align: center; */
	/* width: 80%; */
	/* max-width: 50%; */
	overflow: hidden;
	/* flex-grow: 0; */
}

#editor {
	background: mistyrose;
	grid-row: 1/ span 4;
	grid-column-start: 3;
	border: 2px solid black;
}
/* small {
	position: absolute;
	left: 85%;
} */
</style>