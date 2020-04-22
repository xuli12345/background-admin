<template>
  <div class="login-box">
    <el-form
      label-position="top"
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="form"
    >
      <h1>用户登录</h1>
      <el-form-item label="用户名" prop="username" required>
        <el-input v-model.number="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass" required>
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from "@/request/index";
import { setAuther } from "@/request/auther";
export default {
  data() {
    return {
      ruleForm: {
        pass: "",
        username: ""
      },
      rules: {
        pass: [{ required: true, message: "请输入用密码", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 5, max: 18, message: "长度在 5 到 18 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await login({
            username: this.ruleForm.username,
            password: this.ruleForm.pass
          });

          if (res.meta.status === 400) {
            //参数错误 密码错误
            this.$message.error(res.meta.msg);
          } else if ((res.meta.status = 200)) {
            this.$message.success(res.meta.msg);
            setAuther(res.data.token);
            this.$router.push({ path: "/home" });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background-color: #2c4152;
  position: relative;
  .form {
    width: 580px;
    height: 440px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -290px;
    margin-top: -220px;
    padding: 40px;
    h1 {
      font-size: 30px;
      margin: 20px 0;
      font-weight: 700;
      color: #000;
    }
    .el-button--primary {
      width: 100%;
    }
  }
}
</style>
