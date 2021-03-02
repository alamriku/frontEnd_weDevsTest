import store from '../../../store'

export default (to, from, next) => {
  if (store.getters.authenticated) {
    const currentMillisecond = new Date().getTime()
    const user = JSON.parse(localStorage.getItem('user'))
    const expireMillisecond = user.expireDuration
    if (currentMillisecond > expireMillisecond) {
      store.dispatch('logout')
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next({ name: 'login' })
  }
}
