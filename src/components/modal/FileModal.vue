<template>
<div v-if="fModalState">
  <div class="modal_opacity">
  </div>

  <div v-bind:class="{[`modal_frame_${this.fModalSize}`]:true}">

    <div class="modal_inner">
      VSN 파일 매니저
      <input
      multiple ref="fileM"
      type="file"
      @change="onInputImage()"
      @dragover.prevent
      @dragenter.prevent
      @drop.prevent="onDrop">
      

    </div>
      
    <div class="modal_save_button" @click="modalCloseY()">
      <span class="modal_save_ok">{{this.fModalBtn1}}</span>
    </div>

    <div class="modal_cancel_button" @click="modalCloseN()">
      <span class="modal_cancel_ok">{{this.fModalBtn2}}</span>
    </div>

  </div>  
</div>
</template>

<script>
export default {
  name : "UploadModal",
  data() {
    return {
      // 모달 데이터
      fModalState : false,
      fModalSize : "",
      fModalMsg : "",
      fModalBtn1 : "",
      fModalBtn2 : "",

      // 응답 프로미스
      // resolvePromise: undefined,
      // rejectPromise: undefined,
    }
  },
  methods : {
    show(option = {}) {
      this.fModalState = true;

      this.fModalSize = option.size;
      this.fModalMsg = option.msg;
      this.fModalBtn1 = option.btn1;
      this.fModalBtn2 = option.btn2;

      // return new Promise((resolve, reject)=>{
      //   this.resolvePromise = resolve
      //   this.rejectPromise = reject
      // })
    },
    modalCloseY() {
      this.fModalState = false;
      // this.resolvePromise(true)
    },
    modalCloseN() {
      this.fModalState = false; 
      // this.resolvePromise(false)
    },

    onDrop (event) {
      this.inputFile(event.dataTransfer.files);
    },
    
  },
}
</script>

<style>
.modal_opacity{
  background: black;
  width: 100vw;
  height: 100vh;
  opacity:0;
  z-index: 99;
  position: fixed;
  animation-duration: 0.3s;
  animation-name: backgrounding_on;
  animation-fill-mode: forwards;
  z-index: 1;
}
.modal_frame_normal{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 200px;
  border-radius: 25px;
  background: #2a2a2a;
  animation-duration: 0.7s;
  animation-name: opening;
  z-index: 100;
  opacity: 1;
}
.modal_frame_small{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 125px;
  border-radius: 25px;
  background: #2a2a2a;
  animation-duration: 0.7s;
  animation-name: opening;
  z-index: 100;
  opacity: 1;
}
.modal_frame_big{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 400px;
  border-radius: 25px;
  background: #2a2a2a;
  animation-duration: 0.7s;
  animation-name: opening;
  z-index: 100;
  opacity: 1;
}
.modal_inner{
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal_save_button{
  width: 25%;
  height: 20%;
  background: #2872f9;
  border-radius: 20px;
  z-index: 2;
  display: table;
  position: fixed;
  top: 85%;
  left: 35%;
  transform: translate(-50%, -50%);
}
.modal_cancel_button{
  width: 25%;
  height: 20%;
  background: #2872f9;
  border-radius: 20px;
  z-index: 2;
  display: table;
  position: fixed;
  top: 85%;
  left: 65%;
  transform: translate(-50%, -50%);
}
.modal_save_ok{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
}
.modal_cancel_ok{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
}
/* 애니메이션들,*/
  /*열리는 애니메이션 opening*/
@keyframes opening {
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
@keyframes backgrounding_on {
  from {
    opacity: 0;
  }
    
  to {
    opacity: 0.3;
  }
}

</style>

