<template>
  <div>
    <navmenus first="用户管理" second="用户列表"></navmenus>
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
        <el-button type="success" plain>添加用户</el-button></el-col
      >
    </el-row>
    <!-- 表格数据 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>
      <el-table-column prop="status" label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
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
            type="success"
            icon="el-icon-check"
            plain
            size="small"
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
      value: true,
      currentPage: 2,
      tableData: [
        {
          username: "2016-05-02",
          email: "王小虎",
          phone: "上海市普陀区金沙江路 1518 弄",
          status: true
        },
        {
          username: "2016-05-04",
          email: "王小虎",
          phone: "上海市普陀区金沙江路 1517 弄",
          status: true
        },
        {
          username: "2016-05-01",
          email: "王小虎",
          phone: "上海市普陀区金沙江路 1519 弄",
          status: true
        },
        {
          username: "2016-05-03",
          email: "王小虎",
          phone: "上海市普陀区金沙江路 1516 弄",
          status: true
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
