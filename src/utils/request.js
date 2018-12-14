// 后台请求函数库

// 导入配置文件
import config from '../config.js'

// http get工具函数 获取数据
// 异步处理request请求,摒弃使用回调函数模式  get请求
export function get (url, data) {
  return request(url, 'GET', data)
}
// post请求
export function post (url, data) {
  return request(url, 'POST', data)
}

// 总request函数
function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: (res) => {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}
