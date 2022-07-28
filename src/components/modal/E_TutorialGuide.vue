<template>
  <div class="Tutorial_View" v-if="tutorialState">

    <!-- 메인페이지 튜토리얼 -->
    <div class="Tutorial_inner" v-if="tutorialType == 'index'">
      <div class="Tutorial_opacity" v-if="opacity_power == true"></div>
      <div class="Tutorial_opacity_low" v-if="opacity_power == false"></div>
      
      <div class="Tutorial_Content">
        <div class="WelcomeMessage" v-if="isIntro == '1'">
          <img class="VSNE_first_LOGO" src="@/assets/icons/vsn_engine.png">
          <span class="VSNE_first_MSG">Visual Studio Novel Engine에 오신것을 환영합니다!</span>
          <button class="VSNE_first_nextBtn" @click="introOpen()">다음</button>
        </div>

        <div class="WelcomeMessage" v-if="isIntro == '2'">
          <span class="VSNE_second_MSG_title"> 메인화면 가이드</span>
          <span class="VSNE_second_MSG">기본적인 사용방법을 알아봅시다</span>
        </div>

        <div class="Tutorials" v-if="isIntro == '3'">
          <div v-if="introStep == 0">
            <div class="TutorialBox_1" >
              <div class="TutorialBox_text">
                새 프로젝트 생성
              </div>
            </div>
            <div class="TutorialBox_2" >
              <div class="TutorialBox_text">
                프로젝트 목록
              </div>
            </div>
            <div class="TutorialBox_3" >
              <div class="TutorialBox_text">
                사이드바
              </div>
            </div>
            <div class="TutorialBox_4" >
              <div class="TutorialBox_text">
                최신 프로젝트 알림 및 로그인 정보 
              </div>
            </div>
          </div>

          <div class="WelcomeMessage" v-if="introStep == 2">
            <span class="VSNE_second_MSG_title">Let's Try!</span>
            <span class="VSNE_second_MSG">직접 프로젝트를 만들고 제작해봅시다!</span>
          </div>

          <button class="introStep_Btn" @click="btn_event()">다음</button>
        </div>

        <div class="Tutorial_Close_Btn" v-if="isIntro == '3'" @click="tutorialClose()">다시 보지않기</div>  
      </div>
 
    </div>
    <!-- 메인페이지 튜토리얼 -->



    <!-- 프로젝트 내부 -->
    <div class="Tutorial_inner" v-if="tutorialType == 'dev'">
      <div class="Tutorial_opacity" v-if="opacity_power == true"></div>
      <div class="Tutorial_opacity_low" v-if="opacity_power == false"></div>
      
      <div class="Tutorial_Content">

        <div class="WelcomeMessage" v-if="isIntro == '4'">
          <span class="VSNE_second_MSG_title"> 메인화면 가이드</span>
          <span class="VSNE_second_MSG">기본적인 사용방법을 알아봅시다</span>
        </div>

        <div class="Tutorials" v-if="isIntro == '5'">
          <div v-if="introStep == 0">
            <div class="TutorialBox_1" >
              <div class="TutorialBox_text">
                새 프로젝트 생성
              </div>
            </div>
            <div class="TutorialBox_2" >
              <div class="TutorialBox_text">
                프로젝트 목록
              </div>
            </div>
            <div class="TutorialBox_3" >
              <div class="TutorialBox_text">
                사이드바
              </div>
            </div>
            <div class="TutorialBox_4" >
              <div class="TutorialBox_text">
                최신 프로젝트 알림 및 로그인 정보 
              </div>
            </div>
          </div>

          <div class="WelcomeMessage" v-if="introStep == 1">
            <span class="VSNE_second_MSG_title">Let's Try!</span>
            <span class="VSNE_second_MSG">직접 프로젝트를 만들고 제작해봅시다!</span>
          </div>

          <button class="introStep_Btn" @click="btn_event()">다음</button>
        </div>

        <div class="Tutorial_Close_Btn" v-if="isIntro == '3'" @click="tutorialClose()">다시 보지않기</div>  
      </div>
 
    </div>
    <!-- 프로젝트 내부 -->


  </div>
</template>

