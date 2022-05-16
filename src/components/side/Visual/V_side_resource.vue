<template>
  <div class="VSBackgroundRes">
    <!-- <div v-for="(bg, i) in bg" :key="i">
      <p>{{bg.name}}</p>
    </div>

    <div v-for="(bgm, i) in bgm" :key="i">
      <p>{{bgm.name}}</p>
    </div>

    <div v-for="(img, i) in img" :key="i">
      <p>{{img.name}}</p>
    </div>  -->

    <!-- 작업 가이드 -->
    <!-- 레이아웃 구성은 폴더 리스트와 파일 리스트로 구성됩니다. -->
    <!-- 폴더 내부를 조회하기전에는 폴더 리스트를 노출해 프로젝트의 폴더들을 표시합니다. -->
    <!-- 폴더 내부를 조회하기위해 각 폴더의 아이콘을 클릭하면 파일 리스트로 전환됩니다. -->
    <!-- 따라서 각 레이아웃을 샥샥 교체하기위해 변수 하나를 만들어서 현재 폴더리스트를 보고있는지. 
    파일 리스트를 보고있는지 판단하는 변수가 필요합니다. -->


    <div class="VSResourceTool">
      <div class="VSResourceTitle"><span>리소스 관리</span></div>
      <div class="VSResourceButtons">
        <button>업로드</button> <!-- 업로드 -->
        <button>폴더추가</button> <!-- 폴더추가 -->
        <button>기능?</button> <!-- 폴더이동 -->
      </div>
    </div>
    

    <div class="VSFolderList" v-if="clickFolder == false">

      <div class="VSResourceSubTitle"><p>경로/폴더명</p></div>

      <div class="VSFolder" v-for="(f, i) in folderList" :key="i" @click="this.currentFolder = f;">

        <div class="VSFolderThumnail"> 
          <img src="@/assets/sample.png">
        </div>

        <div class="VSFolderDelButton"><span>삭제</span></div>

        <div class="VSFolderName">
          <p>{{f}}</p>
        </div>

      </div>

    </div>



    <div class="VSFileList" v-else>

      <div class="VSFileLocation"><span>경로/경로/경로/경로</span></div>
      <div class="VSFileReturn"><span>뒤로가기</span></div>

      <div class="VSFile" v-for="(f, i) in fileList" :key="i">

        <div class="VSFileThumnail" v-if="f.ex == 'mp3'">
          <img src="@/assets/sample.png">
        </div>
        <div class="VSFileThumnail" v-else>
          <img :src="f.url">
        </div>

        <div class="VSFileDelButton">
          <span>삭제</span>
        </div>

        <div class="VSFileName">
          <p>{{f.name}}</p>
        </div>

      </div> 

    </div> 

    <!-- 파일리스트는 리스트방식, 갤러리방식 두가지로 제공하고싶으니 파일 정보 불러올때 염두해주셈!! 미리 변수값이 있으면 좋겠음!! -->

  </div>
</template>

<script>
import storage from '../../../aws'
export default {
  name: 'V_side_resource',
  props : {
    pjCode : String
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      clickFolder : false,
      currentFolder : null,
      folderList : [],
      fileList : []
    }
  },
  methods : {
    async getData() {
      console.log("해당 프로젝트의 폴더 목록을 불러옴", this.pjCode);
      this.folderList = await storage.getDirList(`Project/PJ${this.pjCode}/resource/`);
      console.log(this.folderList);
    },

    async getFileList(folderName) {
      this.fileList = await storage.getUrlList(`Project/PJ${this.pjCode}/resource/${folderName}/`);
      console.log(this.fileList);
    }
  },
  watch : {
    currentFolder(cngFolder) {
      this.clickFolder = true;
      this.getFileList(cngFolder);
    }
  }
  
}
</script>

<style>
.VSBackgroundRes {
  width: 100%;
  height: 100vh;
  overflow: auto;
  color: white;
}

.VSResourceTool {
  width: 100%;
  height: 80px;
  position: relative;
  background: #474747;
  border-radius: 0px 0px 10px 10px;
  overflow: hidden;
}

.VSResourceTitle {
  position: relative;
  width: 100%;
  left: 0px;
  font-size: 1em;
}

