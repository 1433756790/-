<template>
  <div>
    <nav-bar :title="message.type == 'login' ? '登录' : '注册'" />
    <img
      src="https://s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png"
      alt=""
      class="logo"
    />
    <div class="login-body" v-if="message.type == 'login'">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="message.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="message.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            center
            clearable
            label="验证码"
            placeholder="输入验证码"
            v-model="message.verify"
          >
            <template #button>
              <vue-img-verify ref="verifyRef" />
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px; padding: 0 16px">
          <div class="link-register" @click="toggle('register')">立即注册</div>
          <van-button round block color="#1baeae" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
    <div class="register-body" v-else>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="message.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="message.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            center
            clearable
            label="验证码"
            placeholder="输入验证码"
            v-model="message.verify"
          >
            <template #button>
              <vue-img-verify ref="verifyRef" />
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px; padding: 0 16px">
          <div class="link-register" @click="toggle('login')">已有账号登录</div>
          <van-button round block color="#1baeae" native-type="submit">
            注册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import VueImgVerify from "@/components/VueImgVerify.vue";
import { Register, Login } from "@/service/user.js";
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { showSuccessToast, showFailToast } from "vant";
import md5 from "js-md5";

const verifyRef = ref(null);
const message = reactive({
  username: "",
  password: "",
  type: "login",
  verify: "",
});

const onSubmit = async (values) => {
  console.log(message.verify.toLowerCase());
  if (
    message.verify.toLowerCase() != verifyRef.value.state.imgCode.toLowerCase()
  ) {
    showFailToast({
      message: "验证码错误",
      forbidClick: true,
    });
    return;
  } else {
    if (message.type == "login") {
      const { data: res } = await Login({
        loginName: message.username,
        passwordMd5: md5(message.password),
      });
      if (res.resultCode == 200) {
        window.localStorage.setItem("token", res.data);
        window.location.href = "/";
      }
      // console.log(data);
    } else {
      const res = await Register({
        loginName: message.username,
        password: message.password,
      });
      console.log(res);
      showSuccessToast({
        message: "注册成功",
        forbidClick: true,
      });
      message.type = "login";
      message.verify = "";
    }
  }
};
const toggle = (v) => {
  message.type = v;
  message.verify = "";
};

</script>

<style lang="scss" scoped>
.logo {
  width: 120px;
  height: 120px;
  display: block;
  margin: 80px auto 20px;
}
.login-body,
.register-body {
  padding: 0 5px;
  .link-register {
    font-size: 14px;
    margin-bottom: 20px;
    color: #1989fa;
    display: inline-block;
  }
}
</style>
