import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth", top: 32 };
    }
  },
  routes: [
    {
      path: "/",
      component: () => import("./components/SheetsPage.vue"),
    },
  ],
});
