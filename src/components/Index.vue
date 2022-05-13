<template>
<ConfirmModal ref="confirmModal"></ConfirmModal>
<div  :class="{[`${this.condition}`]:true}"><!--[`${this.$store.state.sideBarMove}`]:true--> 
  
  <!-- <div>
    <input multiple ref="img" type="file" @change="onInputImage()">
    <button @click="upload()">업로드</button>
    <button @click="getImg()">가져오기</button>
    <img :src="imgUrl" alt="테스트이미지">
    <button @click="delFile()">삭제</button>
    <audio :src="mp3" controls></audio>
    <button @click="getMp3()">오디오 가져오기</button>
    <button @click="getFile()">파일가져와 읽기</button>
    <input type="text" v-model="text">
  </div> -->

  <!-- <div>
    타이핑 테스트
    <h3>{{txt}}</h3>
    <button @click="next()">다음</button>
  </div> -->

  <div v-bind:class="{'enginebackground':true}">
    <div class="UserHeader"> <!-- 유저정보 헤더 -->
      <div class="UserProfileFrame">
        <div class="UserProfileImg">
          <img src="@/assets/icons/vsn_engine.png">
        </div>
        <div class="UserProfileInfo">
          {{this.$store.state.userNickname}}
        </div>
        <div class="UserProfileDeco">
        </div>
      </div>
      <div class="UserSignFrame">
        <router-link to="/signin" v-if="$store.state.userNickname == null"><button>로그인</button></router-link>
        <button v-else @click="logout()">로그아웃</button>
      </div>
    </div>

    <div class="header"> <!--타이틀과 로고-->
      <img class="header_icon" src="..\assets\icons/vsn_engine.png"><span class="header_title">VSN Engine</span>
    </div>
    <div class="invite_center">
      <div @click="alramCenterToggle()" class="invite_box">
        <img class="invite_icon" src="../assets/icons/white/notification.png">
      </div>
      <div v-bind:class="{[`invite_counter_${existNotice}`]:true}"><!-- 초대가 0개 이하면 counter_off로 변경-->
        <span>{{noticeList.length}}</span><!-- 이 유저에게 온 초대가 몇장인지 데이터 삽입-->
      </div>
      <div v-if="alramStatus">
        <div v-bind:class="{'invite_modal_on':true}"><!-- 초대가 없다면 modal_off 로 변경 -->
          <!-- invite messeage를 포문 돌릴것 -->

          <div v-if="noticeList.length > 0">

            <div v-for="n in noticeList" :key="n.SCHE_CODE">
              <div class="invite_message">
                {{n.SCHE_STDATE}}
                <div>{{n.SCHE_CONTENT}}</div>
                <button class="invite_button" @click="PjAccept(n.PROJ_CODE)">승인</button>
                <button class="invite_button" @click="PjRefuse(n.PROJ_CODE)">거절</button>
              </div>
              <hr>
            </div>

          </div>
          <div v-else>새로운 알림이 없습니다.</div>

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

          <div class="loadpj_list_Loading" v-if="$store.state.LoadingStatus">
            <p>프로젝트 목록을 불러오는 중입니다.</p>
          </div>

          <div v-else-if="pjList.length != 0">

            <div class="loadpj_list_tr"
            v-for="pj in pjList" :key="pj.PROJ_CODE"
            @click="goToDevPage(pj.PROJ_CODE)">
              <p class="loadpj_list_tr_code">{{pj.PROJ_CODE}}</p>
              <p class="loadpj_list_tr_title">{{pj.PROJ_TITLE}}</p>
              <p class="loadpj_list_tr_status" v-if="pj.PROJ_STATUS=='D'">개발</p>
              <p class="loadpj_list_tr_status" v-else-if="pj.PROJ_STATUS=='S'">배포</p>
              <p class="loadpj_list_tr_status" v-else>중단</p>
              <p class="loadpj_list_tr_retouchdate">{{pj.PROJ_RETOUCHDATE}}</p>
              <!--협업 혹은 개인구분 -->
              <p class="loadpj_list_tr_teamtype_normal" v-if="pj.PROJ_COOPERATION == 'N'">개인</p> 
              <p class="loadpj_list_tr_teamtype_coop" v-else>협업</p> 

            </div>

          </div>

          <div class="loadpj_list_notfound" v-else>
            <p>프로젝트를 생성해주세요!</p>
          </div>

        </div>
          
      </div>
    </div>
  </div>
</div>

