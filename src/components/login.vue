<template>
  <div class="container">
    <!-- 背景视频 -->
    <bg-video />
    <div class="login-wrapper">
      <big-title fontColor="#fff">我的农产品, 它从哪里来?</big-title>
      <el-card class="login-panel">
        <el-form :model="loginData" label-width="100px">
          <div v-show="loginPanel">
            <el-form-item>
              <template slot="label">
                <div style="color: #25b864">账户地址:</div>
              </template>
              <el-input
                v-model="loginData.address"
                placeholder="请填写以太网账户地址"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <div style="color: #25b864">账户解锁密码:</div>
              </template>
              <el-input
                v-model="loginData.passwd"
                show-password
                placeholder="请输入解锁密码"
              ></el-input>
            </el-form-item>
            <el-button type="primary" plain @click="login">登录系统</el-button>
            <el-button type="info" @click="register">一键注册</el-button>
          </div>
          <div v-show="!loginPanel">
            <!-- 密码框组件 -->
            <Password @validate="getPsdState"></Password>
            <el-button
              type="primary"
              @click="sumbit"
              plain
              :disabled="cantSumbit"
              >提交信息</el-button
            >
            <el-button type="info" @click="backLogin">返回登陆</el-button>
          </div>
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
import http from "../utils/http-service";
import Password from "./password.vue";
export default {
  components: { bgVideo, bigTitle, Password },
  name: "Login",
  data: function () {
    return {
      loginData: {
        address: "",
        passwd: "",
      },
      loginPanel: true,
      cantSumbit: true,
      newp: "",
    };
  },
  methods: {
    async login() {},
    async register() {
      this.loginPanel = false;
    },
    async backLogin() {
      this.loginPanel = true;
    },
    // 注册函数
    async sumbit() {
      const res = await http.post("/account/create", { passwd: this.newp });
      http.cus.downLoadFromBlob(
        new Blob([JSON.stringify(res.data.data, null, "\t")], {
          type: "application/json",
        }),
        `keystore-${new Date().getTime()}.json`
      );
      // 自动调整login, 并填充数据
      this.loginPanel = true;
      this.$set(this.loginData, "address", res.data.data.address);
      this.$set(this.loginData, "passwd", this.newp);
    },
    getPsdState(emitData) {
      if (emitData.vdt) {
        this.cantSumbit = false;
        this.newp = emitData.value;
      } else {
        this.cantSumbit = true;
      }
    },
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
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
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

