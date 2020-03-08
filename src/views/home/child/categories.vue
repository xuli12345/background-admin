<template>
  <div>
    <navmenus first="商品管理" second="商品分类"></navmenus>
    <el-button type="success" plain>添加分类</el-button>
    <!-- 基于element ui的表格树格element-tree-grid -->
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" border>
      <el-table-tree-column prop="data" parent-key="parentId" label="分类名称">
      </el-table-tree-column>
      <el-table-column prop="name" label="级别" width="180"> </el-table-column>
      <el-table-column prop="address" label="是否有效"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="small"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
  </div>
</template>
<script>
import Vue from "vue";
import ElTreeGrid from "element-tree-grid";
Vue.component(ElTreeGrid.name, ElTreeGrid);
export default {
  data() {
    return {
      currentPage: 1,
      tableData: [
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
              children: [
                {
                  id: 33,
                  date: "2016-05-01",
                  name: "王小虎",
                  address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                  id: 34,
                  date: "2016-05-01",
                  name: "王小虎",
                  address: "上海市普陀区金沙江路 1519 弄"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang="scss" scoped></style>
