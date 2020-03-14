import axios from 'axios'

export function request(config) {
      // 1.创建axios实例
      const instance1 = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        // baseURL: 'http://106.54.54.237:8000/api/wh',
        timeout: 5000
    })

    // 2.axios拦截器
    // 2.1.请求拦截
    instance1.interceptors.request.use(config => {
        // console.log(config)
        // 1.比如config中一些信息不符合服务器要求
        // 2.比如每次发送网络请求时，都希望在界面显示一个请求的图标
        // 3.某些请求(比如登录(token)),必须携带一些特殊信息
        return config
    },
    err => {
        console.log(err)
    })
// 2.2.响应拦截
instance1.interceptors.response.use(res => {
    // console.log(res)
    return res.data
}, err => {
    // console.log(err)
})
    // 3.发送真正的网络请求
   return instance1(config)
 }