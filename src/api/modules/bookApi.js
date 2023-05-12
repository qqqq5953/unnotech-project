import useAxios from '@/composables/useAxios.js'

export default {
  getBookList: (url) => {
    return useAxios({
      url
    })
  },
  getSingleBook: (url) => {
    return useAxios({
      url
    })
  },
  postSingleBook: (url, data) => {
    return service({
      method: 'POST',
      url,
      data
    })
  },
  patchBookDetail: (url) => {
    return useAxios({
      method: 'PATCH',
      url,
      data
    })
  }
}
