<template v-if="!!Now">
  <div class="ViewerBackground">

    <!-- 백그라운드 -->
    <div class="SceneBackground">
      <img v-if="Now.bg!='' && Now.bg != undefined" :src="this.currentBg"/>
    </div>
    <!-- 백그라운드 끝. -->


    <!-- 선택지 --> 
    <div class="SceneSelectBackground" v-if="status == 'select'">
      <div class="SceneSelectFrame">
        <label for="s1">
        <div v-if="selectEdit" class="SelectButton" contenteditable="true" id="s1" ref="cngs1">
          {{s1.text}}
        </div>
        <div v-else class="SelectButton" @click="select(s1.plot, s1.index)" id="s1">
          {{s1.text}}
        </div>
        </label>
        <div class="SelectVisibleButton" v-if="s1.use" @click="s1.use=!(s1.use)"><img src="@/assets/icons/white/checked.png"></div>
        <div class="SelectVisibleButtonDisable" v-if="!s1.use" @click="s1.use=!(s1.use)"><img src="@/assets/icons/white/close.png"></div>
        <label for="s2">
        <div v-if="selectEdit" class="SelectButton" contenteditable="true" id="s2" ref="cngs2">
          {{s2.text}}
        </div>
        <div v-else class="SelectButton" @click="select(s2.plot, s2.index)" id="s2">
          {{s2.text}}
        </div>
        </label>
        <div class="SelectVisibleButton" v-if="s2.use" @click="s2.use=!(s2.use)"><img src="@/assets/icons/white/checked.png"></div>
        <div class="SelectVisibleButtonDisable" v-if="!s2.use" @click="s2.use=!(s2.use)"><img src="@/assets/icons/white/close.png"></div>
        <label for="s3">
        <div v-if="selectEdit" class="SelectButton" contenteditable="true" id="s3" ref="cngs3">
          {{s3.text}}
        </div>
        <div v-else class="SelectButton" @click="select(s3.plot, s3.index)" id="s3">
          {{s3.text}}
        </div>
        </label>
        <div class="SelectVisibleButton" v-if="s3.use" @click="s3.use=!(s3.use)"><img src="@/assets/icons/white/checked.png"></div>
        <div class="SelectVisibleButtonDisable" v-if="!s3.use" @click="s3.use=!(s3.use)"><img src="@/assets/icons/white/close.png"></div>

        <div class="SelectEditingButton">
          <img src="@/assets/icons/white/editing.png" v-if="selectEdit == false" @click="this.selectEdit = true;">
          <img src="@/assets/icons/white/checked.png" v-else @click="saveSelect()">
        </div>
      </div>
    </div>
    <!-- 선택지 끝. -->

    <!-- 일시정지(PAUSE) 메뉴 -->
    <div class="ScenePauseBackground" v-if="status == 'pause'">
      <div class="VisualNovelLabel">
        <div class="VisualNovelIcon"><img src="@/assets/sample.png"></div>
        <span class="VisualNovelName">소설 제목</span>
      </div>

      <div class="PauseMenusFrame">
        <div class="PauseMenuButtonPosition">
          <div class="PauseMenuButton">
            <span><img src="@/assets/icons/white/editing.png"></span>
          </div>

          <div class="PauseMenuButton">
            <span><img src="@/assets/icons/white/gear.png"></span>
          </div>

          <div class="PauseMenuButton">
            <span><img src="@/assets/icons/white/redo.png"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 일시정지(PAUSE) 메뉴 끝. -->


    <!-- 저장 슬롯 메뉴 -->
    <div class="SceneSaveBackground" v-if="status == 'save'">
      <span>저장</span>
      <div class="SaveSlotsFrame">
        <div class="SaveSlot"></div>
        <div class="SaveSlot"></div>
        <div class="SaveSlot"></div>
      </div>
    </div>
    <!-- 저장 슬롯 메뉴 끝. -->


    <!-- 좌측 상단 햄버거메뉴 -->
    <div class="ViewerNav">
      <div class="NavItems" title="서버 비주얼 노벨 다운로드" v-if="isDownload == false">
        <img src="@/assets/icons/white/downcloud.png" @click="getVN()">
      </div>
      <div class="NavItems" v-else-if="isDownload == true">
        <img src="@/assets/icons/file_ok.png">
      </div>

      <div class="NavItems" title="저장" v-if="isUpload == false">
        <img src="@/assets/icons/white/upcloud.png" @click="uploadVN()">
      </div>
      <div class="NavItems" v-else-if="isUpload == true && percent == '100%'">
        <img src="@/assets/icons/file_ok.png">
      </div>
      <div v-else>
        {{percent}}%
      </div>
    </div>
    <!-- 좌측 상단 햄버거메뉴 -->

    <!-- 우측 상단 햄버거메뉴 -->
    <div class="ViewerNavRight">
      <div class="NavItems" v-if="bgmState == false" @click="bgmOn(),effectOn()">
        <img src="@/assets/icons/white/speaker-disable_white.png">
      </div>
      <div class="NavItems" v-else-if="bgmState == true" @click="bgmOff(),effectOff()">
        <img src="@/assets/icons/white/speaker_white.png">
      </div>
      <div class="NavItems" @click="resCtrl = !resCtrl">
        <img src="@/assets/icons/white/trash_white.png">
      </div>
    </div>
    <!-- 우측 상단 햄버거메뉴 --> 


    <!-- 리소스 관리 메뉴 -->
    <div class="ResControl" v-if="resCtrl">
      <div class="ResControl_img">
        <div class="ResControl_img_thum"><img v-if="currentBg" :src="currentBg"><img v-else src="@/assets/imgs/e_no_image.png"></div>
        <div class="ResControl_img_title">배경화면</div>
        <div class="ResControl_btn">
          <button @click="setResource('','bg')"><img src="@/assets/icons/white/trash_white.png"></button>
        </div>
      </div>
      <div class="ResControl_img">
        <div class="ResControl_img_thum"><img v-if="currentImage" :src="currentImg"><img v-else src="@/assets/imgs/e_no_image.png"></div>
        <div class="ResControl_img_title">이미지</div>
        <div class="ResControl_btn">
          <button @click="setResource('','bg')"><img src="@/assets/icons/white/trash_white.png"></button>
        </div>
      </div>
      <div class="ResControl_mu">
        <div class="ResControl_mu_thum"><img src="@/assets/icons/music.png"></div>
        <div class="ResControl_mu_title">배경음악</div>
        <div class="ResControl_btn_mu">
          <button @click="setResource('','bg')"><img src="@/assets/icons/white/trash_white.png"></button>
          <button @click="setResource('none','bg')"><img src="@/assets/icons/white/trash_white.png"></button>
        </div>
      </div>
      <div class="ResControl_mu">
        <div class="ResControl_mu_thum"><img src="@/assets/icons/music.png"></div>
        <div class="ResControl_mu_title">효과음</div>
        <div class="ResControl_btn_mu">
          <button @click="setResource('','bg')"><img src="@/assets/icons/white/trash_white.png"></button>
        </div>
      </div>
    </div>
    <!-- 리소스 관리 메뉴 -->



    <!-- 이미지 -->
    <div class="SceneImg">
      <img :src="currentImg" v-if="Now.img!=''"/>
    </div>
    <!-- 이미지 끝. -->

    <!-- 대사 -->
    <div class="SceneScriptFrame">
      
      <!-- 대사창 배경-->
      <div class="ScriptBackground"></div>

      <!-- 화자 -->
      <div class="ScriptEditingButton">
        <img src="@/assets/icons/white/editing.png" v-if="textEdit == false" @click="textEdit = true;">
        <img src="@/assets/icons/white/checked.png" v-else @click="saveText()">
      </div>

      <label for="name">
        
        <div v-if="textEdit" class="SceneSpeakerName" contenteditable="true">
          <span id="name" ref="cngName">{{ Now.name }}</span>
        </div>
        <div v-else class="SceneSpeakerName">
          <span id="name">{{Now.name}}</span>
        </div>
          
      </label>

      <!-- 대사 -->  
      <label for="text">
        <div v-if="textEdit" class="SceneScript" contenteditable="true">
          <span id="text" ref="cngText">{{ Now.text }}</span>
        </div>
        <div v-else class="SceneScript">
          <span id="text">{{ Now.text }}</span>
        </div>
      </label>

      <!-- 다음 대사 버튼 -->
      <div class="NextScriptButton" v-if="status!='end'" @click="nextScene">
        <button>▶</button>
      </div>
      <div v-else class="NextScriptButton">
        <button>End</button>
      </div>

    </div>
    <!-- 대사 끝 -->

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
import {Howl} from 'howler';
import storage from '../../../aws'
import axios from '../../../axios'
export default {
  props:{
    index:Number,
    plot:String,
    VN:Object,
    status:String
  },
  name : "VDevBoard",
  created() {
    this.pjCode = this.$route.params.pjCode;
    this.getPjInfo(this.pjCode);
  },
  data() {
    return {
      pjType : "",
      pjCode : "",
      title : "",
      retouchDate : "",
      stat : "",
      textEdit : false,
      selectEdit : false,
      Now: {},
      s1:{},
      s2:{},
      s3:{},
      resCtrl: false,
      bgmState : false,
      currentBgm : "",
      currentEffect : "",
      bgmId : "",
      effectId : "",
      currentImg : "",
      currentBg : "",

      bgmController : null,
      effectController : null,

      isUpload : false,
      isDownload : false,
      percent : 0,
    }
  },
  methods : {
    //해당 프로젝트 정보 가져오기
    getPjInfo() {
      axios.post('/engine/pj/getPjInfo', {pjCode : this.pjCode})
      .then((result)=>{
        if(result.data == "err") {
          this.$store.commit('gModalOn', "프로젝트 정보를 불러오는데 실패했습니다.", "normal");
        } else {
          this.title = result.data.PROJ_TITLE;
          this.retouchDate = result.data.PROJ_RETOUCHDATE;            
          this.stat = result.data.PROJ_STATUS;
          this.pjType = result.data.PROJ_TYPE;
          this.loadData()
        }
      })
      .catch((err)=>{
        console.error("GetPjInfo : Error\n"+err);
      })
    },
    //현재 JSON 파일 업로드
    async uploadVN() {
      this.isUpload = true;

      var data = JSON.stringify(this.VN);
      var fileName = `PJ${this.pjCode}.json`
      var properties = {type:'text/plain'};
      var file = new File([data], fileName, properties); //새로운 파일 객체 생성

      const params = {
        Bucket: "vsnovel",
        Key : `Project/PJ${this.pjCode}/` + file.name, // 저장되는 파일의 경로 및 이름
        Body : file // 파일
      }
      s3.upload(params)
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
          return "ok"
        }
      })      
    },
    async getVN() {
      this.isDownload = true;
      var result = await storage.getVN(`Project/PJ${this.pjCode}/PJ${this.pjCode}.json`); // unit8array(utf16) 형식으로 데이터를 읽어옴
      if(result != "err") {
        var uint8array = new TextEncoder("utf-8").encode(result); // utf8 형식으로 변환
        var string = new TextDecoder().decode(uint8array);
        this.$emit('changeVN',JSON.parse(string));
      }
    },
    saveText() {
      let temp = this.VN
      temp.plotList[this.plot].pages[this.index].name=this.$refs.cngName.innerHTML
      temp.plotList[this.plot].pages[this.index].text=this.$refs.cngText.innerHTML
      this.$emit('changeVN',temp)
      this.textEdit = false;          
      this.loadData()
    },
    saveSelect(){
      let temp = this.VN
      console.log(this.$refs.cngs1.innerHTML)
      temp.plotList[this.plot].pages[this.index].select[0].text = this.$refs.cngs1.innerHTML
      temp.plotList[this.plot].pages[this.index].select[1].text = this.$refs.cngs2.innerHTML
      temp.plotList[this.plot].pages[this.index].select[2].text = this.$refs.cngs3.innerHTML
      this.$emit('changeVN',temp)
      this.selectEdit = false;
    },
    loadData: async function () {
      if(this.VN.plotList[this.plot].pages[this.index] != undefined){
        this.Now=this.VN.plotList[this.plot].pages[this.index];
        console.log(this.Now)
        if(this.Now.bgm != '') {
          this.currentBgm = await storage.getUrl(this.Now.bgm);
        }
        else if(this.Now.bgm=='none'){
          this.bgmController.stop()
        }
        if(this.Now.effect != '') {
          this.currentEffect = await storage.getUrl(this.Now.effect);
        }
      }
    },              
    nextScene: function () {
      if(this.VN.plotList[this.plot].pages[this.index].type=='n') {
        this.move();
      }else if(this.VN.plotList[this.plot].pages[this.index].type=='e'){
        this.$emit('changeStatus',"end")
      }else {
        console.log(this.VN.plotList[this.plot].pages[this.index])
        this.s1=this.VN.plotList[this.plot].pages[this.index].select[0];
        this.s2=this.VN.plotList[this.plot].pages[this.index].select[1];
        this.s3=this.VN.plotList[this.plot].pages[this.index].select[2];
        this.$emit("changeStatus","select")
      }
    },
    move: function(){
      if(this.VN.plotList[this.plot].pages.length==this.index+1) this.$emit('move',{plot:this.VN.plotList[this.plot].nextPlot,index:0})
      else this.$emit('move',{plot:this.plot,index:this.index+1})
    },
    select:function(plot,index){
      if(!this.selectEdit){
        this.$emit('changeStatus','play')
        this.$emit('move',{plot,index})
      }
    },
    noImage(event){
      event.target.src="@/assets/imgs/e_no_image.png"
    },
    //BGM 관련
    bgmOn() {
      console.log('BGM : ' + this.currentBgm);
      this.bgmState = true;
      this.bgmController = new Howl({
        src: [this.currentBgm],
        volume: 1.0,
        loop : true,
        preload : true,
        onend: ()=>{console.log("BGM END")}
      });
      this.bgmController.play();
    },
    bgmOff() {
      this.bgmState = false;
      this.bgmController.stop();
    },

    //효과음 관련
    effectOn() {
      console.log('effect : ' + this.currentEffect);
      this.bgmState = true;
      this.effectController = new Howl({
        src: [this.currentEffect],
        volume : 1.0,
        loop : false,
        preload : true,
        onend: ()=>{console.log("EFFECT END")}
      })
      this.effectController.play();
    },
    effectOff() {
      this.bgmState = false;
      this.effectController.stop();
    },
    setResource(value, attr){
      let temp = this.VN
      temp.plotList[this.plot].pages[this.index][attr]=value
      this.$emit("changeVN",temp)
    }
  },  
  watch : {
    $route() {
      this.getPjInfo(this.pjCode);
      if(this.bgmController != null) {
        this.bgmController.stop();
      }
      if(this.effectController != null) {
        this.effectController.stop();
      }
    },
    percent(cng) {
      if(cng == '100%') {
        setTimeout(() => this.isUpload = false, 3000);
      }
    },
    isDownload(cng) {
      if(cng == true) {
        setTimeout(() => this.isDownload = false, 3000);
      }
    },

    index: function(){
      this.loadData()
    },
    plot: function(){
      this.loadData()
    },
    VN:{
      deep:true,
      handler(){
        this.loadData()
      }
    },
    Now : {
      deep:true,
      async handler(){
        var checkArr = [{bg : this.Now.bg}, {img : this.Now.img}, {bgm : this.Now.bgm}, {effect : this.Now.effect}];
        var existKey = checkArr.filter(item => item.bg != '' && item.img != '' && item.bgm != '' && item.effect != '');
        if(existKey.length == 0) {
          this.currentBg = ''
          this.currentImg = ''
          this.currentBgm = ''
          this.currentEffect = ''
        } else {

          for(var i=0; i<existKey.length; i++) {
            var x = Object.keys(existKey[i]);
            console.log(x);
            switch(x[0]) {
              case 'bg' :
                this.currentBg = await storage.getUrl(this.Now.bg);
                break;
              case 'bgm' :
                if(this.bgmState == true) {
                  console.log(this.Now.bgm);
                  this.bgmOff();
                  this.currentBgm = await storage.getUrl(this.Now.bgm);
                  this.bgmOn();
                } else {
                  console.log(this.Now.bgm);
                  this.currentBgm = await storage.getUrl(this.Now.bgm);
                }
                break;
              case 'img' :
                this.currentImg = await storage.getUrl(this.Now.img);
                break;
              case 'effect' :
                if(this.bgmState == true) {
                  this.effectOff();
                  this.currentEffect = await storage.getUrl(this.Now.effect);
                  this.effectOn();
                } else {
                  console.log(this.Now.effect);
                  this.currentEffect = await storage.getUrl(this.Now.effect);
                }
                break;
            }

          }
        }
      }
    },
    // currentBgm(cng, pre) {
    //   console.log(pre + " -> ", cng);
    // }
  },
}
</script>

