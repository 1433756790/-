<template>
  <div>
    <NavBar :isFixed="true">
      <template #title> 账号管理 </template>
    </NavBar>
    <van-cell-group inset>
      <van-field label="昵称" v-model:modelValue="state.nickName" readonly />
      <van-field
        label="个性签名"
        v-model:modelValue="state.introduceSign"
        readonly
      />
      <van-field label="修改密码" v-model:modelValue="state.password" />
    </van-cell-group>
    <van-button
      round
      class="save-btn"
      color="#1baeae"
      type="primary"
      @click="save"
      block
      >保存</van-button
    >
    <van-button
      round
      class="save-btn"
      color="#1baeae"
      type="primary"
      @click="handleLogout"
      block
      >退出登录</van-button
    >
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { getUserInfo, EditUserInfo, logout } from "@/service/user.js";
import { reactive, onMounted } from "vue";
import { showSuccessToast } from "vant";
import md5 from "js-md5";
import { setLocal } from "@/common/js/utils";

const state = reactive({
  nickName: "",
  introduceSign: "",
  password: "",
});
onMounted(() => {
  init();
});

const init = async () => {
  const { data: res } = await getUserInfo();
  state.nickName = res.data.nickName;
  state.introduceSign = res.data.introduceSign;
  console.log(res);
};

const save = async () => {
  const params = {
    introduceSign: state.introduceSign,
    nickName: state.nickName,
  };
  if (state.password) {
    params.passwordMd5 = md5(state.password);
  }
  const { data: res } = await EditUserInfo(params);
  console.log(res);
  showSuccessToast("保存成功");
};
const handleLogout = async () => {
  await logout();
  setLocal("token", "");
  window.location.href = "/home";
};
</script>

<style lang="scss" scoped>
/deep/.van-cell-group--inset {
  margin: 0 8px;
}
.save-btn {
  width: 80%;
  margin: 20px auto;
}
</style>
