<template>
<ConfirmModal ref="confirmModal"></ConfirmModal>
<EpisodeModal ref="episodeModal"></EpisodeModal>
  <div class="VSBackgroundEpic">

    <div class="VSCoopTool">
      <div class="VSCoopTitle"><span>에피소드 목록</span></div>
      <div class="VSCoopButtons">
        <button @click="addEp()">추가</button>
        <button @click="this.delMode = !this.delMode"><span v-if="delMode">취소</span><span v-else>삭제</span></button>
        <button @click="addEp()">나가기</button>
      </div>
    </div>

    <div class="VSEpicList">
      <!-- 반복, 에피소드 하나 -->
      <div v-for="(ep, i) in epList" :key="i">
      <div :class="[{VSEpic_el:(epNum!=ep.ep)}, {VSEpic_el_select:(epNum==ep.ep)}]"> 
        <!-- 에피소드 회차 -->
        <div class="VSEpic_Index" @click="this.$emit('sendEp', ep)">
          <p>{{i+1}}</p>
        </div>

        <!-- 에피소드 명 -->
        <div class="VSEpic_Title" @click="this.$emit('sendEp', ep)"> 
          <p>{{ep.title}}</p>
        </div>

        <!-- 에피소드에 마지막으로 접근한 시간 -->
        <div class="VSEpic_RecentDate" @click="this.$emit('sendEp', ep)">
          <p>2022-01-01 01:00:00</p>
        </div>

        <!-- 해당 에피소드의 상태 -->
        <div class="VSEpic_destroy" v-if="delMode == true" @click="delEp(ep)">
          <p>삭제</p>
        </div>

        <div class="VSEpic_Status" v-if="delMode == false" @click="epModalOn(ep.ep)">
          <p>설정</p>
        </div>
      </div>
      <!-- 여기까지 반복 -->
      </div>
    </div>
    

  </div>
</template>

<script>
import EpisodeModal from '../../modal/EpisodeModal.vue'
import ConfirmModal from '../../modal/ConfirmModal.vue'
import axios from '../../../axios'
import storage from '../../../aws'
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  region : "ap-northeast-2",
  //추후 .env로 보안관리 할것
  accessKeyId: 'AKIARKU2Y4IXVCR266PO', // 사용자의 AccessKey
  secretAccessKey: 'YJDi8K4VSP5bPhdNcC6hB/xreuKH2885200KS+LB' // 사용자의 secretAccessKey
});
export default {
  name: 'V_side_episode',
  props : {
    pjCode : String,
    epNum : Number
  },
  components : {
    ConfirmModal,
    EpisodeModal
  },
  created() {
    this.delMode = false;
    this.getEpList()
  },
  data() {
    return {
      delMode : false,
      epList : []
    }
  },
  methods: {
    epModalOn() {
      this.$refs.episodeModal.show();
    },
    async getEpList(){
      this.epList = null
      this.epList = []
      let epExport = await storage.getEpList(`Project/PJ${this.pjCode}/dev/`)
      for(let i=0; i<epExport.length; i++){
        if(epExport[i].ex=="json"){
          var result = await storage.getVN(epExport[i].key)
          var uint8array = new TextEncoder("utf-8").encode(result)
          var VN = new TextDecoder().decode(uint8array)
          VN = await JSON.parse(VN)
          this.epList.push(VN)
        }
      }
    },
    async addEp(){
      let nextEp = await axios.post('/engine/pj/epUp',{pjCode:this.pjCode})
      nextEp = nextEp.data.rows[0].PROJ_NEXTEP
      let title = prompt("새로운 EP의 이름을 설정해주세요")
      var data = JSON.stringify({ // 프로젝트 기본 구조
            "id":this.pjCode,"title":title,"ep":nextEp, "img":"", "color":"default", "shape" : "default",
            "plotList":[{"plotName":"시작 플롯","nextPlot":0,"pages":[{"pageName":"일반 페이지","type":"n","bg":"","bgm":"","effect":"","name":"이름","text":"대화 및 내용","img":"","select":[{"use":true,"text":"1번 선택지","plot":0,"index":0},{"use":true,"text":"2번 선택지","plot":0,"index":0},{"use":true,"text":"3번 선택지","plot":0,"index":0}]}]}]
          });
      var fileName = `ep${nextEp}.json`
      var properties = {type:'text/plain'};
      var file = new File([data], fileName, properties); //새로운 파일 객체 생성

      const params = {
        Bucket: "vsnovel",
        Key : `Project/PJ${this.pjCode}/dev/` + file.name, // 저장되는 파일의 경로 및 이름
        Body : file // 파일
      }
      await s3.upload(params)
      .on("httpUploadProgress", evt => {
        this.percent = parseInt((evt.loaded * 100) / evt.total) + "%";
        if(this.percent == '100%') {
          setTimeout(() => this.percent = 0, 3000);
        }
        return parseInt((evt.loaded * 100) / evt.total) + "%";
      })
      .send((err, data)=>{
        if(err) {
          console.log("파일 업로드 실패");
          console.error(err);
          return "err"
        } else {
          console.log("파일 업로드 성공", data);
          this.getEpList() 
          return "ok"
        }
      })
    },
    async delEp(ep){
      var resultF = await this.$refs.confirmModal.show({
          msg : `에피소드 [${ep.title}]를 삭제하시겠습니까?`,
          size : "normal",
          btn1 : "확인",
          btn2 : "취소"
        });
        if(resultF == true) {
          var resF = await storage.deleteFile(`Project/PJ${this.pjCode}/dev/ep${ep.ep}.json`);
          if(resF == "ok") {
            await this.getEpList()
            if(ep.ep==this.epNum) 
              this.$emit('sendEp',null)
          } else {
            console.error("파일 삭제 실패");
          }
        }
    }
  }
}
</script>

