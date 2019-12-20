import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.less' // 引入初始化样式
import 'element-ui/lib/theme-chalk/index.css' // 引入element样式
import ElementUI from 'element-ui' // 引入UI包
import axios from 'axios' // 引入axios 配置baseUrl
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值黑马头条的默认地址
Vue.prototype.$axios = axios // 赋值给全局对象
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
