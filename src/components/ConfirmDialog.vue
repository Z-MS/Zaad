<template>
    <dialog>
        <p><b>Are you sure you want to <slot>do this</slot>?</b></p>
        <button class="success" @click="accept">Yes</button>
        <button class="danger" @click="cancel">No</button>
    </dialog>
</template>

<script>
export default {
    props: {
        open: { type: Boolean, required: true }
    },
    mounted() {
        if(this.open) {
            document.querySelector('dialog').showModal();
        }
    },
    methods: {
        accept() {
            this.$emit('accept', true);
            document.querySelector('dialog').close();
        },
        cancel() {
            this.$emit('cancel', false);
            document.querySelector('dialog').close();
        }
    }
}
</script>

<style>

</style>