

import request from "@/http/http"

/***
 * 
 *   封装获取左侧导航菜单栏
 * 
 */
function menusList() {
  return request({
    url: "menus",
    method: "GET",
  })
}

/**
 * 
 *   封装获取用户登录
 * 
 */
 function login ({username, password}){
     return request({
         url:"login",
         method:"POST",
         data:{
             username:username,
             password:password
         }
     })
 }
 /**
 * 
 *   封装获取用户登录
 * 
 */

export {
    menusList,
    login,
}
