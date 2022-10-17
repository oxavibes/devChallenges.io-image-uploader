<script setup>
import { storeToRefs } from "pinia";

import useStore from "@/store";

import UploadImage from "@/components/UploadImage.vue";
import UploadProgressBar from "@/components/UploadProgressBar.vue";
import UploadImageCompleted from "@/components/UploadImageCompleted.vue";

const { isSelecting, isUploading, isComplete, uploadProgress } = storeToRefs(useStore());
</script>

<template>
  <UploadImage v-show="isSelecting"></UploadImage>

  <UploadProgressBar v-show="isUploading" :progress="uploadProgress"></UploadProgressBar>

  <UploadImageCompleted v-show="isComplete"></UploadImageCompleted>
</template>

<style scoped></style>
