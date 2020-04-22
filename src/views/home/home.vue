<template>
  <el-container class="container">
    <el-header>
      <el-row>
        <el-col :span="4"><img src="../../assets/logo.png" alt=""/></el-col>
        <el-col :span="16"><h1>电商后台管理系统</h1></el-col>
        <el-col :span="4" class="right">
          <el-button @click="loginOut" type="success">退出</el-button></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          router
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 这里的index不能去掉,匹配路由的 -->
          <el-submenu
            :index="index + ''"
            v-for="(item, index) in $store.state.menusList"
            :key="index"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>

            <el-menu-item
              :index="`/${item1.path}`"
              v-for="(item1, idx) in item.children"
              :key="idx"
            >
              <i class="el-icon-menu"></i>
              <span> {{ item1.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { menusList } from "../../request/index";
export default {
  data() {
    return {
      // menus: ""
    };
  },
  methods: {
    loginOut() {
      this.$confirm("你确定要退出吗？", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$store.commit("delToken");
          this.$router.push({ path: "/login" });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message: "取消退出"
          });
        });
    }
  },
  async created() {
    let res = await menusList();
    this.$store.commit("saveMenus", res.data);
    // this.menus = this.$store.state.menusList;
  }
};
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  /deep/ .el-menu {
    height: 100%;
  }
  /deep/ .el-submenu .el-menu-item {
    min-width: 199px;
  }

  .el-main {
    padding: 0px;
  }
  .main {
    padding-left: 20px;
    background-color: #e7eef3;
  }
}
.el-header {
  background-color: #afc0d1;
  line-height: 60px;
  h1 {
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    color: #fff;
  }
  .right {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
