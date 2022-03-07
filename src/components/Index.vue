<template>
    <div id="page">
        VSNovel 엔진 테스트 페이지 <br>
        <router-link to="/signin">로그인</router-link> <br>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name : "Index",
  created() {
    axios.get('/engine/auth/loginCheck')
    .then((result)=>{
      console.log(result);
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