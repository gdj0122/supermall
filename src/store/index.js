import Vue from "vue";
import Vuex from "vuex"

import mutations from "./Mutations";
import actions from "./Actions";
import getters from "./getters";
Vue.use(Vuex)
let state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

export default store
