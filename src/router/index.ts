import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

function lazyLoad(view: string) {
  return () => import(`@/views/${view}.vue`);
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: lazyLoad("Home"),
  },
  // Adicione outras rotas conforme necessário
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
