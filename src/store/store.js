import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);

import *as auther from "@/request/auther";

const store = new Vuex.Store({
  state: {
    menusList: [],
    token:auther.getAuther()//获取token
  },
  mutations: {
    saveMenus(state, data) {
      state.menusList = data
    },
    setToken(state,token){
        auther.setAuther(token);
        //将数据重新保存到vuex
        state.token=token;
    },
    delToken(state){
      //退出登录删除token
      auther.removeAuther();
      state.token='';
    }
  }
})


export default store
