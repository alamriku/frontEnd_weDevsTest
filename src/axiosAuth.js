import axios from 'axios'
// import LocalStorageService from './services/LocalStorageService'
import router from './store'
const instance = axios.create({
  baseURL: 'http://product-crud.test/'
})

// Add a response interceptor

axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  if (error.response.status === 401) {
    router.push('/login')
    return Promise.reject(error)
  }
})
export default instance
