export default function ({app,error}) {
  let axios = app.$axios; 

  let baseURL = process.env.__ENV == 'production' ? 'https://api.jinqiulive.com' : 'http://192.168.1.200:9000';
  console.log('process.env.__ENV',process.env.__ENV)
  
  axios.defaults.baseURL = baseURL;
 
  // 基本配置
  axios.defaults.timeout = 10000
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  // 请求回调
  axios.onRequest(config => {
    console.log('request',config)
  })
  // 返回回调
  axios.onResponse(res => {
  	console.log('请求成功回调res',res)
  })


  // 错误回调，把错误信息显示在layout目录下的error页面上，便于调试
  axios.onError(err => {
    error({statusCode:404,message:JSON.stringify(err.config)})
  })
}