<script setup>
import TheView from "./views/TheView.vue";
</script>

<template>
  <main>
    <TheView></TheView>
  </main>
</template>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
}

main {
  height: 100vh;
  background: #fafafb;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
