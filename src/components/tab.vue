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
            <el-upload
              action="http://127.0.0.1:3000/file/upload"
              :auto-upload="true"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
            </el-upload>
          </el-form-item>
          <el-button class="first-sumbit" type="primary" plain @click="register"
            >提交申请</el-button
          >
        </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane label="交易管理" name="second" v-if="config[1]">
      <el-table :data="msg" border style="width: 100%">
        <el-table-column
          fixed
          prop="circulationInfo.fromUser"
          label="发起用户"
          width="400"
        >
        </el-table-column>
        <el-table-column
          prop="circulationInfo.mark"
          label="交易备注"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="circulationInfo.circulationFileHref"
          label="交易文件"
          width="380"
        >
        </el-table-column>
        <el-table-column prop="state" label="交易状态" width="120">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state === true ? 'primary' : 'success'"
              disable-transitions
              ><div v-if="!scope.row.state">未完成</div>
              <div v-if="scope.row.state">完成</div>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              :disabled="fiveReviewDisable(scope.row)"
              @click="finishMsg(scope.row)"
              type="text"
              size="small"
              >同意</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

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
          v-model="searchBatchId"
          class="search-input"
        >
          <template slot="append">
            <el-tooltip content="点击溯源此产品" placement="top" effect="dark">
              <el-button icon="el-icon-search" @click="search"
                >追溯一下</el-button
              >
            </el-tooltip>
          </template>
        </el-input>

        <el-timeline>
          <el-timeline-item>
            <h3>农产品名称：{{ foodinfo.foodName }}</h3>
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  产地和生产过程详细信息&nbsp;
                  <i class="header-icon el-icon-info"></i>
                </template>
                <hr />
                <div>
                  <strong>食品编号：</strong>{{ foodinfo.foodId }}
                  <br />
                  <strong>产地：</strong>{{ foodinfo.location }}
                  <br />
                  <strong>生产厂商：</strong>{{ foodinfo.owner }}
                  <br />
                  <strong>描述文件：</strong
                  ><button @click="DownloadM">
                    牛奶草莓生产文件
                  </button>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-timeline-item>
          <el-timeline-item v-for="(source, index) in sources" :key="index">
            <h3>{{ source.time }}</h3>
            <h4>交易描述:</h4>
            <p class="content-backspace">
              从 <strong>{{ source.fromName }}</strong> 厂商流转至
              <strong>{{ source.toName }}</strong> 厂商
            </p>
            <h4>交易文件:</h4>
            <p class="content-backspace">
              <button @click="DownloadM">
                交易测试文件
              </button>
            </p>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-tab-pane>
    <el-tab-pane label="农产品市场" name="fourth" v-if="config[3]">
      <el-table :data="foodMarketTableData" border style="width: 100%">
        <el-table-column fixed prop="user" label="供应商" width="150">
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
              @click="exchangeStart(scope.row)"
              type="text"
              size="small"
              >发起交易</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisibleFoodBuy"
        width="30%"
        center
      >
        <el-form :model="exchangAppend">
          <el-form-item label="交易描述">
            <el-input v-model="exchangAppend.mark"></el-input>
          </el-form-item>
          <el-form-item label="交易文件">
            <el-upload
              action="http://127.0.0.1:3000/file/upload"
              :auto-upload="true"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="exchangeSumbit">确 定</el-button>
        </span>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="用户管理" name="five" v-if="config[4]">
      <el-table :data="userManagerTableData" border style="width: 100%">
        <el-table-column fixed prop="name" label="用户名" width="150">
        </el-table-column>
        <el-table-column prop="roleText" label="角色" width="120">
        </el-table-column>
        <el-table-column prop="address" label="以太网账户地址" width="380">
        </el-table-column>
        <el-table-column prop="date" label="加入日期" width="120">
        </el-table-column>
        <el-table-column prop="desc" label="用户描述" width="150">
        </el-table-column>
        <el-table-column prop="reviewState" label="审核状态" width="120">
        </el-table-column>
        <el-table-column prop="reviewFileHref" label="商家文件" width="160">
          <template>
            <el-button @click="DownloadM" type="text" size="small"
              >商家信息文件下载</el-button
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              :disabled="fiveReviewDisable(scope.row)"
              @click="JGcomfirm(scope.row)"
              type="text"
              size="small"
              >确认通过审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="消费者选项" name="five" v-if="isLabel">
      <el-table :data="myFood" border style="width: 100%">
        <el-table-column prop="batchId" label="批次ID" />
        <el-table-column prop="foodId" label="食品ID" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              :disabled="fiveReviewDisable(scope.row)"
              @click="download"
              type="text"
              size="small"
              >导出二维码标签</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import http from "../utils/http-service";
