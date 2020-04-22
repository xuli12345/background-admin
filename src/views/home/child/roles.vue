<template>
  <div>
    <navmenus first="权限管理" second="角色列表"></navmenus>
    <el-button type="success" @click="addPrompt">添加角色</el-button>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="item in scope.row.children" :key="item.id">
            <el-col :span="4">
              <el-tag
                closable
                type=""
                @close="handleCloseRights(scope.row, item)"
              >
                {{ item.authName }}
              </el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="item1 in item.children" :key="item1.id">
                <el-col :span="6">
                  <el-tag
                    closable
                    type="success"
                    @close="handleCloseRights(scope.row, item1)"
                  >
                    {{ item1.authName }}
                  </el-tag>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    v-for="item2 in item1.children"
                    :key="item2.id"
                    closable
                    type="warning"
                    @close="handleCloseRights(scope.row, item2)"
                  >
                    {{ item2.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-show="scope.row.children.length === 0">
            没有分配权限
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"> </el-table-column>
      <el-table-column label="角色名称" prop="roleName"> </el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="small"
            @click="handleEdit(scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            plain
            size="small"
            @click="handleJurisdiction(scope.row)"
          ></el-button>

          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="small"
            @click="handleDelete(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加角色弹窗 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form
        :model="addRoles"
        :rules="rules"
        ref="addRoles"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoles.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoles.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addRoles')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 编辑角色弹窗 -->
    <el-dialog title="编辑角色" :visible.sync="editFormVisible">
      <el-form
        :model="editRoles"
        :rules="rules"
        ref="editRoles"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRoles.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRoles.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editRoles')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 权限分配树形菜单 -->
    <el-dialog title="权限分配" :visible.sync="distributionFormVisible">
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="checkedIds"
        :props="defaultProps"
        ref="tree"
      >
      </el-tree>
      <el-row class="btns">
        <el-button @click="distributionFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {
  rolesList,
  deleteAuthority,
  addAuthority,
  saveAuthority,
  deteleAuthority,
  getTreeData,
  saveTreeData
} from "@/request/role.js";
import { menusList } from "@/request/index";
export default {
  data() {
    return {
      tableData: [],
      //添加角色弹窗是否显示
      dialogFormVisible: false,
      //编辑角色弹窗是否显示
      editFormVisible: false,
      //分配权限弹窗是否显示
      distributionFormVisible: false,
      //角色id
      roleId: "",
      //当前角色的id
      currentRoleId: "",
      addRoles: {
        roleName: "",
        roleDesc: ""
      },
      editRoles: {
        roleName: "",
        roleDesc: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      },
      treeData: [],
      //默认选中的ids
      checkedIds: [],
      defaultProps: {
        children: "children",
        label: "authName"
      }
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    //获取角色列表
    async getRoleList() {
      let res = await rolesList();
      if (res.meta.status === 200) {
        this.tableData = res.data;
      }
    },
    //删除权限
    async handleCloseRights(role, item) {
      let res = await deleteAuthority(role.id, item.id);
      if (res.meta.status === 200) {
        //弹窗 重新绑定数据
        this.$message({
          type: "success",
          message: "删除权限成功"
        });
        role.children = res.data;
      } else {
        this.$message({
          type: "error",
          message: "删除权限失败"
        });
      }
    },
    addPrompt() {
      this.dialogFormVisible = true;
    },
    //编辑角色
    handleEdit(item) {
      this.editFormVisible = true;
      this.editRoles.roleName = item.roleName;
      this.editRoles.roleDesc = item.roleDesc;
      this.roleId = item.id;
    },
    //删除角色
    handleDelete(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await deteleAuthority(item.id);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getRoleList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //权限分配
    async handleJurisdiction(item) {
      // console.log(item);
      this.currentRoleId = item.id;
      this.distributionFormVisible = true;
      let res = await getTreeData();
      if (res.meta.status === 200) {
        this.treeData = res.data;
        //获取当前角色所有的权限
        let arr = [];
        function getCheckedIds(ele) {
          if (ele.children) {
            ele.children.forEach(v => {
              //递归调用
              getCheckedIds(v);
            });
          } else {
            //没有后代就是当前元素的id
            arr.push(ele.id);
          }
        }
        getCheckedIds(item);
        this.checkedIds = arr;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //   console.log(formName);
          //提取res变量
          let res;
          if (formName == "addRoles") {
            res = await addAuthority({
              roleName: this.addRoles.roleName,
              roleDesc: this.addRoles.roleDesc
            });
          } else if (formName == "editRoles") {
            res = await saveAuthority({
              roleName: this.editRoles.roleName,
              roleDesc: this.editRoles.roleDesc,
              roleId: this.roleId
            });
          }
          if (res.meta.status === 201) {
            this.$message.success(res.meta.msg);
            this.getRoleList();
            this.dialogFormVisible = false;
          } else if (res.meta.status === 200) {
            this.getRoleList();
            this.editFormVisible = false;
            this.$message.success("编辑角色成功!");
          }
          // 重置表单
          this.$refs[formName].resetFields();
        } else {
          this.$message.warning("请正确输入数据");
          return false;
        }
      });
    },
    //保存分配角色的权限
    async confirm() {
      //获取所有默认选中的节点
      let allCheckedIds = this.$refs.tree.getCheckedKeys();
      allCheckedIds = allCheckedIds.join(",");
      // console.log(allCheckedIds);
      let res = await saveTreeData({
        currentRoleId: this.currentRoleId,
        rids: allCheckedIds
      });
      if (res.meta.status === 200) {
        this.$message.success("权限分配成功!");
        this.getRoleList();
        let res = await menusList();
        console.log(res);
        this.$store.commit("saveMenus", res.data);
      } else {
        this.$message.success(res.meta.msg);
      }
      this.distributionFormVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-table td div {
  padding-bottom: 2px;
}
.el-tag.el-tag--warning {
  margin-right: 10px;
  margin-bottom: 5px;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
