<template>
<div v-if="fModalState">
  <div class="modal_opacity">
  </div>

  <div v-bind:class="{[`Fmodal_frame`]:true}">
    <div class="FileManagerTitle"><p>VSN 파일 매니저</p></div>
    <div class="Fmodal_inner">

      <div class="Fmodal_UploadArea">
        <input
        class="Fmodal_UploadAreaInput"
        multiple ref="fileM"
        type="file"
        @change="onFileChange"
        @dragover.prevent
        @dragenter.prevent
        @drop.prevent="onDrop">
        <p class="UploadBefore">업로드할 파일을 이곳에 Drag&Drop</p>
        <p class="UploadAfter">+</p>
      </div>


      

    </div>
      
    <div class="Fmodal_save_button" @click="modalCloseY()">
      <span class="Fmodal_save_ok">{{this.fModalBtn1}}</span>
    </div>

    <div class="Fmodal_cancel_button" @click="modalCloseN()">
      <span class="Fmodal_cancel_ok">{{this.fModalBtn2}}</span>
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

      files : []

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

    onDragenter() {
      this.isDragged = true
    },
    onDragleave() {
      this.isDragged = false
    },
    onDragover(event) {
      event.preventDefault();
    },    
    onDrop(event) {
      this.isDragged = false
      this.files = event.dataTransfer.files;
      console.log(this.files);
    },
    onFileChange(event) {
      this.files = event.target.files;
      console.log(this.files);
    }
    
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
.Fmodal_frame{
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
.Fmodal_inner{
  color: white;
  position: fixed;
  top: 45%;
  left: 50%;
  width: 500px;
  height: 170px;
  transform: translate(-50%, -50%);
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
}

.Fmodal_UploadArea:hover .UploadAfter {
  opacity: 1;
}

.Fmodal_UploadAreaInput:hover .UploadBefore {
  opacity: 0;
}

.Fmodal_UploadAreaInput:hover .UploadAfter {
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

