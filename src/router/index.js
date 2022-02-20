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
  {
    path: '/news',
    name: 'News',
    component: () => import(/* webpackChunkName: "about" */ '../views/News.vue')
  },
  {
    path: '/comparison',
    name: 'Comparison',
    component: () => import(/* webpackChunkName: "about" */ '../views/ComparisonPage.vue')
  },
  {
    path: '/temporality',
    name: 'Temporality',
    component: () => import(/* webpackChunkName: "about" */ '../views/TemporalityPage.vue')
  },
]

/* const User = {
  template: '<p>User</p>'
}; */

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

export default router;
