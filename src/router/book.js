const bookRoute = [
  {
    path: '/book',
    name: 'Book',
    component: () => import('@/views/Book.vue')
  },
  {
    path: '/book/:bookId',
    name: 'Detail',
    component: () => import('@/views/Detail.vue'),
    props: true
  }
]

export default bookRoute
