<template>
<Spinner :loading="$store.state.LoadingStatus"></Spinner>
<GlobalModal :gModalState="$store.state.gModalState"></GlobalModal>
<TutorialGuide :sideMenuState="$store.state.sideMenuState" :tutorialState="$store.state.tutorialState" :tutorialType="$store.state.tutorialType"></TutorialGuide>
  <!-- <Opacity></Opacity> -->
  <SideBar 
  v-bind:class="{'SideBar':true}"
  :sideBarStatus="sideBarStatus"
  @send="send"
  @sendEp="sendEp"
  :epNum="epNum"
  >
  </SideBar>
  
  <MainBar v-bind:class="{'MainBar':true}" v-if="mainBar == true"></MainBar>
  <router-view :resource="resource" :ep="ep"></router-view>
</template>

<script>
import axios from './axios'
import Spinner from './components/Spinner.vue'
import GlobalModal from './components/modal/GlobalModal.vue'
import MainBar from './components/bar/MainBar.vue'
import SideBar from './components/bar/SideBar.vue'
import TutorialGuide from './components/modal/E_TutorialGuide.vue'
export default {
  name: 'App',
  created() {
    this.$store.commit('sideMenuOffMain');
  },
  components: {
    Spinner,
    GlobalModal,
    MainBar,
    SideBar,
    TutorialGuide
  },
  data(){
    return{
      sideBarStatus:'Main',
      mainBar : false,
      resource: undefined,
      ep: null,
      epNum : null
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
          alert(result.data);
        }
      })
      .catch((err)=>{
        console.error("Logout : Error\n"+err);
      })
    },
    send(resource){
      this.resource=resource
      console.log(resource)
    },
    sendEp(ep){
      if(ep!=null){
        this.ep=ep.ep
        this.epNum=ep.ep
      }
      else{
        this.ep=null
        this.epNum=null
      }
    }
  },
  watch:{
    $route(){
      if(this.$route.fullPath=='/' || this.$route.fullPath=='/createNewPj') {
        this.mainBar = false;
        this.$store.commit('sideMenuOffMain');
        this.sideBarStatus = 'Main';
      } else {
        this.sideBarStatus = 'Another';
        this.$store.commit('sideMenuOff');
        this.mainBar = true;
      }
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
  z-index: 99;
}

.Tutorial_View {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 200;
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

.RouterMoveLeft {
  animation-name: routerLeft; 
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
}

.RouterMoveRight {
  animation-name: routerRight; 
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
}

.RouterViewLeft {
  position: fixed;
  left: 140px;
  width: calc(100vw - 140px);
  height: 100vh;
}

.RouterViewRight {
  position: fixed;
  left: 425px;
  width: calc(100vw - 425px);
  height: 100vh;
}


.mainRouterViewLeft {
  position: fixed;
  left: 20px;
  width: calc(100vw - 20px);
  height: 100vh;
}

.mainRouterMoveLeft {
  animation-name: routerLeftMain; 
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
}

.mainRouterViewRight {
  position: fixed;
  left: 300px;
  width: calc(100vw - 300px);
  height: 100vh;
}

.mainRouterMoveRight {
  animation-name: routerRightMain; 
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
}

.SideBar {
  position: absolute;
  /* z-index: 1; */
}

.SideBarMain {
  left: -120px;
  position: absolute;
}


@keyframes routerRight {
  from {
    left: 140px;
    width: calc(100vw - 140px);
  }

  to {
    left: 425px;
    width: calc(100vw - 425px);
  }
}

@keyframes routerLeft {
  from {
    left: 425px;
    width: calc(100vw - 425px);
  }

  to {
    left: 140px;
    width: calc(100vw - 140px);
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
