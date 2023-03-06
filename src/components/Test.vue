<template>
  <div>
    222
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
const props = defineProps({ title: String, goods: Object, loading: Boolean });
console.log(props.title);
</script>

<style lang='scss' scoped>

</style>
