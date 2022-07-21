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
      redirect: "/sheets",
    },
    // {
    //   path: "/traits",
    //   component: () => import("./components/TraitList.vue"),
    // },
    {
      path: "/sheets",
      component: () => import("./components/SheetsPage.vue"),
    },
  ],
});
