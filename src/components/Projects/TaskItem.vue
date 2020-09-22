<template>
    <div>
        <span v-if="!isEditing" @dblclick="toggleEdit">
            <label class="checkbox-label" :class="{completed: subtask.completed}">
                {{ subtask.task }}
                <input type="checkbox" :checked="subtask.completed" @click="toggleComplete(subtask.id)"/>
                <span class="checkmark"></span>
            </label>
            <a class="ico option" @click="toggleEdit">circle-down</a>
            <!-- <dialog></dialog> -->
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
                return this.subtask.task;
            },
            set(value) {
                this.edited = true;
                this.editedText = value;
            }
        } 
    },
    props: {
        subtask: { type: Object, required: true },
        parentTaskID: { type: String, required: true }
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

.checkbox-label {
    display: inline-block;
    position: relative;
    padding-left: 35px;
    margin: 0 auto; 
    text-align: justify;
    width: 85%;
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
    vertical-align: text-top;
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

.option {
    opacity: 0;
}

.option:hover {
    opacity: 1
}
</style>