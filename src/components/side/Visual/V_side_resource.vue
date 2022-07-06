<template>
<ConfirmModal ref="confirmModal"></ConfirmModal>
<FileUploadModal ref="fileUploadModal" @uploadOk="uploadOk()"></FileUploadModal>
<InputModal ref="inputModal" @inputFolderName="inputFolderName" @inputNewName="inputNewName"></InputModal>
<TypeModal ref="typeModal" @inputResource="inputResource"></TypeModal>
  <div class="VSBackgroundRes">

    <div class="VSResourceTool">
      <div class="VSResourceTitle"><span>리소스 관리</span></div>
      <div class="VSResourceButtons">
        <button @click="fileManagerOpen(this.folderPath)">업로드</button> <!-- 업로드 -->
        <button @click="createDir()">폴더추가</button> <!-- 폴더추가 -->
      </div>
    </div>
    
    <div :class="{[resListStatus]:true}"> <!-- mp3 파일 듣기를 시도하면 클래스명을 VSResListOnPlayer 로 변경 -->

      <div class="VSFolderList" v-if="clickFolder == false">

        <div class="VSResourceSubTitle"><span>{{folderPath}}</span></div>

        <div class="VSFolder" v-for="(f, i) in rootList" :key="i">

          <div class="VSFileThumnail" v-if="f.ex == 'png' || f.ex == 'jpg' || f.ex == 'gif' || f.ex == 'jpeg' || f.ex == 'PNG' || f.ex == 'JPG' || f.ex == 'GIF' || f.ex == 'FPEG'">
            <img :src="f.url" @click="send(f.key)">
          </div>
          <div class="VSFileThumnail" v-else-if="f.ex == 'mp3' || f.ex == 'MP3'" @dblclick="send(f)" @click="playerOn(f)">
            <img src="@/assets/sample.png">
          </div>
          <div class="VSFolderThumnail" v-else-if="f.ex == 'dir'" @click="goToFolder(f.key)">
            <img src="@/assets/icons/white/folder.png">
          </div>

          <!-- <div class="VSFolderMoveButton" @click="deleteFile(f.name, f.key)">
            <img src="@/assets/icons/white/redo.png">
          </div> -->

          <!-- <div class="VSFolderDetailButton" @click="editName(f.name, f.key)">
            <img src="@/assets/icons/white/editing.png">
          </div> -->

          <div class="VSFolderDelButton" @click="deleteFile(f.name, f.key)">
            <img src="@/assets/icons/white/trash_white.png">
          </div>


          <div class="VSFolderName">
            <p>{{f.name}}</p>
          </div>

        </div>

      </div>

      <div class="VSFileList" v-else>

        <div class="VSFileLocation"><span>{{folderPath}}</span></div>
        <div class="VSFileReturn" @click="back()"><span>뒤로가기</span></div>

        <div class="VSFile" v-for="(f, i) in fileList" :key="i">

          <div class="VSFileThumnail" v-if="f.ex == 'png' || f.ex == 'jpg' || f.ex == 'gif' || f.ex == 'jpeg' || f.ex == 'PNG' || f.ex == 'JPG' || f.ex == 'GIF' || f.ex == 'JPEG'" @dblclick="send(f)">
            <img :src="f.url">
          </div> 
          <div class="VSFileThumnail" v-else-if="f.ex == 'mp3' || f.ex == 'MP3'" @dblclick="send(f)" @click="playerOn(f)">
            <img src="@/assets/sample.png">
          </div>
          <div class="VSFolderThumnail" v-else-if="f.ex == 'dir'" @click="goToFolder(f.key)">
            <img src="@/assets/icons/white/folder.png">
          </div>

          <div class="VSFileDetailButton" @click="editName(f.name, f.key)">
            <img src="@/assets/icons/white/editing.png">
          </div>

          <div class="VSFileDelButton" @click="deleteFile(f.name, f.key)">
            <img src="@/assets/icons/white/trash_white.png">
          </div>

          <div class="VSFileName">
            <p>{{f.name}}</p>
          </div>

        </div> 

      </div> 
    </div>

    <div class="VSResPlayer" v-if="isPlayerOn == true">
      <div class="VSRNowPlay"><span>{{playName}}</span></div>
      <button class="VSRPlayerControl" @click="playerOff()">닫기</button>
      <audio class="VSRPlayerAudio" :src="playList" autoplay controls></audio>
    </div>
    <!-- 파일리스트는 리스트방식, 갤러리방식 두가지로 제공하고싶으니 파일 정보 불러올때 염두해주셈!! 미리 변수값이 있으면 좋겠음!! -->

  </div>
