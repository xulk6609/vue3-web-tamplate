import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

// 定义响应数据的结构
interface ResponseData<T = any> extends AxiosResponse {
  code: number
  msg: string
  data: T
  success: boolean
}

const service = axios.create({
  baseURL: '',
  timeout: 5000
})

/**
 * @description 请求拦截器
 */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 可以在这里添加全局的请求前处理逻辑，比如添加token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * @description 响应拦截器
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data as ResponseData | Blob
    if (res instanceof Blob) {
      // 如果是文件流，直接返回
      return response
    }
    // 判断是否隐藏提示信息
    if (res.code !== 200 && response.config?.headers?.hideMsg !== 'true') {
      ElMessage({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      // 正常返回完整的 AxiosResponse
      return response.data
    }
  },
  (error) => {
    ElMessage({
      message: 'The service is unavailable',
      type: 'error',
      duration: 2000
    })
    return Promise.reject(error)
  }
)

export default service
