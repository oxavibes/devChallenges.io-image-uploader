<script setup>
import { ref, provide } from "vue";

import UploadImage from "../components/UploadImage.vue";
import UploadProgressBar from "../components/UploadProgressBar.vue";
import UploadImageCompleted from "../components/UploadImageCompleted.vue";

const isSelecting = ref(true);
const isUploading = ref(false);
const isComplete = ref(false);

const uploadProgress = ref(0);
const imgUrl = ref(null);

provide("flags", {
  isSelecting,
  isUploading,
  isComplete,
  uploadProgress,
  imgUrl,
});
</script>

<template>
  <UploadImage v-show="isSelecting"></UploadImage>
  <UploadProgressBar
    v-show="isUploading"
    :progress="uploadProgress"
  ></UploadProgressBar>
  <UploadImageCompleted
    v-show="isComplete"
    :imgUrl="imgUrl"
  ></UploadImageCompleted>
</template>

<style scoped></style>
