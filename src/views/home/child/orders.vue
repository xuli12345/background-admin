<template>
  <div>
      <navmenus first="订单管理" second="订单列表"></navmenus>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="#" width="50"> </el-table-column>
      <el-table-column prop="date" label="订单编号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="订单价格" width="100">
      </el-table-column>
      <el-table-column prop="address" label="是否付款">
        <template slot-scope="scope">
          <el-tag type="danger">未付款</el-tag>
          <el-tag type="success">已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="" label="是否发货"> </el-table-column>
      <el-table-column prop="" label="下单时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
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
export default {
  data() {
    return {
      currentPage: 1,
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
