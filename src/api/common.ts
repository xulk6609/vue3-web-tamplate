import request from '@/utils/request'
import { LogIn } from './common.d'

// 登录
export function logIn(data: LogIn) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 上传
export function uploadFile(data: any) {
  return request({
    url: '/api/Upload/UploadFile',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data
  })
}

// 取消token 测试接口
export function testCancel(data: any, cancelToken?: any) {
  return request({
    url: '/cancel',
    method: 'post',
    data,
    cancelToken
  })
}