<script>
import axios from '../../axios'
export default {
  name : "E_TutorialGuide",
  props : {
    sideMenuState : String,
    tutorialState : Boolean,
    tutorialType : String
  },
  data() {
    return{
      isIntro : '1',
      opacity_power : true,
      introStep: 0,
    }
  },
  created() {
    // introOpen()
  },
  methods : {
    btn_event(){
      console.log(this.introStep)
      switch(this.introStep){
        case 0 :
          this.introStep++;
          // this.opacity_power = true;
          this.$store.commit('sideMenuOnMain');
          break;
        case 1 :  
          this.introStep++;
          this.opacity_power = true;
          break;
        default : 
          this.$store.commit('tutorialOff');
          this.$store.commit('sideMenuOffMain');
          this.introStep = 0;
          this.isIntro = '1';
      }
    },
    tutorialClose() {
        axios.get('/engine/user/tutorialDisable')
        .then((result)=>{
            if(result.data == "err") {
              console.log("유저 튜토리얼 체크 여부 변경 실패");
            } else {
              this.$store.commit('tutorialOff');
            }
        })
    },
    introOpen() {
      this.isIntro = '2';
      setTimeout(() => {
      this.isIntro = '3';
      this.opacity_power = false;   
      }, 2000);

    }
  }
}
</script>

<style>
.Tutorial_inner {
  position: absolute;
  width: 100%;
  height: 100%;
}

.Tutorial_opacity{
  background: black;
  width: calc(100vw);
  height: 100vh;
  opacity: 0;
  position: absolute;
  animation-duration: 1s;
  animation-name: Tu_backgrounding_on;
  animation-fill-mode: forwards;
}

.Tutorial_opacity_low{
  background: black;
  width: calc(100vw);
  height: 100vh;
  opacity: 0.6;
  position: absolute;
  animation-duration: 1s;
  animation-name: Tu_backgrounding_on_low;
  animation-fill-mode: forwards;
}

.Tutorial_Content {
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
}

.Tutorials {
  position: absolute;
  width: 100%;
  height: 100%;
}

.WelcomeMessage {
  position: absolute;
  left: 50%;
  top: 40%;
  width: 1200px;
  height: 600px;
  opacity: 0;
  transform: translate(-50%, -50%);
  animation-duration: 0.8s;
  animation-name: welcome_opening;
  animation-fill-mode: forwards;
}

.VSNE_first_LOGO {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  width: 250px;
  background: #484848;
  border-radius: 30px;
  box-shadow: 0px 0px 6px #000000;
}

.VSNE_first_MSG {
  position: absolute;
  left: 50%;
  top: 68%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.8em;
  font-weight: 600;
  border-radius: 20px;
  width: 100%;
  text-align: center;
  text-shadow: 0px 0px 6px #000000;
}

.VSNE_first_nextBtn {
  position: absolute;
  left: 50%;
  top: 80%;
  transform: translate(-50%, -50%);
  background: #2872f9;
  border-radius: 10px;
  font-size: 1.2em;
  width: 100px;
  height: 40px;
  color: white;
  border: none;
}

.VSNE_second_MSG_title {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  border-radius: 20px;
  background: #2872f9;
  width: 200px;
  text-align: center;
  height: 40px;
  padding-top: 6px;
  text-shadow: 0px 0px 6px #000000;
}

.VSNE_second_MSG {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.8em;
  font-weight: 600;
  border-radius: 20px;
  text-shadow: 0px 0px 6px #000000;
}

.VSNE_second_nextBtn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #2872f9;
  border-radius: 10px;
  font-size: 1.2em;
  width: 100px;
  height: 40px;
  color: white;
  border: none;
}

