<template>
    <div class="ViewerBackground">
    <!-- 백그라운드 -->
    <!-- 내부 img태그의 src를 가공하여 사용, -->
    <!-- 자동으로 늘어나고 줄어듦. 화면 스케일에 맞게 조정 -->
    <div class="SceneBackground">
      <img src="@/assets/background.jpg" />
    </div>
    <!-- 백그라운드 끝. -->

    <!-- 선택지 -->

    <!-- 필요한곳에 주석을 해제하고 사용. -->
    <!-- SceneSelectBackground는 선택문이 화면상에 출력되었을때 뒤에 검은 배경을 깔아줌. -->
    <!-- SceneSelectBFrame은 중앙 위치를 잡는 용도. -->
    <!-- SelectButton을 추가할수록 더 많은 선택지를 자동으로 배치함. 3개 이상의 선택문 추가 가능.-->

    <div class="SceneSelectBackground" v-if="status == 'select'">
      <div class="SceneSelectFrame">
        <div class="SelectButton" v-if="s1.use" @click="select(s1.plot, s1.index)"><span>{{s1.text}}</span></div>
        <div class="SelectButton" v-if="s2.use" @click="select(s2.plot, s2.index)"><span>{{s2.text}}</span></div>
        <div class="SelectButton" v-if="s3.use" @click="select(s3.plot, s3.index)"><span>{{s3.text}}</span></div>
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
    <!-- 모바일 환경에서만 나올건지". PC에서도 반응형으로 제공할지는 선택 -->
      <div class="ViewerNav">
        <div class="NavItems">
          <img src="@/assets/icons/white/editing.png" v-if="editMod == false" @click="this.editMod = true;">
          <img src="@/assets/icons/white/checked.png" v-else @click="save()">
        </div>
        <div class="NavItems">
          <img src="@/assets/icons/white/downcloud.png" @click="getVS()">
        </div>
        <div class="NavItems">
          <img src="@/assets/icons/white/upcloud.png" @click="uploadVS()">
        </div>
      </div>
      <!-- 이미지 -->

      <!-- 내부 img태그의 src를 가공하여 사용, -->
      <!-- 자동으로 늘어나고 줄어듦. 화면 스케일에 맞게 조정 -->
      <div class="SceneImg"> <!--이새끼 문제-->
        <img :src="Now.img" v-if="Now.img!=''"/>
      </div>

      <!-- 이미지 끝. -->
      <!-- 대사 -->
      <div class="SceneScriptFrame"> <!-- 이새끼도 문제 -->
        <!-- 대사창 배경-->
        <div class="ScriptBackground"></div>
        <!-- 대사창 툴바 -->

        <!-- 화자 -->
        
          <label for="name">
          <div v-if="editMod" class="SceneSpeakerName" contenteditable="true">
            <span id="name" ref="cngName">{{ Now.name }}</span>
          </div>
          <div v-else class="SceneSpeakerName">
            <span id="name">{{Now.name}}</span>
          </div>
          
          </label>

        <!-- 대사 -->
        
        <label for="text">
        <div v-if="editMod" class="SceneScript" contenteditable="true">
          <span id="text" ref="cngText">{{ Now.text }}</span>
        </div>
        <div v-else class="SceneScript">
          <span id="text">{{ Now.text }}</span>
        </div>
        </label>

        <!-- 다음 대사 버튼 -->
        <div class="NextScriptButton" @click="nextScene">
          <button>▶</button>
        </div>
      </div>
      <!-- 대사 끝 -->
    </div>
    <!-- <button @click="nextScene">click</button> -->
  <!-- 전체 끝 -->
</template>

