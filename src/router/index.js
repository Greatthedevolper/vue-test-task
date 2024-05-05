import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignUp.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LogIn.vue")
    }
  ]
});

export default router;
