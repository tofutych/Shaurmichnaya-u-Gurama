import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DishView from '../views/DishView'
import DishesView from '../views/DishesView'
import SignUpView from '../views/SignUpView'
import LogInView from '../views/LogInView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/sign-up',
    name: 'sign up',
    component: SignUpView
  },
  {
    path: '/log-in',
    name: 'log in',
    component: LogInView
  },
  {
    path: '/dishes',
    name: 'dishes',
    component: DishesView
  },
  {
    path: '/:slug/',
    name: 'dish',
    component: DishView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'LogIn', query: { to: to.path } });
  } else {
    next()
  }
})

export default router
