import store from '../../../store'
// import repository from '../../../api/repository'
import cookies from 'js-cookie'
export default (to, from, next) => {
  const token = cookies.get('x-access-token')
  const user = localStorage.user
  if (!token && user) {
    console.log('test')
    store.dispatch('refreshToken')
    next()
  } else if (user && token) {
    next()
  } else if (token === 'undefined' && user) {
    console.log('test')
    store.dispatch('refreshToken')
    console.log(token)
  } else {
    store.dispatch('getout')
    store.dispatch('logout')
    next({ name: 'login' })
  }
}
