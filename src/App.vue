<template>
<Spinner :loading="$store.state.LoadingStatus"></Spinner>
<GlobalModal :gModalState="$store.state.gModalState"></GlobalModal>

  <!-- <div id="bar">
    <router-link to="/" id="main">메인으로</router-link>
    <h5 class="text-center">테스트 엔진 메인바</h5>
    <div v-if="$store.state.userNickname != null" class="userName">
    {{$store.state.userNickname}}
    <button @click="logout()">로그아웃</button>
    </div>
    <div v-else class="userName">로그인이 필요합니다</div>
  </div> -->
  <SideBar v-bind:class="{'SideBar':true}" :main="mainBar" :side="sideBar" @cngSide="cngSide"></SideBar>
  <MainBar v-bind:class="{'MainBar':true}" :main="mainBar" :side="sideBar"></MainBar>
  <router-view :main="mainBar" :side="sideBar"></router-view>

</template>

<script>
import axios from './axios'
import Spinner from './components/Spinner.vue'
import GlobalModal from './components/modal/GlobalModal.vue'
import MainBar from './components/bar/MainBar.vue'
import SideBar from './components/bar/SideBar.vue'

export default {
  name: 'App',
  components: {
    Spinner,
    GlobalModal,
    MainBar,
    SideBar,
  },
  data(){
    return{
      mainBar:true,
      sideBar:false
    }
  },
  methods : {
    logout(){
      axios.get('/engine/auth/logout')
      .then((result)=>{
        if(result.data=='ok') {
          this.$store.commit('userLogin', null);
          this.$router.push('/');
        } else {
          console.log(result);
          alert(result.data);
        }
      })
      .catch((err)=>{
        console.error(err);
      })
    },
    cngSide(value){
      this.sideBar=value
      console.log(this.sideBar)
    }
  },
  watch:{
    $route(){
      if(this.$route.fullPath=='/' || this.$route.fullPath=='createNewPj') this.mainBar = true
      else this.mainBar=false
    }
  }
}
</script>

<style>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

body{
  overflow-y: hidden;
  overflow-x: hidden;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 500;
  background: #353535;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: none;
}
:focus {
  outline: none;
}

::-webkit-scrollbar {
    display: none;
}

#bar {
  background-color: blanchedalmond;
}

#main {
  text-align: left;
}

.userName {
  text-align: right;
}

.MainBar {
  width: 120px;
  position:fixed;
  height: 100vh;
  left: 0px;
  overflow: auto;
  top: 0px;
  z-index: 3;
}

.RouterView {
  position: fixed;
  left: 140px;
  width: calc(100vw - 135px);
  height: 100vh;
  background: #353535;
}

.FullView {
  position: fixed;
  top: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 4;
}

.RouterModalView {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  z-index: 99;
}

/* .RouterMoveLeft {
  animation-name: routerLeft; 
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}

.RouterMoveRight {
  animation-name: routerRight; 
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
} */

.RouterViewLeft {
  position: fixed;
  left: 135px;
  width: calc(100vw - 135px);
  height: 100vh;
  
  animation-name: routerLeft; 
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}

.RouterViewRight {
  position: fixed;
  left: 400px;
  width: calc(100vw - 400px);
  height: 100vh;
  
  animation-name: routerRight; 
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}
.mainRouterViewLeft {
  position: fixed;
  left: 0px;
  width: calc(100vw - 0px);
  height: 100vh;
  
  animation-name: routerLeftMain; 
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}

.mainRouterViewRight {
  position: fixed;
  left: 300px;
  width: calc(100vw - 300px);
  height: 100vh;
  
  animation-name: routerRightMain; 
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}
.SideBar {
  position:fixed;
  z-index: 2;
}


@keyframes routerRight {
  from {
    left: 135px;
    width: calc(100vw - 135px);
  }

  to {
    left: 400px;
    width: calc(100vw - 400px);
  }
}

@keyframes routerLeft {
  from {
    left: 400px;
    width: calc(100vw - 400px);
  }

  to {
    left: 135px;
    width: calc(100vw - 135px);
  }
}
@keyframes routerRightMain {
  from {
    left: 20px;
    width: calc(100vw - 20px);
  }

  to {
    left: 300px;
    width: calc(100vw - 300px);
  }
}

@keyframes routerLeftMain {
  from {
    left: 300px;
    width: calc(100vw - 300px);
  }

  to {
    left: 20px;
    width: calc(100vw - 20px);
  }
}
</style>
