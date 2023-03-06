<template>
  <div>
    <header :class="{ active: state.headerScroll }">
      <router-link to="/"
        ><van-icon
          name="wap-nav"
          :color="state.headerScroll ? '#fff' : '#1baeae'"
      /></router-link>
      <div class="header-search">
        <span class="app-name">新蜂商城</span>
        <span class="divid-line">|</span>
        <router-link to="/product-list"
          ><span>山河无恙，人间皆安</span></router-link
        >
      </div>
      <router-link to="/user">
        <div class="user">
          <van-icon
            name="user-o"
            v-if="state.isLogin"
            :color="state.headerScroll ? '#fff' : '#1baeae'"
          />
          <span v-else :class="state.headerScroll ? 'logout1' : 'logout2'"
            >登录</span
          >
        </div>
      </router-link>
    </header>
    <div class="swiperWrap">
      <van-swipe class="my-swipe" :autoplay="3000" lazy-render>
        <van-swipe-item v-for="(item, index) in state.swiperList" :key="index">
          <img :src="item.carouselUrl" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="category-list">
      <div
        class="list-item"
        v-for="(item, index) in state.categoryList"
        :key="index"
      >
        <img :src="item.imgUrl" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div class="goods">
      <goods-box
        title="新品上线"
        :goods="state.newGoodses"
        :loading="state.loading"
      />
      <goods-box title="热卖商品" :goods="state.hots" />
      <goods-box title="最新推荐" :goods="state.recommends" />
    </div>
    <tab-bar />
  </div>
</template>

<script setup>
import GoodsBox from "@/components/GoodsBox.vue";
import TabBar from "@/components/TabBar.vue";
import { showLoadingToast } from "vant";
import { getHome } from "@/service/home.js";
import { nextTick, onMounted, reactive } from "@vue/runtime-core";
const state = reactive({
  swiperList: [],
  isLogin: false,
  headerScroll: false, // 滚动透明判断
  hots: [],
  newGoodses: [],
  recommends: [],
  categoryList: [
    {
      name: "新蜂超市",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png",
      categoryId: 100001,
    },
    {
      name: "新蜂服饰",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png",
      categoryId: 100003,
    },
    {
      name: "全球购",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png",
      categoryId: 100002,
    },
    {
      name: "新蜂生鲜",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png",
      categoryId: 100004,
    },
    {
      name: "新蜂到家",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png",
      categoryId: 100005,
    },
    {
      name: "充值缴费",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png",
      categoryId: 100006,
    },
    {
      name: "9.9元拼",
      imgUrl: "https://s.yezgea02.com/1604041127880/9.9%402x.png",
      categoryId: 100007,
    },
    {
      name: "领劵",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png",
      categoryId: 100008,
    },
    {
      name: "省钱",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png",
      categoryId: 100009,
    },
    {
      name: "全部",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png",
      categoryId: 100010,
    },
  ],
  loading: true,
});
onMounted(async () => {
  const toast = showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    className: "inexa",
  });
  const { data: res } = await getHome();
  state.swiperList = res.data.carousels;
  state.hots = res.data.hotGoodses;
  state.recommends = res.data.recommendGoodses;
  // console.log(res);
  state.newGoodses = res.data.newGoodses;
  state.loading = false;
  if (window.localStorage.getItem("token") != "") {
    state.isLogin = true;
  }
  toast.close();
});
nextTick(() => {
  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset;
    state.headerScroll = scrollTop > 100 ? true : false;
  });
});
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: tansition;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
  box-sizing: border-box;
  z-index: 1000;
  .van-icon {
    font-size: 20px;
  }
}
.active {
  background-color: #1baeae;
}
.header-search {
  background: hsla(0, 0%, 100%, 0.7);
  display: flex;
  // align-items: center;
  width: 70%;
  height: 30px;
  line-height: 30px;
  border-radius: 20px;
  padding: 0 10px;
  .app-name {
    font-size: 20px;
    font-weight: bold;
    color: #1baeae;
    margin-right: 13px;
  }
  a {
    font-size: 12px;
    text-decoration: none; /* 去除默认的下划线 */
    color: rgb(90, 90, 90);
    transform: translateY(-1px);
  }
  .divid-line {
    margin-right: 13px;
    color: rgb(95, 93, 93);
    font-size: 17px;
  }
}
.my-swipe {
  img {
    width: 100%;
    height: 100%;
  }
}
.category-list {
  font-size: 10px;
  color: #666;
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  width: 100%;
  align-items: center;
  .list-item {
    width: 20%;
    text-align: center;
    margin-bottom: 10px;
    img {
      margin-bottom: 3px;
      width: 36px;
    }
  }
}
.goods {
  width: 100%;
}
.inexa {
  z-index: 999999 !important;
}
.logout1 {
  font-size: 18px;
  color: white;
}
.logout2 {
  font-size: 18px;
  color: #1baeae;
}
</style>
