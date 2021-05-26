/* eslint-disable vue/valid-v-for */
<template>
  <el-tabs
    v-model="activeName"
    @tab-click="handleClick"
    type="border-card"
    :stretch="true"
  >
    <el-tab-pane label="农产品信息管理" name="first" v-if="config[0]">
      <div class="first-container">
        <div class="first-title">
          <h1>商品注册表</h1>
        </div>
        <el-divider></el-divider>
        <el-form :model="form" label-width="140px">
          <el-form-item label="农产品名称: ">
            <el-input
              v-model="form.foodName"
              placeholder="例如: 车厘子"
            ></el-input>
          </el-form-item>
          <el-form-item label="广告语: ">
            <el-input
              v-model="form.advertiseSlogan"
              placeholder="例如: 车厘子很好吃！"
            ></el-input>
          </el-form-item>
          <el-form-item label="食用方法: ">
            <el-input
              v-model="form.eatMethods"
              placeholder="例如: 开封即食"
            ></el-input>
          </el-form-item>
          <el-form-item label="产地: ">
            <el-input
              v-model="form.location"
              placeholder="例如: 江苏省镇江市京口区"
            ></el-input>
          </el-form-item>
          <el-form-item label="工艺流程: ">
            <el-input
              v-model="form.processFlow"
              placeholder="例如: 2月种植，4月成熟，人工采摘，工厂化加工"
            ></el-input>
          </el-form-item>
          <el-form-item label="贮藏条件: ">
            <el-input
              v-model="form.storageCondition"
              placeholder="例如：常温下20天"
            ></el-input>
          </el-form-item>
          <el-form-item label="售后服务说明: ">
            <el-input
              v-model="form.afterSalesService"
              placeholder="例如：3天无理由退货"
            ></el-input>
          </el-form-item>
          <el-form-item label="价格说明: ">
            <el-input
              v-model="form.priceDescription"
              placeholder="例如：价格中附带运费"
            ></el-input>
          </el-form-item>
          <el-form-item label="产品详细介绍文件: ">
            <el-input
              v-model="form.detailFoodFileHref"
              placeholder="TODO: 文件hash地址"
            ></el-input>
          </el-form-item>
          <el-button class="first-sumbit" type="primary" plain
            >提交申请</el-button
          >
        </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane label="交易管理" name="second" v-if="config[1]"
      >配置管理</el-tab-pane
    >

    <el-tab-pane
      class="el-tab-pane-botton"
      label="商品溯源"
      name="third"
      v-if="config[2]"
    >
      <div class="block">
        <!--搜索框-->
        <el-input
          placeholder="农产品溯源搜索, 请输入农产品标签ID号码"
          v-model="searchFoodId"
          class="search-input"
        >
          <template slot="append">
            <el-tooltip content="点击溯源此产品" placement="top" effect="dark">
              <el-button icon="el-icon-search">追一下</el-button>
            </el-tooltip>
          </template>
        </el-input>

        <el-timeline>
          <el-timeline-item>
            <h3>产品名称：{{ foodinfo.foodName }}</h3>
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  详细信息
                  <i class="header-icon el-icon-info"></i>
                </template>
                <div>
                  <strong>食品编号：</strong>{{ foodinfo.foodId }}
                  <br />
                  <strong>产地：</strong>{{ foodinfo.location }} 生产厂商：{{
                    foodinfo.owner
                  }}
                  <br />
                  <strong>描述文件：</strong>{{ foodinfo.detailFoodFileHref }}
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-timeline-item>
          <el-timeline-item v-for="(source, index) in sources" :key="index">
            <h3>{{ source.time }}</h3>
            <h4>交易描述:</h4>
            <p class="content-backspace">
              从 <strong>{{ source.fromUser }}</strong> 厂商流转至
              <strong>{{ source.toUser }}</strong> 厂商
            </p>
            <h4>交易文件:</h4>
            <p class="content-backspace">
              <strong>{{ source.circulationFileHref }}</strong>
            </p>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-tab-pane>
    <el-tab-pane label="农产品市场" name="fourth" v-if="config[3]">
      <el-table :data="foodMarketTableData" border style="width: 100%">
        <el-table-column fixed prop="owner" label="供应商" width="150">
        </el-table-column>
        <el-table-column prop="foodName" label="产品名称" width="100">
        </el-table-column>
        <el-table-column prop="advertiseSlogan" label="广告语" width="380">
        </el-table-column>
        <el-table-column prop="eatMethods" label="使用方法" width="120">
        </el-table-column>
        <el-table-column prop="location" label="产地" width="300">
        </el-table-column>
        <el-table-column prop="storageCondition" label="贮藏条件" width="120">
        </el-table-column>
        <el-table-column
          prop="detailFoodFileHref"
          label="产品详细描述文件"
          width="380"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              :disabled="fiveReviewDisable(scope.row)"
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              >发起交易</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="用户管理" name="five" v-if="config[4]">
      <el-table :data="userManagerTableData" border style="width: 100%">
        <el-table-column fixed prop="name" label="用户名" width="150">
        </el-table-column>
        <el-table-column prop="role" label="角色" width="100">
        </el-table-column>
        <el-table-column prop="address" label="以太网账户地址" width="380">
        </el-table-column>
        <el-table-column prop="date" label="加入日期" width="120">
        </el-table-column>
        <el-table-column prop="desc" label="用户描述" width="300">
        </el-table-column>
        <el-table-column prop="reviewState" label="审核状态" width="120">
        </el-table-column>
        <el-table-column prop="reviewFileHref" label="商家文件" width="380">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              :disabled="fiveReviewDisable(scope.row)"
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              >确认通过审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import http from '../utils/http-service';
export default {
  name: "Tab",
  data() {
    return {
      userInfo: {},
      config: [false, false, false, false, false],
      userManagerTableData: [
        {
          address: "0xebD219C152cBd7F73C31229e9B4846B3a1e5ACEc",
          role: "供应商",
          name: "西瓜供应商",
          date: "2020/04/06",
          desc: "又甜又好吃的大西瓜",
          reviewState: "审核通过",
          reviewFileHref: "0xebD219C152cBd7F73C31229e9B4846B3a1e5ACEc",
        },
        {
          address: "0xFeFcA80cC595660595dAA402964122828463F677",
          role: "生产商",
          name: "哇哈哈玉米",
          date: "2020/04/06",
          desc: "东北粘玉米",
          reviewState: "未通过审核",
          reviewFileHref: "0xebD219C152cBd7F73C31229e9B4846B3a1e5ACEc",
        },
      ],
      foodMarketTableData: [
        {
          owner: "红富士总店",
          foodName: "苹果",
          advertiseSlogan: "广告语",
          eatMethods: "喜喜就可以吃",
          location: "产地",
          storageCondition: "可以放一个月",
          detailFoodFileHref: "0xxxxxxx",
        },
        {
          owner: "大白梨",
          foodName: "砀山梨子",
          advertiseSlogan: "天然的梨树生长环境，离子又大又甜",
          eatMethods: "喜喜就可以吃",
          location: "产地",
          storageCondition: "可以放一个月",
          detailFoodFileHref: "0xxxxxxx",
        },
        {
          owner: "山东烟台栖霞红富士",
          foodName: "苹果",
          advertiseSlogan: "80-85mm大果金钟5斤",
          eatMethods: "喜喜就可以吃",
          location: "产地",
          storageCondition: "可以放一个月",
          detailFoodFileHref: "0xxxxxxx",
        },
        {
          owner: "京东京造星果乐",
          foodName: "苹果",
          advertiseSlogan: "陕北高原洛川苹果17钻石果",
          eatMethods: "喜喜就可以吃",
          location: "产地",
          storageCondition: "可以放一个月",
          detailFoodFileHref: "0xxxxxxx",
        },
        {
          owner: "鲜次方",
          foodName: "桃子",
          advertiseSlogan: "黄心油桃新鲜水果香甜",
          eatMethods: "喜喜就可以吃",
          location: "产地",
          storageCondition: "可以放一个月",
          detailFoodFileHref: "0xxxxxxx",
        },
      ],
      form: {
        foodName: "",
        advertiseSlogan: "",
        eatMethods: "",
        processFlow: "",
        storageCondition: "",
        afterSalesService: "",
        priceDescription: "",
        detailFoodFileHref: "",
      },
      searchFoodId: "",
      activeName: "fourth",
      foodinfo: {
        foodId: "0xdfdsfsdf",
        foodName: "水蜜桃",
        location: "江苏省镇江市",
        owner: "彭金为",
        detailFoodFileHref: "0x39sdf2093jfej23jicweoj332ff",
      },
      sources: [
        {
          time: "2020/01/04",
          foodId: "3w9edjfwe0cjsdq032fdsa",
          toUser: "某商家",
          fromUser: "彭金为",
          foodName: "车厘子",
          circulationFileHref: "www.baidu.com",
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    fiveReviewDisable(row) {
      return row.reviewState === "审核通过";
    },
  },
  async created() {
    const res = await http.get('/account/user/now');
    this.userInfo = res.data.data;
    console.log(this.userInfo)
    switch (this.userInfo[6]) {
      case "3":
        console.log('hahahaha')
        this.config.splice(0, this.config.length, ...[false, false, true, false, true]);
        break;
      case "0":
        this.config.splice(0, this.config.length, ...[true, true, true, false, false]);
        break;
      case "1":
        this.config.splice(0, this.config.length, ...[false, true, true, true, false]);
        break;
      case "2":
        this.config.splice(0, this.config.length, ...[false, true, true, true, false]);
        break;
    }
  },
};
</script>
<style scoped>
.search-input {
  margin-bottom: 20px;
}
.content-backspace {
  margin-left: 20px;
}
.content-block {
  width: 100%;
}

.first-sumbit {
  width: 100%;
  margin-bottom: 20px;
}
.first-title {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>