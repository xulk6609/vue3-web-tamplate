export default [
  {
    url: '/login',
    method: 'post',
    response: ({ body }) => {
      if (body.username === 'admin' && body.password === '123456') {
        return {
          code: 200,
          success: true,
          message: '请求成功',
          data: {
            username: 'admin'
          }
        }
      } else {
        return {
          code: 201,
          success: false,
          message: '请求失败',
          data: {}
        }
      }
    }
  }
]