<script>
import storage from '../../../aws'
import axios from '../../../axios'
export default {
  props:{
    index:Number,
    plot:String,
    VS:Object
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
      editMod : false,
      Now: {},
      s1:{},
      s2:{},
      s3:{},
      status: "play", // play, select, pause,
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
        console.error(err);
      })
    },
    //현재 JSON 파일 업로드
    async uploadVS() {
    var data = JSON.stringify(this.VS);
    var fileName = `PJ${this.pjCode}.json`
    var properties = {type:'text/plain'};
    var file = new File([data], fileName, properties); //새로운 파일 객체 생성
    console.log(file);

    await storage.uploadFile(`Project/PJ${this.pjCode}/`, file);
    },
    async getVS() {
      var result = await storage.getVS(`Project/PJ${this.pjCode}/PJ${this.pjCode}.json`); // unit8array(utf16) 형식으로 데이터를 읽어옴
      var uint8array = new TextEncoder("utf-8").encode(result); // utf8 형식으로 변환
      var string = new TextDecoder().decode(uint8array);
      console.log(JSON.parse(string));
      this.$emit('getCloudVS',JSON.parse(string))
    },
    save() {
      eval("this.VS.scenario."+this.plot+"["+this.index+"].name = this.$refs.cngName.innerHTML;")
      eval("this.VS.scenario."+this.plot+"["+this.index+"].text = this.$refs.cngText.innerHTML;")
      this.editMod = false;          
      this.loadData()
    },
    loadData: function () {
      console.log(this.plot,this.index);
      console.log(this.VS.scenario.시작[1])
      console.log("this.VS.scenario."+this.plot+"["+this.index+"]")
      eval("this.Now=this.VS.scenario."+this.plot+"["+this.index+"]")
    },              
    nextScene: function () {
      console.log(eval("this.VS.scenario."+this.plot+"["+this.index+"].type=='n'"));
      if (eval("this.VS.scenario."+this.plot+"["+this.index+"].type=='n'")) {
        console.log('n')
        this.move();
      }else if(eval("this.VS.scenario."+this.plot+"["+this.index+"].type=='e'")){
        console.log('ending');
      }else {
        eval("this.s1=this.VS.scenario."+this.plot+"["+this.index+"].select1")
        eval("this.s2=this.VS.scenario."+this.plot+"["+this.index+"].select2")
        eval("this.s3=this.VS.scenario."+this.plot+"["+this.index+"].select3")
        this.status = "select";
      }
    },
    move: function(){
      console.log(eval("this.VS.scenario."+this.plot+".length-1=="+this.index))
      if(eval("this.VS.scenario."+this.plot+".length-1=="+this.index)){
        console.log(eval("this.VS.scenario."+this.plot+"[0].nextPlot"))
        this.$emit('move',{plot:eval("this.VS.scenario."+this.plot+"[0].nextPlot"),index:1})
      }
      else{
        console.log(this.plot, this.index+1)
        this.$emit('move',{plot:this.plot,index:this.index+1})
      }
    },
    select:function(plot,index){
      this.$emit('move',{plot,index})
    }
  },  
  watch : {
    $route() {
          this.getPjInfo(this.pjCode);
    },
    index: function(){
      console.log(this.index)
      this.loadData()
    },
    plot: function(){
      console.log(this.plot)
      this.loadData()
    },
    VS:{
      deep:true,
      handler(){
        console.log("change DATA")
        this.loadData()
      }
    }
  },
}
</script>

<style>

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
  width: 50%;
  z-index: 10;
}

.SelectButton {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100px;
  background: #2872f9;
  box-shadow: 0px 0px 10px #252525;
  border-radius: 50px;
  margin: 15px 0px 15px 0px;
  cursor: pointer;
  display: table;
}

.SelectButton span {
  position: relative;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
  word-break: break-all;
}

.ViewerNav {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 89;

  /* 다해놨어 정인쨩 > <  */
}

.NavItems{
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  margin: 2px;
  display: table;
  transition: background-color 0.3s ease-out 100ms;
}

.NavItems:hover {
  background: #2872f9;
  transition: 0.3s;
}

.NavItems img{
  margin: 10px;
  height: 20px;
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
  font-size: 1em;
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
  font-size: 1.2em;
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