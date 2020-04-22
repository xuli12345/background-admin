// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import "./assets/base.css"
//注册全局面包屑组件
import navmenus from "./components/navmenus.vue"
Vue.component("navmenus",navmenus)

//引入时间过滤器
import moment from "moment";
Vue.filter("timeFilter",function(time,patten='YYYY-MM-DD HH:mm:ss'){
  return moment(time).format(patten)
})
//导入Vuex
import store from "./store/store"
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
