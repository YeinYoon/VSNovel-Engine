<template>
<div class="RouterView">
  <div v-bind:class="{'enginebackground':true}">

    <router-link to="/signin" v-if="$store.state.userNickname == null">임시 로그인</router-link>
    <button v-else @click="logout()">로그아웃</button>

    <div class="header"> <!--타이틀과 로고-->
      <img class="header_icon" src="..\assets\icons/vsn_engine.png"><span class="header_title">VSN Engine</span>
    </div>
    <div class="invite_center">
      <div class="invite_box">
        <img class="invite_icon" src="../assets/icons/white/notification.png">
      </div>
      <div v-bind:class="{'invite_counter_on':true}"><!-- 초대가 0개 이하면 counter_off로 변경-->
        <span>9</span><!-- 이 유저에게 온 초대가 몇장인지 데이터 삽입-->
      </div>
      <div v-bind:class="{'invite_modal_on':true}"><!-- 초대가 없다면 modal_off 로 변경 -->
        <!-- invite messeage를 포문 돌릴것 -->
        <div class="invite_message">
          <div>소설제목 프로젝트 초대</div>
          <button class="invite_button">승인</button><button class="invite_button">거절</button>
        </div>
        <hr>
        <div class="invite_message">
          <div>소설제목 프로젝트 초대</div>
          <button class="invite_button">승인</button><button class="invite_button">거절</button>
        </div>
        <hr>
        <div class="invite_message">
          <div>소설제목 프로젝트 초대</div>
          <button class="invite_button">승인</button><button class="invite_button">거절</button>
        </div>
      </div>
    </div>
    <div class="section"> <!--뉴프로젝트와 로드프로젝트-->
      <div class="newpj_part">
        <div class="newpj_icon">
          <img class="newpj_icon_plus" src="..\assets\icons/white/plus.png">
        </div>
        <div>
          <span class="newpj_label">New Project</span>
        </div>
        <div class="newpj_create_frame">
          <div @click="this.$router.push('/createNewPj')"><span>새로운 프로젝트 생성하기</span></div>
          <!-- <div class="newpj_create_form"></div> -->
          <!-- <div class="newpj_input_tag"><input type="textarea"></div>
          <div class="newpj_input_savebutton"><span>생성</span></div> -->
        </div>
      </div>
      <div class="loadpj_part">
                <div class="loadpj_icon">
          <img class="loadpj_icon_plus" src="..\assets\icons/white/magnifier.png">
        </div>
        <div>
          <span class="loadpj_label">Load Project</span>
        </div>
        <div class="loadpj_list_box">
          <div class="loadpj_list_th">최근 프로젝트</div>

          <div class="loadpj_list_tr"
          v-for="pj in pjList" :key="pj.PROJ_CODE"
          @click="goToDevPage(pj.PROJ_CODE)">
            <span>{{pj.PROJ_CODE}}</span><br>
            <span>{{pj.PROJ_TYPE}}</span>&nbsp
            <span>{{pj.PROJ_TITLE}}</span>&nbsp
            <span>{{pj.PROJ_STATUS}}</span>&nbsp
            <span>{{pj.PROJ_RETOUCHDATE}}</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>

