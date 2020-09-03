<template>
    <svg>
    </svg>
</template>

<script>
export default {
    data: () => ({
        normalizedRadius: this.radius - this.stroke * 2,
        circumference: this.normalizedRadius * 2 * Math.PI 
    }),
    props: {
        radius: { type: Number },
        progress: { type: Number },
        stroke: { type: Number }
    },
    computed: {
        strokeDashOffset() {
            return this.circumference - this.progress / 100 * this.circumference
        }
    }

}
</script>

<style scoped>

</style>