<template>
  <div>
    <el-form-item>
      <template slot="label">
        <div style="color: #25b864">新密码:</div>
      </template>
      <el-input :class="isError" v-model="newp" show-password placeholder="请输入新密码"></el-input>
    </el-form-item>
    <el-form-item>
      <template slot="label">
        <div style="color: #25b864">确认密码:</div>
      </template>
      <el-input
        @input="validate"
        :class="isError"
        v-model="comfirmp"
        show-password
        placeholder="请确认新密码"
      ></el-input>
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: "Password",
  data: function () {
    return {
      newp: "",
      comfirmp: "",
    };
  },
  computed: {
    // 通过比对两次输入的密码值，决定是否应用错误边框样式
    isError: function () {
      console.log(this.newp, this.comfirmp);
      if (this.comfirmp && this.newp !== this.comfirmp) {
        // 用于v-model change事件通知
        return { "error-border": true };
      } else {
        return { "error-border": false };
      }
    },
  },
  methods: {
    // 验证函数，向父组件发送验证正确的密码值
    validate() {
      if (this.newp === this.comfirmp) {
        this.$emit("validate", { vdt: true, value: this.newp });
      } else {
        // vdt, 验证状态
        // value, 密码值(验证成功仅返回一个值, 验证失败返回 新密码:验证密码 字符串)
        this.$emit("validate", {
          vdt: false,
          value: `${this.newp}:${this.comfirmp}`,
        });
      }
    },
  },
};
</script>
<style scoped>
.error-border /deep/ .el-input__inner {
  border-color: red;
}
</style>