<style>
.VSBackgroundEpic {
  width: 100%;
  height: 100%;
  animation-name: contentOn;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}
.VSEpicTool {
  width: 100%;
  height: 80px;
  position: relative;
  background: #474747;
  border-radius: 0px 0px 10px 10px;
  overflow: hidden;
}

.VSEpicList {
  width: 100%;
  padding: 20px;
}


.VSEpic_el {
  position: relative;
  width: 100%;
  height: 60px;
  border-radius: 20px;
  background: #585858;
  margin-bottom: 15px;
  padding: 10px;
  color: white;
  cursor: pointer;
  transition: 0.2s all ease;
}

.VSEpic_el_select {
  position: relative;
  width: 100%;
  height: 60px;
  border-radius: 20px;
  background: #6b6b6b;
  margin-bottom: 15px;
  padding: 10px;
  color: white;
  /* cursor: pointer; */
}


.VSEpic_Index {
  position: absolute;
  left: -6px;
  top: -6px;
  background: #2872f9;
  width: 25px;
  height: 25px;
  text-align: center;
  border-radius: 99px;
}

.VSEpic_Index p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.VSEpic_Title {
  position: absolute;
  left: 20px;
  top: 6px;
  background: #474747;
  width: calc(100% - 30px);
  height: 25px;
  text-align: center;
  border-radius: 99px;
}

.VSEpic_destroy {
  position: absolute;
  left: 185px;
  top: 35px;
  background: #ff4c4c;
  width: 60px;
  height: 20px;
  text-align: center;
  border-radius: 99px;
  font-size: 0.8em;
  cursor: pointer;
}

.VSEpic_RecentDate {
  position: absolute;
  left: 20px;
  top: 35px;
  background: #474747;
  width: 160px;
  height: 20px;
  text-align: center;
  border-radius: 99px;
  font-size: 0.8em;
}

.VSEpic_Status {
  position: absolute;
  left: 185px;
  top: 35px;
  background: #2872f9;
  width: 60px;
  height: 20px;
  text-align: center;
  border-radius: 99px;
  font-size: 0.8em;
  cursor: pointer;
}
</style>