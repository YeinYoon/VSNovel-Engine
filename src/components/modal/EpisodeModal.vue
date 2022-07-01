<template>
<div v-if="EPModalState">

  <div class="modal_opacity">
  </div>

  <div class="EPmodal_frame">
    <div class="EPmodal_inner">
      <p class="EPmodal_title">에피소드 정보 관리</p>

      <div class="EPmodal_EpsiodeName_frame">
        <p class="EPmodal_EPtitle">제목</p>
        <input type="text">
      </div>

      <div class="EPmodal_Img_frame">
        <p class="EPmodal_EPimg">표지</p>
        <button class="EPmodal_EPimg_btn">업로드</button>
      </div>

      <div class="EPmodal_exportSetting">
        <p class="EPmodal_ex_title">스토어 출품 설정</p>
        <button class="EPmodal_epicExport">이 에피소드 발행</button>
      </div>

      <div class="EPmodal_functions">
        <button class="EPmodal_saveInfo">저장</button>
        <button class="EPmodal_cancelInfo" @click="modalClose()">취소</button>
      </div>

    </div>
  </div>


</div> 
</template>

<script>
export default {
  name : "FileMoveModal",
  data() {
    return {
      // 모달 데이터
      EPModalState : false,
      modalSize : "",


    }
  },
  methods : {
    modalClose() {
      this.EPModalState = false;
    },
    show(option = {}) {
      this.EPModalState = true;
      this.modalSize = option.size;
    },

  },
}
</script>

<style>

.EPmodal_frame{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 620px;
  height: 350px;
  border-radius: 25px;
  background: #2a2a2a;
  animation-duration: 0.7s;
  animation-name: EPopening;
  z-index: 100;
  opacity: 1;
}

.EPmodal_inner{
  color: white;
  position: fixed;
  top: 45%;
  left: 50%;
  width: 550px;
  height: 170px;
  transform: translate(-50%, -50%);
}

.EPmodal_title {
  position: absolute;
  left: 50%;
  top: -30px;
  transform: translate(-50%, -50%);
  font-size: 1.3em;
}

.EPmodal_EpsiodeName_frame{
  position: absolute;
  top: 0px;
  width: 100%;
  /* background: white; */
  height: 40px;
  text-align: center;
}

.EPmodal_EPtitle {
  position: relative;
  display: inline-block;
}

.EPmodal_EpsiodeName_frame input {
  position: relative;
  display: inline-block;
  width: 400px;
  height: 100%;
  margin-left: 10px;
  border: none;
  color: white;
  background: #616161;
  border-radius: 15px;
  padding: 10px;
}

.EPmodal_Img_frame {
  position: absolute;
  top: 55px;
  width: 100%;
  /* background: white; */
  height: 40px;
  text-align: center;
}

.EPmodal_EPimg {
  position: relative;
  display: inline-block;
}

.EPmodal_EPimg_btn {
  position: relative;
  display: inline-block;
  background: #2872f9;
  border-radius: 20px;
  border: none;
  color: white;
  width: 70px;
  height: 35px;
  margin-left: 10px;
}


.EPmodal_exportSetting {
  position: absolute;
  top: 120px;
  width: 100%;
  /* background: white; */
  height: 40px;
  text-align: center;
}

.EPmodal_ex_title {
  font-size: 1.1em;
  line-height: 0px;
}

.EPmodal_epicExport {
  display: inline-block;
  background: #2872f9;
  border-radius: 20px;
  border: none;
  color: white;
  width: 150px;
  height: 35px;
  margin-left: 10px;
}

.EPmodal_functions{
  position: absolute;
  top: 215px;
  width: 100%;
  /* background: white; */
  height: 40px;
  text-align: center;
}

.EPmodal_saveInfo {
  display: inline-block;
  background: #2872f9;
  border-radius: 20px;
  border: none;
  color: white;
  width: 90px;
  height: 35px;
  margin: 3px;
}

.EPmodal_cancelInfo {
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
@keyframes EPopening {
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
@keyframes FMbackgrounding_on {
  from {
    opacity: 0;
  }
    
  to {
    opacity: 0.3;
  }
}

</style>

