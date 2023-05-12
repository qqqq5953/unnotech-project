import { toRefs, ref, reactive } from 'vue'
import http from '../api/index'

const DEFAULT_HEADER = {
  headers: { 'Content-Type': 'application/json' }
}

export default function useAxios({
  url,
  method = 'GET',
  headers = DEFAULT_HEADER,
  options = {}
}) {
  const data = ref(null)
  const state = reactive({
    error: null,
    loading: true
  })

  async function executeAxios() {
    try {
      const response = await http({ url, method, headers, options })
      data.value = response.data
    } catch (error) {
      state.error = {
        content: 'useAxios error',
        message: error.message
      }
    } finally {
      state.loading = false
    }
  }

  executeAxios()
  return { data, ...toRefs(state) }
}

// export default function useAxios(url, method, options) {
//   const yahooData = ref(null)
//   const state = reactive({
//     errorMesssage: null,
//     isLoading: false
//   })

//   const executeAxios = async () => {
//     state.isLoading = true

//     try {
//       const response = await axios[method](url, options)
//       yahooData.value = response.data
//     } catch (error) {
//       state.errorMesssage = error
//     } finally {
//       state.isLoading = false
//     }
//   }

//   executeAxios()

//   console.log('data.value', yahooData)
//   console.log('error.value', state.errorMesssage)
//   console.log('loading.value', state.isLoading)

//   return { yahooData, ...toRefs(state) }
// }
