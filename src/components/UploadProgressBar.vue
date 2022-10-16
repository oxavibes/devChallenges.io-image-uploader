<script setup>
import { toRefs } from "vue";

const props = defineProps({ progress: Number });

const { progress } = toRefs(props);
</script>

<template>
  <div class="card">
    <h2 class="card-title align-left">Uploading...</h2>

    <progress :value="progress" max="100"></progress>
  </div>
</template>

<style scoped>
.align-left {
  align-self: flex-start;
}
progress {
  display: block;
  width: 100%;
}
</style>
