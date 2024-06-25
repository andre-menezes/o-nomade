import { useAuthStore } from "@/stores/modules/auth";
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
    path: "/login",
    name: "Login",
    component: lazyLoad("Login"),
    meta: {
      layout: "empty",
    },
  },
  {
    path: "/hoteis",
    name: "Hotéis",
    component: lazyLoad("Search"),
    meta: {
      layout: "default",
    },
  },
  {
    path: "/hoteis/:id",
    name: "Hotel",
    component: lazyLoad("Hotel"),
    meta: {
      layout: "default",
    },
  },
  {
    path: "/reserva/:id",
    name: "Reserva",
    component: lazyLoad("Booking"),
    meta: {
      layout: "default",
      requiresAuth: true,
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
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const loggedIn =
    !!localStorage.getItem("userAuthenticated") && authStore.isAuthenticated;

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
