import { createWebHistory, createRouter } from "vue-router";

// 메인페이지
import Index from './components/Index.vue';
// 유저(auth)
import Login from './components/auth/Login.vue';

const routes = [
  {
    path:"/",
    component : Index
  },
  {
    path : "/signin",
    component : Login
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 