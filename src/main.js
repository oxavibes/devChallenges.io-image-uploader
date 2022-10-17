import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import "../src/assets/css/main.css";

const Pinia = createPinia();
const app = createApp(App);

app.use(Pinia);

app.mount("#app");
