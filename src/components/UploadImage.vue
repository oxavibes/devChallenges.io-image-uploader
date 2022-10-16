<script setup>
import axios from "axios";
import { ref, inject } from "vue";

import useReadUrl from "../composables/useReadUrl";

const { isSelecting, isUploading, isComplete, uploadProgress, imgUrl } =
  inject("flags");

const fileUrl = ref(null);
const selectedFile = ref(null);
const fileChooser = ref(null);

const onUploadFile = async () => {
  const BASE_URL = "http://localhost:5000/api/v1/images";
  let formData = new FormData();

  formData.append("file", selectedFile.value);

  try {
    isSelecting.value = false;
    isUploading.value = true;

    const { data } = await axios.post(BASE_URL, formData, {
      onUploadProgress: (event) => {
        const progress = Math.round((event.loaded * 100) / event.total);
        uploadProgress.value = progress;
      },
    });

    imgUrl.value = data.url;

    isUploading.value = false;
    isComplete.value = true;
  } catch (error) {
    console.error(error);
  }
};

const onChange = async () => {
  const { readUrl } = useReadUrl();

  const file = fileChooser.value.files[0];
  const url = await readUrl(file);

  selectedFile.value = file;

  fileUrl.value = `url(${url})`;
};
</script>

<template>
  <div class="card">
    <h2 class="card-title">Upload your image</h2>

    <p class="card-subtitle">File should be jpeg, png...</p>

    <div
      class="card-img-preview"
      :class="[!selectedFile ? 'card-default-img' : 'card-selected-img']"
      @drop.prevent="onDrop"
    >
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
          accept="image/png, image/jpeg"
          class="card-file-chooser-input"
          @change="onChange"
        />
      </label>

      <button class="card-file-chooser-button" v-show="selectedFile">
        Upload file
      </button>
    </form>
  </div>
</template>

<style>
.card-selected-img {
  background-image: v-bind(fileUrl);
  background-size: cover;
}
</style>
