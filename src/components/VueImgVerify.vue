<template>
  <div class="img-verify">
    <canvas
      ref="verify"
      :width="state.width"
      :height="state.height"
      @click="handleDraw"
    ></canvas>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const verify = ref(null);
const state = reactive({
  pool: "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", // 字符串
  width: 120,
  height: 40,
  imgCode: "",
});
defineExpose({
  state,
  // handleDraw
});
onMounted(() => {
  state.imgCode = draw();
});

const handleDraw = () => {
  state.imgCode = draw();
};

// 随机数
const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
// 随机颜色
const randomColor = (min, max) => {
  const r = randomNum(min, max);
  const g = randomNum(min, max);
  const b = randomNum(min, max);
  return `rgb(${r},${g},${b})`;
};
const draw = () => {
  const ctx = verify.value.getContext("2d");
  ctx.fillStyle = randomColor(180, 230);
  ctx.fillRect(0, 0, state.width, state.height);
  let imgCode = "";
  for (let i = 0; i < 4; i++) {
    const text = state.pool[randomNum(0, state.pool.length)];
    imgCode += text;
    const fontSize = randomNum(18, 40);
    const deg = randomNum(-30, 30);
    ctx.font = fontSize + "px Simhei";
    ctx.textBaseline = "top";
    ctx.fillStyle = randomColor(80, 150);
    ctx.save();
    ctx.translate(30 * i + 15, 15);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillText(text, -15 + 5, -15);
    ctx.restore();
  }
  return imgCode;
};
</script>

<style lang="scss" scoped></style>
