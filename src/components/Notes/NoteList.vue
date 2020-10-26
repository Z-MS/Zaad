<template>
	<div class="note-container">
		<div id="regular" v-if="!isNew">
			<button class="success nunito-bold" @click="toggleNew">Create a new note</button>
				<div class="grid">
					<div v-for="note in notes" :key="note.id" class="item">
						<div class="btns">
							<button @click="show(note.id)" class="pen ico">&#xe905;</button>
						</div>
						<dialog :id="String(note.id)">
							<edit-note :text="note.noteText" :id="String(note.id)" @close-edit="close(note.id)"/>
						</dialog> 
						<p class="note-text" @click="show(note.id)">
							{{ note.excerpt }}
						</p>
					</div>
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
import ResizableText from '../ResizableText';
import EditNote from './EditNote'

export default {
	data: () => ({
		noteText: "",
		isNew: false
	}),
	components: {
		ResizableText, EditNote
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
				this.$store.dispatch("addNote", { noteText: this.noteText });
			}
 
			this.$store.dispatch('getNotesFromDB');
			this.toggleNew();
		},
		cancel() {
			this.toggleNew();
		}, 
		show(id) {
			var diag = document.getElementById(id);
			
			diag.showModal();
		}, 
		close(id) {
			var diag = document.getElementById(id);
			diag.close();
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

dialog {
	width: 60%;
	margin: 0 auto;
	border: 0.5px solid rgb(117, 114, 114);
	border-radius: 1rem;
}

button {
	border-radius: 0.5rem;
}

#regular {
	width: 95%;
    margin: auto;
}

.grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-auto-rows: max-content;
	gap: 1rem;
	/*border: 2px solid yellow;	 */
}

.item {
	display: grid;
	/* justify-content: center;
	align-content: center; */
	/*border: 2px solid red;*/
	background-color: white;
	border-radius: 0.5rem;
	box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.25);
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
	/* text-align: center; */
	padding-left: 1em;
	padding-right: 1em;
	/* width: 80%; */
	/* max-width: 50%; */
	overflow-x: hidden;
	/* flex-grow: 0; */
}

.btns {
	height: 2rem;
}

.pen {
	color: rgb(204, 204, 35);
	background-color: white;
}
</style>