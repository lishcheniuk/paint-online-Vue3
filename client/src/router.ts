import { createRouter, createWebHistory } from "vue-router";
import Paint from "./Paint.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "paint",
      path: "/:id",
      component: Paint
    },
    {
      path: "/:pathMatch(.*)",
      redirect: (_to) => {
        return {
          name: "paint",
          params: { id: `f${Date.now().toString(16)}` }
        };
      }
    }
  ]
});
