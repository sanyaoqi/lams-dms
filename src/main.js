// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import { WechatPlugin, LocalePlugin, ConfirmPlugin, AlertPlugin, LoadingPlugin } from 'vux'
import store from './store'
import vuexI18n from 'vuex-i18n'
import testdata from './testdata'
import utils from './utils'
import api from './api'

Vue.use(testdata)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

Vue.use(WechatPlugin)
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(vuexI18n.plugin, store)

Vue.use(LocalePlugin)
const nowLocale = Vue.locale.get()
// console.log(nowLocale)
if (/zh/.test(nowLocale)) {
  Vue.i18n.set('zh-CN')
} else {
  Vue.i18n.set('en')
}

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.USER = null
Vue.prototype.TOKEN = null
Vue.prototype.utils = utils
Vue.prototype.api = api

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
