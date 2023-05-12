import axios from 'axios'

const http = axios.create({
  baseURL: 'https://fe-interview-api.unnotech.com'
})

http.interceptors.request.use(
  (config) => {
    // console.log('config', config)
    // const controller = new AbortController()
    // const cfg = {
    //   ...config,
    //   signal: controller.signal
    // }
    // axiosControllerQueue.value.push(controller)
    // return cfg
    return config
  },
  (error) => {
    console.log('request error', error)
    // handleError(error)
  }
)

http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log('response error', error)
    // handleError(error)
  }
)

function handleError(error) {
  const $store = useApiStore()
  const { setAxiosMessage } = $store

  const sentError = {
    id: Date.now(),
    title: error.response.data.includes('DOCTYPE')
      ? `${error.message} (${error.response.status})`
      : `${error.response.data} (${error.response.status})`,
    status: false
  }
  setAxiosMessage(sentError)
}

export default http
