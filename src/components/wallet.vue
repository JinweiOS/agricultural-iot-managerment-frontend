<template>
  <el-card class="box-card">
    <el-form class="user-info">
      <BigTitle fontSize="15">{{ name }}</BigTitle>
      <el-button>{{ address }}</el-button>
      <el-divider content-position="right"><i class="el-icon-user"></i></el-divider>
      <BigTitle fontSize="15">当前资产</BigTitle>
      <div>
        <el-button>{{ coin }}</el-button
        >&emsp;ETH
      </div>
      <el-divider content-position="right"><i class="el-icon-coin"></i></el-divider>
      <el-button type="danger" plain class="exit-button">退出</el-button>
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
  data: function () {
    return {
      name: "车厘子供应商",
      address: "0x12345676ewdfg345yujhgfdser5d",
      coin: "30",
    };
  },
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
  width: 25%;
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