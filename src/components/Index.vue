<template>
    <div id="page">
      VSNovel 엔진 테스트 페이지 <br>
      <div v-if="$store.state.userNickname == null">
        <router-link to="/signin">로그인</router-link>
      </div>
      <div v-else>
        <router-link to="/CreateNewPj">새 프로젝트 생성하기</router-link>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name : "Index",
  created() {
    axios.get('/engine/auth/loginCheck')
    .then((result)=>{
      console.log(result.data);
      this.$store.commit('userLogin', result.data.USER_NICKNAME);
    })
    .catch((err)=>{
      console.error(err);
    })
  }
}
</script>

<style>
#page {
  font-family: "나눔스퀘어";
  text-align: center;
  margin-top: 60px;
}
</style>