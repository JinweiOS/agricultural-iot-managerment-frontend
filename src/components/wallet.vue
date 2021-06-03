<template>
  <el-card class="box-card">
    <el-form class="user-info">
      <BigTitle fontSize="15">{{ name }}</BigTitle>
      <el-button>{{ address }}</el-button>
      <el-divider content-position="right"
        ><i class="el-icon-user"></i
      ></el-divider>
      <BigTitle fontSize="15"
        >当前资产&emsp;&emsp;<el-tag type="success" style="width: 200px">{{ coin }}</el-tag>
        &emsp;ETH</BigTitle
      >

      <el-divider content-position="right"
        ><i class="el-icon-coin"></i
      ></el-divider>
      <el-button type="danger" plain class="exit-button" @click="exit">退出</el-button>
    </el-form>
  </el-card>
</template>
<script>
import BigTitle from "./cos-title";
export default {
  name: "Wallet",
  components: {
    BigTitle,
  },
  props: ["name", "address", "coin"],
  methods: {
    exit() {
      this.$router.push('/')
    }
  }
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
}
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.exit-button {
  width: 80%;
}
</style>