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
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search"
          ></el-button> </el-input
      ></el-col>
      <el-col :span="12">
        <el-button type="success" plain @click="dialogFormVisible = true"
          >添加用户</el-button
        ></el-col
      >
    </el-row>
    <!-- 表格数据 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="status" label="用户状态">
        <template slot-scope="scope">
          <!-- switch用input中的change事件 -->
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="setStatus(scope.row)"
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
            @click="edit(scope.row)"
          ></el-button>
          <!-- 角色按钮 -->
          <el-button
            type="success"
            icon="el-icon-check"
            plain
            size="small"
            @click="handerRule(scope.row)"
          ></el-button>

          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="small"
            @click="deleteUser(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加用户弹窗 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" status-icon>
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 修改用户 -->
    <el-dialog title="修改用户" :visible.sync="setDialogFormVisible">
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" status-icon>
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="ruleDialogFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="当前用户">{{ ruleForm.username }}</el-form-item>

        <el-form-item label="请选择角色" prop="rule">
          <el-select v-model="ruleValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleDesc"
              :value="item.roleName"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ruleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  userList,
  adduser,
  setUserStatus,
  searchUser,
  setUser,
  getRule,
  selectRole,
  deleteUserOne
} from "@/request/index";
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (!reg.test(value)) {
        return callback(new Error("请输入合法的邮箱！"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!value) {
        return callback(new Error("手机号码不能为空！"));
      }
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error("请输入合法的手机号码！"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      //搜索框的值
      inputValue: "",
      value: true,
      //页码
      pagenum: 1,
      //页容量
      pagesize: 10,
      //总条数
      total: 0,
      tableData: [],
      //添加用户弹窗是否显示
      dialogFormVisible: false,
      //修改用户弹窗是否显示
      setDialogFormVisible: false,
      //角色用户弹窗是否显示
      ruleDialogFormVisible: false,
      //用户id
      id: "",
      //删除用户的id
      // userId:'',
      addForm: {
        username: "",
        password: "",
        email: "",
        phone: ""
      },
      editForm: {
        username: "",
        email: "",
        phone: ""
      },
      ruleForm: {
        username: ""
      },
      //角色数据
      ruleValue: "",
      //角色权限id
      roleId: "",
      options: [],
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],

        email: [{ validator: checkEmail, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }]
      }
    };
  },

  methods: {
    async getUserList() {
      let res = await userList({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.inputValue
      });
      this.tableData = res.data.users;
      this.total = parseInt(res.data.total);
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUserList();
    },
    search() {
      this.getUserList();
    },
    //设置用户状态
    async setStatus(item) {
      let res = await setUserStatus({
        id: item.id,
        state: item.mg_state
      });
      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg);
      } else {
        this.$message.warning(res.meta.msg);
      }
    },
    //修改用户根据id查询要修改的用户
    async edit(item) {
      this.id = item.id;
      this.setDialogFormVisible = true;
      let res = await searchUser({
        id: item.id
      });
      if (res.meta.status === 200) {
        this.editForm = res.data;
      }
    },
    //角色按钮  获取权限id
    async handerRule(item) {
      this.ruleForm.username = item.username;
      this.ruleDialogFormVisible = true;
      let res = await getRule();
      this.options = res.data;
      this.ruleForm = item;
    },
    async deleteUser(item) {
      let res = await deleteUserOne({
        id: item.id
      });
      
  
      this.$confirm("确实要删除改用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getUserList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          console.log(formName);
          //提取res变量
          let res;
          if (formName == "addForm") {
            res = await adduser({
              username: this.addForm.username,
              password: this.addForm.password,
              email: this.addForm.email,
              mobile: this.addForm.phone
            });
          } else if (formName == "editForm") {
            res = await setUser({
              id: this.id
            });
          } else if (formName == "ruleForm") {
            res = await selectRole({
              id: this.ruleForm.id,
              rid: this.ruleForm.role_name
            });
          }
          if (res.meta.status === 200 || res.meta.status === 201) {
            this.$message.success(res.meta.msg);
            this.getUserList();
            this.dialogFormVisible = false;
            this.setDialogFormVisible = false;
            this.ruleDialogFormVisible = false;
            // 重置表单
            this.$refs[formName].resetFields();
          }
        } else {
          this.$message.warning("请正确输入数据");
          return false;
        }
      });
    }
  },
  created() {
    //获取用户列表数据
    this.getUserList();
  }
};
</script>
<style lang="scss" scoped></style>
