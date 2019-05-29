import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import data from './modules/data'
import options from './modules/options'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    'data': data,
    'options': options
  },
  /*plugins: [
    new VuexPersist({ storage: window.localStorage }).plugin
  ]*/
})
