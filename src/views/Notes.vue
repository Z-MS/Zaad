<template>
	<div>
		<button class="btn_new" @click.stop="toggleNew"><span class="new_text">New note</span><unicon class="uni" name="plus" fill="lime" height="16" width="16"></unicon></button>
		<note-container :notes="notes" :open-new="isNew" @close-new="toggleNew"/>
	</div>
</template>

<script>
import NoteContainer from '@/components/Notes/NoteContainer'

export default {
	components: {
		NoteContainer
	},
	created() {
		this.$store.dispatch('fetchNotesFromDB', { indexVal: 'regular' });	
	},
	data: () => ({
		isNew: false
	}),
	computed: {
		notes() {
			return this.$store.getters.getNotes;
		}
	},
	methods: {
		toggleNew(diagNew) {
			if(diagNew)
				this.isNew = !this.isNew;
		} 
	}
}
</script>

<style style="scoped">
.btn_new {
	border: 0;
	margin-top: 1.5rem;
	padding: 0.25rem ;
	display: block;
	background-color: #332DB1;
}

.new_text {
	font-size: 0.9rem;
	vertical-align: middle;
	/*padding-top: -1rem;*/
	padding-top: 0;
	padding-right: 1rem;
}

.uni > svg {
	vertical-align: middle;
}
</style>