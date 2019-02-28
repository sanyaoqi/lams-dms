
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    configFlag: false
  },
  mutations: {
    setConfigFlag (state) {
      state.configFlag = true
    }
  }
})

export default store
