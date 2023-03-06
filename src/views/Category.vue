<template>
  <div>
    <nav-bar :isFixed="true">
      <template #title>
        <div class="field-height">
          <router-link to="/product-list">
            <van-cell-group inset>
              <van-field left-icon="search" placeholder="全场50元起步" />
            </van-cell-group>
          </router-link>
        </div>
      </template>
    </nav-bar>
    <div class="content">
      <div class="left-list">
        <div
          class="listItem"
          v-for="(item, index) in lists"
          :key="index"
          :class="{ active: index == aciveIndex }"
          @click="changeTab(index)"
        >
          {{ item.categoryName }}
        </div>
      </div>
      <div class="list-content">
        <div
          class="secendName"
          v-for="(item, index) in secendlist"
          :key="index"
        >
          <p class="categoryNam-first">{{ item.categoryName }}</p>
          <div class="category-list">
            <div
              class="product-item"
              v-for="(item2, index2) in item.thirdLevelCategoryVOS"
              :key="index2"
              @click="goProductList(item2.categoryId)"
            >
              <img
                src="http://s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png"
                alt=""
              />
              <div class="name">{{ item2.categoryName }}</div>
            </div>
          </div>
        </div>
      </div>
      <tab-bar />
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { getCategory } from "@/service/good.js";
import { onMounted, reactive, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import TabBar from "@/components/TabBar.vue";
const lists = reactive([]);
const secendlist = reactive([]);
const aciveIndex = ref(0);
const router = useRouter();
onMounted(async () => {
  const { data: res } = await getCategory();
  lists.push(...res.data);
  secendlist.push(...lists[0].secondLevelCategoryVOS);
  console.log(lists[0]);
});
const changeTab = (index) => {
  aciveIndex.value = index;
  secendlist.length = 0;
  secendlist.push(...lists[aciveIndex.value].secondLevelCategoryVOS);
};
const goProductList = (index) => {
  router.push({ name: "Product-list", params: { id: index } });
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
.content {
  display: flex;
}
.left-list {
  justify-content: space-between;
  width: 30%;
  height: 621px;
  font-size: 16px;
  background-color: #f7f7f7;
  text-align: center;
  .listItem {
    height: 60px;
    line-height: 60px;
  }
  .active {
    background-color: white;
    color: #1baeae;
  }
}
.list-content {
  width: 70%;
  max-height: 621px;
  overflow: scroll;
  .secendName {
    font-size: 20px;
    .categoryNam-first {
      height: 100px;
      line-height: 100px;
      padding-left: 10px;
    }
  }
}
.category-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  padding-bottom: 45px;
  .product-item {
    width: 33.3%;
    font-size: 16px;
    text-align: center;
    img {
      width: 43%;
    }
    .name {
      height: 50px;
      // line-height: 50px;
      margin-top: 10px;
    }
  }
}
</style>
