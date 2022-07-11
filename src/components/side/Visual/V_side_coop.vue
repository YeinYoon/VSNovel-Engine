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
        <div class="VSCoopMenuTitle" @click="menu0=!menu0">
          <p>유저 초대</p>
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
        <div class="VSCoopMenuTitle" @click="menu1=!menu1">
          <p>멤버 관리</p>
        </div>    
        <div class="VSCoopMenuInner" v-if="menu1 == true">
          <div class="StakeFrame">
            <div class="StakeSaveTotalBtn" @click="uploadStake(memberList)"><p>변경값 저장</p></div>
            <span>멤버 목록</span>
            <div class="StakeList" v-for="(m, i) in memberList" :key="i">
              <div class="StakeMemberId"><span>아이디</span> {{m.USER_ID}}</div>
              <div class="StakeMemberNick"><span>닉네임</span> {{m.USER_NICKNAME}}</div>
              <div class="StakeMemberStake">
                <div class="StakeMemberStake_Num"><span v-if="!m.edit">{{m.COOP_STAKE}}</span> <input v-else type="number" v-model="m.COOP_STAKE"></div>
                
                <span class="StakeMemberStake_Per">({{Math.floor(m.COOP_STAKE/memberList.reduce((sum, crr)=>{return sum+crr.COOP_STAKE}, 0)*10000)/100}}%)</span>
                <button class="StakeMemberSave" @click="m.edit=!m.edit">변경</button>
              </div>
            </div>
          </div>
