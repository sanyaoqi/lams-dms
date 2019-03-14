
import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    configFlag: false,
    selected: '详细信息',
    currentRepair: {}
  },
  modules: {
    i18n: vuexI18n.store
  },
  mutations: {
    setConfigFlag (state) {
      state.configFlag = true
    },
    setSelected (state, sel) {
      state.selected = sel
    },
    setCurrentRepair (state, device) {
      state.currentRepair = device
    }
  }
})

export default store