<style>
label {
  display: block;
}
.ViewerBackground {
  background: #5e5e5e;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.SceneBackground {
  position: absolute;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.ScenePauseBackground {
  position: absolute;
  z-index: 9;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
}

.VisualNovelLabel {
  position: absolute;
  top: 0px;
  width: 50%;
  height: 100%;
  /* background: rgba(34, 34, 34, 0.7); */
  z-index: 10;
}

.VisualNovelIcon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 10%);
  height: calc(100% - 10%);
  border-radius: 20px;
  /* background: white; */
}

.VisualNovelIcon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.VisualNovelName {
  position: absolute;
  left: 100%;
  top: calc(0% + 40px);
  transform: translate(0, -50%);
  width: 200px;
  height: 40px;
  color: white;
  font-size: 1.5em;
}

.PauseMenusFrame {
  position: absolute;
  top: 0px;
  left: 50%;
  width: 50%;
  height: 100%;
  /* background: white; */
}

.PauseMenuButtonPosition {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  /* height: 80px; */
}

.PauseMenuButton {
  display: inline-table;
  width: 25%;
  margin: 0px 1.5% 0px 1.5%;
  height: 80px;
  border-radius: 20px;
  background: #2872f9;
  cursor: pointer;
}
.PauseMenuButton span {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
  font-size: 1.2em;
  padding: 20px;
}
.PauseMenuButton span img {
  width: 90%;
}