</template>
<script>
import ConfirmModal from './modal/ConfirmModal.vue'
import axios from '../axios'
// 서버 스토리지
import storage from '../aws'
export default {
  name: 'Index',
  created() {
    this.test(); // 타이핑 테스트

    axios.get('/engine/auth/loginCheck')
    .then(async (result)=>{
      if(result.data!="") {
        console.log(result.data)
        this.$store.commit('userLogin', result.data.USER_NICKNAME);
        console.log(`currentUser : ${this.$store.state.userNickname}`);
        await this.getPjList();
        await this.getNoticeList();
      } else {
        this.$router.push('/signin');
      }
    })
    .catch((err)=>{
      console.error(err);
    });
  },
  props:{
    main:Boolean,
    side:Boolean
  },
  data() {
    return {
      pjList : [],
      noticeList : [],
      alramStatus : false,
      existNotice : "off",
      condition : "mainRouterViewLeft",
      // 서버스토리지 파일 테스트용
      img : "",
      imgUrl : "",
      mp3 : "",
      text : "",

      //타이핑 애니메이션 테스트용
      content : "Hello, I'm Sample Text",
      txt : "",
      count : 0
    }
  },
  watch:{
    side(){
      if(this.side){
        this.condition="mainRouterViewRight"
      }
      else{
        this.condition="mainRouterViewLeft"
      }
    }
  },
  methods : {
    // 타이핑 테스트
    typing() {
      var char = 0;
      if(this.count < this.content.length) {
        char = this.content.charAt(this.count);
        this.txt += char;
        this.count++;
      } else {
        clearInterval(this.typing);
      }
    },
    test() {
      setInterval(this.typing, 100);
    },
    next() {
      this.count = 0;
      this.txt = "";
      this.content = "is next Text!";
    },

    // 서버스토리지 테스트
    onInputImage() {
      this.img = this.$refs.img.files[0];
      console.log(this.img.name);
    },
    async upload() {
      console.log(this.img);
      var result = await storage.uploadFile('test/', this.img);
      console.log(result);
    },
    async getImg() {
      var result = await storage.getUrlList("test/");
      console.log(result);
      // this.imgUrl = result;
    },
    async getMp3() {
      var result = await storage.getUrl('test/~~.mp3');
      this.mp3 = result;
    },
    async delFile() {
      await storage.deleteFile("test/프로젝트 관련.txt");
    },
    async getFile() {
      var result = await storage.getJson("test/테스트.json");
      var json = String.fromCharCode.apply(null, result);
      console.log(json);
      this.text = json;
    },



    //로그아웃
    logout(){
      axios.get('/engine/auth/logout')
      .then((result)=>{
        if(result.data=='ok') {
          this.$store.commit('userLogin', null);
          this.$router.push('/signin');
        } else {
          console.log(result);
          alert(result.data);
        }
      })
      .catch((err)=>{
        console.error(err);
      })
    },

    // 해당 프로젝트 개발 페이지 이동
    goToDevPage(pjCode) {
      this.$router.push(`/devPage/${pjCode}`);
    },
    
    // 프로젝트 목록 가져오기
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
    },

    // 도착한 알림 목록 가져오기
    getNoticeList() {
      axios.get('/engine/team/getNoticeList')
      .then((result)=>{
        if(result.data == "err") {
          console.log("ERR : 알림 불러오기 실패")
        } else {
          this.noticeList = result.data;
          if(result.data.length > 0) {
            this.existNotice = "on";
          } else {
            this.existNotice = "off";
          }
        }
      })
      .catch((err)=>{
        console.error(err);
      });
    },

    // 프로젝트 초대 수락
    async PjAccept(pjCode) {
      var accept = await this.$refs.confirmModal.show({
        msg : "초대를 수락하시겠습니까?",
        size : "normal",
        btn1 : "수락",
        btn2 : "취소"
      });
      if(accept) { 
        axios.post('/engine/team/PjAccept', {pjCode : pjCode})
        .then((result)=>{
          if(result.data == "ok") {
            this.getPjList();
            this.getNoticeList();
          } else {
            this.$store.commit('gModalOn', {msg : "ERR:프로젝트 초대 수락 실패", size : "normal"});
          }
        })
        console.log("초대 수락");
      } else {
        console.log("초대 보류");
      }
    },
    // 프로젝트 초대 거절
    async PjRefuse(pjCode) {
      var refuse = await this.$refs.confirmModal.show({
        msg : "초대를 거절하시겠습니까?",
        size : "normal",
        btn1 : "수락",
        btn2 : "취소"
      });
      if(refuse) { 
        axios.post('/engine/team/PjRefuse', {pjCode : pjCode})
        .then((result)=>{
          if(result.data == "err") {
            this.$store.commit('gModalOn', {msg : "ERR: 서버 처리 에러발생", size : "normal"});
          } else {
            this.getNoticeList();
          }
        })
      } else {
        console.log("거절 보류");
      }
    },

    alramCenterToggle() {
      this.alramStatus = !this.alramStatus;
    }
  },
  components : {
    ConfirmModal
  }
}
  
