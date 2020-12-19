import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axiosInstance from '../axiosAuth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
    products: null,
    product: null
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.user = userData.id
    },
    clearAuthData (state) {
      state.idToken = null
      state.user = null
    },
    storeProducts (state, productList) {
      state.products = productList
    },
    storeProduct (state, productData) {
      state.product = productData
    }
  },
  actions: {
    setLogoutTimer ({ commit }, expiration) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expiration * 1000)
    },
    login ({ commit, dispatch }, authData) {
      axiosInstance.post('api/v1/auth/login', {
        email: authData.email,
        password: authData.password
      }).then(res => {
        commit('authUser', {
          token: res.data.token,
          id: res.data.user.id
        })
        localStorage.setItem('idToken', res.data.token)
        localStorage.setItem('user', res.data.user.id)
        axiosInstance.get('api/v1/expire', {
          headers: {
            Authorization: 'Bearer ' + res.data.token
          }
        }).then(res => {
          localStorage.setItem('expirationDate', (res.data.expire * 1000))
          dispatch('setLogoutTimer', res.data.expire)
          router.replace('/about')
        }).catch(error => console.log(error))
      }).catch(error => console.log(error))
    },
    logout ({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('idToken')
      localStorage.removeItem('user')
      router.replace('/')
    },
    tryAutoLogin ({ commit }) {
      const token = localStorage.getItem('idToken')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now.getTime() >= expirationDate) {
        return
      }
      const id = localStorage.getItem('user')
      commit('authUser', {
        token: token,
        user: id
      })
    },
    refresh ({ commit }) {
      console.log(localStorage.getItem('token'))
    },
    addProduct ({ commit }, productData) {
      console.log(productData)
      axiosInstance.post('api/v1/product', {
        title: productData.title,
        description: productData.description,
        price: productData.price,
        image: productData.image
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('idToken')
        }
      }).then(res => {

      }).catch(error => {
        console.log(error)
      })
    },
    products ({ commit }) {
      axiosInstance.get('api/v1/products', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('idToken')
        }
      }).then(res => {
        const products = []
        const rows = res.data.products
        for (const row in rows) {
          products.push(rows[row])
        }

        commit('storeProducts', products)
      }).catch(err => {
        console.log(err)
      })
    },
    editProduct ({ commit }, id) {
      axiosInstance.get('api/v1/products/' + id, {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('idToken')
        }
      }).then(res => {
        commit('storeProduct', res.data.product)
      }).catch(err => {
        console.log(err)
      })
    },
    updateProduct ({ commit }, productData) {
      axiosInstance.patch('api/v1/products/' + productData.id, {
        title: productData.title,
        description: productData.description,
        price: productData.price,
        image: productData.image
      }, {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('idToken')
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    deleteProduct ({ commit, dispatch }, productData) {
      axiosInstance.delete('api/v1/products/' + productData, {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('idToken')
        }
      }).then(res => {
        console.log(res)
        dispatch('products')
      }).catch(err => {
        console.log(err)
      })
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.idToken !== null
    },
    isProductList (state) {
      return state.products
    },
    product (state) {
      return state.product
    }
  },
  modules: {
  }
})
