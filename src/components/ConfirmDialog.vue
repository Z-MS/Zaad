<template>
    <dialog :class="{ opened: open }">
        <p><b>Are you sure you want to <slot>do this</slot>?</b></p>
        <button class="success" @click="close(true)">Yes</button>
        <button class="danger" @click="close(false)">No</button>
    </dialog>
</template>

<script>
export default {
    props: {
        open: { type: Boolean, required: true }
    },
    mounted() {
        if(this.open) {
            document.querySelector('.opened').showModal();
        }
    },
    methods: {
        close(message) {
            document.querySelector('.opened').close();

            if(message) {
                this.$emit('close', true);
            } else {
                this.$emit('close', false);
            }
        }
    }
}
</script>

<style>

</style>