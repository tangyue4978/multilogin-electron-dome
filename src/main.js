import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.prototype.$https = axios

new Vue({
  router,
  store,
  vuetify,
  icons: {
    iconfont: 'mdi', // 默认值 - 仅用于展示目的
  },
  render: h => h(App),
}).$mount('#app')
