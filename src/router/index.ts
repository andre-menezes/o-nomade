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
    path: "/hotel/:id?",
    name: "Hotel Details",
    component: lazyLoad("Hotel"),
    meta: {
      layout: "default",
      requiresId: true,
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
    path: "/:pathMatch(.*)*",
    name: "Page Not Found",
    component: lazyLoad("PageNotFound"),
    meta: {
      layout: "not-found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const requiresId = to.matched.some(record => record.meta.requiresId);

  if (requiresId && !to.params.id) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
