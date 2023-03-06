<template>
  <div>
    <nav-bar :isFixed="true">
      <template #title> 商品详情 </template>
    </nav-bar>
    <div class="detail-content">
      <div class="van-img">
        <img :src="$filter.prefix(state.goodsCoverImg)" alt="" />
      </div>
      <div class="product-info">
        <div class="goods-name">{{ state.goodsName }}</div>
        <p>免邮费 顺丰快递</p>
        <p class="good-price">￥{{ state.sellingPrice }}</p>
        <div v-html="state.goodsDetailContent"></div>
      </div>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        :badge="state.cartNum != 0 ? state.cartNum : ''"
        @click="goCart"
      />
      <van-action-bar-button
        color="#1baeae"
        type="warning"
        text="加入购物车"
        @click="addToCart"
      />
      <van-action-bar-button
        color="#1baeae"
        type="danger"
        text="立即购买"
        @click="purchase"
      />
    </van-action-bar>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { getCart, addCart } from "@/service/cart.js";
import { onMounted, reactive } from "@vue/runtime-core";
import { getDetail } from "@/service/good.js";
import { useRoute, useRouter } from "vue-router";
import { showSuccessToast } from "vant";
const route = useRoute();
const router = useRouter();
const state = reactive({
  goodsCoverImg: "",
  goodsDetailContent: "",
  goodsIntro: "",
  goodsName: "",
  originalPrice: "",
  sellingPrice: "",
  tag: "",
  cartNum: 0,
});
onMounted(async () => {
  const { data: res } = await getDetail(route.params.id);
  state.goodsCoverImg = res.data.goodsCoverImg;
  state.goodsName = res.data.goodsName;
  state.sellingPrice = res.data.sellingPrice;
  state.goodsDetailContent = res.data.goodsDetailContent;
  getCartDetail();
});
const getCartDetail = async () => {
  const {
    data: { data },
  } = await getCart({ pagrNumber: 1 });
  state.cartNum = data.length;
};
const addToCart = async () => {
  const { data: res } = await addCart({
    goodsCount: 1,
    goodsId: route.params.id,
  });
  if (res.resultCode == 200) {
    getCartDetail();
    showSuccessToast("添加成功");
  }
  console.log(res);
};
const goCart = () => {
  router.push("/cart");
};
const purchase = () => {
  addToCart();
  goCart();
};
</script>

<style lang="scss" scoped>
.detail-content {
  margin-top: 46px;
  margin-bottom: 46px;
  .van-img {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .product-info {
    padding: 0 10px;
    p {
      font-size: 15px;
      color: #807f7f;
      margin-top: 7px;
    }
    .goods-name {
      font-size: 20px;
      color: #414040;
      font-weight: bold;
    }
    .good-price {
      color: red;
      font-size: 20px;
    }
  }
}
</style>
