<template>
  <div style="container">
    <div style="login-frame">
      <el-form ref="form" :model="loginData" label-width="80px">
        <el-form-item label="账户地址:">
          <el-input v-model="loginData.address"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data: function () {
    return {
      loginData: {
        address: "0x07F6709b26696C69AC84b4dc3f188625DEc3fA1A",
      },
    };
  },
};
</script>
<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-frame {
  width: 30%;
}
</style>

