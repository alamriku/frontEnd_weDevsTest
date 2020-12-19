import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Login from '../components/Login'
import About from '../components/About'
import AddProduct from '../components/AddProduct'
import ListProduct from '../components/ListProduct'
import EditProduct from '../components/EditProduct'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter (to, from, next) {
      store.dispatch('tryAutoLogin')
      if (store.getters.isAuthenticated) {
        next({ name: 'About' })
      } else {
        next()
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/add-product',
    name: 'add-product',
    component: AddProduct
  },
  {
    path: '/list-product',
    name: 'list-product',
    component: ListProduct
  },
  {
    path: '/product/edit/',
    name: 'edit-product',
    component: EditProduct
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  const expirationDate = localStorage.getItem('expirationDate')
  const now = new Date()
  if (now.getTime() >= expirationDate) {
    store.dispatch('logout')
    if (to.path === '/') {
      next()
    } else {
      next({ path: '/' })
    }
  } else {
    next()
  }
})
export default router
