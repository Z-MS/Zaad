<template>
    <svg>
        <circle stroke-dasharray="0" :r="radius" :cx="coords.cx" :cy="coords.cy" :stroke="strokes.inner" fill="none" stroke-width="5" stroke-linecap="round">
        </circle>
        <circle :id="id" class="percent-ring" :stroke-dashoffset="circumference" :r="radius" :cx="coords.cx" :cy="coords.cy" :stroke="strokes.outer" fill="none" stroke-width="3" stroke-linecap="round">
        </circle>
        <text :x="shiftX" y="60">{{ progress }}%</text>
    </svg>
</template>

<script>
export default {
    mounted() {
        this.setOffset();
    },
    props: {
        id: { type: String, required: true },
        radius: { type: Number, required: true },
        progress: { type: Number, required: true },
        dashoffset: { type: Number, default: 40, required: false },
        strokes: { type: Object, default: () => { return { inner: 'gray', outer: 'lime' } }, required: false },
        coords: { type: Object, default:() => { return { cx: '60%', cy:'50%' } }, required: false }
    },
    computed: {
        circumference() {
            return 2 * Math.PI * this.dashoffset; 
        },
        shiftX() {
            // this is to centre the text within the circle
            var x = 40; // x-position of percent text when < 100
            if(this.progress === 100) { 
                x = 31; // x-position of percent text when = 100
            }
            return x;
            // this is a quick fix, try getting a more general solution to this problem
        }
    },
    methods: {
        setOffset() {
            var percent = this.progress;
            var offset = this.circumference - percent / 100 * this.circumference;
            var circle = document.getElementById(this.id);
            circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
            circle.style.strokeDashoffset = `${this.circumference}`;

            circle.style.strokeDashoffset = offset; 
        }
    },
    watch: {
        progress: 'setOffset'
    }


}
</script>

<style scoped>
svg {
    /* border: 2px solid black; */
    width: 30%;
    height: 15vh;
}

text {
    font-size: 1.5rem;
}

.percent-ring {
    transition: 0.35s stroke-dashoffset;
    /*axis compensation*/
    transform: rotate(-90deg);
    transform-origin: 60% 50%;
}
</style>