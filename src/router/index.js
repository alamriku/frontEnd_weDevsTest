import Vue from 'vue'
import VueRouter from 'vue-router'
import middleware from './middleware'
import Login from '../components/Login'
import Home from '../components/Home'
import AddProduct from '../components/AddProduct'
import ListProduct from '../components/ListProduct'
import EditProduct from '../components/EditProduct'
import NotFound from '../components/NotFound'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: middleware.guest
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: middleware.user
  },
  {
    path: '/add-product',
    name: 'add-product',
    component: AddProduct,
    beforeEnter: middleware.user
  },
  {
    path: '/list-product',
    name: 'list-product',
    component: ListProduct,
    beforeEnter: middleware.user
  },
  {
    path: '/product/:id/edit',
    name: 'edit-product',
    component: EditProduct,
    beforeEnter: middleware.user
  },
  {
    path: '*',
    name: 'Not Found',
    component: NotFound
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
