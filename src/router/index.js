import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TodoList from '../components/Todo/TodoList.vue'
import NoteList from '../components/Notes/NoteList.vue'
import NoteContent from '../components/Notes/NoteContent.vue'
import EditNote from '../components/Notes/EditNote.vue'
// import ProjectList from '../components/Projects/ProjectList.vue'
import ProjectPage from '../components/Projects/ProjectPage.vue'
import TaskList from '../components/Projects/TaskList.vue'
import TaskPage from '../components/Projects/TaskPage.vue'
import SvgTest from '../views/SvgTest.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home', 
    component: Home
  },
  /*
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( webpackChunkName: "about"  '../views/About.vue')
  }*/
  {
    path: '/todos',
    name: 'Todos',
    component: TodoList
  },
  {
    path: '/notes',
    name: 'Notes',
    component: NoteList
  },
  {
    path: '/note/:id',
    name: 'NoteContent',
    component: NoteContent,
    props: true
  },
  {
    path: '/notesEd/:id',
    name: 'EditNote',
    component: EditNote,
    props: true
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../components/Projects/ProjectList.vue')
  },
  {
    path: '/project/:id',
    name: 'ProjectPage',
    component: ProjectPage,
    props: true
  },
  {
    path: '/tasks',
    name: 'TaskList',
    component: TaskList,
  },
  {
    path: '/task/:id',
    name: 'TaskPage',
    component: TaskPage,
    props: true
  },
  {
    path: '/svg',
    component: SvgTest
  }
]

const router = new VueRouter({
  routes
})

export default router
