<template>
  <div class="container">
    <BigTitle class="title">合法商家注册申请表</BigTitle>
    <hr class="divide" />
    <el-form :model="form" label-width="140px">
      <el-form-item label="商家以太网地址: ">
        <el-input
          v-model="form.name"
          placeholder="例如: 0xebD219C152cBd7F73C31229e9B4846B3a1e5ACEc"
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
          <el-radio label="农产品供应商"></el-radio>
          <el-radio label="农产品分销商"></el-radio>
          <el-radio label="农产品零售商"></el-radio>
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
      <el-form-item label="文件哈希地址: ">
        <el-input
          v-model="form.reviewFileHref"
          placeholder="TODO: 用户上传文件自动生成"
        ></el-input>
      </el-form-item>
      <el-button class="sumbit" type="primary" @click="onSubmit" plain
        >提交申请</el-button
      >
    </el-form>
  </div>
</template>
<script>
import BigTitle from "./cos-title";
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
  name: "Apply",
  components: {
    BigTitle,
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