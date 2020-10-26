<template>
	<label class="checkbox-label" :class="{completed: item.completed}">
		<span class="text">{{ item.task }}</span>
		<input type="checkbox" :checked="item.completed" @click="toggleItem(item.id)"/>
		<span class="checkmark"></span>
	</label>
</template>

<script>
export default {
	props: {
		item: { type: Object, required: true }
	},
	methods: {
		toggleItem(id) {
			this.$emit('toggle', id);
		}
	}
}
</script>

<style>
.checkbox-label {
    display: inline-block;
    position: relative;
    padding-left: 35px;
    margin: 0 auto; 
    text-align: justify;
    width: 100%;
}

.checkbox-label .text {
    display: inline-block;
    width: 80%;
}

.checkbox-label input[type="checkbox"] {
    display: none;
}

.checkmark {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
}

.checkbox-label input[type="checkbox"] ~ .checkmark::after {
    display: block;
    font-family: 'IcoMoon';
    content: "\ea53";
    width: 1.4rem;
    height: 1.3rem;
    /* vertical-align: text-top; */
    border: 0.1rem solid transparent;
    border-radius: 10%;

}

.checkbox-label input[type="checkbox"]:checked ~ .checkmark::after {
    display: block;
    font-family: 'IcoMoon'; 
    content: "\ea52";
    width: 1.35rem;
    height: 1.3rem;
    background: teal;
    color: white;
    text-align: center;
    /*border-color: teal*/
}

.completed {
    text-decoration: line-through solid rgb(83, 82, 82);
}
</style>