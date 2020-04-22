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
function login({
  username,
  password
}) {
  return request({
    url: "login",
    method: "POST",
    data: {
      username: username,
      password: password
    }
  })
}
/**
 * 
 *   封装获取用户列表数据
 * 
 */
function userList({
  pagenum,
  pagesize,
  query
}) {
  return request({
    url: "users",
    method: "GET",
    params: {
      pagenum: pagenum,
      pagesize: pagesize,
      query: query
    }
  })
}
/**
 * 
 *   添加用户
 * 
 */
function adduser({
  username,
  password,
  email,
  mobile
}) {
  return request({
    url: "users",
    method: "POST",
    data: {
      username: username,
      password: password,
      email: email,
      mobile: mobile
    }
  })
}
/**
 * 
 *   设置用户状态
 * 
 */
function setUserStatus({
  id,
  state
}) {
  return request({
    url: `users/${id}/state/${state}`,
    method: "PUT",

  })
}
/**
 * 
 *  根据id查询用户 
 * 
 */
function searchUser({
  id
}) {
  return request({
    url: `users/${id}`,
    method: "GET",

  })
}
/**
 * 
 *   修改用户
 * 
 */
function setUser({
  id
}) {
  return request({
    url: `users/${id}`,
    method: "PUT",

  })
}
/**
 * 
 *   获取用户角色
 * 
 */
function getRule() {
  return request({
    url: "roles",
    method: "GET",

  })
}
/**
 * 
 *   选择分配用户角色
 * 
 */
function selectRole({
  id,
  rid
}) {
  return request({
    url: `users/${id}/role`,
    method: "PUT",
    data: {
      rid: rid
    }
  })
}
/**
 * 
 *  根据id删除用户
 * 
 */
function deleteUserOne({id}) {
  return request({
    url: `users/${id}`,
    method: "DELETE",  
  })
}
export {
  menusList,
  login,
  userList,
  adduser,
  setUserStatus,
  searchUser,
  setUser,
  getRule,
  selectRole,
  deleteUserOne

}