.SceneSaveBackground {
  position: absolute;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.SceneSaveBackground {
  color: white;
  font-size: 1.8em;
  position: fixed;
}

.SaveSlotsFrame {
  position: absolute;
  width: 70%;
  height: 60%;
  padding: 40px;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  background: rgba(134, 134, 134, 0.9);
  border-radius: 15px;
}

.SaveSlot {
  display: inline-block;
  width: calc(33% - 45px);
  margin: 15px;
  height: calc(100% - 30px);
  background: rgb(212, 212, 212);
  border-radius: 15px;
}

.SceneBackground img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.SceneSelectBackground {
  position: absolute;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.SceneSelectFrame {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 50%;
  z-index: 10;
}
.SelectButton {
  position: relative;
  display: inline-block;
  width: 80%;
  height: 100px;
  background: #2872f9;
  box-shadow: 0px 0px 10px #252525;
  border-radius: 50px;
  margin: 10px 0px 10px 0px;
  cursor: pointer;
  overflow: hidden;
}

.SelectButton span {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  white-space: normal;
  word-break: keep-all;
}

.ViewerNav {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 89;
}

.NavItems{
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin: 2px;
  display: table;
  transition: background-color 0.3s ease-out 100ms;
  cursor: pointer;
}

.NavItems:hover {
  background: #2872f9;
  transition: 0.3s;
}

.NavItems img{
  margin: 10px;
  height: 30px;
}

.ViewerNavRight {
  position: absolute;
  left: calc(100% - 65px);
  top: 10px;
  z-index: 89;
}

.ResControl {
  position: absolute;
  left: calc(100% - 243px);
  top: 120px;
  z-index: 89;
  width: 230px;
  height: 270px;
  background: #4b4b4b;
  border-radius: 10px;
  padding: 15px;
  /* text-align: center; */

}

.ResControl_img {
  display: inline-block;
  width: 100%;
  height: 70px;
  background: #818181;
  padding-left: 15px;
  border-radius: 10px;
  overflow: hidden;
}

.ResControl_img_thum {
  display: inline-block;
  position: relative;
  top: 8px;
  left: -5px;
  width: 50px;
  background: #0084ff;
  object-fit: cover;
  border-radius: 10px;
  overflow: hidden;
}

.ResControl_img_thum img{
  width: 50px;
}

.ResControl_img_title {
  display: inline-block;
  position: relative;
  top: -35px;
  left: 52px;
  width: 73px;
  font-size: 0.8em;
  text-align: right;
}

.ResControl_mu {
  display: inline-block;
  width: 100%;
  height: 40px;
  background: #818181;
  overflow: hidden;
  padding-left: 15px;
  border-radius: 10px;
}

.ResControl_mu_thum {
  display: inline-block;
  position: relative;
  top: 7px;
  left: -5px;
  width: 25px;
  background: #0084ff;
  object-fit: cover;
  border-radius: 10px;
  overflow: hidden;
}

.ResControl_mu_thum img{
  width: 25px;
}

.ResControl_mu_title {
  display: inline-block;
  position: relative;
  top: -3px;
  left: 2px;
  width: 73px;
  font-size: 0.8em;
  text-align: left;
}

.ResControl_btn {
  position: relative;
  top: -25px;
  left: 115px;
}

.ResControl_btn button {
  display: inline-block;
  border-radius: 10px;
  border: none;
  background: #2872f9;
  color: white;
  width: 29px;
  height: 29px;
  object-fit: cover;
  margin-left: 2px;
}
.ResControl_btn button img {
  position: relative;
  left: 0px;
  top: 0px;
  width: 15px;
}

.ResControl_btn_mu {
  position: relative;
  top: -27px;
  left: 115px;
}

.ResControl_btn_mu button {
  display: inline-block;
  border-radius: 10px;
  border: none;
  background: #2872f9;
  color: white;
  width: 29px;
  height: 29px;
  object-fit: cover;
  margin-left: 2px;
}
.ResControl_btn_mu button img {
  position: relative;
  left: 0px;
  top: 0px;
  width: 15px;
}



.SceneImg {
  position: absolute;
  left: 50%;
  top: 60%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.SceneImg img {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  object-fit: contain;
}

.SceneScriptFrame {
  position: absolute;
  left: 50%;
  top: calc(100% - 80px);
  transform: translate(-50%, -50%);
  width: 90%;
  height: 50%;
  z-index: 2;
}

.ScriptEditingButton {
  position: absolute;
  left: calc(100% - 60px);
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin: 10px;
  background: #4b4b4b;
  transition: all ease 0.2s;
  cursor: pointer;
  opacity: 0.8;
}

.ScriptEditingButton:hover {
  background: #0084ff;
  opacity: 1;
}

.ScriptEditingButton img {
  position: absolute;
  width: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-44%, -50%);
}

.SelectEditingButton {
  position: absolute;
  left: calc(50% - 55px);
  width: 100px;
  height: 50px;
  border-radius: 10px;
  margin: 10px;
  background: #868686;
  transition: all ease 0.2s;
  cursor: pointer;
  opacity: 0.8;
}

.SelectEditingButton:hover {
  background: #0084ff;
  opacity: 1;
}

.SelectEditingButton img {
  position: absolute;
  width: 30%;
  left: 50%;
  top: 50%;
  transform: translate(-44%, -50%);
}

.SelectVisibleButton {
  position: absolute;
  left: calc(0% - 35px);
  transform: translate(0%, -300%);
  width: 30px;
  height: 30px;
  border-radius: 10px;
  margin: 10px;
  background: #0084ff;
  transition: all ease 0.2s;
  cursor: pointer;
  opacity: 0.8;
}

.SelectVisibleButton:hover {
  background: #868686;
  opacity: 1;
}

.SelectVisibleButton img {
  position: absolute;
  width: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-47%, -50%);
}

.SelectVisibleButtonDisable {
  position: absolute;
  left: calc(0% - 35px);
  transform: translate(0%, -300%);
  width: 30px;
  height: 30px;
  border-radius: 10px;
  margin: 10px;
  background: #ff4c4c;
  transition: all ease 0.2s;
  cursor: pointer;
  opacity: 0.8;
}

.SelectVisibleButtonDisable:hover {
  background: #868686;
  opacity: 1;
}

.SelectVisibleButtonDisable img {
  position: absolute;
  width: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}



.ScriptToolBar {
  position: absolute;
  height: 40px;
  left: calc(100% - 250px);
  top: 10px;
}

.ToolBarEl {
  position: relative;
  display: inline;
  width: 10%;
  margin: 0px 1.5px 1.5px 0px;
  padding: 3px;
  cursor: pointer;
  color: rgb(172, 172, 172);
}

.ScriptBackground {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 40%,
    rgba(0, 0, 0, 0) 100%
  );
  border-radius: 20px;
  opacity: 0.9;
  box-shadow: 0px 0px 10px #252525;
}