.Tutorial_Close_Btn {
  position: absolute;
  top: calc(100% - 35px);
  left: calc(100% - 95px);
  width: 150px;
  height: 45px;
  color: white;
  background: #2872f9;
  border-radius: 15px;
  font-size: 1.2em;
  text-align: center;
  padding-top: 8px;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

@keyframes welcome_opening {
  from {
  }

  to {
    opacity: 1;
    top: 50%;
  }
}

@keyframes Tu_backgrounding_on {
  from {
  }

  to {
    opacity: 0.6;
  }
}

@keyframes Tu_backgrounding_on_low {
  from {
    opacity: 0.6;
  }

  to {
    opacity: 0.1;
  }
}
</style>

<style>
.TutorialBox_1 {
  position: absolute;
  left: 320px;
  top: 220px;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 40px;
  opacity: 0;
  background: #575757;
  box-shadow: 0 0 5px rgb(255, 255, 255);
  border-radius: 15px;
  animation-name: Tutorial_box_On;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
  color: white;
}
.TutorialBox_2 {
  position: absolute;
  left: 50%;
  top: 400px;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 40px;
  opacity: 0;
  background: #575757;
  box-shadow: 0 0 5px rgb(255, 255, 255);
  border-radius: 15px;
  animation-name: Tutorial_box_On;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
  color: white;
}
.TutorialBox_3 {
  position: absolute;
  left: 70px;
  top: calc(50%);
  transform: translate(-50%, -50%);
  width: 80px;
  height: 40px;
  opacity: 0;
  background: #575757;
  box-shadow: 0 0 5px rgb(255, 255, 255);
  border-radius: 15px;
  animation-name: Tutorial_box_On;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
  color: white;
}
.TutorialBox_4 {
  position: absolute;
  left: 160px;
  top: calc(50% + 60px);
  transform: translate(-50%, -50%);
  width: 220px;
  height: 60px;
  opacity: 0;
  background: #575757;
  box-shadow: 0 0 5px rgb(255, 255, 255);
  border-radius: 15px;
  animation-name: Tutorial_box_On;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
  color: white;
}
.TutorialBox_5 {
  position: absolute;
  left: 180px;
  top: calc(50% + 90px);
  transform: translate(-50%, -50%);
  width: 120px;
  height: 40px;
  opacity: 0;
  background: #575757;
  box-shadow: 0 0 5px rgb(255, 255, 255);
  border-radius: 15px;
  animation-name: Tutorial_box_On;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
  color: white;
}
.TutorialBox_6 {
  position: absolute;
  left: 180px;
  top: calc(50% + 180px);
  transform: translate(-50%, -50%);
  width: 120px;
  height: 40px;
  opacity: 0;
  background: #575757;
  box-shadow: 0 0 5px rgb(255, 255, 255);
  border-radius: 15px;
  animation-name: Tutorial_box_On;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
  color: white;
}
.TutorialBox_7 {
  position: absolute;
  left: 180px;
  top: calc(50% + 270px);
  transform: translate(-50%, -50%);
  width: 120px;
  height: 40px;
  opacity: 0;
  background: #575757;
  box-shadow: 0 0 5px rgb(255, 255, 255);
  border-radius: 15px;
  animation-name: Tutorial_box_On;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
  color: white;
}
.TutorialBox_8 {
  position: absolute;
  left: calc(50% + 300px);
  top: calc(50% - 230px);
  transform: translate(-50%, -50%);
  width: 300px;
  height: 100px;
  opacity: 0;
  background: #575757;
  box-shadow: 0 0 5px rgb(255, 255, 255);
  border-radius: 15px;
  animation-name: Tutorial_box_On;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
  color: white;
}
.TutorialBox_9 {
  position: absolute;
  left: calc(50% + 70px);
  top: calc(50%);
  transform: translate(-50%, -50%);
  width: 250px;
  height: 80px;
  opacity: 0;
  background: #575757;
  box-shadow: 0 0 5px rgb(255, 255, 255);
  border-radius: 15px;
  animation-name: Tutorial_box_On;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
  color: white;
}
.TutorialBox_10 {
  position: absolute;
  left: calc(50% + 70px);
  top: calc(50% + 280px);
  transform: translate(-50%, -50%);
  width: 250px;
  height: 80px;
  opacity: 0;
  background: #575757;
  box-shadow: 0 0 5px rgb(255, 255, 255);
  border-radius: 15px;
  animation-name: Tutorial_box_On;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
  color: white;
}
.TutorialBox_text {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.introStep_Btn{
  background-color: #2872f9;
  border-radius: 16px;
  width: 100px;
  height: 45px;
  color: white;
  font-size: 1.2em;
  font-weight: 700;
  position: absolute;
  left: calc(100% - 70px);
  top: calc(100% - 90px);
  transform: translate(-50%, -50%);
  text-align: center;
  border: none;
  /* box-shadow: 0 0 5px rgb(255, 255, 255); */
}
@keyframes Tutorial_box_On {
  0% {

  }

  100% {
    opacity: 1;
  }
  
}
</style>