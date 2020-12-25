import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Foods from "../views/foods.vue";
import FoodDetail from "../views/FoodDetail.vue";
import Keranjang from "../views/Keranjang.vue";
import PesananSukses from "../views/PesananSukses.vue";
import HELLO from "../views/heloword.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hello',
    name: 'Hello',
    component: HELLO
  },
  {
    path: '/foods/',
    name: 'Foods',
    component: Foods 
  },
  {
    path: '/pesanan-sukses',
    name: 'PesananSukses',
    component: PesananSukses
  },
  {
    path: '/foods/:id',
    name: 'FoodDetail',
    component: FoodDetail 
  },
  {
    path: '/keranjang',
    name: 'Keranjang',
    component: Keranjang
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
