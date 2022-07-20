import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth", top: 48 };
    }
  },
  routes: [
    {
      path: "/",
      redirect: "/traits",
    },
    {
      path: "/traits",
      component: () => import("./components/TraitList.vue"),
    },
    {
      path: "/sheets",
      component: () => import("./components/SheetsPage.vue"),
    },
  ],
});
