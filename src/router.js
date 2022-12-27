import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/tutorials",
      name: "tutorials",
      component: () => import("./components/TutorialsList")
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("./components/Tutorial")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTutorial")
    },
    {
      path: "/user/insertUser",
      name: "insertUser",
      component: () => import("./components/AddUser")
    },
    {
      path: "/user/signInUser",
      name: "signInUser",
      component: () => import("./components/SignInUser")
    },
    {
      path: "/activity/all",
      name: "allActivity",
      component: () => import("./components/ActivityList")
    },
    {
      path: "/admin/insertAdmin",
      name: "insertAdmin",
      component: () => import("./components/AddAdmin")
    },
    {
      path: "/admin/signInAdmin",
      name: "signInAdmin",
      component: () => import("./components/SignInAdmin")
    },
    {
      path: "/application/getAppByAdminId",
      name: "getAdminApplication",
      component: () => import("./components/AppListForAdmin")
    },
  ]
});
