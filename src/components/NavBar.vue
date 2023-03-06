<template>
  <div>
    <van-nav-bar
      :left-arrow="left_arrow"
      @click-left="onClickLeft"
      :fixed="props.isFixed"
      :class="{ isFixed: props.isFixed }"
      ref="Nav_Bar"
    >
      <template #right>
        <slot name="right">
          <van-icon name="ellipsis" size="18" />
        </slot>
      </template>
      <template #title>
        <slot name="title" class="title-width"></slot>
      </template>
    </van-nav-bar>
  </div>
  <div class="isFixed" v-if="props.isFixed"></div>
</template>

<script setup>
import { defineProps, nextTick, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  title: String,
  left_arrow: {
    type: Boolean,
    default: true,
  },
  isFixed: {
    type: Boolean,
    default: false,
  },
  needURL: String,
});
const onClickLeft = () => {
  if (props.needURL) {
    router.push(props.needURL);
  } else {
    history.back();
  }
};

// console.log(props.isFixed);
// const isFixed = ref(false);
// nextTick(() => {
//   window.addEventListener("scroll", () => {
//     let scrollTop = window.pageYOffset;
//     isFixed.value = scrollTop > 100 ? true : false;
//   });
// });
</script>

<style lang="scss">
.isFixed {
  width: 100%;
  height: 46px;
}
</style>
