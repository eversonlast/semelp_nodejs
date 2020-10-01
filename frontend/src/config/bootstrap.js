/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import { BootstrapVueIcons } from 'bootstrap-vue'
import AxiosPlugin from 'vue-axios-cors';
import datePicker from 'vue-bootstrap-datetimepicker'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(AxiosPlugin)
Vue.use(datePicker)