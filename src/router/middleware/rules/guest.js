import store from '../../../store'

export default (to, from, next) => {
  if (store.getters.authenticated) {
    const currentMillisecond = new Date().getTime()
    const user = JSON.parse(localStorage.getItem('user'))
    const expireMillisecond = user.expireDuration
    if (expireMillisecond > currentMillisecond) {
      next({ name: 'home' })
    } else {
      store.dispatch('logout')
      next()
    }
  } else {
    next()
  }
}
