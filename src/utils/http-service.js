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

// 挂载自定义对象
http['cus'] = {}

http.cus.downLoadFromBlob = (blob, name) => {
    let url = window.URL.createObjectURL(blob);
    let eleLink = document.createElement('a');
    eleLink.href = url
    // 如果name不存在, 将会是随即名称
    eleLink.download = name
    document.body.appendChild(eleLink)
    eleLink.click()
    window.URL.revokeObjectURL(url)
}

http.cus.vdtRes = (resStatus) => {
    return resStatus.toString().substring(0, 1) === '2' ? true : false
}

export default http;