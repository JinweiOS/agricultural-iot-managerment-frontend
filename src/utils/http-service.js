// 引入 axios
import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10 * 1000

})

// http 拦截器
http.interceptors.request.use(config => {
    if (config.url !== '/login') {
        config.headers['address'] = sessionStorage.getItem('address');
        config.headers['role'] = sessionStorage.getItem('role');
    }
    return config
})

export default http;