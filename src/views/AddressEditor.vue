<template>
  <div>
    <NavBar :isFixed="true">
      <template #title> 编辑地址 </template>
    </NavBar>
    <van-address-edit
      :area-list="state.areaList"
      :show-delete="state.type=='edit'"
      show-set-default
      show-search-result
      :addressInfo="state.addressInfo"
      :search-result="state.searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      
    />
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { tdist } from "@/common/js/utils.js";
import {
  getAddressDetail,
  EditAddress,
  addAddress,
} from "@/service/address.js";
import { showSuccessToast, showConfirmDialog ,showLoadingToast} from "vant";
import { DeleteAddress } from "../service/address";

const route = useRoute();
const router = useRouter();
const state = reactive({
  areaList: {
    province_list: {},
    city_list: {},
    county_list: {},
  },
  searchResult: [],
  type: "add",
  addressId: "",
  addressInfo: {},
  from: route.query.from,
});
onMounted(async () => {
  // 省市区列表构造
  let _province_list = {};
  let _city_list = {};
  let _county_list = {};
  tdist.getLev1().forEach((p) => {
    _province_list[p.id] = p.text;
    tdist.getLev2(p.id).forEach((c) => {
      _city_list[c.id] = c.text;
      tdist.getLev3(c.id).forEach((q) => (_county_list[q.id] = q.text));
    });
  });
  state.areaList.province_list = _province_list;
  state.areaList.city_list = _city_list;
  state.areaList.county_list = _county_list;

  const { addressId, type, from } = route.query;
  state.addressId = addressId;
  state.type = type;
  state.from = from || "";
  if (type == "edit") {
    const { data: addressDetail } = await getAddressDetail(addressId);
    console.log(addressDetail);
    let _areaCode = "";
    const province = tdist.getLev1();
    Object.entries(state.areaList.county_list).forEach(([id, text]) => {
      // 先找出当前对应的区
      if (text == addressDetail.data.regionName) {
        // 找到区对应的几个省份
        const provinceIndex = province.findIndex(
          (item) => item.id.substr(0, 2) == id.substr(0, 2)
        );
        // 找到区对应的几个市区
        // eslint-disable-next-line no-unused-vars
        const cityItem = Object.entries(state.areaList.city_list).filter(
          ([cityId, cityName]) => cityId.substr(0, 4) == id.substr(0, 4)
        )[0];
        // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
        if (
          province[provinceIndex].text == addressDetail.data.provinceName &&
          cityItem[1] == addressDetail.data.cityName
        ) {
          _areaCode = id;
        }
      }
    });
    state.addressInfo = {
      id: addressDetail.data.addressId,
      name: addressDetail.data.userName,
      tel: addressDetail.data.userPhone,
      province: addressDetail.data.provinceName,
      city: addressDetail.data.cityName,
      county: addressDetail.data.regionName,
      addressDetail: addressDetail.data.detailAddress,
      areaCode: _areaCode,
      isDefault: !!addressDetail.data.defaultFlag,
    };
  }
});

const onSave = async (content) => {
  const params = {
    userName: content.name,
    userPhone: content.tel,
    provinceName: content.province,
    cityName: content.city,
    regionName: content.county,
    detailAddress: content.addressDetail,
    defaultFlag: content.isDefault ? 1 : 0,
  };
  if (state.type == "edit") {
    params["addressId"] = state.addressId;
  }
  const { data: res } =
    (await state.type) == "add" ? addAddress(params) : EditAddress(params);
  showSuccessToast("保存成功");
  setTimeout(() => {
    router.back();
  }, 1000);
  console.log(res);
};
const onDelete = async () => {
  showConfirmDialog({
    message: "确定要删除吗",
  })
    .then(async () => {
      // on confirm
      await DeleteAddress(state.addressId);
      showSuccessToast("删除成功");
      setTimeout(() => {
        router.back();
      }, 1000);
    })
    .catch(() => {
      // on cancel
      return;
    });
};
</script>

<style lang="scss" scoped></style>
