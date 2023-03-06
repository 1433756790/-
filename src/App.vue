<template>
  <div>
    <router-view class="router-view" v-slot="{ Component }">
      <transition :name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
const router = useRouter();
const fade = ref("slide-left");
router.beforeEach((to, from) => {
  if (to.meta.index > from.meta.index) {
    fade.value = "slide-left";
  } else if (to.meta.index < from.meta.index) {
    fade.value = "slide-right";
  } else {
    fade.value = "";
  }
});
</script>

<style lang="scss" scoped>
.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  backface-visibility: hidden;
}
.slide-right-enter {
  opacity: 0;
  transform: translate(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
