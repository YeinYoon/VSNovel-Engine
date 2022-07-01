<template>
<div v-if="TMModalState">

  <div class="modal_opacity">
  </div>

  <div class="TMmodal_frame">
    <div class="TMmodal_inner">
      <p class="TMmodal_title">에피소드 정보 관리</p>

      <div class="TMmodal_functions">
        <button class="TMmodal_saveInfo">저장</button>
        <button class="TMmodal_cancelInfo" @click="modalClose()">취소</button>
      </div>

    </div>
  </div>

</div> 
</template>

<script>
export default {
  name : "themeModal",
  data() {
    return {
      // 모달 데이터
      TMModalState : false,

    }
  },
  methods : {
    modalClose() {
      this.TMModalState = false;
    },
    show() {
      this.TMModalState = true;
    },

  },
}
</script>

<style>

.TMmodal_frame{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 620px;
  height: 350px;
  border-radius: 25px;
  background: #2a2a2a;
  animation-duration: 0.7s;
  animation-name: TMopening;
  z-index: 100;
  opacity: 1;
}

.TMmodal_inner{
  color: white;
  position: fixed;
  top: 45%;
  left: 50%;
  width: 550px;
  height: 170px;
  transform: translate(-50%, -50%);
}

.TMmodal_title {
  position: absolute;
  left: 50%;
  top: -30px;
  transform: translate(-50%, -50%);
  font-size: 1.3em;
}

.TMmodal_functions{
  position: absolute;
  top: 215px;
  width: 100%;
  /* background: white; */
  height: 40px;
  text-align: center;
}

.TMmodal_saveInfo {
  display: inline-block;
  background: #2872f9;
  border-radius: 20px;
  border: none;
  color: white;
  width: 90px;
  height: 35px;
  margin: 3px;
}

.TMmodal_cancelInfo {
  display: inline-block;
  background: #2872f9;
  border-radius: 20px;
  border: none;
  color: white;
  width: 90px;
  height: 35px;
  margin: 3px;
}

/* 애니메이션들,*/
  /*열리는 애니메이션 opening*/
@keyframes TMopening {
  from {
    top:150%;
    opacity: 0;
  }

  to {
    top:50%;
    opacity: 1;
  }
}
  /*배경을 만드는 backgrounding_on*/
@keyframes TMbackgrounding_on {
  from {
    opacity: 0;
  }
    
  to {
    opacity: 0.3;
  }
}

</style>

