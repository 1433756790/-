<template>
  <div>
    <NavBar :isFixed="true" :needURL="'/user'">
      <template #title> 地址管理 </template>
    </NavBar>
    <van-address-list
      v-model="state.chosenAddressId"
      :list="state.list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { getAddressList } from "@/service/address.js";
import { reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();

const state = reactive({
  list: [],
  from: route.query.from,
  chosenAddressId: "1",
});

onMounted(() => {
  init();
});
const init = async () => {
  const { data: res } = await getAddressList();
  state.list = res.data.map((item) => {
    return {
      id: item.addressId,
      name: item.userName,
      tel: item.userPhone,
      address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
      isDefault: item.defaultFlag,
    };
  });
  console.log(res);
};
const onEdit = (item) => {
  router.push({
    path: "address-edit",
    query: { type: "edit", addressId: item.id, from: state.from },
  });
};
const onAdd = () => {
  router.push({ path: "/address-edit", query: { type: "add" } });
};
const onSelect = (item, index) => {
  if (route.query.from == "user") return;
  router.push({
    path: "/createorder",
    query: { addressId: item.id, cartItemIds: store.state.cartItemIds },
  });
};
</script>

<style lang="scss" scoped>
/deep/.van-address-item {
  .van-radio__icon {
    display: none;
  }
  .van-tag {
    background-color: red;
  }
}
</style>
