<template>
	<div class="item">
		<div id="text-container" @click.stop="$emit('open-edit')">
			<p class="note-text">
				{{ note.excerpt }}
			</p>
		</div>
		<!-- <div class="toolbar">
			<ul>
				<li class="ico highlight--white tool">write</li>
				<li class="ico highlight--white tool">copy</li>
				<li class="ico tool">radio-checked2</li>
				<li class="ico highlight--white tool">bin</li>
			</ul>
		</div> -->
	</div>
</template>

<script>

export default {
	data: () => ({}),
	props: {
		note: { type: Object, required: true }
	},
	methods: {
		show(id) {
			console.log(id)
		}
	}
	
}
</script>

<style scoped>
.item {
	position: relative;
	padding: 0.5rem 1rem;
	background-color: white;
	border-radius: 0.5rem;
	box-shadow: 0 0 0.15rem rgba(0, 0, 0, 0.25);
}

.note-text {
	overflow-x: hidden;
	font-size: 1.125rem;
	cursor: pointer;
}


/* TOOLBAR
.toolbar {
	position: absolute;
	left: 0;
	bottom: 0;
	opacity: 0;
	width: 100%;	
	border-radius: 0.5rem;
}

.item:hover > .toolbar {
	opacity: 1;
	transition: opacity 0.5s;
	background-color: white;
}

.toolbar ul {
	margin: 0.5rem 0;
	display: flex;
	justify-content: space-around;
}

.tool {
	padding-top: 0.3rem;
	padding-bottom: 0.3rem;
	color: rgb(33, 54, 95);
}*/
</style>