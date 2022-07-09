<template>
  <div class="FullView" v-if="tutorialState">

    <!-- 메인페이지 튜토리얼 -->
    <div class="modal_opacity" v-if="tutorialType == 'index'">
      <div class="ETG_Message">
        내용
      </div>
      <div>닫기</div>
    </div>

    <!-- 프로젝트 내부 -->
    <div class="modal_opacity" v-else-if="tutorialType == 'dev'">
      <div class="ETG_Message">
        내용
      </div>
      <div>닫기</div>
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
}
</script>

<style>
.ETG_Message {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>