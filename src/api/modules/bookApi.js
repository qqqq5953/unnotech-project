import http from '@/api/index.js'

export default {
  getBookList: (url) => {
    return http({
      url
    })
  },
  getSingleBook: (url) => {
    return http({
      url
    })
  },
  postSingleBook: (url, data) => {
    return http({
      method: 'POST',
      url,
      data
    })
  },
  patchBookDetail: (url, data) => {
    return http({
      method: 'PATCH',
      url,
      data
    })
  }
}
