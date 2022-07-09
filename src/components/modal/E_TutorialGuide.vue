<template>
  <div class="FullView" v-if="tutorialState">

    <!-- 메인페이지 튜토리얼 -->
    <div class="modal_opacity" v-if="tutorialType == 'index'">

      <div class="ETG_Message">
        내용
      </div>
      <div @click="this.$store.commit('tutorialOff')">닫기</div>
    </div>

    <!-- 프로젝트 내부 -->
    <div class="modal_opacity" v-else-if="tutorialType == 'dev'">
      <div class="ETG_Message">
        내용
      </div>
      <div @click="tutorialClose()">닫기</div>
    </div>
  </div>
</template>

<script>
export default {
  name : "E_TutorialGuide",
  props : {
    sideMenuState : String,
    tutorialState : Boolean,
    tutorialType : String
  },
  methods : {
    tutorialClose() {
        axios.get('/engine/user/tutorialDisable')
        .then((result)=>{
            if(result.data == "err") {
                console.log("유저 튜토리얼 체크 여부 변경 실패");
            } else {
                this.$store.commit('tutorialOff');
            }
        })
    }
  }
}
</script>

<style>
.ETG_Message {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
}
</style>