
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    configFlag: false,
    selected: '详细信息'
  },
  mutations: {
    setConfigFlag (state) {
      state.configFlag = true
    },
    setSelected (state, sel) {
      state.selected = sel
    }
  }
})

export default store
