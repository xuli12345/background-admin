import request from "@/http/http"
/**
 *  获取商品列表数据
 * 
 */

 function goodsData({query,pagenum,pagesize}){
     return request({
         url:'goods',
         method:"GET",
         params:{
             query:query,
             pagenum:pagenum,
             pagesize:pagesize
         }
     })
 }

 export {
     goodsData
 }