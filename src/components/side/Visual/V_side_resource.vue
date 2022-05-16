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


    <div class="VSFolderList" v-if="clickFolder == false">
      폴더리스트

      <div class="VSFolder" v-for="(f, i) in folderList" :key="i" @click="this.currentFolder = f;">

        <div class="VSFolderThumnail"> 
          <img src="@/assets/sample.png">
        </div>

        <div class="VSFolderName">
          <p>{{f}}</p>
        </div>

      </div>

    </div>



    <div class="VSFileList" v-else>
      파일리스트

      <div class="VSFile" v-for="(f, i) in fileList" :key="i">

        <div class="VSFileThumnail" v-if="f.ex == 'mp3'">
          <img src="@/assets/sample.png">
        </div>
        <div class="VSFileThumnail" v-else>
          <img :src="f.url">
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

.VSFolderList {
  width: 100%;
  padding: 25px;
  /* background: white; */
}

.VSFolder {
  width: 100%;
  height: 160px;
  background: #5e5e5e;
  border-radius: 25px;
  margin-bottom: 15px;
}

.VSFolderThumnail {
  position: relative;
  left: 50%;
  top: 42%;
  background: rgb(59, 59, 59);
  width: 80%;
  height: 100px;
  transform: translate(-50%, -50%);
  border: 5px rgb(59, 59, 59) solid;
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
  top: 14px;
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
  padding: 25px;
}

.VSFile {
  width: 100%;
  height: 160px;
  background: #5e5e5e;
  border-radius: 25px;
  margin-bottom: 15px;
}

.VSFileThumnail {
  position: relative;
  left: 50%;
  top: 42%;
  background: rgb(59, 59, 59);
  width: 80%;
  height: 100px;
  transform: translate(-50%, -50%);
  border: 5px rgb(59, 59, 59) solid;
  border-radius: 10px;
}

.VSFileThumnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.VSFileName {
  position: relative;
  /* background: red; */
  left: 50%;
  top: 14px;
  transform: translate(-50%, 50%);
  width: 70%;
  border-radius: 10px;
}

.VSFileName p {
  width: 100%;
  height: 100%;
}
</style>