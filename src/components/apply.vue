<template>
  <div class="container">
    <BigTitle class="title">合法商家注册申请表</BigTitle>
    <hr class="divide" />
    <el-form :model="form" label-width="140px">
      <el-form-item label="商家以太网地址: ">
        <el-input
          v-model="form.address"
          placeholder="例如: 0xebD219C152cBd7F73C31229e9B4846B3a1e5ACEc"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="商家名称: ">
        <el-input
          v-model="form.name"
          placeholder="例如: 车厘子供应商"
        ></el-input>
      </el-form-item>
      <el-form-item label="注册商家类型: ">
        <el-radio-group v-model="form.role">
          <el-radio label="0">农产品生产商</el-radio>
          <el-radio label="1">农产品供应商</el-radio>
          <el-radio label="2">农产品零售商</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商家地址: ">
        <el-input
          v-model="form.location"
          placeholder="例如: 江苏省镇江市京口区"
        ></el-input>
      </el-form-item>
      <el-form-item label="附加描述: ">
        <el-input
          v-model="form.desc"
          placeholder="例如: 我们是全国十强的车厘子供应商..."
        ></el-input>
      </el-form-item>
      <el-form-item label="文件: ">
                    <el-upload
              action="http://127.0.0.1:3000/file/upload"
              :auto-upload="true"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
            </el-upload>
      </el-form-item>
      <el-button
        class="sumbit"
        type="primary"
        @click="onSubmit"
        plain
        :disabled="disabled"
        >提交申请</el-button
      >
    </el-form>
  </div>
</template>
<script>
import http from "../utils/http-service";
import BigTitle from "./cos-title";
export default {
  data() {
    return {
      form: {
        name: "",
        address: "",
        role: "",
        location: "",
        desc: "",
        reviewFileHref: "http://127.0.0.1:8081/exchange.docx",
        review: "wait",
      },
      disabled: false,
    };
  },
  methods: {
    async onSubmit() {
      const res = await http.post("/account/registry", this.form);
      console.log(res);
      if (res.data.data.success) {
        this.disabled = true;
      }
      this.$notify({
        title: "等待审核通知",
        message: "您已提交用户审核, 请耐心等待监管部门审核！",
        type: "warning",
      });
      this.$router.push('/')
    },
  },
  name: "Apply",
  components: {
    BigTitle,
  },
  created() {
    this.form.address = this.$route.query.address;
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  margin-bottom: 20px;
}
.divide {
  border: 1px solid black;
  height: 100%;
  width: 50%;
  margin-bottom: 40px;
}
.sumbit {
  width: 100%;
  margin-bottom: 20px;
}
</style>