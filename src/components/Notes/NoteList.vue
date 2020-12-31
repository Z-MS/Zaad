<template>
	<div class="note-container">
		<div id="regular" v-if="!toggleSwitch">
			<button class="success nunito-bold" @click="toggleNew">Create a new note</button>
				<div class="grid">
					<div v-for="note in notes" :key="note.id" class="item">	
						<dialog :id="String(note.id)">
							<div class="header-bar">
								<edit-note :text="note.noteText" :id="String(note.id)" :isProject="isProject" :projectID="projectID" @update="updateState" @close-edit="close(note.id)"/>
							</div>
						</dialog> 
						<div id="text-container" @click="show(note.id)">
							<p class="note-text">
								{{ note.excerpt }}
							</p>
						</div>
						<div class="toolbar">
							<ul>
								<li class="ico highlight--white tool">write</li>
								<li class="ico highlight--white tool">copy</li>
								<li class="ico tool">radio-checked2</li>
								<li class="ico highlight--white tool">bin</li>
							</ul>
						</div>
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

import EditNote from './EditNote';

export default {
	data: () => ({
		noteText: "",
		isNew: false
	}),
	props: {
		toggle: { type: Boolean, required: false, default: false },
		noteIDs: { type: Array, required: false },
		isProject: { type: Boolean, required: false, default: false },
		projectID: { type: String, required: false }
	},
	components: {
		ResizableText, EditNote
	},
	created() { // -&- Search for the diff btw me and mounted. See if you can use computed props in me
		if(this.isProject) {	
			this.$store.dispatch('getItemsFromDB', { store: 'Notes', indexVal: 'project', itemIDs: this.noteIDs });
		} else {
			if(!this.$store.getters.getNotes.length) {
				this.$store.dispatch('getItemsFromDB', { store: 'Notes', index: 'index' });
			}
		}
	},
	computed: {
		notes() {
			// -&- Check out mapState, *Getters, *Actions)
			// returns an array of objects
			if(this.isProject) {
				// make it so that if the note belongs to a project, it should show no notes if there are no IDs
				return this.$store.getters.getFilteredNotes;
			}
			else {
				console.log('normal');
				return this.$store.getters.getNotes;
			}
		},
		toggleSwitch() {
			return this.toggle || this.isNew;
		}
	},
	methods: {
		async updateState() {
			if(this.isProject) {
				this.$emit('update');
            }  else {
                await this.$store.dispatch('getItemsFromDB', { store: 'Notes', index: 'index' });
            }
		},
		toggleNew() {
			this.noteText = "";
			if(this.isProject) {
				this.$emit('toggle');
			} else {
				this.isNew = !this.isNew;
			}
			// 
		},
		createNote() {
			var notesIndex = this.isProject ? 'project' : 'regular';
			if(this.noteText) {
				var newNote = {
					noteText: this.noteText,
					index: notesIndex,
				};

				if(this.isProject) {
					newNote.command = this.isProject ? 'ADD_NOTE_ID' : undefined;
					newNote.projectID = this.projectID;
				}

				this.$store.dispatch('addNote', newNote);
			}

			this.updateState();
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
	grid-auto-rows: min-content;
	gap: 1rem;
	/*border: 2px solid yellow;	 */
}

.item {
	display: grid;
	position: relative;
	/* justify-content: center;
	align-content: center; */
	/*border: 2px solid red;*/
	background-color: white;
	border-radius: 0.5rem;
	box-shadow: 0 0 0.75rem rgba(0, 0, 0, 0.25);
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

#text-container {
	margin-bottom: 1.85rem;
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

.pen {
	color: var(--gold);
	background-color: white;
}


.toolbar {
	position: absolute;
	bottom: 0;
	/*border: 1px solid yellow;*/
	opacity: 0;
	width: 100%;	
	border-bottom-left-radius: 0.5rem;
	border-bottom-right-radius: 0.5rem;
}

.toolbar ul {
	margin: 0.5rem 0 0.5rem 0;
	display: flex;
	justify-content: space-around;
}
/* check note-text's padding for proper alignment */
.tool {
    /*display: inline;*/
	padding-top: 0.3rem;
	padding-bottom: 0.3rem;
	color: rgb(33, 54, 95);
}

.item:hover > .toolbar {
	opacity: 1;
	transition: opacity 0.5s;
	background-color: white;
}

</style>