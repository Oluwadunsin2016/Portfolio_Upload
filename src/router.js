import { createRouter, createWebHistory } from "vue-router";
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";
import Portfolio from "./pages/Portfolio.vue";
import Profile from "./pages/Profile.vue";
import VerifyEmail from "./pages/VerifyEmail.vue";
import ErrorPage from "./pages/ErrorPage.vue";
import Preview from "./components/Preview/Preview.vue";
import ResetPassword from "./pages/ResetPassword.vue";
import ChangePassword from "./pages/ChangePassword.vue";

const routes = [
  {
    path: "/",
    component: Portfolio,
    meta: { public: false }, // marked the route as private
  },
   {
    path: "/:catchAll(.*)",
    component: ErrorPage,
    meta: { public: true }, // marked the route as private
  },
  {
    path: "/profile",
    component: Profile,
    meta: { public: false }, // marked the route as private
  },
  {
    path: "/verify/:token",
    name: "verify",
    component: VerifyEmail,
    meta: { public: true }, // marked the route as private
  },
  {
    path: "/preview",
    name: "preview",
    component: Preview,
    meta: { public: false }, // marked the route as private
  },
  {
    path: "/login",
    name: "login",
    component: SignIn,
    meta: { public: true }, // marked the route as public
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    meta: { public: true }, // marked the route as public
  },
  {
    path: "/reset-password",
    name: "reset",
    component: ResetPassword,
    meta: { public: true }, // marked the route as public
  },
  {
    path: "/change-password",
    name: "change",
    component: ChangePassword,
    meta: { public: true }, // marked the route as public
  },
];

const router = createRouter({
  history: createWebHistory(""),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem("token");

  // if (!to.meta.public) {
  //   if (!isAuthenticated) {
  //     next({ name: "login" });
  //   } else {
  //     next();
  //   }
  // } else {
  //   if (!isAuthenticated) {
  //     next();
  //   } else {
  //     next({ name: from.name });
  //   }
  // }

    if (isAuthenticated && !to.meta.public) {
      next();
  } else if(!isAuthenticated && to.meta.public) {
      next();
  }
   else if (isAuthenticated && to.meta.public) {
      router.back;
    }else{
      next({ name: "login" });
    }
});

export default router;
