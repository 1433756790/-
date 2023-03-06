<template>
  <div style="background-color: #f7f7f7">
    <NavBar :isFixed="true" :needURL="'/cart'">
      <template #title> 生成订单 </template>
    </NavBar>
    <div class="addressBar">
      <div>
        <div class="addressName">
          <span>联系人：{{ state.address.userName }}</span
          >&nbsp;&nbsp;&nbsp;
          <span>电话：{{ state.address.userPhone }}</span>
        </div>
        <div class="address">
          地址：
          {{ state.address.provinceName }} {{ state.address.cityName }}
          {{ state.address.regionName }} {{ state.address.detailAddress }}
        </div>
      </div>
      <van-icon class="arrow" name="arrow" @click="goAddress" />
    </div>
    <div class="cartlist">
      <div v-for="(item, index) in state.list" :key="index" class="product">
        <van-card
          :price="item.sellingPrice"
          :desc="item.goodsIntro"
          :title="item.goodsName"
          :thumb="$filter.prefix(item.goodsCoverImg)"
        />
      </div>
    </div>
    <div class="settle-counts">
      <div class="total-count">
        <span>商品金额</span>
        <span style="color: red; font-size: 18px">￥{{ totalCount }}</span>
      </div>
      <van-button color="#1baeae" width="100%" @click="createOrder_"
        >生成订单</van-button
      >
    </div>
    <van-popup
      v-model:show="state.showBottom"
      round
      position="bottom"
      :style="{ height: '30%' }"
      @closed="OnClose"
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
import { reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showLoadingToast, showSuccessToast } from "vant";
import { getByCartItemIds } from "@/service/cart.js";
import { payOrder, createOrder } from "@/service/order.js";

import { getAddressDetail, getDefaultAddress } from "@/service/address.js";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();

const state = reactive({
  list: [],
  address: {},
  showBottom: false,
  orderNo: "",
});
const totalCount = computed(() => {
  return state.list.reduce((prev, cur) => {
    return prev + cur.sellingPrice * cur.goodsCount;
  }, 0);
});
onMounted(() => {
  init();
});

const init = async () => {
  const toast = showLoadingToast({ message: "加载中", forbidClick: true });
  const { addressId, cartItemIds } = route.query;
  const _cartItemIds = JSON.parse(cartItemIds);
  const { data: list } = await getByCartItemIds({
    cartItemIds: _cartItemIds.join(","),
  });
  console.log(list);
  const { data: address } = addressId
    ? await getAddressDetail(addressId)
    : await getDefaultAddress();
  console.log(address);
  store.commit("updateCartItemIds", cartItemIds);
  if (!address.data) {
    router.push({ path: "/address" });
    return;
  }
  state.list = list.data;
  state.address = address.data;
  toast.close();
};

const goAddress = () => {
  router.push({ path: "/address", query: { from: "create-order" } });
};
const handlePayOrder = async (type) => {
  await payOrder({ orderNo: state.orderNo, payType: type });
  showSuccessToast("支付成功");
  setTimeout(() => {
    router.push({ path: "/order" });
  }, 2000);
};
const createOrder_ = async () => {
  const params = {
    addressId: state.address.addressId,
    cartItemIds: JSON.parse(store.state.cartItemIds),
  };
  const { data: res } = await createOrder(params);
  console.log(res);
  state.orderNo = res.data;
  state.showBottom = true;
};
const OnClose = () => {
  router.push("/order");
};
</script>

<style lang="scss" scoped>
.addressBar {
  background-color: white;
  font-size: 14px;
  padding: 20px 10px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 0.05333rem;
    background: -webkit-repeating-linear-gradient(
      135deg,
      #ff6c6c,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #1989fa 0,
      #1989fa 45%,
      transparent 0,
      transparent 50%
    );
    background: repeating-linear-gradient(
      -45deg,
      #ff6c6c,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #1989fa 0,
      #1989fa 45%,
      transparent 0,
      transparent 50%
    );
    background-size: 2.13333rem;
    content: "";
  }
  i {
    font-size: 22px;
  }
  .addressName {
    height: 30px;
    line-height: 30px;
  }
  .address {
    margin-top: 5px;
    margin-bottom: 8px;
  }
}
.cartlist {
  margin-top: 15px;
  margin-bottom: 50px;
}
/deep/.van-card {
  background-color: white;
  .van-card__title {
    margin-top: 20px;
  }
  .van-card__bottom {
    margin-bottom: 15px;
    .van-card__price {
      color: red;
    }
  }
}
.settle-counts {
  font-size: 14px;
  padding: 15px 18px 10px 18px;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  bottom: 0;
  background-color: white;
  .total-count {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  /deep/.van-button {
    width: 100%;
  }
}
</style>
