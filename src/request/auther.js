/**
 * 本地保存登录信息
 */

//获取token
function getAuther() {
  return window.localStorage.getItem('token')
}
//设置token
function setAuther(token) {
  return window.localStorage.setItem("token", token)
}

//删除token
function removeAuther() {
  return window.localStorage.removeItem("token")
}

export {
  getAuther,
  setAuther,
  removeAuther
}
