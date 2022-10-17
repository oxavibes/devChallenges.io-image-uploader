<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";

import useStore from "@/store";

import useReadUrl from "@/composables/useReadUrl.js";
import useUploadFile from "@/composables/useUploadFile.js";

const localFileUrl = ref(null);
const selectedFile = ref(null);
const fileChooser = ref(null);

const store = useStore();
const { imgUrl, uploadProgress } = storeToRefs(store);

const onUploadFile = async () => {
  const { fileUrl, uploadFile } = useUploadFile("http://localhost:5000/api/v1/images", uploadProgress);

  try {
    store.startUploading();

    await uploadFile(selectedFile.value);

    imgUrl.value = fileUrl;

    store.stopUploading();
  } catch (error) {
    console.error(error);
  }
};

const onChange = async () => {
  const { readUrl } = useReadUrl();

  try {
    selectedFile.value = fileChooser.value.files[0];

    const url = await readUrl(selectedFile.value);

    localFileUrl.value = `url(${url})`;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="card">
    <h2 class="card-title">Upload your image</h2>

    <p class="card-subtitle">File should be jpeg, png...</p>

    <div class="card-img-preview" :class="[!selectedFile ? 'card-default-img' : 'card-selected-img']">
      <p v-show="!selectedFile">Drag & Drop your image here</p>
    </div>

    <p v-show="!selectedFile">Or</p>

    <form class="card-form" @submit.prevent="onUploadFile">
      <label class="card-file-chooser-button" for="fileChooser"
        >Choose File

        <input
          type="file"
          id="fileChooser"
          ref="fileChooser"
          @change="onChange"
          accept="image/png, image/jpeg"
          class="card-file-chooser-input"
        />
      </label>

      <button class="card-file-chooser-button" v-show="selectedFile">Upload file</button>
    </form>
  </div>
</template>

<style>
.card-selected-img {
  background-image: v-bind(localFileUrl);
  background-size: cover;
}
</style>
