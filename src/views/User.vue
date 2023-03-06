<template>
  <div>
    <NavBar :isFixed="true">
      <template #title> 我的 </template>
    </NavBar>
    <div class="user-info">
      <div class="info">
        <img src="https://s.yezgea02.com/1604040746310/aaaddd.png" alt="" />
        <div class="user-desc">
          <div>昵称：{{ state.user.nickName }}</div>
          <div>登录名：{{ state.user.loginName }}</div>
          <div>个性签名：{{ state.user.introduceSign }}</div>
        </div>
      </div>
    </div>
    <div class="user-list">
      <van-cell title="我的订单" is-link to="/order?from=user" />
      <van-cell title="账号管理" is-link to="/setting" />
      <van-cell title="地址管理" is-link to="/address?from=user" />
      <van-cell title="关于我们" is-link to="/" />

    </div>
    <TabBar></TabBar>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import TabBar from "@/components/TabBar.vue";
import { reactive, onMounted } from "vue";
import { getUserInfo } from "@/service/user.js";

const state = reactive({
  user: {},
  loading: true,
});

onMounted(() => {
  init();
});

const init = async () => {
  const { data: res } = await getUserInfo();
  state.user = res.data;
  console.log(res);
};
</script>

<style lang="scss" scoped>
.user-info {
  box-sizing: border-box;
  margin: 10px 10px;
  background-color: #1baeae;
  //   width: 100%;
  height: 115px;
  border-radius: 8px;
  box-shadow: 0 3px 5px #269090;
  background: linear-gradient(90deg, #1baeae, #51c7c7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 22px;
  .info {
    display: flex;
    font-size: 14px;
    color: white;
    justify-content: start;
    width: 100%;
    height: 70%;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 55%;
      margin-right: 15px;
    }
    .user-desc {
      height: 85%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>
