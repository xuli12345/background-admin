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
        prop="date"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="层级">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
           tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    };
  }
};
</script>
<style lang="scss" scoped>

</style>
