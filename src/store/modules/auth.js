import repository from '../../api/repository'
import cookies from 'js-cookie'
const state = {
  user: localStorage.user ? localStorage.user : null,
  token: null,
  longLife: null
}

const mutations = {
  SET_USER (state, user) {
    localStorage.user = JSON.stringify(user)
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  },

  REMOVE_TOKEN (state) {
    state.token = null
    state.longLife = null
  },
  RemoveLoggedUser (state) {
    state.user = null
    localStorage.removeItem('user')
    console.log('logout')
  },
  liverSaverToken (state, longLiveToken) {
    state.longLife = longLiveToken
    localStorage.lifeSaver = longLiveToken
  }
}

const actions = {
  login: async ({ commit }, user) => {
    return await repository.login(user)
  },
  setToken ({ commit }, { token, expiresIn, user, llv }) {
    const expiryTime = new Date(new Date().getTime() + expiresIn * 1000)
    commit('SET_USER', user.email)
    commit('liverSaverToken', llv)
    cookies.set('x-access-token', token, { expires: expiryTime })
  },
  setAfterRefresh ({ commit }, { token, expiresIn, llv }) {
    const expiryTime = new Date(new Date().getTime() + expiresIn * 1000)
    cookies.set('x-access-token', token, { expires: expiryTime })
    commit('SET_TOKEN', token)
    commit('liverSaverToken', llv)
  },
  async refreshToken ({ dispatch }) {
    try {
      const saver = localStorage.lifeSaver
      const { data } = await repository.getRefreshToken(saver)
      dispatch('setAfterRefresh', data)
    } catch (e) {
      console.log(e)
    }
  },
  logout ({ commit }) {
    cookies.remove('x-access-token')
    commit('REMOVE_TOKEN')
    commit('RemoveLoggedUser')
  },
  getout () {
    repository.kickout()
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
