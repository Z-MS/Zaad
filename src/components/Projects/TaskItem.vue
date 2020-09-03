<template>
    <div>
        <span v-if="!isEditing" @dblclick="toggleEdit">
            <label class="checkbox-label" :class="{completed: subtask.completed}">
                {{ subtask.task }}
                <input type="checkbox" :checked="subtask.completed" @click="toggleComplete(subtask.id)"/>
                <span></span>
            </label>
            <!-- <button class="change ico" @click="toggleEdit">&#xe905;</button> -->
        </span>
        <form @submit.prevent="saveChanges" v-else>
            <input type="text" v-model="newText"/>
            <button type="submit" class="success ico">&#xea10;</button>
            <button type="button" class="danger ico" @click="toggleEdit">&#xea0f;</button>
        </form>
    </div>
</template>

<script>
export default {
    data: () => ({
        isEditing: false,
        editedText: "",
        edited: false
    }),
    computed: {
        newText: {
            get() {
                return this.text
            },
            set(value) {
                this.edited = true;
                this.editedText = value;
            }
        } 
    },
    props: {
        subtask: { type: Object, required: true },
        parentTaskID: { type: Number, required: true }
    },
    methods: {
        toggleEdit() {
            this.isEditing = !this.isEditing 
        },
        saveChanges() {
            if(this.edited) {
                this.$store.dispatch("editSubtask", { text: this.editedText, subTaskId: this.subtask.id, taskId: this.parentTaskID });
                this.$store.dispatch("getTasksFromDB");
            }
            this.toggleEdit();
        },
        toggleComplete(childID) {
            this.$store.dispatch("toggleSubtask", { subTaskId: childID, taskId: this.parentTaskID });
            this.$emit('increase-percentage');
        }
    }
}
</script>

<style scoped>

.checkbox-label input[type="checkbox"] {
    display: none;
}

.checkbox-label input[type="checkbox"] + *::before {
    font-family: 'IcoMoon';
    content: "\ea53";
    display: inline-block;
    width: 1.4rem;
    height: 1.3rem;
    margin-left: 2em;
    vertical-align: text-top;
    border: 0.1rem solid transparent;
    border-radius: 10%;

}

.checkbox-label input[type="checkbox"]:checked + *::before {
    font-family: 'IcoMoon'; 
    content: "\ea52";
    width: 1.35rem;
    height: 1.3rem;
    background: teal;
    color: white;
    text-align: center;
    /*border-color: teal*/
}

/*.checkbox-label input[type="checkbox"]:checked + * {
    color: teal;
}*/

.completed {
    text-decoration: line-through solid rgb(83, 82, 82);
}
</style>