import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

function lazyLoad(view: string) {
  return () => import(`@/views/${view}.vue`);
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: lazyLoad("Home"),
    meta: {
      layout: "default",
    },
  },
  {
    path: "/hotel",
    name: "Hotel",
    component: lazyLoad("Home"),
    meta: {
      layout: "default",
    },
  },
  {
    path: "/pesquisa",
    name: "Search",
    component: lazyLoad("Search"),
    meta: {
      layout: "default",
    },
  },
  {
    path: "/:pathMatch(.*)",
    component: lazyLoad("PageNotFound"),
    meta: {
      layout: "not-found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
