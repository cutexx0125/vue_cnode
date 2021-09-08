import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
import './assets/css/vue.css'
import tab from './utils/tab'
import moment from 'moment'
import pubsub from 'pubsub-js'

Vue.config.productionTip = false

// 设置使用中文
moment.locale('zh-cn')

Vue.prototype.$tab = tab
Vue.prototype.$moment = moment
Vue.prototype.$pubsub = pubsub

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
