<script setup>
import { ref, toRefs } from "vue";

const props = defineProps({ imgUrl: String });

const { imgUrl } = toRefs(props);

const inputRef = ref(null);
const imageRef = ref(null);
const hasImageLoaded = ref(false);

const onClick = () => {
  inputRef.value.select();

  /* Copy selected text into clipboard */
  navigator.clipboard.writeText(inputRef.value.value);
};

const onLoadImage = () => {
  hasImageLoaded.value =
    imageRef.value.complete && imageRef.value.naturalHeight !== 0;
};
</script>

<template>
  <div class="card">
    <div class="card-title-skeleton" v-if="!hasImageLoaded"></div>
    <h2 class="card-title" v-else>Uploaded successfully</h2>

    <div
      class="card-img-preview"
      :class="[{ 'card-img-skeleton': !hasImageLoaded }]"
    >
      <img
        v-show="hasImageLoaded"
        ref="imageRef"
        @load="onLoadImage"
        :src="imgUrl"
        alt="Uploaded image"
      />
    </div>

    <div class="card-actions-skeleton" v-if="!hasImageLoaded"></div>

    <div class="card-actions" v-else>
      <input
        ref="inputRef"
        class="card-input"
        type="text"
        disabled
        :value="imgUrl"
      />

      <button class="card-file-copy-button" @click="onClick">Copy link</button>
    </div>
  </div>
</template>

<style scoped>
.card-actions {
  align-self: stretch;
  position: relative;
}

.card-file-copy-button {
  position: absolute;
  right: 0;
}

.card-img-preview {
  border: none;
}

.card-img-preview img {
  display: block;
  max-width: 100%;
  border-radius: 6px;
}

@keyframes bgAnimate {
  0% {
    background-position: 50% 0;
  }

  100% {
    background-position: -150% 0;
  }
}

.card-title-skeleton,
.card-img-skeleton,
.card-actions-skeleton {
  border-radius: 6px;
  background: #eee;
  background-image: linear-gradient(
    to right,
    #d6d7d8 0%,
    #e2e3e4 10%,
    #d6d7d8 20%,
    #d6d7d8 100%
  );
  background-size: 200% 100%;
  animation: bgAnimate 1.2s linear infinite;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  margin-bottom: 20px;
}

.card-title-skeleton {
  width: 180px;
  height: 21px;
}

.card-img-skeleton {
  width: 100%;
  height: 220px;
}
.card-actions-skeleton {
  width: 336px;
  height: 34px;
}
</style>
