<template>
  <div>
    <navmenus first="商品管理" second="商品列表"></navmenus>
    <el-row>
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="inputValue"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button> </el-input
      ></el-col>
      <el-col :span="12">
        <el-button type="success" plain>添加商品</el-button></el-col
      >
    </el-row>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column prop="#" type="index" width="50"> </el-table-column>
      <el-table-column prop="date" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="name" label="商品价格(元)" width="180">
      </el-table-column>
      <el-table-column prop="address" label="商品重量"> </el-table-column>
      <el-table-column prop="time" label="创建时间"> </el-table-column>
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
    <!-- 分页 -->
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
export default {
  data() {
    return {
      inputValue: "",
      currentPage:1,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
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
