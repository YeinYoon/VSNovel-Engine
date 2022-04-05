import { createWebHistory, createRouter } from "vue-router";
import store from './store'

// 메인페이지
import Index from './components/Index.vue';
// 유저(auth)
import Login from './components/auth/Login.vue';

// 프로젝트
import createNewPj from './components/project/createPj/CreateNewPj.vue';
import DevPage from './components/project/dev/DevPage.vue';
import EditPjInfo from './components/project/dev/EditPjInfo.vue';
import invitePj from './components/project/team/InvitePj.vue';

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
    component : createNewPj,
    children : [
      {
        path : "invitePj",
        component : invitePj
      }
    ]
  },
  {
    path : "/devPage/:pjCode",
    component : DevPage,
    children : [
      {
        path : "editInfo",
        component : EditPjInfo
      },
      {
        path : "invitePj",
        component : invitePj
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//전역 가드
router.beforeEach((to, from)=>{
  console.log(to);

  const PathArr = ['/dev']
  const check = PathArr.find((item)=>{
    return to.path.startsWith(item)
  })
  if(check == undefined) {
    return true
  }

  if(store.state.userNickname == null) {
    console.log('login required')
    return '/signin'
  } else {
    return true;
  }
})

export default router; 