.SceneSpeakerName {
  position: absolute;
  left: -10px;
  top: -20px;
  width: 200px;
  height: 60px;
  background: rgb(75, 147, 255);
  display: table;
  border-radius: 25px;
  box-shadow: 0px 0px 10px #252525;
}

.SceneSpeakerName span {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 1.3em;
  color: white;
}

.SceneScript {
  position: absolute;
  left: 0px;
  top: 60px;
  width: calc(100% - 40px);
  height: calc(100% - 200px);
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
  /* display: table; */
}

.SceneScript span {
  display: table-cell;
  color: white;
  text-align: left;
  overflow: hidden;
  font-size: 1.5em;
}

/* 반응형 레이아웃 for 모바일 */
@media ( max-width: 800px ) {
.SceneSpeakerName {
  position: absolute;
  left: -10px;
  top: -20px;
  width: 45%;
  height: 50px;
  background: rgb(75, 147, 255);
  display: table;
  border-radius: 25px;
  box-shadow: 0px 0px 10px #252525;
}

  .VisualNovelLabel {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 70%;
  background: rgba(34, 34, 34, 0.7);
  z-index: 10;
  }

  .VisualNovelIcon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 10%);
    height: calc(100% - 10%);
    border-radius: 20px;
    /* background: white; */
  }

  .VisualNovelIcon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .VisualNovelName {
    position: absolute;
    left: 0%;
    top: calc(0% + 40px);
    transform: translate(0, -50%);
    width: 200px;
    height: 40px;
    color: white;
    font-size: 1.5em;
  }

  .PauseMenusFrame {
    position: absolute;
    top: 70%;
    left: 0px;
    width: 100%;
    height: 30%;
    /* background: white; */
  }

  .PauseMenuButtonPosition {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    text-align: center;
  }

  .PauseMenuButton {
    display: inline-table;
    width: 25%;
    margin: 0px 1.5% 0px 1.5%;
    height: 50px;
    border-radius: 20px;
    /* background: #2872f9; */
    cursor: pointer;
  }
  .PauseMenuButton span {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    color: white;
    font-size: 1.2em;
    
  }
  .PauseMenuButton span img {
    width: 100%;
  }
}
/* 반응형 레이아웃 for 모바일 */


.NextScriptButton {
  position: absolute;
  left: calc(100% - 90px);
  top: 35%;
  width: 60px;
  height: 40px;
  transform: translate(-50%, -50%);
  animation-name: NextScriptButtonMove;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-duration: 1s;
}

.NextScriptButton button {
  width: 100%;
  height: 100%;
  background: rgba(44, 44, 44, 0.4);
  text-align: center;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 1.1em;
  box-shadow: 0px 0px 20px rgb(85, 85, 85);
}

@keyframes NextScriptButtonMove {
  0% {
  }

  100% {
    top: 37%;
  }
}
</style>