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
        <el-button type="success" plain @click="addGoods">添加商品</el-button></el-col
      >
    </el-row>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column prop="#" type="index" width="50"> </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="500">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="120">
      </el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="120">
      </el-table-column>

      <el-table-column prop="add_time" label="创建时间" width="180">
        <template slot-scope="scope">
          {{ tableData.add_time | timeFilter }}
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
      :page-sizes="[50, 100, 150, 200]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import { goodsData } from "@/request/goods";
export default {
  data() {
    return {
      inputValue: "",
      currentPage: 1,
      query: "",
      pagenum: 1,
      pagesize: 10,
      total: 0,
      tableData: []
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.getGoodsList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getGoodsList();
    },
    async getGoodsList() {
      let res = await goodsData({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      });
 
      if (res.meta.status === 200) {
        this.tableData = res.data.goods;
        this.total = res.data.total;
      }
    },
    //添加商品列表
    addGoods(){
   this.$router.push({path:"/goods/add"})
    }
  },
  created() {
    this.getGoodsList();
  }
};
</script>
<style lang="scss" scoped></style>
