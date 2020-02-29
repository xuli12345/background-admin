import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const routes=[{
  path: '/',
  name: 'login',
  component: ()=>import("@/views/login")
}]


export default new Router({
 routes
})