</template>
<style>
.enginebackground {
  position: absolute;
  background:#353535;
  width: calc(100vw - 120px);
  height: 100vh;
  overflow:auto;
  color: white;
}
.invite_center{
  position: fixed;
  left: 80%;
  top: 50px;
}
.invite_box{
  position: relative;
  width: 50px;
  height: 50px;
  background: #2872f9;
  border-radius: 15px;
  z-index: 12;
}
.invite_icon{
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
}
.invite_counter_on{
  position: absolute;
  top: -10%;
  left: 80%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ff4c4c;
  z-index: 12 ;
}
.invite_counter_on span{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.95em;
}
.invite_counter_off{
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ff4c4c;
  visibility: hidden;
}
.invite_counter_off span{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  visibility: hidden;
}
.invite_modal_on{
  position: absolute;
  left: -260%;
  top: 40px;
  padding: 10px;
  border-radius: 15px;
  width: 170px;
  height: 110px;
  overflow: auto;
  background: #424242;
    z-index: 11;
}
.invite_modal_off{
  position: absolute;
  left: -260%;
  top: 40px;
  padding: 10px;
  border-radius: 15px;
  width: 170px;
  height: 120px;
  overflow: auto;
  background: #424242;
  z-index: 11;
  visibility: hidden;
}
.invite_button {
  border:none;
  background: #2872f9;
  color: white;
  border-radius: 5px;
  margin: 2px;
}
.header{
  position: fixed;
  left: 20%;
  top: 50px;
  display: table;
}
.header_icon{
  width: 60px;
  height: 60px;
  margin-right: 15px;
  display: table-cell;
  vertical-align: middle;
}
.header_title{
  font-size: 2.2em;
  display: table-cell;
  vertical-align: middle;
}
.section{
  position: fixed;
  top: 160px;
  left: 20%;
  width: calc(100vw - 20%);
  height: calc(100vh - 110px);
  /* background: white; */
}
/*새 프로젝트*/
.newpj_part{
  position: relative;
  height: 150px;
}
.newpj_icon{
  width: 35px;
  height: 35px;
  background: #2872f9;
  border-radius: 11px;
  position: fixed;
}
.newpj_icon_plus{
  position: absolute;
  width: 20px;
  height: 20px;
  left: 8px;
  top: 7.5px; 
}
.newpj_label{
  position: absolute;
  height: 25px;
  top:-3px;
  left: 50px;
  font-size: 1.8em;
}
.newpj_create_frame{
  position: relative;
  top: 55px;
  left: 45px;
  width: calc(100% - 20%);
  min-height: 60px;
  height: auto;
  border-radius: 20px;
  background: #2a2a2a;
  text-align: center;
  padding-top: 18px;
  cursor: pointer;
}
.newpj_create_frame:hover{
  opacity: 0.8;
}
.newpj_create_form{
  margin-top: 30px;
}


/*로드 프로젝트*/
.loadpj_part{
  position: relative;
  height: 100%;
}
.loadpj_icon{
  width: 35px;
  height: 35px;
  background: #2872f9;
  border-radius: 11px;
  position: absolute;
  top: 10px;
}
.loadpj_icon_plus{
  position: relative;
  width: 24px;
  height: 24px;
  left: 6px;
  top: 4.5px; 
}
.loadpj_label{
  position: relative;
  height: 25px;
  top:  7px;
  left: 50px;
  font-size: 1.8em;
}
.loadpj_list_box{
  position: relative;
  top: 20px;
  left: 45px;
  width: calc(100% - 20%);
  height: calc(100% - 280px);
  border-radius: 20px;
  background: #2a2a2a;
  overflow: auto;
}
.loadpj_list_th{
  background: #727272;
  margin: 20px 15px 15px 15px;
  width: calc(100% - 30px);
  height: 40px;
  border-radius: 20px;
}
.loadpj_list_tr{
  background: #818181;
  margin: 15px 15px 15px 15px;
  width: calc(100% - 30px);
  height: 60px;
  border-radius: 20px;
}
.loadpj_list_tr:hover{
  opacity: 0.8;
}
</style>
<script>
import axios from '../axios'
export default {
  name: 'Index',
  created() {
    axios.get('/engine/auth/loginCheck')
    .then(async (result)=>{
      if(result.data!="") {
        console.log(result.data)
        this.$store.commit('userLogin', result.data.USER_NICKNAME);
        await this.getPjList();
      }
    })
    .catch((err)=>{
      console.error(err);
    })
  },
  data() {
    return {
      pjList : []
    }
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
    },

    goToDevPage(pjCode) {
      this.$router.push(`/devPage/${pjCode}`);
    },
    
    getPjList() {
      axios.get('/engine/pj/getList')
        .then((result)=>{
          if(result.data != "empty") {
            this.pjList = result.data;
          }
        })
        .catch((err)=>{
          console.error(err);
      })
    }

  }
}
  
</script>

