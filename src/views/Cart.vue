<template>
  <div>
    <nav-bar>
      <template #title :isFixed="true"> 购物车 </template>
    </nav-bar>
    <div class="cart-content">
      <VanCheckboxGroup
        v-model="state.result"
        ref="checkboxGroup"
        @change="groupChange"
      >
        <VanSwipeCell v-for="item in state.list">
          <van-card
            :num="item.goodsCount"
            :price="item.sellingPrice"
            :title="item.goodsName"
          >
            <template #thumb>
              <van-checkbox
                :name="item.cartItemId"
                @change="productChecked"
              ></van-checkbox>
              <img :src="$filter.prefix(item.goodsCoverImg)" alt="" />
            </template>
            <template #footer>
              <van-stepper
                v-model="item.goodsCount"
                @change="changeNum(item.goodsCount, item)"
              />
            </template>
          </van-card>
          <template #right>
            <van-button
              square
              type="danger"
              icon="delete-o"
              class="delete-btn"
              @click="deleteBtn(item.cartItemId)"
            />
          </template>
        </VanSwipeCell>
      </VanCheckboxGroup>
    </div>
    <van-submit-bar
      :price="totalPrice"
      :disabled="totalPrice == 0"
      button-text="结算"
      @submit="onSubmit"
      button-color="#1baeae"
    >
      <van-checkbox v-model="state.cehckAll" @click="allCheck"
        >全选</van-checkbox
      >
    </van-submit-bar>

    <tab-bar />
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "@vue/reactivity";
import TabBar from "@/components/TabBar.vue";
import NavBar from "@/components/NavBar.vue";
import { getCart, modifyCart, deleteCartItem } from "@/service/cart.js";
import { onMounted } from "@vue/runtime-core";
import { showLoadingToast, showConfirmDialog, showSuccessToast } from "vant";
import router from "../router";

const state = reactive({
  checked: false,
  price: 0,
  list: [],
  result: [],
  cehckAll: true,
});
const onSubmit = () => {
  const params = JSON.stringify(state.result);
  router.push({ path: "/createorder", query: { cartItemIds: params } });
};
const checkboxGroup = ref(null);
onMounted(() => {
  init();
});
const init = async () => {
  const toast = showLoadingToast({
    message: "加载中...",
    forbidClick: true,
  });
  const {
    data: { data },
  } = await getCart({ pagrNumber: 1 });
  state.list = data;
  state.result = state.list.map((item) => item.cartItemId);
  // console.log(state.result);
  toast.close();
  // console.log(data);
};
const totalPrice = computed(() => {
  let sum = 0;

  let _list = state.list.filter((item) =>
    state.result.includes(item.cartItemId)
  );
  _list.forEach((item) => {
    sum += item.goodsCount * item.sellingPrice * 100;
  });
  return sum;
});

const changeNum = async (value, detail) => {
  // console.log(value, detail);
  const toast = showLoadingToast({
    message: "修改中...",
    forbidClick: true,
  });
  const params = {
    cartItemId: detail.cartItemId,
    goodsCount: value,
  };
  console.log(params);
  const { data: res } = await modifyCart(params);
  // console.log(res);
  toast.close();
};

const productChecked = (num) => {
  console.log(num);
};
const groupChange = (result) => {
  // console.log(result);
  if (result.length == state.list.length) {
    state.cehckAll = true;
  } else {
    state.cehckAll = false;
  }
  state.result = result;
};
const allCheck = () => {
  if (state.cehckAll) {
    state.result = state.list.map((item) => item.cartItemId);
  } else {
    state.result = [];
  }
  // console.log(state.result);
};

const deleteBtn = async (id) => {
  showConfirmDialog({
    title: "提示",
    message: "是否删除该商品。",
  })
    .then(async () => {
      // on confirm
      const { data: res } = await deleteCartItem(id);
      if (res.resultCode) {
        init();
        showSuccessToast("删除成功");
      }
      console.log(res);
    })
    .catch(() => {
      // on cancel
      return;
    });
};
</script>

<style lang="scss" scoped>
.van-submit-bar {
  bottom: 49px;
}
.cart-content {
  padding-bottom: 120px;
}
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
    display: flex;
    justify-content: space-between;
    width: 34%;
    height: 100%;
    align-items: center;
    img {
      width: 80%;
    }
  }
  .van-ellipsis {
    font-size: 10px;
  }
  .van-card__price {
    font-size: 14px;
    color: red;
  }
}
.delete-btn {
  height: 100%;
  width: 65px;
}
</style>
