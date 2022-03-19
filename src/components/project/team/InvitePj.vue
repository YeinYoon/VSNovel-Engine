<template>
<div class="RouterView">

  <div>
      <select v-model="searchType">
          <option value="I" selected>아이디</option>
          <option value="N">닉네임</option>
      </select>
      <input type="text" v-model="searchData"> <button @click="userSearch()">유저 검색</button>

      <table>
          <thead>
              <th>ID</th>
              <th>닉네임</th>
          </thead>
          <tbody>
              <tr v-for="user in userList" :key="user.ID">
                  <td>{{user.ID}}</td>
                  <td>{{user.NICKNAME}}</td>
              </tr>
          </tbody>
      </table>
  </div>
  
</div>
</template>

<script>
export default {
    name : "InvitePj",
    data() {
        return {
            searchData : "",
            searchType : "",
            userList : [],
        }
    },
    methods : {
        userSearch() {
            
        }
    }
}
</script>

<style>

</style>