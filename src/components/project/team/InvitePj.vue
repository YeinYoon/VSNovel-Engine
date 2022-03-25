<template>
<div class="RouterView">

    <div>
      <select v-model="searchType">
          <option value="I" selected>아이디</option>
          <option value="N">닉네임</option>
      </select>
      <input type="text" v-model="searchKeyword"> <button @click="userSearch()">유저 검색</button>

      <table border="2px">
          <thead>
                <th>ID</th>
                <th>닉네임</th>
                <th></th>
          </thead>
          <tbody>
              <tr v-for="user in userList" :key="user.USER_ID">
                  <td>{{user.USER_ID}}</td>
                  <td>{{user.USER_NICKNAME}}</td>
                  <td><button>초대</button></td>
              </tr>
          </tbody>
      </table>

      <button @click="back()">돌아가기</button>
  </div>
  
</div>
</template>

<script>
import axios from '../../../axios'
export default {
    name : "InvitePj",
    created() {
        this.pjCode = this.$route.params.pjCode;
    },
    data() {
        return {
            pjCode : "",
            searchKeyword : "",
            searchType : "I",
            userList : [],
        }
    },
    methods : {
        userSearch() {
            var searchData = {
                searchKeyword : this.searchKeyword,
                searchType : this.searchType
            }
            axios.post('/engine/user/search', searchData)
            .then((result)=>{
                if(result.data != "empty") {
                    this.userList = result.data;
                } else {
                    this.$store.commit('gModalOn', {msg : "조건에 맞는 유저를 찾지 못했습니다.", size : "normal"});
                }
            })
            .catch((err)=>{
                console.error(err);
            })
        },

        back() {
            this.$router.push(`/devPage/${this.pjCode}`);
        }
    }
}
</script>

<style>

</style>