import vueRouter from 'vue-router'
import login from './components/login.vue'

// 实例化路由
const routerInstance = new vueRouter({
    routes: [
        {
            path: '/', component: login
        }
    ]
})

export default routerInstance