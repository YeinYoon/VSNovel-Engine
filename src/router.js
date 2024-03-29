import { createWebHistory, createRouter } from "vue-router";
import axios from 'axios'

// 메인페이지
import Index from './components/Index.vue';
// 유저(auth)
import Login from './components/auth/Login.vue';

// 프로젝트
import createNewPj from './components/project/createPj/CreateNewPj.vue';
import DevPage from './components/project/dev/DevPage.vue';

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
    props:true
  },
  {
    path : "/devPage/:pjCode",
    component : DevPage,
    props:true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//전역 가드
router.beforeEach((to, from)=>{
  const PathArr = ['/devPage']
  const check = PathArr.find((item)=>{
    return to.path.startsWith(item)
  })
  if(check == undefined) {
    return true
  } else {
    //추후 개별가드로 프로젝트 권한 없는 유저 처리 구현 예정
    axios.get('/engine/auth/loginCheck')
    .then((result)=>{
      if(result.data == "") {
        console.log("해당 페이지 접근권한 없음");
        router.push('/signin')
      } else {
        console.log("로그인 확인됨");
        console.log(result.data);
        return true
      }
    })

  }


})

export default router; 