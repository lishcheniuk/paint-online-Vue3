import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "home",
      path: "/:id",
      component: Home
    },
    {
      path: "/:pathMatch(.*)",
      redirect: (_to) => {
        return {
          name: "home",
          params: { id: `f${Date.now().toString(16)}` }
        };
      }
    }
  ]
});
