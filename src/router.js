import apply from './components/apply.vue'
import vueRouter from 'vue-router'
import login from './components/login.vue'
import info from './components/info.vue'
import tab from './components/tab.vue'
import panel from './components/panel.vue'

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
        },
        {
            path:'/tab', component: tab
        },
        {
            path: '/panel', component: panel
        }
    ]
})

export default routerInstance