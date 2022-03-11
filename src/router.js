import { createWebHistory, createRouter } from "vue-router";

// 메인페이지
import Index from './components/Index.vue';
// 유저(auth)
import Login from './components/auth/Login.vue';
// 프로젝트
import createNewPj from './components/project/CreateNewPj.vue';

const routes = [
  {
    path:"/",
    component : Index
  },
  {
    path : "/signin",
    component : Login
  },
  {
    path : "/createNewPj",
    component : createNewPj
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 