<template>
<div v-if="iModalState">
  <div class="modal_opacity">
  </div>

  <div v-bind:class="{[`Imodal_frame`]:true}">
    <div class="InputModalTitle"><p>{{msg}}</p></div>

    <div class="Imodal_inner">
      
    </div>

    <div class="Fmodal_save_button" @click="fileUpload()">
      <span class="Fmodal_save_ok">확인</span>
    </div>

    <div class="Fmodal_cancel_button" @click="modalClose()">
      <span class="Fmodal_cancel_ok">취소</span>
    </div>

  </div>

</div> 
</template>

<script>
export default {
  name : "InputModal",
  data() {
    return {
      // 모달 데이터
      iModalState : false,
      iModalSize : "",
      msg : "",
      input : "",
    }
  },
  methods : {
    modalClose() {
      this.iModalState = false; 
    },
    show(option = {}) {
      this.iModalState = true;
      this.iModalSize = option.size;
      this.msg = option.msg;
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
.Imodal_frame{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 350px;
  border-radius: 25px;
  background: #2a2a2a;
  animation-duration: 0.7s;
  animation-name: opening;
  z-index: 100;
  opacity: 1;
}
.Imodal_inner{
  color: white;
  position: fixed;
  top: 45%;
  left: 50%;
  width: 500px;
  height: 170px;
  transform: translate(-50%, -50%);
}

.Imodal_Path {
  position: absolute;
  left: -30px;
  top : -20px;
}

.Fmodal_UploadArea {
  position: absolute;
  top: 5px;
  width: calc(100% + 10px);
  height: calc(100%);
  /* border: white 3px dashed; */
  transition: all ease 0.5s;
  /* margin-bottom: 10px; */
}

.Fmodal_UploadAreaInput {
  position: absolute;
  top: 5px;
  width: 100%;
  height: calc(100%);
  border: white 3px dashed;
  transition: all ease 0.5s;
  /* margin-bottom: 10px; */
}

.Fmodal_UploadAreaInput::file-selector-button {
  display: none;
}

.Fmodal_UploadArea:hover{
  opacity: 0.4;
}

.Fmodal_UploadAreaInput:hover{
  opacity: 0.4;
}

.UploadBefore {
  position: absolute;
  left: 50%;
  top: 54%;
  font-size: 1.3em;
  width: 300px;
  transform: translate(-50%, -50%);
  display: block;
  transition: all ease 0.3s;
}

.UploadAfter {
  position: absolute;
  left: 50%;
  top: 52%;
  font-size: 4em;
  transform: translate(-50%, -50%);
  /* display: none; */
  transition: all ease 0.3s;
  opacity: 0;
}

.Fmodal_UploadArea:hover .UploadBefore {
  opacity: 0;
  display: none;
}

.Fmodal_UploadArea:hover .UploadAfter {
  opacity: 1;
  display: block;
}

.Fmodal_UploadAreaInput:hover .UploadBefore {
  opacity: 0;
}

.Fmodal_UploadAreaInput:hover .UploadAfter {
  opacity: 1;
}



.Fmodal_UploadArea_After {
  position: absolute;
  top: 5px;
  left: 55%;
  width: calc(70% + 10px);
  height: calc(100%);
  /* border: white 3px dashed; */
  transition: all ease 0.5s;
  /* margin-bottom: 10px; */
}

.Fmodal_UploadAreaInput_After {
  position: absolute;
  /* left: 55%; */
  top: 5px;
  width: 70%;
  height: calc(100%);
  border: white 3px dashed;
  transition: all ease 0.5s;
  /* margin-bottom: 10px; */
}

.Fmodal_UploadAreaInput_After::file-selector-button {
  display: none;
}

.Fmodal_UploadArea_After:hover{
  opacity: 0.4;
}

.Fmodal_UploadAreaInput_After:hover{
  opacity: 0.4;
}

.UploadBefore_After {
  position: absolute;
  left: 51%;
  top: 54%;
  font-size: 0.8em;
  width: 300px;
  transform: translate(-50%, -50%);
  display: block;
  transition: all ease 0.3s;
}

.UploadAfter_After {
  position: absolute;
  left: 36%;
  top: 52%;
  font-size: 3em;
  transform: translate(-50%, -50%);
  /* display: none; */
  transition: all ease 0.3s;
  opacity: 0;
}

.Fmodal_UploadArea_After:hover .UploadBefore_After {
  opacity: 0;
  display: none;
}

.Fmodal_UploadArea_After:hover .UploadAfter_After {
  opacity: 1;
  display: block;
}

.Fmodal_UploadAreaInput_After:hover .UploadBefore_After {
  opacity: 0;
}

.Fmodal_UploadAreaInput_After:hover .UploadAfter_After {
  opacity: 1;
}




.FileManagerTitle {
  position: absolute;
  left: 20px;
  top: 15px;
  color: white;
  font-size: 1.3em;
}

.Fmodal_save_button{
  width: 20%;
  height: 15%;
  background: #2872f9;
  border-radius: 20px;
  z-index: 2;
  display: table;
  position: fixed;
  top: 88%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.Fmodal_cancel_button{
  width: 10%;
  height: 10%;
  background: #2872f9;
  border-radius: 20px;
  z-index: 2;
  display: table;
  position: fixed;
  top: 30px;
  left: calc(100% - 50px);
  transform: translate(-50%, -50%);
}
.Fmodal_save_ok{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
}
.Fmodal_cancel_ok{
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