</template>

<script>
import ConfirmModal from '../../modal/ConfirmModal.vue'
import FileUploadModal from '../../modal/FileUploadModal.vue'
import InputModal from '../../modal/InputModal.vue'
import TypeModal from '../../modal/TypeModal.vue'
import storage from '../../../aws'
export default {
  name: 'V_side_resource',
  components : {
    ConfirmModal,
    FileUploadModal,
    InputModal,
    TypeModal
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
      folderPath : "/", // 현재 폴더 경로
      rootList : [], //root 폴더 리스트
      fileList : [],

      //업로드 관련
      files : [],

      //미리듣기 플레이어
      isPlayerOn : false,
      resListStatus : "VSResList",
      playList : "", //현재 재생중인 파일의 경로
      playName : "" // 현재 재생중인 파일의 이름
    }
  },
  methods : {
    //root에서 시작할때의 함수
    async getData() {
      console.log("해당 프로젝트의 파일 목록을 불러옴", this.pjCode);
      this.rootList = await storage.getUrlList(`Project/PJ${this.pjCode}/resource/`);
      console.log(this.rootList);
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

    // 새 폴더 생성
    createDir() {
      this.$refs.inputModal.show({
        msg : "폴더 이름을 입력해주세요.",
        size : "normal",
        type : "newFolder",
      })
    },
    async inputFolderName(val) {
      var path;
      if(this.folderPath == "/") {
        path = `Project/PJ${this.pjCode}/resource/`+val+'/';
      } else {
        path = `Project/PJ${this.pjCode}/resource/`+this.folderPath+val+'/';
      }
      
      console.log("새로운 폴더 생성", path);

      var result = await storage.createFolder(path);
      if(result=="ok") {
        if(this.folderPath == "/") {
          this.rootList = await storage.getUrlList(`Project/PJ${this.pjCode}/resource/`);
        } else {
          this.fileList = await storage.getUrlList(`Project/PJ${this.pjCode}/resource/${this.folderPath}`);
        }
      } else {
        console.error("폴더 생성 실패");
      }

    },

    // 파일 업로드 관련
    fileManagerOpen(folderPath) {
      this.$refs.fileUploadModal.show({
        size : "big",
        path : folderPath,
        pjCode : this.pjCode
      });
    },
    async uploadOk() {
      if(this.folderPath == "/") {
        this.rootList = await storage.getUrlList(`Project/PJ${this.pjCode}/resource/`);
      } else {
        this.fileList = await storage.getUrlList(`Project/PJ${this.pjCode}/resource/${this.folderPath}`);
      }
    },

    //폴더 및 파일 이름 변경 관련
    async editName(name, key) {
      this.$store.commit('opacityOn');
      this.$refs.inputModal.show({
        msg : "이름 변경",
        size : "normal",
        type : "rename",
        preName : name,
        key : key
      })
    },
    async inputNewName(data) {
      var path;
      if(this.folderPath == '/') {
        path = `Project/PJ${this.pjCode}/resource/`;
      } else {
        path = `Project/PJ${this.pjCode}/resource/${this.folderPath}`;
      }

      var result = await storage.editName(data.key, data.newName, path);
      if(result == "ok") {
        if(this.folderPath == "/") {
          this.rootList = await storage.getUrlList(`Project/PJ${this.pjCode}/resource/`);
        } else {
          this.fileList = await storage.getUrlList(`Project/PJ${this.pjCode}/resource/${this.folderPath}`);
        }
      } else {
        console.error("이름 변경 실패");
      }
    },


    // 파일 또는 폴더 삭제
    async deleteFile(name, key) {
      var fileType = name.split('.');
      if(fileType[1] == undefined) { //확장자가 없을 경우 폴더 삭제로 인식

        var resultD = await this.$refs.confirmModal.show({
          msg : `폴더 [${name}]를 삭제하시겠습니까? 폴더 내부 파일도 함께 삭제됩니다.`,
          size : "normal",
          btn1 : "확인",
          btn2 : "취소"
        });
        if(resultD == true) {
          var resD = await storage.deleteFolder(key);
          if(resD == "ok") {
            if(this.folderPath == "/") {
              this.rootList = await storage.getUrlList(`Project/PJ${this.pjCode}/resource/`);
            } else {
              this.fileList = await storage.getUrlList(`Project/PJ${this.pjCode}/resource/${this.folderPath}`);
            }
          } else {
            console.error("폴더 삭제 실패");
          }
        }

      } else { // 단일 파일 삭제일 경우
      
        var resultF = await this.$refs.confirmModal.show({
          msg : `파일 [${name}]를 삭제하시겠습니까?`,
          size : "normal",
          btn1 : "확인",
          btn2 : "취소"
        });
        if(resultF == true) {
          var resF = await storage.deleteFile(key);
          if(resF == "ok") {

            if(this.folderPath == "/") {
              this.rootList = await storage.getUrlList(`Project/PJ${this.pjCode}/resource/`);
            } else {
              this.fileList = await storage.getUrlList(`Project/PJ${this.pjCode}/resource/${this.folderPath}`);
            }
            
          } else {
            console.error("파일 삭제 실패");
          }
        }

      }

    },

    // 이전 경로로 돌아가기
    async back() {
      this.preFolderPath.splice(-1,1);
      if(this.preFolderPath.length == 1) { //루트에 도착했을 경우
        this.folderPath = this.preFolderPath[0];
        this.clickFolder = false;
        this.folderList = await storage.getDirList(`Project/PJ${this.pjCode}/resource/`);
      } else {
        this.folderPath = this.preFolderPath[this.preFolderPath.length-1];
        this.fileList = await storage.getUrlList(`Project/PJ${this.pjCode}/resource/${this.folderPath}`);
      }
    },

    // bgm 미리듣기
    playerOn(f) {
      this.isPlayerOn = true;
      this.resListStatus = 'VSResListOnPlayer';
      this.playName = f.name;
      this.playList = f.url;
    },
    playerOff() {
      this.isPlayerOn = false;
      this.resListStatus = 'VSResList';
    },

    send(data){
      if(data.ex=='mp3' || data.ex=='MP3'){
        this.$refs.typeModal.show({
          msg : "선택한 음성파일을 어떤 역할로 사용하시겠습니까?",
          size : "normal",
          data : data,
          option : {"효과음":'effect',
                    "배경음악":'bgm'}
        })
      }
      else{
        this.$refs.typeModal.show({
          msg : "선택한 사진을 어떤 역할로 사용하시겠습니까?",
          size : "normal",
          data : data,
          option : {"배경":'bg',
                    "이미지":'img'}
        })
      }
      
    },
    inputResource(data, type){
      this.$emit('send',{key:data.key, ex:data.ex, type:type})
      console.log(data , type)
    }
  },
  
}
</script>

