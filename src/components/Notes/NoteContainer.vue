<template>
	<div class="note-container">
		<div class="note-grid">
				<note-card :note="note" v-for="note in notes" :key="note.id" @open-edit="toggleEdit(note)"/>
				<note-editor v-if="open" :note="noteObj" :isNew="openNew" :open="open" @close-edit="toggleEdit"/>
		</div>
	</div>
</template>

<script>
// import ResizableText from '../ResizableText';
import NoteCard from './NoteCard';
import NoteEditor from './NoteEditor';

export default {
	components: { 
		NoteCard, NoteEditor
	},
	data:() => ({
		open: false,
		noteObj: null
	}),
	props: {
		notes: { type: Array, required: true },
		openNew: { type: Boolean, required: true }
	},
	created() {
	},
	methods: {
		toggleEdit(obj = null) {
			this.noteObj = obj;
			this.open = !this.open;
		}
	},
	watch: {
		openNew(val) {
			if(val)
				this.toggleEdit()
		}
	}
}
</script>

<style scoped>
.note-container {
	margin-left: auto;
	margin-right: auto;
	padding: 1rem 0.25rem;
}

.note-grid {
	display: grid;
	grid-template-columns: repeat(4, 35%);
	grid-auto-rows: min-content;
	gap: 1rem;
}

.note-list {
	display: flex;
	flex-direction: column;
}
</style>