<!-- 
          <button @click="uploadStake(memberList)">변경값 저장</button>
          <table>
            <thead>
              <tr>
                <th>아이디</th>
                <th>닉네임</th>
                <th>지분(%)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(m, i) in memberList" :key="i">
                <td>{{m.USER_ID}}</td>
                <td>{{m.USER_NICKNAME}}</td>
                <td><span v-if="m.edit">{{m.COOP_STAKE}}</span><input v-else type="number" v-model="m.COOP_STAKE"><span>({{m.COOP_STAKE/memberList.reduce((sum, crr)=>{return sum+crr.COOP_STAKE}, 0)*100}}%)</span><button @click="m.edit=!m.edit">변경</button></td>
              </tr>
            </tbody>
          </table> -->
        </div>

      </div> <!-- 1 -->

      <div class="VSCoopMenu"> <!-- 2 -->
        <div class="VSCoopMenuTitle" @click="menu2=!menu2">
          <p>일정 관리</p>
        </div>

        <div class="VSCoopMenuInner" v-if="menu2 == true">
          <div class="ScheduleFrame">

            <span>일정 내용</span>
            <div class="ScheduleContent">
              <input type="text" v-model="scheduleContent">
            </div>

            <div class="ScheduleInfo">
              
              <span>기간 선택</span>
              <div class="ScheduleDate">
                <div class="ScheduleDate_title">시작일</div>
                <div class="ScheduleDate_Before">
                  <input type="date" v-model="scheduleSt">
                </div>
                <div class="ScheduleDate_title">종료일</div>
                <div class="ScheduleDate_After">
                  <input type="date" v-model="scheduleEd">
                </div>
              </div>

              <span>수신자 선택</span>
              <div class="ScheduleSelecter">
                <select v-model="scheduleList" multiple>
                  <option v-for="(m, i) in memberList" :key="i" :value="m.USER_ID">{{m.USER_NICKNAME}}</option>
                </select>          
              </div>

            </div>


            <div class="ScheduleButton">
              <button @click="makeSchedule(scheduleList, scheduleSt, scheduleEd, scheduleContent)">저장</button>
            </div>

          </div>
        </div>
      </div> <!-- 2 -->

      <div class="VSCoopMenu"> <!-- 2 -->
        <div class="VSCoopMenuTitle" @click="menu3=!menu3">
          <p>일정</p>
        </div>
        <div class="VSCoopMenuInner" v-if="menu3 == true">
        {{schedule}}
          <div v-for="(s, i) in schedule" :key="i">
            <div v-if="s.SCHE_TYPE == 'S'">
              <div>{{s.SCHE_STDATE}}~{{s.SCHE_EDDATE}}</div>
              <div>작성자 : {{s.USER_ID}}</div>
              <div>내용 : {{s.SCHE_CONTENT}}</div>
              <input type="checkbox" v-model="s.select">
            </div>
          </div>
          <button @click="deleteSchedule"></button>
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
    this.pjCode = this.$route.params.pjCode
    this.coopList()
    this.scheList()
  },
  data() {
    return {
      menu0 : false,
      menu1 : false,
      menu2 : false,
      menu3 : false,

      pjCode : "",

      //유저 초대 관련
      searchKeyword : "",
      searchType : "I",
      userList : [],
      isInvite : "",
      memberList : [],
      pjSchedule : [],
      scheduleList : [],
      scheduleSt : null,
      scheduleEd : null,
      scheduleContent : ""
    }
  },
  methods: {
    uploadStake(data){
      console.log(data)
      axios.post('/engine/team/uploadMemberList',{list: data})
      .then((result)=>{
        if(result=="err"){
          console.log(result)
        }
        else{
          this.$store.commit('gModalOn', {msg: "멤버 관리를 서버에 저장했습니다.", size : "normal"})
        }
      }).finally(async ()=>{
        await this.coopList()
      })
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
    
    //현재 프로젝트에 참여중인 유저 목록
    coopList() {
      axios.post('/engine/team/memberList', {pjCode : this.pjCode})
      .then((result)=>{
        console.log(result)
        if(result.data == "err") {
          this.$store.commit('gModalOn', {msg : "ERR : 작업자 없음", size:"small"})
          this.memberList = null
        } else {
          this.memberList = result.data;
          for(let i=0;i<this.memberList.length;i++){
            this.memberList[i].edit=false
          }
        }
      })
      .catch((err)=>{
        console.error(err);
      })
    },
    scheList(){
      axios.post('/engine/team/scheduleList', {pjCode: this.pjCode})
      .then((result)=>{
        console.log("SCHE THEN")
        if(result.data == "err"){
          this.schedule =null
        }else{
          this.schedule = result.data;
        }
      }).finally(()=>{
        console.log("SCHE FIN")
        for(let i=0;i<this.schedule.length;i++){
          this.schedule[i].select=false
        }
      })
    },
    makeSchedule(list, st, ed, content){
      if(st==null || ed==null || content=="" || list == null){
        this.$store.commit('gModalOn', {msg : "내용을 채워 저장해주세요.", size : "normal"});
      }
      else if(st>ed){
        this.$store.commit('gModalOn', {msg : "시작일을 종료일보다 작거나 같게 입력해주세요.", size:"normal"})
        this.scheduleSt = null
        this.scheduleEd = null
      }
      else{
        axios.post('/engine/team/addSchedule', {pjCode: this.pjCode, list: list, st: st, ed: ed, content: content}).then((result)=>{
          if(result=="err"){
            this.$store.commit('gModalOn', {msg : "ERR : 생성 실패", size:"small"})
          }
          else {
            this.scheduleList=null
            this.scheduleSt=null
            this.scheduleEd=null
            this.scheduleContent=""
            this.$store.commit('gModalOn', {msg : "일정을 생성했습니다.", size:"small"})
          }
        }).finally(()=>{
          this.scheList
        })
      }
    },
    deleteSchedule(){
      let list = []
      for(let i=0;i<this.schedule.length;i++){
        if(this.schedule[i].select){
          list.push(this.schedule[i].SCHE_CODE)
        }
      }
      if(list.length==0){
        this.$store.commit('gModalOn', {msg : "선택한 일정이 없습니다.", size:"small"})
      }
      else{
        axios.post('/engine/team/deleteSchedule',{list:list}).then((result)=>{
          console.log("DELETE THEN")
          if(result=="err"){
            this.$store.commit('gModalOn', {msg : "ERR : 삭제 실패", size:"small"})
          }
          else{
            this.$store.commit('gModalOn', {msg : "성공적으로 삭제했습니다.", size:"small"})
          }
        }).finally(()=>{
          this.scheList
        })
      }
    }
  }
}
</script>

<style>
.VSBackgroundCoop {
  width: 100%;
  height: 100%;
  animation-name: contentOn;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
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
  transition: all ease 0.2s;
}