export default {
  name: "Tab",
  data() {
    return {
      // 零售商用于导出批次Id
      myFood: [
        {
          foodId: "F2021621622522590717",
          batchId: "B2021621622547307832",
        },
      ],
      // 接受的消息
      msg: [],
      // 发起交易模态框
      centerDialogVisibleFoodBuy: false,
      // 模态框数据
      exchangAppend: {
        from: "",
        to: "",
        foodId: "",
        mark: "",
        circulationFileHref: "http://cos.tencent.com/exchange.docx",
      },
      userInfo: {},
      config: [false, false, false, false, false],
      userManagerTableData: [],
      foodMarketTableData: [],
      form: {
        foodName: "",
        advertiseSlogan: "",
        eatMethods: "",
        processFlow: "",
        storageCondition: "",
        afterSalesService: "",
        priceDescription: "",
        detailFoodFileHref: "12345678",
        foodId: "",
      },
      searchBatchId: "",
      activeName: "fourth",
      foodinfo: {
        foodId: "20205301622382831206",
        foodName: "水蜜桃",
        location: "江苏省镇江市",
        owner: "张三",
        detailFoodFileHref: "水蜜桃种植和生产完整过程.docx",
      },
      sources: [
        {
          time: "2020/01/04",
          foodId: "20205301622382831206",
          toName: "京口商贩",
          fromName: "江苏省分拣中心",
          foodName: "车厘子",
          circulationFileHref: "京口商贩车厘子采购交易合同文件.docx",
        },
      ],
      // 是否有导出标签能力
      isLabel: false,
    };
  },
  methods: {
    async DownloadM() {
      window.open("http://127.0.0.1:8081/F202061233259121094.docx");
    },
    // 下载二维码
    async download() {
      let eleLink = document.createElement("a");
      eleLink.style.display = "none";
      eleLink.href = "http://cos.tencent.com/source.png";
      // 受浏览器安全策略的因素，动态创建的元素必须添加到浏览器后才能实施点击
      document.body.appendChild(eleLink);
      // 触发点击
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    },
    // 完成交易
    async finishMsg(row) {
      if (row.state) {
        this.$notify({
          title: "重复操作通知",
          message: "您已完成此交易，请勿重复交易！",
          type: "warning",
        });
        return;
      }
      // 1.消息通知设置已完成状态
      const res3 = await http.post("/msg/comfirm", { msgId: row.msgId });
      // 2.设置商品所属关系
      const res1 = await http.post("/food/input/owner", {
        address: row.from,
        foodId: row.circulationInfo.foodId,
      });
      // 3.记录交易信息
      const res2 = await http.post("/exchange/input", {
        fromuser: row.to,
        touser: row.from,
        foodId: row.circulationInfo.foodId,
        circulationFileHref: row.circulationInfo.circulationFileHref,
      });
      console.log(res2, "res2");
      // 4.记录批次信息
      const res4 = await http.post("/fl/input", {
        address: res2.data.data.touser,
        batchId: res2.data.data.batch,
        foodId: res2.data.data.foodId,
      });
      if (
        (res1.data.success && res2.data.success && res3.data.success,
        res4.data.success)
      ) {
        await this.getAllgetMsg();
        this.$notify({
          title: "交易通知",
          message: "您已完成交易！",
          type: "success",
        });
      }
    },
    // 获取自身消息
    async getAllgetMsg() {
      const address = sessionStorage.getItem("address");
      const res = await http.post("/msg/get", { address });
      console.log(res);
      this.msg = res.data.data;
    },
    async exchangeStart(row) {
      this.centerDialogVisibleFoodBuy = true;
      console.log(row);
      this.exchangAppend.from = sessionStorage.getItem("address");
      this.exchangAppend.to = row.user;
      this.exchangAppend.foodId = row.foodId;
    },
    async exchangeSumbit() {
      const res = await http.post("/msg/buy", this.exchangAppend);
      if (res.data.success) {
        this.$notify({
          title: "交易通知",
          message: "交易信息已送达, 等待目标厂商审核完毕！",
          type: "success",
        });
      }
      this.centerDialogVisibleFoodBuy = false;
    },
    async register() {
      console.log(this.form);
      const owner = sessionStorage.getItem("address");
      const data = Object.assign({ image: "", owner }, this.form);
      console.log(data);
      await http.post("/food/input", data);
      this.form = {};
    },
    async search() {
      const res = await http.post("/exchange/batch", {
        batchId: this.searchBatchId,
      });
      const fiRes = res.data.data.foodDetail;
      this.foodinfo = fiRes;
      this.sources = res.data.data.batchInfoAfter;
    },
    async JGcomfirm(row) {
      await http.post("/account/user/comfirm", { address: row.address });
      this.userManagerTableData.forEach((item) => {
        if (item.address === row.address) {
          item.reviewState = "finish";
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    fiveReviewDisable(row) {
      return row.reviewState === "finish";
    },
    // 获取所有农产品信息
    async getAllFoodInfo() {
      const res = await http.get("/food/all");
      console.log(res.data.data);
      this.foodMarketTableData = res.data.data;
    },
    async getAllUserInfo() {
      const res = await http.get("/account/user/all");
      const usersArr = res.data.data;
      //       {
      //   address: "0xFeFcA80cC595660595dAA402964122828463F677",
      //   role: "生产商",
      //   name: "哇哈哈玉米",
      //   date: "2020/04/06",
      //   desc: "东北粘玉米",
      //   reviewState: "未通过审核",
      //   reviewFileHref: "0xebD219C152cBd7F73C31229e9B4846B3a1e5ACEc",
      // },
      usersArr.forEach((item) => {
        console.log("item", item);
        if (["0", "1", "2"].includes(item[8])) {
          console.log("item内部", item);
          let obj = {
            address: item[0],
            name: item[1],
            date: item[2],
            role: item[8],
            reviewState: item[7],
            reviewFileHref: item[5],
            desc: item[4],
          };
          switch (item[8]) {
            case "0":
              obj["roleText"] = "农产品生产商";
              break;
            case "1":
              obj["roleText"] = "农产品分销商";
              break;
            case "2":
              obj["roleText"] = "农产品零售商";
              break;
          }
          this.userManagerTableData.splice(
            this.userManagerTableData.length,
            0,
            obj
          );
        }
        console.log(this.userManagerTableData);
      });
    },
  },
  async created() {
    const res = await http.get("/account/user/now");
    this.userInfo = res.data.data;
    console.log(this.userInfo);
    switch (this.userInfo[6]) {
      // 监管机构
      case "3":
        console.log("hahahaha");
        this.config.splice(
          0,
          this.config.length,
          ...[false, false, true, false, true]
        );
        await this.getAllUserInfo();
        break;
      case "0":
        this.config.splice(
          0,
          this.config.length,
          ...[true, true, true, false, false]
        );
        await this.getAllgetMsg();
        break;
      case "1":
        await this.getAllFoodInfo();
        this.config.splice(
          0,
          this.config.length,
          ...[false, true, true, true, false]
        );
        await this.getAllgetMsg();
        break;
      case "2":
        this.isLabel = true;
        // await this.getAllFoodInfo();
        // await this.getAllgetMsg();
        this.config.splice(
          0,
          this.config.length,
          ...[false, true, true, true, false]
        );
        await this.getAllFoodInfo();
        await this.getAllgetMsg();
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