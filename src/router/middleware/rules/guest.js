import store from '../../../store'
import cookies from 'js-cookie'

export default (to, from, next) => {
  const token = cookies.get('x-access-token')
  const user = localStorage.user
  if (!token && user) {
    console.log(token)
    store.dispatch('refreshToken')
    next({ name: 'home' })
  } else if (user && token) {
    next({ name: 'home' })
  } else {
    next()
  }
}
