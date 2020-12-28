<template>
    <div>
        <button class="success" @click="show">Create new project</button>
        <dialog id="create-dialog">
            <form @submit.prevent="close">
                <input type="text" placeholder="Project name" v-model="projName"/>
                <input type="text" placeholder="Description" v-model="description"/>
                <button type="submit" class="success" @click="createProject">Submit</button>
            </form>
        </dialog>
        <div class="grid"> 
            <div class="item" v-for="project in projects" :key="project.id" @click="$router.    push(`/project/${project.id}`)">
                <div class="project-head">
                    <span class="ico info-icon">radio-button2</span>
                    <h1>{{ project.name }}</h1>
                    <p id="description">{{ project.description }}</p>
                </div>
                <div>
                    <ul>
                        <li><span class="ico">flag</span><p class="info-text">{{ project.dates.startDate }}</p></li>
                        <!-- <li><span class="ico">todo</span><p class="info-text">{{ project.taskIDs.length }} tasks </p></li> -->
                    </ul>
                </div>
                <svg width="400" height="100">
                    <line x1="50" y1="5" x2="200" y2="5" stroke="gray" stroke-width="5"/>
                    <line x1="50" y1="5" x2="70" y2="5" stroke="lime" stroke-width="4"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
// import ProjectPage from './ProjectPage'

export default {
    data: () => ({
        projName: "",
        description: ""
    }),
    components: {
    },
    created() {
        this.updateState();
    },
    computed: {
        projects() {
            return this.$store.getters.getProjects;
        }
    },
    methods: {
        async updateState() {
            await this.$store.dispatch('getItemsFromDB', { store: 'Projects' });
        },
        tasks() {
            return this.$store.getters.getTasks;
        },
        createProject() {
            this.$store.dispatch('addProject', { name: this.projName, description: this.description });
            this.updateState();
            this.projName = "";
            this.description = "";
        },
        show() {
			var diag = document.getElementById("create-dialog");	
			diag.showModal();
		}, 
		close() {
			var diag = document.getElementById("create-dialog");
			diag.close();
		}
    }
}

</script>

<style scoped>
    * {
    box-sizing: border-box;
    }

    .grid {
        width: 70%;
        margin-left: 25%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-auto-rows: 1fr;
        gap: 10px;
    }

    .item {
        display: grid;
        background-color: white;
        border-radius: 0.5rem;
    }


    .project-head {
        background-color: rgb(53, 51, 51);
        color: white;
    }

    .info-text {
        display: inline-block;
        /* margin-left: 0.5rem; */
    }

    .info-icon {
        color: red;
    }

    #description {
        text-align: center;
    }
</style>