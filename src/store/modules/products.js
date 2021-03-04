import repository from '../../api/repository'

const state = {
  products: null,
  singleProduct: null,
  loading: false
}

const mutations = {
  storeProducts (state, productList) {
    state.products = productList
  },
  storeProduct (state, productData) {
    state.singleProduct = productData
  },
  alerting (state) {
    state.loading = false
  }
}

const actions = {
  addProduct: async ({ commit }, productData) => {
    return await repository.postProduct(productData)
  },
  products: async ({ commit }) => {
    try {
      repository.axiosInstance.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      const { data } = await repository.products()
      const products = []
      const rows = data.products
      for (const row in rows) {
        products.push(rows[row])
      }
      commit('storeProducts', products)
    } catch (e) {
      console.log(e)
    }
  },
  editProduct: async ({ commit }, id) => {
    try {
      const { data } = await repository.product(id)
      commit('storeProduct', data)
    } catch (e) {
      console.log(e)
    }
  },
  updateProduct: async ({ commit }, dataObject) => {
    await repository.updateProduct(dataObject.id, dataObject.editForm)
  },
  deleteProduct: async ({ commit, dispatch }, productId) => {
    try {
      await repository.deleteProduct(productId)
    } catch (e) {
      console.log(e.response)
    }
  }
}

const getters = {
  isProductList (state) {
    return state.products
  },
  product (state) {
    return state.singleProduct
  },
  notify (state) {
    return state.loading
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
