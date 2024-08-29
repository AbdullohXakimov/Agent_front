import { createRouter, createWebHistory } from "vue-router";
import AdminLogin from "@/pages/AdminLogin.vue";
import UserLogin from "@/pages/UserLogin.vue";
import AdminLayout from "@/layouts/admin/AdminLayout.vue";

import CreateProduct from "../layouts/admin/CreateProduct.vue";
import UpdateProduct from "../layouts/admin/UpdateProduct.vue";
import Products from "../layouts/admin/Products.vue";
import Dashboard from "../layouts/admin/Dashboard.vue";
import Clients from "../layouts/admin/Clients.vue";
import ShopProducts from "../layouts/admin/ShopProducts.vue";
import CreateShopProduct from "../pages/admin/CreateShopProduct.vue";
import EditShopProduct from "../pages/admin/EditShopProduct.vue"; // Import the new component
import Home from "../pages/user/Home.vue";
import ProductDetails from "../pages/user/ProductDetails.vue";
import Cart from "../pages/user/Cart.vue";
import Checkout from "../pages/user/Checkout.vue";
import UserProfile from "../pages/user/UserProfile.vue";
import Orders from "../pages/user/Orders.vue";
import Login from "../pages/user/Login.vue";
import Register from "../pages/user/Register.vue";
import ProductsInShop from "../pages/user/ProductsInShop.vue";
import products2 from "../pages/user/Products.vue"
import Orders2 from "../layouts/admin/Orders.vue";


const routes = [
  {
    path: "/user_login",
    name: "user_login",
    component: UserLogin,
  },
  {
    path: "/admin_login",
    name: "admin_login",
    component: AdminLogin,
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "dashboard", component: Dashboard },
      { path: "orders", component: Orders2 },
      { path: "products", component: Products },
      { path: "products/create", component: CreateProduct },
      { path: "products/:id/edit", component: UpdateProduct },
      { path: "clients", component: Clients },
      { path: "shop-products", component: ShopProducts },
      { path: "shop-products/:clientId", component: ShopProducts },
      {
        path: "shop-products/:clientId/create",
        component: CreateShopProduct,
      },
      {
        path: "orders/:clientId",
        component: Orders2,
      },
      {
        path: "shop-products/:clientId/edit/:productId",
        component: EditShopProduct, // Add route for editing shop products
        props: true, // Pass route params as props
      },
    ],
  },
  { path: "/", component: Home },
  { path: "/products/:id", component: ProductDetails },
  { path: "/cart", component: Cart },
  { path: "/checkout", component: Checkout },
  { path: "/profile", component: UserProfile },
  { path: "/orders", component: Orders },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/products-in-shop", component: ProductsInShop },
  { path: "/products", component: products2 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token");

  if ( !token) {
    if (to.name !== "user_login" && to.name !== "admin_login") {
      return next({ name: "user_login" });
    }
  }


  next();
});

export default router;
