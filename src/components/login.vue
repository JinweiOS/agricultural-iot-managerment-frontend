<template>
  <div class="container">
    <!-- 背景视频 -->
    <bg-video />
    <div class="login-wrapper">
      <big-title fontColor="#fff">我的农产品, 它从哪里来?</big-title>
      <el-card class="login-panel">
        <el-form :model="loginData" label-width="100px">
          <el-form-item>
            <template slot="label">
              <div style="color: #25b864">账户地址:</div>
            </template>
            <el-input v-model="loginData.address"></el-input>
          </el-form-item>
          <el-form-item>
            <template slot="label">
              <div style="color: #25b864">账户解锁密钥:</div>
            </template>
            <el-input v-model="loginData.address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain>登录系统</el-button>
            <el-button type="info">注册用户</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <big-title fontColor="#fff" fontSize="10">
        Copyright @2021 JiangSu University.
      </big-title>
      <big-title fontColor="#fff" fontSize="10">
        Created By Jinwei Peng.
      </big-title>
    </div>
    <div class="qrcode">
      <big-title fontColor="#fff">以太坊钱包 Metamask</big-title>
      <img src="../assets/qrcode.png" class="qrimg" />
      <big-title fontColor="#fff" fontSize="8">扫码下载 App</big-title>
    
        <el-button plain class="click-down">点击下载 Android 版本</el-button>

    </div>
  </div>
</template>
<script>
import bgVideo from "./bg-video.vue";
import bigTitle from "./cos-title";
export default {
  components: { bgVideo, bigTitle },
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
  flex-direction: row-reverse;
  align-items: center;
  height: 100%;
}
.login-wrapper {
  width: 35%;
  margin-right: 5%;
  margin-bottom: 5%;
}
.login-panel {
  padding-top: 25px;
  margin-bottom: 20px;
}
.qrcode {
  margin-right: 400px;
  margin-bottom: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.qrimg {
  width: 200px;
  border-radius: 10px;
}
.click-down {
  margin-top: 30px;
  width: 80%;
}
</style>

