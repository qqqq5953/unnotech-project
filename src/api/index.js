import axios from 'axios'

const http = axios.create({
  baseURL: 'https://fe-interview-api.unnotech.com',
  headers: { 'Content-Type': 'application/json' }
})

http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log('request error', error)
  }
)

http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log('response error', error)
  }
)

export default http
