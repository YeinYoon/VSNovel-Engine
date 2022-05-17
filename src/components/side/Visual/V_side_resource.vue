<template>
<ConfirmModal ref="confirmModal"></ConfirmModal>
<FileModal ref="fileModal"></FileModal>
  <div class="VSBackgroundRes">

    <div class="VSResourceTool">
      <div class="VSResourceTitle"><span>리소스 관리</span></div>
      <div class="VSResourceButtons">
        <button @click="uploadFile()">업로드</button> <!-- 업로드 -->
        <button @click="createDir()">폴더추가</button> <!-- 폴더추가 -->
        <button>기능?</button> <!-- 폴더이동 -->
      </div>
    </div>
    

    <div class="VSFolderList" v-if="clickFolder == false">

      <div class="VSResourceSubTitle"><p>{{folderPath}}</p></div>

      <div class="VSFolder" v-for="(f, i) in folderList" :key="i" @click="goToFolder(f.key)">

        <div class="VSFolderThumnail"> 
          <img src="@/assets/sample.png">
        </div>

        <div class="VSFolderDelButton"><span>삭제</span></div>

        <div class="VSFolderName">
          <p>{{f.name}}</p>
        </div>

      </div>

    </div>


    <div class="VSFileList" v-else>

      <div class="VSFileLocation"><span>{{folderPath}}</span></div>
      <div class="VSFileReturn" @click="back()"><span>뒤로가기</span></div>

      <div class="VSFile" v-for="(f, i) in fileList" :key="i">

        <div class="VSFileThumnail" v-if="f.ex == 'mp3'">
          <img src="@/assets/sample.png">
        </div>
        <div class="VSFileThumnail" v-if="f.ex == 'dir'" @click="goToFolder(f.key)">
          <img src="@/assets/sample.png">
        </div>
        <div class="VSFileThumnail" v-else>
          <img :src="f.url">
        </div>

        <div class="VSFileDelButton" @click="deleteFile(f.name, f.key)">
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
import ConfirmModal from '../../modal/ConfirmModal.vue'
import FileModal from '../../modal/FileModal.vue'
import storage from '../../../aws'
export default {
  name: 'V_side_resource',
  components : {
    ConfirmModal,
    FileModal
  },
  props : {
    pjCode : String
  },
  mounted() {
    this.getData();
  },
  watch : {
    folderPath(cng, pre) {
      console.log(pre, "->", cng);
    }
  },
  data() {
    return {
      clickFolder : false,
      preFolderPath : ['/'],
      folderPath : "/",
      folderList : [], //root 폴더 리스트
      fileList : [],

      //업로드 관련
      files : []
    }
  },
  methods : {
    //Root에서 시작할때의 함수
    async getData() {
      console.log("해당 프로젝트의 폴더 목록을 불러옴", this.pjCode);
      this.folderList = await storage.getDirList(`Project/PJ${this.pjCode}/resource/`);
      console.log(this.folderList);
    },
    async getFileList(folderName) {
      this.fileList = await storage.getUrlList(`Project/PJ${this.pjCode}/resource/${folderName}/`);
      console.log(this.fileList);
    },

    //내부 폴더 진입시의 함수
    async goToFolder(key) {
      this.clickFolder = true;
      this.folderPath = key;
      var temp = this.folderPath.split('/');
      temp = temp.slice(3); //'Project', 'PJ137', 'resource' 제외
      const path = temp.join('/');
      
      this.folderPath = path;
      this.preFolderPath.push(path);
  
      this.fileList = await storage.getUrlList(`Project/PJ${this.pjCode}/resource/${path}`);
      console.log(this.fileList);
    },

    uploadFile() {
      this.$refs.fileModal.show({
        msg : `ㅎㅇ`,
        size : "big",
        btn1 : "확인",
        btn2 : "취소"
      });
    },

    async deleteFile(name, key) {
      var result = await this.$refs.confirmModal.show({
        msg : `파일 [${name}]를 삭제하시겠습니까?`,
        size : "normal",
        btn1 : "확인",
        btn2 : "취소"
      });

      if(result == true) {
        var res = await storage.deleteFile(key);
        if(res == "ok") {
          this.getFileList(this.currentFolder);
        } else {
          console.log("파일 삭제 실패");
        }
      }
    },

    async back() {
      if(this.preFolderPath.length == 1) {
        this.folderPath = this.preFolderPath[0];
        this.clickFolder = false;
        this.folderList = await storage.getDirList(`Project/PJ${this.pjCode}/resource/`);
      } else {
        this.folderPath = this.preFolderPath[this.preFolderPath.length-1];
        this.preFolderPath.splice(-1,1);
        this.fileList = await storage.getUrlList(`Project/PJ${this.pjCode}/resource/${this.folderPath}`);
      }
    }
  },
  
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