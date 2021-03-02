import api from './api'
const URL = process.env.VUE_APP_API

export default {
  login (params) {
    return api.post(`${URL}/auth/login`, params)
  },
  products () {
    return api.get(`${URL}/products`)
  },

  postProduct (params) {
    return api.post(`${URL}/product`, params)
  },

  product (id) {
    return api.get(`${URL}/products/${id}`)
  },

  updateProduct (id, params) {
    return api.post(`${URL}/products/${id}`, params)
  },

  deleteProduct (id) {
    return api.delete(`${URL}/products/${id}`)
  }
}
