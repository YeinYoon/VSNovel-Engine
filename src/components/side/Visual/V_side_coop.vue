<template>
  <div class="VSBackgroundCoop">

    <div class="VSCoopTool">
      <div class="VSCoopTitle"><span>협업 관리</span></div>
      <div class="VSCoopButtons">
        <button>기능1</button>
        <button>기능2</button>
        <button>기능3</button>
      </div>
    </div>

    <div class="VSCoopMemberList">

      <div class="VSCoopMenu"> <!-- 0 -->
        <div class="VSCoopMenuTitle" @click="menuClick(0)">
          <p>유저초대</p>
        </div>

        <div class="VSCoopMenuInner" v-if="menu0 == true">
          <div class="VSCoopSearchId">
            <select class="VSCoopSelectSearchType" v-model="searchType">
              <option value="I" selected>아이디</option>
              <option value="N">닉네임</option>
            </select>

            <input class="VSCoopInsertID" type="text" v-model="searchKeyword"> 
            <button class="VSCoopSearchButton" @click="userSearch()">유저 검색</button>
          </div>

        <div class="VSCoopResultFrame">
          <table class="VSCoopSearchResult">
            <thead>
              <th>ID</th>
              <th>닉네임</th>
              <th>초대하기</th>
            </thead>
            <tbody>
              <tr v-for="user in userList" :key="user.USER_ID">
                <td :id="user.USER_ID">{{user.USER_ID}}</td>
                <td>{{user.USER_NICKNAME}}</td>
                <td><button @click="inviteUser(user.USER_ID)" :disabled="isInvite == user.USER_ID">초대</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        </div>

      </div> <!-- 0 -->

      <div class="VSCoopMenu"> <!-- 1 -->
        <div class="VSCoopMenuTitle" @click="menuClick(1)">
          <p>멤버목록</p>
        </div>

        <div class="VSCoopMenuInner" v-if="menu1 == true">
          내용
        </div>

      </div> <!-- 1 -->

      <div class="VSCoopMenu"> <!-- 2 -->
        <div class="VSCoopMenuTitle" @click="menuClick(2)">
          <p>히스토리</p>
        </div>

        <div class="VSCoopMenuInner" v-if="menu2 == true">
          내용
        </div>

      </div> <!-- 2 -->

    </div>

  </div>
</template>

<script>
import axios from '../../../axios'
export default {
  name: 'V_side_coop',
  created() {
    this.pjCode = this.$route.params.pjCode;
    console.log(this.pjCode);
  },
  data() {
    return {
      menu0 : false,
      menu1 : false,
      menu2 : false,

      pjCode : "",

      //유저 초대 관련
      searchKeyword : "",
      searchType : "I",
      userList : [],
      isInvite : ""
    }
  },
  methods: {
    menuClick(menu) {
      switch(menu) {
        case 0 :
          this.menu0 = !this.menu0;
          break;
        case 1 :
          this.menu1 = !this.menu1;
          break;
        case 2 :
          this.menu2 = !this.menu2;
          break;
      }
    },

    // 유저 초대 관련
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
    inviteUser(userId) {
      var data = {
        userId : userId,
        pjCode : this.pjCode,
      }
      axios.post('/engine/team/inviteUser', data)
      .then((result)=>{
        if(result.data == "ok") {
          this.$store.commit('gModalOn', {msg : `유저 [${userId}]님을 초대하였습니다.`, size : "small"});
          this.isInvite = userId;
        } else if(result.data == "already"){
          this.$store.commit('gModalOn', {msg : "이미 초대한 유저입니다.", size : "small"});
        } else {
          this.$store.commit('gModalOn', {msg : "ERR : 유저 초대 실패", size : "small"});
        }
      })
    },    
  }
}
</script>

<style>
.VSBackgroundCoop {
  width: 100%;
  height: 100%;
}

.VSCoopTool {
  width: 100%;
  height: 80px;
  position: relative;
  background: #474747;
  border-radius: 0px 0px 10px 10px;
  overflow: hidden;
}

.VSCoopTitle {
  position: relative;
  width: 100%;
  left: 0px;
  font-size: 1em;
}

.VSCoopTitle span{
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%);
  font-size: 1em;
  color: white
}

.VSCoopButtons {
  position: relative;
  width: 100%;
  top: 32px;
  height: 40px;
  padding: 7px;
  text-align: center;
}

.VSCoopButtons button {
  display: inline;
  width: 80px;
  height: 30px;
  border-radius: 10px;
  margin: 2px;
  color: white;
  border: none;
  background: #2872f9;
}

.VSCoopMemberList {
  position: absolute;
  top: 80px;
  width: 100%;
  height: calc(100vh - 80px);
  padding: 20px;
  color: white;
  overflow: auto;
}

.VSCoopMenu {
  position: relative;
  display: table;
  width: 100%;
  margin-bottom: 15px;
  background: #585858;
  border-radius: 20px;
  border: none;
}

.VSCoopMenuTitle {
  position: relative;
  width: 100%;
  height: 60px;
  background: #474747;
  border-radius: 20px;
  transition: all ease 0.2s;
  cursor: pointer;
}

.VSCoopMenuTitle:hover {
  background: #7c7c7c;
}

.VSCoopMenuTitle p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.VSCoopMenuInner {
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 10px;
}

.VSCoopSearchId {
  position: relative;
  width: 230px;
  left: 50%;
  transform: translate(-50%);
}
.VSCoopSelectSearchType {
  width: 70px;
  height: 30px;
  border-radius: 10px;
  border: none;
  background: white;
}
.VSCoopInsertID {
  width: 150px;
  height: 30px;
  border-radius: 10px;
  border: none;
  background: white;
  margin-left: 5px;
}

.VSCoopSearchButton {
  width: 90%;
  height: 35px;
  border-radius: 10px;
  background: #2872f9;
  color: white;
  border: none;
  left: 50%;
  position: relative;
  transform: translate(-50%);
  top: 5px;
}

.VSCoopResultFrame {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  top: 15px;
  width: 100%;
  /* background: white; */
}

.VSCoopSearchResult {
  width: 100%;
  background: #474747;
  border-radius: 10px;
}
</style>