.VSCoopButtons button:hover {
  background: #0084ff;
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
  /* display: table; */
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
  overflow: hidden;
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

/* 멤버(지분) 관리 */
.StakeFrame {
  position: relative;
  width: 100%;
  /* background: white; */
}

.StakeSaveTotalBtn {
  position: relative;
  background: #2872f9;
  width: 100%;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
}

.StakeList{
  position: relative;
  width: 100%;
  height: 112px;
  background: #474747;
  margin-bottom: 5px;
  border-radius: 15px;
}

.StakeMemberId {
  position: relative;
  left: 10px;
  top: 10px;
  width: 140px;
  height: 30px;
  border-radius: 10px;
  background: #585858;
  color: white;
  text-align: left;
  padding-top: 2px;
  padding-left: 5px;
  overflow: hidden;
}

.StakeMemberId span {
  background: #383838;
  position: relative;
  left: -6px;
  top: 1px;
  padding: 6px 6px 8px 6px;
}

.StakeMemberNick {
  position: relative;
  width: 140px;
  top: 15px;
  left: 10px;
  height: 30px;
  border-radius: 10px;
  background: #585858;
  color: white;
  text-align: left;
  padding-top: 2px;
  padding-left: 5px;
  overflow: hidden;
}

.StakeMemberNick span {
  background: #383838;
  position: relative;
  left: -6px;
  top: 1px;
  padding: 6px 6px 8px 6px;
}

.StakeMemberStake {
  position: absolute;
  background: #2872f9;
  width: 70px;
  height: 65px;
  left: calc(100% - 80px);
  top: 10px;
  border-radius: 10px;
  text-align: center;
}

.StakeMemberStake_Num {
  position: relative;
  width: 70px;
  height: 30px;
  border-radius: 10px;
  /* background: #7c7c7c; */
  margin-top: 8px;
  text-align: center;
  color: white;
}

.StakeMemberStake_Num input {
  width: 60%;
  border: none;
  border-radius: 5px;
}

.StakeMemberStake_Per {
  position: relative;
  font-size: 0.9em;
  
}

.StakeMemberSave {
  position: absolute;
  left: 30px;
  top: 70px;
  width: 40px;
  border: none;
  background: #2872f9;
  font-size: 0.9em;
  color: white;
  border-radius: 5px;
}


/* 스케쥴 */
.ScheduleFrame {
  width: 100%;
  height: 220px;
  position: relative;
  top: -15px;
}

.ScheduleContent {
  position: relative;
  width: 100%;
  height: 50px;
  background: white;
  border-radius: 15px;
  overflow: hidden;
}

.ScheduleContent input {
  width: 100%;
  height: 100%;
  border: none;
}

.ScheduleInfo {
  width: 100%;
  position: relative;
  height: 156px;
  margin-top: 8px;
  /* text-align: center; */
}

.ScheduleDate {
  position: relative;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  overflow: hidden;
  display: inline-block;
  margin: 0;
  border: none;
}

.ScheduleDate_title {
  width: 25%;
  height: 25px;
  float: left;
  background: #2872f9;
  color: white;
  text-align: center;
  font-size: 0.9em;
  padding-top: 2px;
}

.ScheduleDate_Before {
  width: 75%;
  height: 25px;
  float: right;
}

.ScheduleDate_Before input {
  width: 100%;
  border: none;
  padding-left: 5px;
}

.ScheduleDate_After {
  width: 75%;
  height: 25px;
  float: right;
}

.ScheduleDate_After input {
  width: 100%;
  border: none;
  padding-left: 5px;
}

.ScheduleSelecter {
  position: relative;
  width: 100%;
  height: 50px;
  margin: 0;
  border-radius: 10px;
  overflow: hidden;
}

.ScheduleSelecter select{
  width: 100%;
  height: 100%;
  border: none;
}

.ScheduleSelecter select option{
  width: 100%;
  /* color: white; */
}

.ScheduleButton {
  position: relative;
  margin-top: 5px;
  float: right;
}

.ScheduleButton button {
  border: none;
  background: #2872f9;
  border-radius: 10px;
  color: white;
  padding: 2px 8px 2px 8px;
}

@keyframes contentOn {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
  
}
</style>