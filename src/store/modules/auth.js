import repository from '../../api/repository'

const state = {
  user: localStorage.user ? JSON.parse(localStorage.getItem('user')) : null
}

const mutations = {
  SET_USER (state, user) {
    const now = new Date()
    const expireDuration = new Date()
    user.expireDuration = expireDuration.setTime(now.getTime() + user.expires_in * 1000)
    localStorage.user = JSON.stringify(user)
    state.user = user
  },
  RemoveLoggedUser (state) {
    state.user = null
    localStorage.removeItem('user')
  }
}

const actions = {
  login: async ({ commit }, user) => {
    const { data } = await repository.login(user)
    commit('SET_USER', data)
  },
  logout: async ({ commit }) => {
    await commit('RemoveLoggedUser')
  }
}
const getters = {
  user: state => state.user,
  authenticated: state => state.user !== null
}
export default {
  state,
  getters,
  mutations,
  actions
}
