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

export default {
  name: 'App',
  components: {
    Spinner,
    GlobalModal,
    ConfirmModal,
    MainBar,
    TaskBar,
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
}

.RouterView {
  position: fixed;
  left: 120px;
  top: 30px;
}

.TaskBar {
  position: relative;
  width: 100vw;
  height: 30px;

}
</style>
