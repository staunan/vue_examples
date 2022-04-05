// Import Router Library --
import { createWebHistory, createRouter } from "vue-router";

// Import Components --
import Home from "../views/Home.vue";

// Import Doc Components --
import DrawerDoc from "../views/doc/drawer.vue";

// Define the routes --
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/doc/drawer",
    name: "DrawerDoc",
    component: DrawerDoc,
  },
];

// Initialize the route --
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
