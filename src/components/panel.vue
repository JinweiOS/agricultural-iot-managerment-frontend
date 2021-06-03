<template>
  <div class="container">
    <Tab class="tab"></Tab>
    <Wallet :name="name" :address="address" :coin="coin" class="wallet"></Wallet>
  </div>
</template>
<script>
import http from '../utils/http-service';
import Tab from "./tab";
import Wallet from "./wallet";
export default {
  name: "Panel",
  components: {
    Tab,
    Wallet,
  },
  data: function() {
    return {
      name: '',
      coin: '',
      address: '',
      info: {}
    }
  },
  async created() {
    const res1 = await http.get('/account/user/now');
    const res2 = await http.get('/account/coin/get');
    if (res1.data.success && res2.data.success) {
      this.name = res1.data.data[1];
      this.address = res1.data.data[0]
      this.coin = res2.data.data;
      this.info = res1.data.data;
    }
  }
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #f1f1f2;
}
.tab {
  width: 60%;
  margin-top: 10px;
  margin-bottom: 20px;
}
.wallet {
  width: 30%;
  margin-top: 10px;
  margin-left: 20px;
  height: 330px;
}
</style>