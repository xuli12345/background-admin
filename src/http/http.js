 import axios from "axios";
 //导入store
 //  import store from "@/store/store"
 import {
   getAuther
 } from "../request/auther"

 const request = axios.create({
   baseURL: "http://localhost:8888/api/private/v1/"

 })

 //请求拦截器
 request.interceptors.request.use(config => {
   // Do something before request is sent
   //console.log(config)

   //在vuex中取出token对象 判断用户是否有登录
   //  let token = store.state.token;
   let token = getAuther();

   if (!config.url.includes("login")) {

     config.headers.Authorization = `${token}`
   }

   return config;
 }, error => {
   // Do something with request error
   return Promise.reject(error);
 });


 //响应拦截器
 request.interceptors.response.use(response => {
   // Do something before response is sent
   return response;
 }, error => {
   // Do something with response error
   return Promise.reject(error);
 });

 export default request
