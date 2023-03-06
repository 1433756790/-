<template>
  <div style="background-color: #f7f7f7">
    <NavBar :isFixed="true">
      <template #title> 订单详情 </template>
    </NavBar>
    <div class="order-status">
      <div>
        <span class="prefix">订单状态：</span
        >{{ state.detail.orderStatusString }}
      </div>
      <div>
        <span class="prefix">订单编号：</span>{{ state.detail.orderNo }}
      </div>
      <div>
        <span class="prefix">订单时间：</span>{{ state.detail.createTime }}
      </div>
      <VanButton
        color="#1baeae"
        style="margin-bottom: 10px"
        v-if="state.detail.orderStatus == 0"
        @click="state.showPay = true"
        >去支付</VanButton
      >
      <VanButton
        @click="handelCancel"
        v-if="!(state.detail.orderStatus < 0 || state.detail.orderStatus == 4)"
        >取消订单</VanButton
      >
    </div>
    <div class="order-price">
      <div>
        <span class="prefix">商品金额：</span>￥{{ state.detail.totalPrice }}
      </div>
      <div><span class="prefix">配送方式：</span>普通快递</div>
    </div>
    <div class="content">
      <div v-for="item2 in state.detail.newBeeMallOrderItemVOS">
        <van-card
          :price="item2.sellingPrice"
          :desc="'全场包邮'"
          :title="item2.goodsName"
          :thumb="$filter.prefix(item2.goodsCoverImg)"
          :num="item2.goodsCount"
        />
      </div>
    </div>
    <van-popup
      v-model:show="state.showPay"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
        <van-button
          :style="{ marginBottom: '10px' }"
          color="#1989fa"
          block
          @click="handlePayOrder(1)"
          >支付宝支付</van-button
        >
        <van-button color="#4fc08d" block @click="handlePayOrder(2)"
          >微信支付</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getOrderDetail, cancelOrder, payOrder } from "@/service/order.js";
import { showConfirmDialog, showSuccessToast } from "vant";

const route = useRoute();
const router = useRouter();
const state = reactive({
  detail: {},
  showPay: false,
});

onMounted(() => {
  init();
});
const init = async () => {
  const { id } = route.query;
  const { data: res } = await getOrderDetail(id);
  console.log(res);
  state.detail = res.data;
};
const handelCancel = async () => {
  showConfirmDialog({
    message: "确定取消订单？",
  })
    .then(() => {
      cancelOrder(route.query.id).then((res) => {
        showSuccessToast("删除成功");
        init();
      });
    })
    .catch(() => {
      return;
    });
};
const handlePayOrder = async (type) => {
  await payOrder({ orderNo: route.query.id, payType: type });
  showSuccessToast("支付成功");
  state.showPay = false;
  init();
};
</script>

<style lang="scss" scoped>
.prefix {
  color: #807e7e;
}
.order-status,
.order-price {
  box-sizing: border-box;
  padding: 17px 18px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: 20px;
  div {
    width: 100%;
    margin-bottom: 10px;
  }
}
.content {
  background-color: white;
  padding: 20px 0;
  /deep/.van-card {
    background-color: white;
  }
}
</style>
