<template>
	<dialog id="note_dialog" :open="open">
		<div class="toolbar">
			<unicon class="toolbar_btn" name="check" fill="lime" v-if="isNew" @click="saveChanges"></unicon> <!-- new -->
			<span v-else class="popup">
				<unicon class="toolbar_btn" name="ellipsis-h" fill="black" @click="togglePopup"></unicon>
				<span class="popup-bar" :class="{ show: popped }">
					<li @click="deleteNote">
						<unicon class="toolbar_btn" name="trash-alt" fill="black" ></unicon>
						Delete Note
					</li>
				</span> 
			</span>	
			<unicon class="toolbar_btn" name="x" fill="red" @click="close"></unicon>
		</div>
		<div class="diag_wrapper">	
			<div>
				<resizable-text>		
					<textarea class="note_text" @dblclick="!editing" v-model="newText" spellcheck="false"></textarea>
				</resizable-text>
			</div>
		</div>
	</dialog>
</template>

<script>
import ResizableText from '@/components/ResizableText';

export default {
	components: { ResizableText },
	props: {
		open: { type: Boolean, required: true },
		noteObj: { type: Object },
		isNew: { type: Boolean, required: true }
	},
	mounted() {
		window.addEventListener('click', this.handleClosure);
	},
	beforeDestroy() {
		window.removeEventListener('click', this.handleClosure);
	},
	data: () => ({
		editing: false,
		edited: false,
		editedText: false,
		popped: false
	}),
	computed: {
		note() {
			if(this.noteObj == null)
				return { noteText: '' }
			else
				return this.noteObj
		},
		newText: {
      get() {
				return this.note.noteText;
      },
      set(value) {
        this.edited = true;
        this.editedText = value;
      }
    }
	},
	methods: {
		saveChanges() {
      if(this.edited) {
				if(this.isNew)
					this.$store.dispatch('createNote', { noteText: this.editedText, indexVal: 'regular' })
				else
					this.$store.dispatch('editNote', { text: this.editedText, id: this.note.id, indexVal: this.note.indexVal })
      }
      this.close();
    },
    deleteNote() {
			this.$store.dispatch('deleteNote', { id: this.note.id, indexVal: this.note.indexVal });
			this.close();
    },
		close() {
			if(this.isNew)
				this.$emit('close-edit', true);
			else
				this.$emit('close-edit', false)
			document.querySelector('#note_dialog').close();
		},
		handleClosure(event) {
			const dialog = document.querySelector('#note_dialog');
			if(!dialog.contains(event.target) && dialog.open)
				this.saveChanges();
		},
		togglePopup() {
				this.popped = !this.popped;
		}
	}
}
</script>

<style scoped>

#note_dialog {
	width: 65%;
	border-radius: 5px;
	border-width: 0.25px;
	border-color: grey;
	padding: 0;
}

.diag_wrapper {
	/*margin-top: 0.5rem;*/
	margin-left: auto;
	margin-right: auto;
	padding: 0.5rem 0.75rem;
}

.toolbar {
	padding-left: 0.75rem;
	padding-right: 0.75rem;
	display: flex;
	justify-content: space-between;
	background-color: grey;
}	

.toolbar_btn {
	border: 0;
	margin: 0;
	padding: 0.35rem 0;
	font-size: 1.125rem;
	cursor: pointer;
}

.note_text {
	border: 0;
	font-size: 1.125rem;
	text-align: left;
}

.note_text:hover {
	cursor: pointer;
}

.note_text:focus {
	border: 0;
	box-shadow: none;
	outline: 0.2px solid grey;
	cursor: text;
}

.popup {
    position: relative;
    display: inline-block;
    cursor: pointer;
    user-select: none;
}

.popup .popup-bar {
    visibility: hidden;
    width: 120px;
    background-color: grey;
    color: #fff;
    font-size: 1rem;
    text-align: center;
    /*border-radius: 6px;*/
    padding: 8px 2px;
    position: absolute;
    z-index: 1;
    bottom: 110%;
    left: 0%;
    /*margin-left: -90px;*/
}

.popup-bar li {
	list-style: none;
}

.popup .show {
    visibility: visible;
    animation: fadeIn 1s;
}

</style>