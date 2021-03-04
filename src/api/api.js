import axios from 'axios'
import cookies from 'js-cookie'
const instance = axios.create({
  withCredentials: true
})

instance.interceptors.request.use(request => {
  const token = cookies.get('x-access-token')
  request.headers.common.Accept = 'application/json'
  request.headers.common['Content-Type'] = 'application/json'
  request.headers.common.Authorization = `Bearer ${token}`

  return request
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log(error)
    switch (error.response.status) {
      case 401: // Not Logged in or token is not provided
        console.log(error.response.data.message)
        // localStorage.removeItem('user')
        // window.location.reload()
        break
      case 419: // session expire
        console.log(error.response.data.message)
        // store.dispatch('logout')
        break

      case 503: // down for maintenance
        console.log('test')
        // window.location.reload()
        break
      case 500: // mostly database error or server error or htaccess error
        console.log('from axios interceptor: ' + error.response.data.message)
        break

      default:
        return Promise.reject(error)
    }
  }
)

export default instance
