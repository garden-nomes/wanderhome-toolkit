import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./styles/index.scss";
import { useCharacterStore } from "./stores/characters";
import { saveStatePlugin } from "./stores/save-state-plugin";
import { resetPlugin } from "./stores/reset-plugin";

const pinia = createPinia();
pinia.use(saveStatePlugin);
pinia.use(resetPlugin);

const app = createApp(App);
app.use(router);
app.use(pinia);
useCharacterStore().seed();

app.directive(
  "autofocus",
  (el, { value }) =>
    el instanceof HTMLElement &&
    (typeof value === "undefined" || value) &&
    el.focus()
);

app.mount("#app");
