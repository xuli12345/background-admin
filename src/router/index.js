import Vue from 'vue'
import Router from 'vue-router'
//导入
import {
  getAuther
} from "../request/auther"
// 注意：在js文件中使用element组件 按照下面更优雅哦~~
import {
  Message
} from 'element-ui'

Vue.use(Router)
const routes = [{
    path: '/login',
    name: 'login',
    component: () => import("@/views/login")
  },
  {
    path: '/home',
    name: 'home',
    component: () => import("@/views/home/home"),
    children: [{
        path: "/users",
        name: "users",
        component: () => import("@/views/home/child/users")
      },
      {
        path: "/roles",
        name: "roles",
        component: () => import("@/views/home/child/roles")
      },
      {
        path: "/rights",
        name: "rights",
        component: () => import("@/views/home/child/rights")
      },
      {
        path: "/goods",
        name: "goods",
        component: () => import("@/views/home/child/goods")
      },
      {
        path: "/params",
        name: "params",
        component: () => import("@/views/home/child/params")
      },
      {
        path: "/categories",
        name: "categories",
        component: () => import("@/views/home/child/categories")
      },
      {
        path: "/orders",
        name: "orders",
        component: () => import("@/views/home/child/orders")
      },
      {
        path: "/reports",
        name: "reports",
        component: () => import("@/views/home/child/reports")
      }
    ],
  },
  {
    path: "/",
    redirect: "/home"
  }
]

//创建路由对象
let router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  next()
  // if (to.name.includes('login')) {
  //   next()
  // } else {
  //   let token = getAuther()
  //   if (token) {
  //     next()
  //   } else {
  //     next("/login");
  //     Message.warning("请先登录!")
  //   }
  // }
})

export default router
