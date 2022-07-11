<template>
<div :class="{ [`${this.$store.state.sideBarFixed}`]:true, [`${this.$store.state.sideBarMove}`]:this.$store.state.sideAnimationState }">

  <!-- <div>
    타이핑 테스트
    <h3>{{txt}}</h3>
    <button @click="next()">다음</button>
  </div> -->

  <div v-bind:class="{'enginebackground':true}">

    <div class="header">
      <img class="header_icon" src="..\assets\icons/vsn_engine.png"><span class="header_title">VSN Engine</span>
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
import axios from '../axios'
export default {
  name: 'Index',
  created() {
    this.$store.commit('cngSideMenu', 'M');

    // 타이핑 테스트
    // this.test();

    axios.get('/engine/auth/loginCheck')
    .then(async (result)=>{
      if(result.data!="") {
        this.$store.commit('userLogin', {userId : result.data.USER_ID, nickName : result.data.USER_NICKNAME});
        console.log(`currentUser : ${this.$store.state.userNickname}`);
        await this.getPjList();
        this.userTutorialCheck();
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
    // typing() {
    //   var char = 0;
    //   if(this.count < this.content.length) {
    //     char = this.content.charAt(this.count);
    //     this.txt += char;
    //     this.count++;
    //   } else {
    //     clearInterval(this.typing);
    //   }
    // },
    // test() {
    //   setInterval(this.typing, 100);
    // },
    // next() {
    //   this.count = 0;
    //   this.txt = "";
    //   this.content = "is next Text!";
    // },

    userTutorialCheck() {
      axios.get('/engine/user/tutorialCheck')
      .then((result)=>{
        if(result.data == "err") {
          console.log("유저 튜토리얼 확인 유무 불러오기 실페");
        } else {
          console.log(result.data);
          if(result.data.USER_EHELP == 'N') {
            this.$store.commit('tutorialOn', 'index');
          } else {
            this.$store.commit('tutorialOff');
          }

        }
      })
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
  },
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
  padding: 60px;
    /* animation-name: StudioOn;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out; */
}
.UserHeader {
  position: relative;
  width: 100%;
  height: 75px;
  background: #424242;
}

.header{
  position: relative;
  /* left: 130px;
  top: 60px; */
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
  top: 50px;
  width: calc(100%);
  height: calc(100vh - 110px);
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
  width: calc(100%);
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
  width: calc(100%);
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
  left: 280px;
  transform: translate(-50%, -140%);
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
