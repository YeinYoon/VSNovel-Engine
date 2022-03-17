<template>
<Spinner :loading="$store.state.LoadingStatus"></Spinner>
<GlobalModal :gModalState="$store.state.gModalState"></GlobalModal>

  <div id="bar">
    <router-link to="/" id="main">메인으로</router-link>
    <h5 class="text-center">테스트 엔진 메인바</h5>
    <div v-if="$store.state.userNickname != null" class="userName">
    {{$store.state.userNickname}}
    <button @click="logout()">로그아웃</button>
    </div>
    <div v-else class="userName">로그인이 필요합니다</div>
  </div>

  <router-view></router-view>

</template>

<script>
import axios from './axios'
import Spinner from './components/Spinner.vue'
import GlobalModal from './components/modal/GlobalModal.vue'
export default {
  name: 'App',
  components: {
    Spinner,
    GlobalModal
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
#bar {
  background-color: blanchedalmond;
}

#main {
  text-align: left;
}

.userName {
  text-align: right;
}
</style>
