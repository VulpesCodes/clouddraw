import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Artist from '../views/Artist.vue'
import Submit from '../views/Submit.vue'
import Artists from '../views/Artists.vue'
import Art from '../views/Art.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/artists/:id',
    name: 'artist',
    component: Artist
  },
  {
    path: '/art/:id',
    name: 'art',
    component: Art
  },
  {
    path: '/artists',
    name: 'artists',
    component: Artists
  },
  {
    path: '/submit',
    name: 'submit',
    component: Submit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
