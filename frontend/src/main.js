import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'

import './config/bootstrap'
import './config/axios'
import './config/msgs'
import './config/mq'

import store from './config/store'
import App from './App'
import router from './config/router'
import moment from 'moment'

Vue.prototype.moment = moment
Vue.config.productionTip = false

new Vue({
  store, 
  router,
  render: h => h(App)
}).$mount('#app')