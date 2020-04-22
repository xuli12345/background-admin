<template>
  <div>
    <navmenus first="权限管理" second="角色列表"></navmenus>
     <el-table
     border
      :data="tableData"
      style="width: 100%">
        <el-table-column
      type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="250">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="250">
      </el-table-column>
      <el-table-column prop="order" label="层级"  width="150">
     <template slot-scope="scope">

       <div v-if="scope.row.level=='0'">一级</div>
        <div v-else-if="scope.row.level=='1'">二级</div>
         <div v-else>三级</div>
     </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {getRightsList} from "@/request/role.js"
export default {
  data() {
    return {
           tableData: []
    };
  },
 async created(){
   let res = await getRightsList();
   console.log(res);
   if(res.meta.status===200){
     this.tableData=res.data;
   }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-table th>.cell {
    font-weight: 700;
    font-size: 14px
}
</style>
