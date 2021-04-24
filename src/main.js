import Vue from 'vue'
import App from './main.vue'

// elementui 引入
import './assets/element-25B864/index.css'
import elementUI from 'element-ui'
Vue.use(elementUI)

// vue-router 引入
import routerIns from './router'
import vueRouter from 'vue-router'
Vue.use(vueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: routerIns
}).$mount('#app')