<style>
.VSBackgroundRes {
  width: 100%;
  height: 100vh;
  color: white;
  position: relative;
}

.VSResList {
  position: relative;
  width: 100%;
  height: calc(100% - 80px);
  top: 80px;
  overflow: auto;
}

.VSResListOnPlayer {
  position: relative;
  width: 100%;
  height: calc(100% - 180px);
  top: 80px;
  overflow: auto;
}

.VSResPlayer {
  position: relative;
  width: calc(100% - 5px);
  top: 80px;
  height: 100px;
  background: #4f4f4f;
  border-radius: 25px;
}

.VSRPlayerControl {
  float: right;
  width: 40px;
  border-radius: 10px;
  background: #2872f9;
  border: none;
  color:white;
}

.VSRNowPlay {
  float:left
}

.VSResourceTool {
  width: 100%;
  height: 80px;
  position: absolute;
  background: #474747;
  border-radius: 0px 0px 10px 10px;
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
  top: 32px;
  height: 40px;
  padding: 7px;
  text-align: center;

  /* background: white; */
}

.VSResourceSubTitle {
  /* display: inline-block; */
  position: relative;
  top: -6px;
  width: 50%;
  margin-bottom: 5px;
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
  transition: all ease 0.2s;
}

.VSResourceButtons button:hover {
  background: #0084ff;
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
  /* cursor: pointer; */
  transition: all ease 0.2s;
}

.VSFolder:hover {
  height: 150px;
  background: #696969;
}

.VSFolder:hover .VSFolderDelButton {
  display: block;
}

.VSFolder:hover .VSFolderMoveButton {
  display: block;
}

.VSFolder:hover .VSFolderDetailButton {
  display: block;
}

