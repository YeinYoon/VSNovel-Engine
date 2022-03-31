<template>
<Spinner :loading="$store.state.LoadingStatus"></Spinner>
<GlobalModal :gModalState="$store.state.gModalState"></GlobalModal>
<ConfirmModal :cModalState="$store.state.cModalState"></ConfirmModal>


  <!-- <div id="bar">
    <router-link to="/" id="main">메인으로</router-link>
    <h5 class="text-center">테스트 엔진 메인바</h5>
    <div v-if="$store.state.userNickname != null" class="userName">
    {{$store.state.userNickname}}
    <button @click="logout()">로그아웃</button>
    </div>
    <div v-else class="userName">로그인이 필요합니다</div>
  </div> -->
  <SideBar v-bind:class="{'SideBar':true}"></SideBar>
  <TaskBar v-bind:class="{'TaskBar':true}"></TaskBar>
  <MainBar v-bind:class="{'MainBar':true}"></MainBar>
  <router-view></router-view>

</template>

<script>
import axios from './axios'
import Spinner from './components/Spinner.vue'
import GlobalModal from './components/modal/GlobalModal.vue'
import ConfirmModal from './components/modal/ConfirmModal.vue'
import MainBar from './components/bar/MainBar.vue'
import TaskBar from './components/bar/TaskBar.vue'
import SideBar from './components/bar/SideBar.vue'

export default {
  name: 'App',
  components: {
    Spinner,
    GlobalModal,
    ConfirmModal,
    MainBar,
    TaskBar,
    SideBar,
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
    }
  }
}
</script>

<style>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
body{
  overflow-y: hidden;
  overflow-x: hidden;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  font-weight: 500;
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
  top: 30px;
  width: calc(100vw - 140px);
  height: 100vh;
  background: #353535;
}

.RouterMoveLeft {
  animation-name: routerLeft; 
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}

.RouterMoveRight {
  animation-name: routerRight; 
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}

.RouterViewLeft {
  position: fixed;
  left: 140px;
  top: 30px;
  width: calc(100vw - 140px);
  height: 100vh;
}

.RouterViewRight {
  position: fixed;
  left: 280px;
  top: 30px;
  width: calc(100vw - 280px);
  height: 100vh;
}

.TaskBar {
  position: relative;
  z-index: -10;
}

.SideBar {
  position:fixed;
  z-index: 2;
}


@keyframes routerRight {
  from {
    left: 140px;
    width: calc(100vw - 140px);
  }

  to {
    left: 280px;
    width: calc(100vw - 280px);
  }
}

@keyframes routerLeft {
  from {
    left: 280px;
    width: calc(100vw - 280px);
  }

  to {
    left: 140px;
    width: calc(100vw - 140px);
  }
}
</style>
