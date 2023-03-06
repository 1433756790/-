<template>
  <div>
    <div class="goods-header">
      <p>{{ props.title }}</p>
    </div>
    <van-skeleton title :row="5" :loading="loading">
      <div class="goods-box">
        <div
          class="good-item"
          v-for="(item, index) in props.goods"
          :key="index"
          @click="GoProduct(item.goodsId)"
        >
          <img :src="$filter.prefix(item.goodsCoverImg)" alt="" />
          <div class="item-desc">
            <div class="good-title">{{ item.goodsName }}</div>
            <div class="price">￥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </van-skeleton>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({ title: String, goods: Object, loading: Boolean });
const router = useRouter();
const GoProduct = (id) => {
  router.push({ name: "Product", params: { id: id } });
};
</script>

<style lang='scss'>
.goods-header {
  width: 100%;
  background-color: #f9f9f9;
  height: 50px;
  color: #1baeae;
  text-align: center;
  line-height: 50px;
  font-size: 17px;
}
.goods-box {
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  // min-height: 100px;
  .good-item {
    border-right: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    width: 50%;
    box-sizing: border-box;
    padding: 10px;
    text-align: center;
    img {
      width: 120px;
    }
    .good-title {
      font-size: 14px;
    }
    .price {
      margin-top: 2px;
      font-size: 13px;
      color: #1baeae;
    }
  }
}
</style>