.VSFolderMoveButton {
  position: absolute;
  left: 12px;
  top: 118px;
  width: 30px;
  height: 25px;
  background: #2872f9;
  border-radius: 10px;
  display: none;
  animation-name: delOpen;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  cursor: pointer;
}

.VSFolderMoveButton img{
  width: 60%;
  position: absolute;
  left: 6.2px;
  top: 3.5px;
}

.VSFolderMoveButton:hover {
  background: #0084ff;
}


.VSFolderDetailButton {
  position: absolute;
  left: 46px;
  top: 118px;
  width: 30px;
  height: 25px;
  background: #2872f9;
  border-radius: 10px;
  display: none;
  animation-name: delOpen;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  cursor: pointer;
}

.VSFolderDetailButton img{
  width: 50%;
  position: absolute;
  left: 8px;
  top: 5.4px;
}

.VSFolderDetailButton:hover {
  background: #0084ff;
}


.VSFolderDelButton {
  position: absolute;
  left: 80px;
  top: 118px;
  width: 30px;
  height: 25px;
  background: #2872f9;
  border-radius: 10px;
  display: none;
  animation-name: delOpen;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  cursor: pointer;
}

.VSFolderDelButton img{
  width: 60%;
  position: absolute;
  left: 5.5px;
  top: 3.5px;
}

.VSFolderDelButton:hover {
  background: #0084ff;
}


.VSFolderThumnail {
  position: relative;
  left: 12px;
  top: 10px;
  background: rgb(59, 59, 59);
  padding: 10px 10px 10px 13px;
  width: 80%;
  height: 80px;
  /* border: 3px rgb(59, 59, 59) solid; */
  border-radius: 10px;
  cursor: pointer;
}

.VSFolderThumnail:hover {
  opacity: 0.9;
}

.VSFolderThumnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.VSFolderName {
  position: relative;
  /* background: red; */
  left: 65px;
  top: 3px;
  transform: translate(-50%, 50%);
  width: 110px;
  height: 20px;
}

.VSFolderName p {
  width: 100%;
  height: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  word-break:break-all;
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
  cursor: pointer;
}

.VSFileReturn span{
  background: #2872f9;
  position: relative;
  height: 20px;
  left: 0px;
  top: 2px;
  white-space: nowrap;
  word-break:break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 6px;
  border-radius: 10px;
}

.VSFile {
  position: relative;
  display: inline-block;
  width: calc(50% - 10px);
  margin: 0px 5px 10px 5px;
  height: 120px;
  background: #5e5e5e;
  border-radius: 15px;
  /* cursor: pointer; */
  transition: all ease-out 0.2s;
}

.VSFile:hover .VSFileDelButton {
  display: block;
}

.VSFile:hover .VSFileMoveButton {
  display: block;
}

.VSFile:hover .VSFileDetailButton {
  display: block;
}

.VSFile:hover {
  height: 150px;
  background: #696969;
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
  cursor: pointer;
}

.VSFileThumnail:hover {
  opacity: 0.9;
}

.VSFileThumnail img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
}


.VSFileMoveButton {
  position: absolute;
  left: 12px;
  top: 118px;
  width: 30px;
  height: 25px;
  background: #2872f9;
  border-radius: 10px;
  display: none;
  animation-name: delOpen;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  cursor: pointer;
}

.VSFileMoveButton img{
  width: 60%;
  position: absolute;
  left: 6.2px;
  top: 3.5px;
}

.VSFileMoveButton:hover {
  background: #0084ff;
}


.VSFileDetailButton {
  position: absolute;
  left: 46px;
  top: 118px;
  width: 30px;
  height: 25px;
  background: #2872f9;
  border-radius: 10px;
  display: none;
  animation-name: delOpen;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  cursor: pointer;
}

.VSFileDetailButton img{
  width: 50%;
  position: absolute;
  left: 8px;
  top: 5.4px;
}

.VSFileDetailButton:hover {
  background: #0084ff;
}


.VSFileDelButton {
  position: absolute;
  left: 80px;
  top: 118px;
  width: 30px;
  height: 25px;
  background: #2872f9;
  border-radius: 10px;
  display: none;
  animation-name: delOpen;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  cursor: pointer;
}

.VSFileDelButton img{
  width: 60%;
  position: absolute;
  left: 5.5px;
  top: 3.5px;
}

.VSFileDelButton:hover {
  background: #0084ff;
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