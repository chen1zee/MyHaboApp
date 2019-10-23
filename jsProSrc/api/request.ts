/**
 * 请求封装
 * */
import config from "js_pro_src/config";
import axios from "axios"

function request() {
  const service = axios.create({
    baseURL: config.baseURL,
    withCredentials: true, // 跨域请求时发送 cookies
    timeout: 60000 // request timeout x ms--
  })
  service.interceptors.request.use(
    conf => {
      // Do something before request is sent
      // const token =
      return conf
    }
  )
}

export default request
