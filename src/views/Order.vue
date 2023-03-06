<template>
  <div>
    <NavBar :isFixed="true" :needURL="'/user'">
      <template #title> 我的订单 </template>
    </NavBar>
    <van-tabs
      v-model:active="state.active"
      @clickTab="onChangeTab"
      :color="'#1baeae'"
      :title-active-color="'#1baeae'"
      class="order-tab"
      v-model="state.status"
    >
      <van-tab title="全部" name=""></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="待确认" name="1"></van-tab>
      <van-tab title="待发货" name="2"></van-tab>
      <van-tab title="已发货" name="3"></van-tab>
      <van-tab title="交易完成" name="4"></van-tab>
    </van-tabs>
    <div class="content">
      <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="state.loading"
          :finished="state.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            v-for="(item, index) in state.list"
            :key="index"
            class="product"
            @click="goTo(item.orderNo)"
          >
            <div class="list-title">
              <span>订单时间：{{ item.createTime }}</span>
              <span>{{ item.orderStatusString }}</span>
            </div>
            <div v-for="item2 in item.newBeeMallOrderItemVOS">
              <van-card
                :price="item2.sellingPrice"
                :desc="'全场包邮'"
                :title="item2.goodsName"
                :thumb="$filter.prefix(item2.goodsCoverImg)"
                :num="item2.goodsCount"
              />
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { reactive, onMounted } from "vue";
import { getOrderList } from "@/service/order.js";
import { showLoadingToast } from "vant";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const state = reactive({
  active: 0,
  list: [],
  page: 1,
  totalPage: 0,
  loading: false,
  finished: false,
  refreshing: false,
  status: "",
});

onMounted(() => {
  //   init();
});

const init = async () => {
  const toast = showLoadingToast("加载中...");
  const { data: res } = await getOrderList({
    pageNumber: state.page,
    status: state.status,
  });
  state.list.push(...res.data.list);
  state.totalPage = res.data.totalPage;
  if (state.page >= res.data.totalPage) state.finished = true;
  toast.close();
  console.log(state.list);
};

const onChangeTab = ({ name }) => {
  console.log(name);
  state.status = name;
  onRefresh();
};
const onLoad = () => {
  if (!state.refreshing && state.page < state.totalPage) {
    state.page++;
  }
  if (state.refreshing) {
    state.list = [];
    state.refreshing = false;
  }

  init();
};
const onRefresh = () => {
  state.list = [];
  state.refreshing = true;
  state.finished = false;
  state.loading = true;
  state.page = 1;
  onLoad();
};

const goTo = (id) => {
  // if (route.query.from == "user") return;
  router.push({ path: "/orderDetails", query: { id: id } });
};
</script>

<style lang="scss" scoped>
/deep/.van-card {
  height: 100%;
  background-color: white;
  padding: 13px 0;
  .van-card__title {
    font-size: 13px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    box-sizing: content-box;
  }
  .van-card__header {
    height: 100%;
  }
  //   .van-card__thumb {
  //     width: 40%;
  //     height: 100%;
  //   }
  .van-ellipsis {
    font-size: 13px;
    margin-top: 5px;
  }
  .van-card__price {
    font-size: 14px;
    color: #1baeae;
  }
}
.order-tab {
  position: fixed;
  left: 0;
  z-index: 1000;
  width: 100%;
  border-bottom: 0.02667rem solid #e9e9e9;
}
.content {
  box-sizing: border-box;
  padding: 0 15px;
  margin-top: 44px;
  .list-title {
    font-size: 13px;
    color: #353434;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .product {
    margin-top: 20px;
  }
}
</style>
