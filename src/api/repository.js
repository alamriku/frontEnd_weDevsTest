import api from './api'
const URL = process.env.VUE_APP_API

export default {
  axiosInstance: api,
  login (params) {
    return api.post(`${URL}/auth/login`, params)
  },
  getRefreshToken (saver) {
    return api.post(`${URL}/auth/refresh-token`, { carry: saver })
  },
  kickout () {
    return api.post(`${URL}/logout`)
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