.VSResourceTitle span{
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%);
  font-size: 1em;
}

.VSResourceButtons {
  position: relative;
  width: 100%;
  top: 35px;
  height: 40px;
  padding: 7px;
  text-align: center;

  /* background: white; */
}

.VSResourceButtons button {
  display: inline;
  width: 80px;
  height: 30px;
  border-radius: 10px;
  margin: 2px;
  color: white;
  border: none;
  background: #2872f9;
}

.VSFolderList {
  width: 100%;
  padding: 20px;
  /* background: white; */
}

.VSFolder {
  position: relative;
  display: inline-block;
  width: calc(50% - 10px);
  margin: 0px 5px 10px 5px;
  height: 120px;
  background: #5e5e5e;
  border-radius: 15px;
  cursor: pointer;
  transition: all ease 0.2s;
}

.VSFolder:hover {
  height: 150px;
  background: #777777;
}

.VSFolder:hover .VSFolderDelButton {
  display: block;
}

.VSFolderDelButton {
  position: absolute;
  left: 75px;
  top: 120px;
  width: 40px;
  height: 25px;
  background: #2872f9;
  border-radius: 10px;
  display: none;
  animation-name: delOpen;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}

.VSFolderDelButton span{
  font-size: 0.9em;
  position: absolute;
  left: 6.5px;
  top: 1px;
}

.VSFolderThumnail {
  position: relative;
  left: 12px;
  top: 10px;
  background: rgb(59, 59, 59);
  width: 80%;
  height: 80px;
  border: 3px rgb(59, 59, 59) solid;
  border-radius: 10px;
}

.VSFolderThumnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.VSFolderName {
  position: relative;
  /* background: red; */
  left: 50%;
  top: 0px;
  transform: translate(-50%, 50%);
  width: 70%;
  border-radius: 10px;
}

.VSFolderName p {
  width: 100%;
  height: 100%;
}



.VSFileList {
  width: 100%;
  padding: 15px 20px 0px 20px;
}

.VSFileLocation {
  display: inline-block;
  position: relative;
  width: 50%;
  margin-bottom: 10px;
}

.VSFileLocation span{
  position: relative;
  height: 20px;
  left: 0px;
  white-space: nowrap;
  word-break:break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  direction: rtl;
  text-align: left;

}

.VSFileReturn {
  display: inline-block;
  position: relative;
  text-align: right;
  width: 50%;
  margin-bottom: 10px;
}

.VSFileReturn span{
  position: relative;
  height: 20px;
  left: 0px;
  white-space: nowrap;
  word-break:break-all;
  text-overflow: ellipsis;
  overflow: hidden;
}

.VSFile {
  position: relative;
  display: inline-block;
  width: calc(50% - 10px);
  margin: 0px 5px 10px 5px;
  height: 120px;
  background: #5e5e5e;
  border-radius: 15px;
  cursor: pointer;
  transition: all ease-out 0.2s;
}

.VSFile:hover .VSFileDelButton{
  display: block;
}

.VSFile:hover {
  height: 150px;
  background: #777777;
}

.VSFileThumnail {
  position: relative;
  left: 12px;
  top: 10px;
  background: rgb(59, 59, 59);
  width: 80%;
  height: 80px;
  border: 3px rgb(59, 59, 59) solid;
  border-radius: 10px;
}

.VSFileThumnail img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
}

.VSFileDelButton {
  position: absolute;
  left: 75px;
  top: 120px;
  width: 40px;
  height: 25px;
  background: #2872f9;
  border-radius: 10px;
  display: none;
  animation-name: delOpen;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}

.VSFileDelButton span{
  font-size: 0.9em;
  position: absolute;
  left: 7px;
  top: 1px;
}

.VSFileDelButton:hover {
  background: #366fda;
}

.VSFileName {
  position: relative;
  /* background: red; */
  left: 65px;
  top: 3px;
  transform: translate(-50%, 50%);
  width: 110px;
  height: 20px;
}

.VSFileName p {
  width: 100%;
  height: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  word-break:break-all;
}

@keyframes delOpen {
  from {
    opacity: 0;
    background: #2872f9;
  }

  to {
    opacity: 1;
  }
}
</style>