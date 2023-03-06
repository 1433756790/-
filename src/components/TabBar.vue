<template>
  <div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/category">分类</van-tabbar-item>
      <van-tabbar-item
        icon="shopping-cart-o"
        to="/cart"
        :badge="cartNum != 0 ? cartNum : ''"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="manager" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { getCart } from "@/service/cart.js";
import { onMounted, ref } from "@vue/runtime-core";
onMounted(() => {
  init();
});
const cartNum = ref(0);

const init = async () => {
  const {
    data: { data },
  } = await getCart({ pagrNumber: 1 });
  cartNum.value = data.length;
};
const active = ref(0);
</script>

<style lang="scss" scoped></style>
