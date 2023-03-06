<template>
  <div>
    <div class="header">
      <nav-bar :isFixed="true">
        <template #right>
          <van-button size="mini" color="#1baeae" @click="getSearch"
            >搜索</van-button
          >
        </template>
        <template #title>
          <div class="field-height">
            <van-cell-group inset>
              <van-field v-model="state.search" left-icon="search" />
            </van-cell-group>
          </div>
        </template>
      </nav-bar>
      <van-tabs type="card" color="#1baeae" @click-tab="onClickTab">
        <van-tab title="推荐" name=""></van-tab>
        <van-tab title="新品" name="new"></van-tab>
        <van-tab title="价格" name="price"></van-tab>
      </van-tabs>
    </div>
    <div class="content">
      <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="state.loading"
          :finished="state.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <template v-if="state.list.length">
            <div
              v-for="(item, index) in state.list"
              :key="index"
              class="product"
              @click="goDetail(item.goodsId)"
            >
              <van-card
                :price="item.sellingPrice"
                :desc="item.goodsIntro"
                :title="item.goodsName"
                :thumb="$filter.prefix(item.goodsCoverImg)"
              />
            </div>
          </template>
          <img
            v-else
            src="https://s.yezgea02.com/1604041313083/kesrtd.png"
            alt="搜索"
            class="empty"
          />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { reactive } from "@vue/reactivity";
import { Search } from "@/service/good.js";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";

const router = useRouter();
const route = useRoute();
const state = reactive({
  search: "",
  page: 1,
  totalPage: 0,
  orderBy: "",
  categoryId: "",
  active: 0,
  list: [],
  loading: false,
  finished: false,
  refreshing: false,
});
onMounted(() => {
  state.categoryId = route.params.id;
  console.log(state.categoryId);
});
const init = async () => {
  if (state.search == "" && state.categoryId == "") {
    state.loading = false;
    state.finished = true;
    return;
  }
  const {
    data: { data },
  } = await Search({
    pageNumber: state.page,
    goodsCategoryId: state.categoryId,
    keyword: state.search,
    orderBy: state.orderBy,
  });
  state.refreshing = false;
  if (data.list.length != 0) {
    state.list.push(...data.list);
    state.totalPage = data.totalPage;
  }
  console.log(data);
  state.loading = false;
  state.refreshing = false;
  if (state.page >= data.totalPage) state.finished = true;
  // console.log(state.list);
};
const getSearch = async () => {
  onRefresh();
};
const onClickTab = ({ name }) => {
  state.orderBy = name;
  if (state.search == "" && state.categoryId == "") return;
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
const goDetail = (id) => {
  router.push({ name: "Product", params: { id: id } });
};
</script>

<style lang="scss" scoped>
/deep/.van-cell {
  background-color: #f7f7f7;
}
/deep/.van-cell-group--inset,
.van-cell {
  height: 30px;
}
/deep/.van-cell {
  align-items: center;
  padding: 1px 5px;
}
.product {
  height: 150px;
  border-bottom: 1px solid white;
  /deep/.van-card {
    height: 100%;
    .van-card__title {
      font-size: 15px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      margin-bottom: 5px;
      box-sizing: content-box;
      margin-top: 10px;
    }
    .van-card__header {
      height: 100%;
    }
    .van-card__thumb {
      width: 40%;
      height: 100%;
    }
    .van-ellipsis {
      font-size: 14px;
    }
    .van-card__price {
      font-size: 14px;
      color: #1baeae;
    }
  }
}
.header {
  position: fixed;
  z-index: 999;
  width: 100%;
}
.content {
  margin-top: 80px;
}
.empty {
  display: block;
  width: 150px;
  margin: 50px auto 20px;
}
</style>
