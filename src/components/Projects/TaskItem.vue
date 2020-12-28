<template>
    <div>
        <span v-if="!isEditing" class="row">
            <checkbox :item="subtask" @toggle="toggleComplete"/>
            <span class="ico option popup" @click="showPopup">
                circle-down
                <span class="popup-bar" :class="{ show: popped }">
                    <ul>
                        <li class="ico highlight--white" @click="toggleEdit">write</li>
                        <li class="ico highlight--white">copy</li>
                        <li class="ico highlight--white" @click="openDialog">bin</li>
                    </ul>
                </span>
            </span>
            <confirm-dialog v-if="isOpen" :open="isOpen" @close="getMessage"></confirm-dialog>
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
        isEditing: false, // for toggling the task name edit input field
        editedText: "", // used to hold a copy of the subtask text's prop to avoid direct mutation
        edited: false,  // this is toggled to true when saving changes after editing the subtask's text
        isOpen: false, // this is used for opening the confirmation dialog
        popped: false // this is used for showing the popup bar
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
        showPopup() {
            this.popped = !this.popped;           
        },
        saveChanges() {
            if(this.edited) {
                this.$store.dispatch('handleTask', {
                    name: this.editedText, 
                    subtaskId: this.subtask.id, 
                    taskId: this.parentTaskID, 
                    command: 'EDIT' 
                });
                
                this.$emit('update');
            }
            this.toggleEdit();
        },
        toggleComplete() {
            this.$store.dispatch('handleTask', {
                subtaskId: this.subtask.id,
                taskId: this.parentTaskID, 
                command: 'TOGGLE'
            });       // update on emit     
            this.$emit('update');
        },
        getMessage(message) {
            this.isOpen = !this.isOpen;
            if(message) {
                this.deleteSubtask();
            }
        },
        openDialog() {
            document.querySelector('.show').classList.toggle('show');
            this.isOpen = !this.isOpen;
        },
        deleteSubtask() { 
            this.$store.dispatch('handleTask', { 
                subtaskId: this.subtask.id,
                taskId: this.parentTaskID,
                command: 'DELETE_SUBTASK'
            });
            this.$emit('update');
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