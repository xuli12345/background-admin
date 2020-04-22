<template>
  <div class="nav">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ first }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ second }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: ["first", "second"],
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.nav {
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  background-color: #d0dce6;
}
</style>
