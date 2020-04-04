import axios from 'axios'

export function request(config){
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000/api/h3',
    timeout:5000
  })
  // axios的拦截器
  instance.interceptors.request.use(config=>{
    return config
  },error => {

  })
  // axios的响应拦截
  instance.interceptors.response.use(res =>{
      return res.data
  },error => {
    console.log(error)
  })
  return instance(config)
}
