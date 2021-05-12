<template>
  <div class="container">
    <Tab class="tab"></Tab>
    <Wallet class="wallet"></Wallet>
  </div>
</template>
<script>
import Tab from "./tab";
import Wallet from "./wallet";
export default {
  name: "Panel",
  components: {
    Tab,
    Wallet,
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.tab {
  width: 60%;
  margin-top: 10px;
  margin-bottom: 20px;
}
.wallet {
  width: 25%;
  margin-top: 10px;
  margin-left: 20px;
  height: 330px;
}
</style>