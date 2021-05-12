/* eslint-disable vue/valid-v-for */
<template>
  <el-tabs
    v-model="activeName"
    @tab-click="handleClick"
    type="border-card"
    :stretch="true"
  >
    <el-tab-pane label="农产品信息管理" name="first">农产品数据</el-tab-pane>
    <el-tab-pane label="交易管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane class="el-tab-pane-botton" label="商品溯源" name="third">
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
          <el-timeline-item v-for="(source,index) in sources" :key="index">
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
    <el-tab-pane label="农产品市场" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: "Tab",
  data() {
    return {
      searchFoodId: '',
      activeName: "third",
      foodinfo: {
        foodId: "0xdfdsfsdf",
        foodName: "l",
        location: "江苏省镇江市",
        owner: "王莹莹",
        detailFoodFileHref: "www.baidu.com",
      },
      sources: [
        {
          time: "2020/01/04",
          foodId: "3w9edjfwe0cjsdq032fdsa",
          toUser: "王莹莹",
          fromUser: "彭金为",
          foodName: "车厘子",
          circulationFileHref: "www.baidu.com",
        },
        {
          time: "2020/01/04",
          foodId: "3w9edjfwe0cjsdq032fdsa",
          toUser: "王莹莹",
          fromUser: "彭金为",
          foodName: "车厘子",
          circulationFileHref: "www.baidu.com",
        },
        {
          time: "2020/01/04",
          foodId: "3w9edjfwe0cjsdq032fdsa",
          toUser: "王莹莹",
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
</style>