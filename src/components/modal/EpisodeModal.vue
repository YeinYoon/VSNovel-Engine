<template>
<div v-if="EPModalState">

  <div class="modal_opacity">
  </div>

  <div class="EPmodal_frame">
    <div class="EPmodal_inner">
      <p class="EPmodal_title">에피소드 정보 관리</p>

      <div class="EPmodal_EpsiodeName_frame">
        <p class="EPmodal_EPtitle">제목</p>
        <input type="text" v-model="title">
      </div>

      <div class="EPmodal_Epsiodegenre_frame">
        <p class="EPmodal_EPgenre">장르</p>
        <select class="EPmodal_EPgenre_select"> 
          <option>스릴러</option>
          <option>로맨스</option>
          <option>공포</option>
          <option>추리</option>
          <option>판타지</option>
          <option>과학</option>
          <option>무협</option>
          <option>게임</option>
          <option>서브컬쳐</option>
          <option>동화</option>
          <option>드라마</option>
          <option>기타</option>
        </select>
      </div>

      <!-- <div class="EPmodal_Img_frame">
        <p class="EPmodal_EPimg">표지</p>
        <button class="EPmodal_EPimg_btn">업로드</button>
      </div> -->

      <div class="EPmodal_exportSetting">
        <p class="EPmodal_ex_title">스토어 출품 설정</p>
        <button class="EPmodal_epicExport" @click="this.releaseState = true">이 에피소드 발행</button>
      </div>

      <div class="EPmodal_momodal" v-if="releaseState">
        <p class="EPmodal_ex_title">새로운 회차 [ {{this.title}} ]을(를) 스토어에 발행하시겠습니까?</p>
        <button @click="releaseEP()">발행하기</button>
        <button @click="this.releaseState = false">취소</button>
      </div>

      <div class="EPmodal_functions">
        <button class="EPmodal_saveInfo" @click="epTitleSave()">저장</button>
        <button class="EPmodal_cancelInfo" @click="modalClose()">취소</button>
      </div>

    </div>
  </div>


</div> 
</template>

<script>
import axios from '../../axios'
// import storage from '../../aws'
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  region : "ap-northeast-2",
  //추후 .env로 보안관리 할것
  accessKeyId: 'AKIARKU2Y4IXVCR266PO', // 사용자의 AccessKey
  secretAccessKey: 'YJDi8K4VSP5bPhdNcC6hB/xreuKH2885200KS+LB' // 사용자의 secretAccessKey
});
export default {
  name : "FileMoveModal",
  data() {
    return {
      // 모달 데이터
      EPModalState : false,
      modalSize : "",
      pjCode : "",
      ep : null,

      releaseState : false,
      title : null,

    }
  },
  methods : {
    modalClose() {
      this.EPModalState = false;
    },
    show(ep) {
      this.EPModalState = true;
      this.ep = ep;
      this.pjCode = ep.id;
      this.title = ep.title;
      console.log(this.ep);
    },

    async epTitleSave() {
      this.ep.title = this.title;
      var data = JSON.stringify(this.ep);
      var fileName = `ep${this.ep.ep}.json`
      var properties = {type:'text/plain'};
      var file = new File([data], fileName, properties); //새로운 파일 객체 생성

      const params = {
        Bucket: "vsnovel",
        Key : `Project/PJ${this.pjCode}/dev/` + file.name, // 저장되는 파일의 경로 및 이름
        Body : file // 파일
      }
      await s3.upload(params)
      .on("httpUploadProgress", evt => {
        return parseInt((evt.loaded * 100) / evt.total) + "%";
      })
      .send((err, data)=>{
        if(err) {
          console.log("파일 업로드 실패");
          console.error(err);
          return "err"
        } else {
          console.log("파일 업로드 성공", data);
          this.releaseState = false;
          this.modalClose();
          return "ok"
        }
      })
    },

    async releaseEP() {
      
      // tbl_novel에 등록되지 않은 프로젝트일 경우 최초 등록 진행
      axios.post('/engine/pj/findPjStore', {pjCode : this.pjCode})
      .then((result)=>{
        if(result.data.msg == "notExist") {
          var data = {
            pjCode : this.pjCode,
            novelTitle : result.data.novelTitle,
            novelSynopsis : result.data.novelSynopsis
          }
          axios.post('/engine/pj/addNewNovel', data)
          .then((result)=>{
            if(result.data == "err") {
              console.log("스토어 최초 노벨 등록 실패");
            } else {
              console.log(`프로젝트 코드 : ${this.pjCode} 스토어 등록 완료`);
            }
          })
        } else { // 이미 등록되어있는 프로젝트일 경우 최신 회차 갱신일 업데이트
          axios.post('/engine/pj/releaseDateUp', {pjCode : this.pjCode})
          .then((result)=>{
            if(result.data == "err") {
              console.log("소설 회차 갱신일 업데이트 실패");
            } else {
              console.log("소설 회차 갱신일 업데이트 완료");
            }
          })
        }
      });

      this.ep.title = this.title;
      var data = JSON.stringify(this.ep);
      var fileName = `ep${this.ep.ep}.json`
      var properties = {type:'text/plain'};
      var file = new File([data], fileName, properties); //새로운 파일 객체 생성

      const params = [
        {
          Bucket: "vsnovel",
          Key : `Project/PJ${this.pjCode}/episode/` + file.name,
          Body : file // 파일
        },
        {
          Bucket: "vsnovel",
          Key : `Project/PJ${this.pjCode}/dev/` + file.name, 
          Body : file // 파일
        },
      ]

      for(var i=0; i<params.length; i++) {

        await s3.upload(params[i])
        .on("httpUploadProgress", evt => {
          return parseInt((evt.loaded * 100) / evt.total) + "%";
        })
        .send((err, data)=>{
          if(err) {
            console.log("파일 업로드 실패");
            console.error(err);
            return "err"
          } else {
            console.log("파일 업로드 성공", data);
            return "ok"
          }
        })

      }

      this.releaseState = false;
      this.modalClose();
      this.$store.commit("gModalOn", {size : "normal", msg : "새로운 회차가 스토어에 발행되었습니다."});
    }
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

.EPmodal_Epsiodegenre_frame{
  position: absolute;
  top: 55px;
  width: 100%;
  /* background: white; */
  height: 40px;
  text-align: center;
}

.EPmodal_EPgenre {
  position: relative;
  display: inline-block;
}

.EPmodal_EPgenre_select {
  position: relative;
  width: 100px;
  height: 40px;
  border-radius: 15px;
  margin-left: 10px;
}

.EPmodal_momodal {
  position: absolute;
  text-align: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 120px;
  z-index: 100;
  background: #535353;
  border-radius: 15px;
  padding-top: 40px;
  animation-duration: 0.7s;
  animation-name: EPopening;
}

.EPmodal_momodal button {
  border: none;
  border-radius: 15px;
  width: 100px;
  height: 30px;
  background: #2872f9;
  color: white;
  margin: 10px;
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
  top: 130px;
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

