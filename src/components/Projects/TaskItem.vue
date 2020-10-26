<template>
    <div>
        <span v-if="!isEditing" @dblclick="toggleEdit" class="row">
            <checkbox :item="subtask" @toggle="toggleComplete"/>
            <span class="ico option popup" @click="showPopup" >
                circle-down
                <span class="popup-bar">HELLO</span>
            </span>
        </span>
        <form @submit.prevent="saveChanges" v-else>
            <input type="text" v-model="newText"/>
            <button type="submit" class="success ico">&#xea10;</button>
            <button type="button" class="danger ico" @click="toggleEdit">&#xea0f;</button>
        </form>
    </div>
</template>

<script>
import Checkbox from '../Checkbox'
export default {
    data: () => ({
        isEditing: false,
        editedText: "",
        edited: false
    }),
    components: {
        Checkbox
    },
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
        showPopup(event) {
            var popup = event.target.children[0];
            popup.classList.toggle("show");
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

<style scoped lang="scss">

.row {
    display: flex;
}
.option {
    margin-right: 1rem;
    opacity: 0;
}

/* .option:hover {
    opacity: 1
} */
span.row:hover {
    .option {
        opacity: 1;
    }
}
.popup {
    position: relative;
    display: inline-block;
    cursor: pointer;
    user-select: none;
}

.popup .popup-bar {
    visibility: hidden;
    width: 160px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -130px;
}
/* arrow beneath the popup */
.popup .popup-bar::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

.popup .show {
    visibility: visible;
    animation: fadeIn 1s;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
</style>