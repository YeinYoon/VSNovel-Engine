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


    <div class="VSFolderList"> <!-- 폴더 리스트 --> <!-- if문 -->
      폴더리스트

      <div class="VSFolder"> <!-- 이걸 반복 --> <!-- for문 -->

        <div class="VSFolderThumnail"> <!-- 폴더 이미지는 데이터 없어도됨 -->
          <img src="@/assets/sample.png">
        </div>

        <div class="VSFolderName"> <!-- 폴더 이름 데이터 -->
          <p>폴더명</p>
        </div>

      </div> <!-- 여기까지 -->

    </div> <!-- 폴더리스트 끝 -->



    <div class="VSFileList"> <!-- 파일 리스트 --> <!-- if문 -->
      파일리스트

      <div class="VSFile"> <!-- 이걸 반복 -->

        <div class="VSFileThumnail"> <!-- 파일 이미지는 썸네일 필요. 단 이미지 파일 (png,jpeg,gif 만 썸네일, 그외엔 형식에 맞는 아이콘 표시) --> 
          <img src="@/assets/sample.png">
        </div>

        <div class="VSFileName"> <!-- 파일 이름 -->
          <p>파일명</p>
        </div>

      </div> <!-- 여기까지 -->

      <div class="VSFile"> <!-- 이걸 반복 -->

        <div class="VSFileThumnail"> <!-- 파일 이미지는 썸네일 필요. 단 이미지 파일 (png,jpeg,gif 만 썸네일, 그외엔 형식에 맞는 아이콘 표시) --> 
          <img src="@/assets/sample.png">
        </div>

        <div class="VSFileName"> <!-- 파일 이름 -->
          <p>파일명</p>
        </div>

      </div> <!-- 여기까지 -->

      <div class="VSFile"> <!-- 이걸 반복 -->

        <div class="VSFileThumnail"> <!-- 파일 이미지는 썸네일 필요. 단 이미지 파일 (png,jpeg,gif 만 썸네일, 그외엔 형식에 맞는 아이콘 표시) --> 
          <img src="@/assets/sample.png">
        </div>

        <div class="VSFileName"> <!-- 파일 이름 -->
          <p>파일명</p>
        </div>

      </div> <!-- 여기까지 -->

    </div> <!-- 폴더 내부 리스트 끝 -->

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
      bg : null,
      bgm : null,
      img : null
    }
  },
  methods : {
    async getData() {
      console.log("해당 프로젝트의 리소스 파일을 불러옴", this.pjCode);
      this.bg = await storage.getUrlList(`Project/PJ${this.pjCode}/bg/`);
      this.bgm = await storage.getUrlList(`Project/PJ${this.pjCode}/bgm/`);
      this.img = await storage.getUrlList(`Project/PJ${this.pjCode}/img/`);

      console.log("bg : ", this.bg);
      console.log("bgm : ", this.bgm);
      console.log("img : ", this.img)
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