</script>


<style>
.enginebackground {
  position: absolute;
  width: 100%;
  height: 100%;
  background:#353535;
  overflow: hidden;
  color: white;
}
.UserHeader {
  position: relative;
  width: 100%;
  height: 75px;
  background: #424242;
}

.UserProfileFrame {
  position: absolute;
  width: 250px;
  height: 60px;
  border-radius: 15px;
  top: 7.5px;
  left: 10px;
  padding: 10px;
  background: #505050;
}
.UserProfileImg {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.UserProfileImg img{
  width: 100%;
  object-fit: cover;
}

.UserProfileInfo {
  position: relative;
  left: 50px;
  font-size: 1.1em;
}
.UserProfileDeco {
  position: absolute;
  width: 170px;
  height: 10px;
  background: #2872f9;
  border-radius: 10px;
  left: 60px;
}

.UserSignFrame {
  float: right;
  position: relative;
  top: 20px;
  right: 20px ;
}
.UserSignFrame button{
  background: #2872f9;
  border: none;
  border-radius: 15px;
  width: 100px;
  height: 35px;
  color: white;
}

.invite_center{
  float: right;
  position: relative;
  top: -122px;
  left: -160px;
  z-index: 11; 
}
.invite_box{
  position: relative;
  width: 50px;
  height: 50px;
  background: #2872f9;
  border-radius: 15px;
  z-index: 12;
  cursor: pointer;
}
.invite_box:hover{
  opacity: 0.9;
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
  left: -320%;
  top: 40px;
  padding: 10px;
  border-radius: 15px;
  width: 220px;
  max-height: 300px;
  overflow-y: auto;
  background: #797979;
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
  position: relative;
  left: 130px;
  top: 30px;
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
  position: relative;
  top: 80px;
  left: 130px;
  width: calc(100%);
  height: calc(100vh - 100px);
  /* background: white; */
}
/*새 프로젝트*/
.newpj_part{
  position: relative;
  height: 150px;
  padding-right: 8%;
}
.newpj_icon{
  width: 35px;
  height: 35px;
  background: #2872f9;
  border-radius: 11px;
  position: absolute;
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
  width: calc(100% - 25%);
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
  height: calc(100% - 60px);
  padding-right: 8%;
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
  width: calc(100% - 25%);
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

.loadpj_list_notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  height: 50px;
  background: #5e5e5e;
  transform: translate(-50%, -50%);
  border-radius: 25px;
  
}
.loadpj_list_notfound p{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.loadpj_list_Loading {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 450px;
  height: 50px;
  background: #5e5e5e;
  transform: translate(-50%, -50%);
  border-radius: 25px;
}

.loadpj_list_Loading p{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.loadpj_list_tr{
  background: #666666;
  margin: 15px 15px 15px 15px;
  padding: 5px;
  width: calc(100% - 30px);
  height: 60px;
  border-radius: 18px;
  cursor: pointer;
}
.loadpj_list_tr:hover{
  opacity: 0.8;
}

.loadpj_list_tr_code{
  position: relative;
  transform: translate(-50%, -50%);
}

.loadpj_list_tr_title{
  position: absolute;
  font-size: 1.3em;
  width: 500px;
  left: 320px;
  transform: translate(-50%, -150%);
}

.loadpj_list_tr_status{
  position: absolute;
  width: 50px;
  background: #353535;
  border-radius: 10px;
  left: calc(100% - 50px);
  transform: translate(-50%, -160%);
  text-align: center;
}

.loadpj_list_tr_retouchdate{
  position: absolute;
  transform: translate(-50%, -50%);
  left: calc(100% - 100px);
  width: 200px;
}

.loadpj_list_tr_teamtype_normal{
  position: absolute;
  width: 50px;
  background: #2872f9;
  border-radius: 10px;
  left: calc(100% - 110px);
  transform: translate(-50%, -160%);
  text-align: center;
}
.loadpj_list_tr_teamtype_coop{
  position: absolute;
  width: 50px;
  background: #88b975;
  border-radius: 10px;
  left: calc(100% - 110px);
  transform: translate(-50%, -160%);
  text-align: center;
}

</style>
