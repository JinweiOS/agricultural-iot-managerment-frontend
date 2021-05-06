import apply from './components/apply.vue'
import vueRouter from 'vue-router'
import login from './components/login.vue'
import info from './components/info.vue'

// 实例化路由
const routerInstance = new vueRouter({
    routes: [
        {
            path: '/', component: login
        },
        {
            path: '/apply', component: apply
        },
        {
            path: '/info', component: info
        }
    ]
})

export default routerInstance