import { createStore } from "vuex";
import actions from "./actions";
import mutations from "./mutation";
import state from "./state";
export default createStore({
  state,
  mutations,
  actions,
  modules: {},
});
