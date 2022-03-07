<template>
  <div>

    <div id="bar">
    <router-link to="/" id="main">메인으로</router-link>
    <h5 class="text-center">테스트 엔진 메인바</h5>
    <div v-if="$store.state.userNickname != null " class="userName">{{$store.state.userNickname}}</div>
    <div v-else class="userName">로그인이 필요합니다</div>
    </div>

    <router-view></router-view>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
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
