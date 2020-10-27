<template>
    <div>
        <span v-if="!isEditing" class="row">
            <checkbox :item="subtask" @toggle="toggleComplete"/>
            <span class="ico option popup" @click="showPopup" >
                circle-down
                <span class="popup-bar">
                    <ul>
                        <li class="ico highlight--white" @click="openDialog">write</li>
                        <li class="ico highlight--white">copy</li>
                        <li class="ico highlight--white" @click="openDialog">bin</li>
                    </ul>
                </span>
            </span>
            <confirm-dialog v-if="isOpen" :open="isOpen" @accept="getMessage" @cancel="getMessage"></confirm-dialog>
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
import ConfirmDialog from '../ConfirmDialog'

export default {
    data: () => ({
        isEditing: false,
        editedText: "",
        edited: false,
        isOpen: false
    }),
    components: {
        Checkbox,
        ConfirmDialog
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
            // Get the popup-bar
            var popup = event.target.children[0];
        
            if(popup) {
                popup.classList.toggle("show");
            }            
        },
        saveChanges() {
            if(this.edited) {
                this.$store.dispatch("editSubtask", { text: this.editedText, subtaskId: this.subtask.id, taskId: this.parentTaskID });
                this.$store.dispatch("getTasksFromDB");
            }
            this.toggleEdit();
        },
        toggleComplete() {
            this.$store.dispatch("toggleSubtask", { subtaskId: this.subtask.id, taskId: this.parentTaskID });
            this.$emit('increase-percentage');
        },
        getMessage(message) {
            this.isOpen = !this.isOpen;
            if(message) {
                this.deleteSubtask();
            }
        },
        openDialog(event) {
		/* span > ul > li. We're getting the grandparent of the list element which is the span, that's why 'parentNode' appears twice. The code below closes the popup toolbar */
			event.target.parentNode.parentNode.classList.toggle("show");
            this.isOpen = !this.isOpen;
        },
        deleteSubtask() { 
            this.$store.dispatch("deleteSubtask", { subtaskId: this.subtask.id, taskId: this.parentTaskID });
            this.$store.dispatch("getTasksFromDB");
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
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    // border-radius: 6px;
    padding: 8px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -90px;
}
/* arrow beneath the popup */
.popup .popup-bar::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -10px;
    border-width: 5px;
    border-style: solid;
    // border-color: #555 transparent transparent transparent;
}

.popup .show {
    visibility: visible;
    animation: fadeIn 1s;
}

.popup-bar li {
    display: inline;
    padding: 0.3rem 0.4rem 0.5rem 0.3rem;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
</style>