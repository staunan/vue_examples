// Import Router Library --
import { createWebHistory, createRouter } from "vue-router";

// Import Components --
import Home from "../views/Home.vue";

// Define the routes --
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

// Initialize the route --
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
