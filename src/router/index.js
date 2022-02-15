import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue'
//import { createRouter, createWebHistory } from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/search',
  //   name: 'Search',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  // },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  // { path: '/gare/:id', component: () => import(/* webpackChunkName: "about" */ '../views/Gare.vue') }
]

/* const User = {
  template: '<p>User</p>'
}; */

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

export default router;
