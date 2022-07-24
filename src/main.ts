import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./styles/index.scss";
import { saveStatePlugin } from "./stores/save-state-plugin";
import { resetPlugin } from "./stores/reset-plugin";
import { undoPlugin } from "./stores/undo-plugin";

const pinia = createPinia();
pinia.use(saveStatePlugin);
pinia.use(resetPlugin);
pinia.use(undoPlugin);

const app = createApp(App);
app.use(router);
app.use(pinia);

app.directive(
  "autofocus",
  (el, { value }) =>
    el instanceof HTMLElement &&
    (typeof value === "undefined" || value) &&
    el.focus()
);

app.mount("#app");
