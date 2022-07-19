import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./styles/index.scss";
import { useCharacterStore } from "./stores/characters";

const app = createApp(App);

app.use(router);
app.use(createPinia());
useCharacterStore().seed();

app.mount("#app");
