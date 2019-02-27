// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import { WechatPlugin } from 'vux'
import Vuex from 'vuex'
import store from './store'

Vue.use(Vuex)
Vue.use(WechatPlugin)
Vue.use(VueAxios, axios)
Vue.use(VueRouter)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
