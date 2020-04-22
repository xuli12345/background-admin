import request from "@/http/http";
/**
 *  
 * 获取角色列表
 */

function rolesList() {
  return request({
    url: "roles",
    method: "GET",
  })
}

/**
 *  
 * 删除角色权限
 */

function deleteAuthority(roleId,rightsId) {
    return request({
      url:`/roles/${roleId}/rights/${rightsId}`,
      method: "DELETE",
    })
  }

  /**
 *  
 * 添加角色权限
 */

function addAuthority({roleName,roleDesc}) {
  return request({
    url:'/roles',
    method: "POST",
    data:{
      roleName:roleName,
      roleDesc:roleDesc,
    }
  })
}

  /**
 *  
 * 保存编辑角色权限
 */

function saveAuthority({roleId,roleName,roleDesc}) {
  return request({
    url:`/roles/${roleId}`,
    method: "PUT",
    data:{
      roleName:roleName,
      roleDesc:roleDesc,
    }
  })
}

 /**
 *  
 * 删除角色权限
 */

function deteleAuthority(roleId) {
  return request({
    url:`/roles/${roleId}`,
    method: "DELETE",  
  })
}

 /**
 *  
 * 获取树形菜单数据
 */

function getTreeData() {
  return request({
    url:'/rights/tree',
    method: "GET",  
  })
}

 /**
 *  
 * 保存树形菜单角色的权限
 */

function saveTreeData({currentRoleId,rids}) {
  return request({
    url:`/roles/${currentRoleId}/rights`,
    method: "POST", 
    data:{
      rids:rids
    } 
  })
}

 /**
 *  
 * 获取权限列表数据
 */

function getRightsList() {
  return request({
    url:'/rights/list',
    method: "GET", 
 
  })
}
export {
  rolesList,
  deleteAuthority,
  addAuthority,
  saveAuthority,
  deteleAuthority,
  getTreeData,
  saveTreeData,
  getRightsList
}
