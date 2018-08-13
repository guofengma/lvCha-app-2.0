import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state:{
          hdgzState:false,
          hlz:1000,
    },
    mutations:{
        hideHdgz (state) {
            // 变更状态
            state.hdgzState = false
        },
        showHdgz(state){
            state.hdgzState = true
        }
    }
});
