import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress"; //路由加载过度动画库
import "nprogress/nprogress.css"; //路由加载过度动画库css
import findLast from "loadsh/findLast";
import { notification } from "ant-design-vue"; //提示框
import { check, isLogin } from "@/utils/auth";
import layout from "@/layout/basicLayout"; //基础布局组件
import notFound from "@/components/myNotFound"; //404页面
import forBidden from "@/components/forBidden"; //禁止进入页面
Vue.use(VueRouter);
/**
 * 路由配置说明：
 * 建议：sider menu 请不要超过三级菜单，若超过三级菜单，则应该设计为顶部主菜单 配合左侧次级菜单
 *
 **/
const routes = [
  {
    path: "/user",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "user" */ "../layout/userLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login",
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/myLogin"),
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/myRegister"),
      },
    ],
  },
  {
    path: "/",
    component: layout,
    meta: { authority: ["user", "admin"] },
    children: [
      {
        path: "/dashboard",
        component: { render: (h) => h("router-view") },
        name: "dashboard",
        meta: {
          icon: "dashboard",
          title: "仪表盘",
        },
        redirect: "/dashboard/workPlace",
        children: [
          {
            path: "/dashboard/analysis",
            name: "Analysis",
            meta: { title: "分析页" },
            component: () => import("@/views/dashboard/myAnalysis"),
          },
          {
            path: "/dashboard/monitor",
            name: "Monitor",
            component: () => import("@/views/dashboard/myMonitor"),
          },
          {
            path: "/dashboard/workPlace",
            name: "workPlace",
            component: () => import("@/views/dashboard/workPlace"),
          },
        ],
      },
      {
        path: "/form",
        component: { render: (h) => h("router-view") },
        name: "form",
        redirect: "/form/base-form",
        meta: { title: "表单页", icon: "form", authority: ["admin"] },
        children: [
          {
            path: "/form/base-form",
            name: "baseForm",
            component: () => import("@/views/form/basicForm"),
            meta: { title: "基础表单" },
          },
          {
            path: "/form/step-form",
            name: "stepForm",
            hideChildrenInMenu: true,
            component: () => import("@/views/form/stepForm/stepForm"),
            meta: { title: "分步表单" },
          },
          {
            path: "/form/advanced-form",
            name: "advanceForm",
            component: () => import("@/views/form/advancedForm/advancedForm"),
            meta: { title: "高级表单" },
          },
        ],
      },
    ],
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: forBidden,
  },

  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: notFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
//路由切换显示加载动画
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    //路由切换显示加载动画
    NProgress.start();
  }
  //loadsh findLast函数 从数组末尾往前遍历数组 第二个参数为每次遍历执行的函数
  //这里通过loadsh.findlast 配合to.matched 找到第一个匹配出meta中带有权限信息的路由path
  const record = findLast(to.matched, (record) => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login",
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "没有权限 请联系管理员",
      });
      next({
        path: "/403",
      });
    }
    NProgress.done();
  }
  next();
});
router.afterEach(() => {
  //路由切换后停止加载动画
  NProgress.done();
});
export default router;
