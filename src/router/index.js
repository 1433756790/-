import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      index: 1,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      index: 1,
    },
  },
  {
    path: "/product/:id",
    name: "Product",
    component: () => import("@/views/Product.vue"),
    meta: {
      index: 3,
    },
  },
  {
    path: "/product-list/:id*",
    name: "Product-list",
    component: () => import("@/views/Product-list"),
    meta: {
      index: 2,
    },
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("@/views/Category.vue"),
    meta: {
      index: 1,
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart.vue"),
    meta: {
      index: 1,
    },
  },
  {
    path: "/address",
    name: "Address",
    component: () => import("@/views/Address.vue"),
    meta: {
      index: 2,
    },
  },
  {
    path: "/createorder",
    name: "CreateOrder",
    component: () => import("@/views/CreateOrder.vue"),
    meta: {
      index: 2,
    },
  },
  {
    path: "/address-edit",
    component: () => import("@/views/AddressEditor.vue"),
    meta: {
      index: 3,
    },
  },
  {
    path: "/order",
    name: "Order",
    component: () => import("@/views/Order.vue"),
    meta: {
      index: 2,
    },
  },
  {
    path: "/orderDetails",
    component: () => import("@/views/OrderDetails.vue"),
    meta: {
      index: 3,
    },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@/views/User.vue"),
    meta: {
      index: 1,
    },
  },
  {
    path: "/setting",
    component: () => import("@/views/Setting.vue"),
    meta: {
      index: 2,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
