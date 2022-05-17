<template>
<div v-if="fModalState">
  <div class="modal_opacity">
  </div>

  <div v-bind:class="{[`Fmodal_frame`]:true}">
    <div class="FileManagerTitle"><p>VSN 파일 매니저</p></div>
    <div class="Fmodal_inner">
      <div class="Fmodal_Path">대상 경로 : {{path}}</div>
      <div class="Fmodal_UploadArea" v-if="this.files.length == 0">
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

      <div v-else>
        퍼센테이지 : {{percent}}
        <ul>
          <li v-for="(f, i) in files" :key="i">{{f.name}}</li>
        </ul>
      </div>

      <div class="Fmodal_UploadArea_After" v-if="this.files.length > 0">
        <input
        class="Fmodal_UploadAreaInput_After"
        multiple ref="fileM"
        type="file"
        @change="onFileChange"
        @dragover.prevent
        @dragenter.prevent
        @drop.prevent="onDrop">
        <p class="UploadBefore_After">업로드할 파일을 이곳에 Drag&Drop</p>
        <p class="UploadAfter_After">+</p>
      </div>


      

    </div>
      
    <div class="Fmodal_save_button" @click="fileUpload()">
      <span class="Fmodal_save_ok">업로드</span>
    </div>

    <div class="Fmodal_cancel_button" @click="modalClose()">
      <span class="Fmodal_cancel_ok">취소</span>
    </div>

  </div>  
</div>
</template>

<script>
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  region : "ap-northeast-2",
  //추후 .env로 보안관리 할것
  accessKeyId: 'AKIARKU2Y4IXVCR266PO', // 사용자의 AccessKey
  secretAccessKey: 'YJDi8K4VSP5bPhdNcC6hB/xreuKH2885200KS+LB' // 사용자의 secretAccessKey
});
export default {
  name : "UploadModal",
  data() {
    return {
      // 모달 데이터
      fModalState : false,
      fModalSize : "",

      pjCode : "",
      path : "",
      percent : "",

      files : []
    }
  },
  methods : {
    modalClose() {
      this.fModalState = false; 
      this.files = [];
    },
    show(option = {}) {
      this.fModalState = true;
      this.fModalSize = option.size;
      this.path = option.path;
      this.pjCode = option.pjCode;
    },

    //파일 드래그앤드롭 업로드
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
    },

    fileUpload() {
      if(this.path == "/") {
        this.path = '';
      }

      for(var i=0; i<this.files.length; i++) {

        const params = {
          Bucket: "vsnovel",
          Key : `Project/PJ${this.pjCode}/resource/${this.path}` + this.files[i].name, // 저장되는 파일의 경로 및 이름
          Body : this.files[i] // 파일
        }

        s3.upload(params)
        .on("httpUploadProgress", evt => {
          this.percent = parseInt((evt.loaded * 100) / evt.total) + "%";
        })
        .send((err, data)=>{
          if(err) {
            console.log("파일 업로드 실패");
            console.error(err);
            return "err"
          } else {
            console.log("파일 업로드 성공", data);
            this.$emit('uploadOk');
          }
        })

      }

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

.Fmodal_Path {
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

