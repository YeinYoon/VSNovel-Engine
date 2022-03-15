import { createWebHistory, createRouter } from "vue-router";
//import store from './store';

// 메인페이지
import Index from './components/Index.vue';
// 유저(auth)
import Login from './components/auth/Login.vue';
// 프로젝트
import createNewPj from './components/project/CreateNewPj.vue';
import DevPage from './components/project/DevPage.vue';
import EditPjInfo from './components/project/EditPjInfo.vue';

// 드래그앤드롭 테스트
//import FileTest from './components/FileTest.vue';

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
  {
    path : "/devPage/:pjCode",
    component : DevPage,
    children : [
      {
        path : "editInfo",
        component : EditPjInfo
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


//로딩
// router.beforeEach((to, from, next) => {
//   store.commit('startSpinner');
//   setTimeout(() => {
//       next();
//   }, 1);
// })

// router.afterEach((to, from) => {
//   store.commit('endSpinner');
// })

export default router; 