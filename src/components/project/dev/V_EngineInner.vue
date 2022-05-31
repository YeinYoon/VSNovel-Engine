<template>
  <div class="Venginebackground">
    <div class="VEngineCanvas">
      <EngineCanvas :plot="plot" :index="index" :VS="VS" @getCloudVS="getCloudVS" @move="move"/>
    </div>
    
    <div class="VPlotController"> <!-- 플롯 컨트롤러 -->
      <div class="VPCBackground"> <!-- 플롯 컨트롤러 백그라운드 -->
        <div class="VpcTopToolbar"> <!-- 플롯 추가등의 버튼 -->
          <div class="VpcToolPosition">
            <button>플롯 추가</button>
            <button>엔딩 추가</button>
          </div>

        </div>
      
        <div v-if="VS" class="VpcInner">
          <div class="VpcBlock" v-for="(plot, i) in VS.scenario"
          :key="i"> <!-- 플롯 박스 -->
            <div class="VpcBlockLabel"> <!-- 플롯 라벨 및 열기버튼 -->
              <div class="VpcBlock_Title"><p>{{ i }}</p></div>
              <button class="VpcBlock_Opener" @click="changePlotName($event, i)"><img src="@/assets/icons/white/editing.png"></button>
              <button class="VpcBlock_addPlotB"><img src="@/assets/icons/white/trash_white.png"></button>
            </div>

            <!-- 플롯 내부 조회 --> 
            <!-- 이 플롯이 가진 페이지만큼 반복 -->
            <!-- 반복문 실행중 일반 페이지는 VpcPageNormal 클래스를 붙일것. -->
            <!-- 반복문 실행중 선택자 페이지는 VpcPageSelect 클래스를 붙일것. -->
            <div class="VpcBlockInner"> 
              
              <!-- 일반 페이지 -->
              <!-- 일반 페이지는 단순 대화를 담고있음. -->
              <!-- 일반 페이지는 다음 페이지로의 이동만 함. (플롯간 이동X) -->
              <div v-for="(page, j) in plot" :key="j">
              <div class="VpcPageNormal" @click="move({plot:i, index:j})" v-if="page.type!='s' && page.nextPlot==undefined">
                <div class="VpcPageNormalIndexSelected" v-if="i==this.plot && j==this.index"><span>{{j}}</span></div>
                <div class="VpcPageNormalIndex" v-else><span>{{j}}</span></div>
                <div class="VpcPageTitle"><span>1232131232132132132</span></div>
                <div v-if="i==this.plot && j==this.index"> <!-- if문 걸어서 활성화중일때만 나오게 수정좀 > < -->
                  <button class="VpcPage_Opener" @click="edit"><img src="@/assets/icons/white/editing.png"></button>
                  <button class="VpcPage_addPlotB"><img src="@/assets/icons/white/trash_white.png"></button>
                </div>
              </div>
              <!-- 선택자 페이지 -->
              <!-- 플레이어가 선택하면, 다른 플롯으로의 이동이 발생함 -->
              <!-- 페이지에 선택지를 추가한 갯수만큼 반복문을 돌릴것. -->
              <div class="VpcPageSelect" v-if="page.type=='s'" @click="move({plot:i, index:j})">
                <div class="VpcPageSelectIndexSelected" v-if="i==this.plot && j==this.index"><span>{{j}}</span></div>
                <div class="VpcPageSelectIndex" v-else><span>{{j}}</span></div>
                <div class="VpcPageSelectTitle"><span>12312321412423</span></div>
                <div v-if="i==this.plot && j==this.index"> <!-- if문 걸어서 활성화중일때만 나오게 수정좀 > < -->
                  <button class="VpcPage_Opener"><img src="@/assets/icons/white/editing.png"></button>
                  <button class="VpcPage_addPlotB"><img src="@/assets/icons/white/trash_white.png"></button>
                </div>
                <div class="VpcPageSels" v-for="(select,k) in page.select" :key="k">
                  <div class="VpcPageSelTitle">선택지{{k+1}}</div>
                  <div class="VpcPageSelectPath">
                    <div class="VpcPageSelOrigin">
                      <select @change="selectOptionPlot($event,i,j,k)">
                        <option v-for="(sPlot, l) in VS.scenario" :key="l" :value="l" :selected="select.plot==l">{{l}}</option>
                      </select>
                    </div>
                    <div class="VpcPageSelectArrow">,</div>
                    <div class="VpcPageSelChange">
                      <select @change="selectOptionIndex($event,i,j,k)">
                        <option v-for="(num,l) in returnIndex(select.plot)" :key="l" :selected="select.index==l+1">
                          {{l+1}}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
             </div>              
            </div><!-- 플롯 블록 이너 끝 -->
              <div class="VpcBlockControl">
                <button>플롯 삭제</button>
                <button @click="addPage(i)">페이지 추가</button>
              </div>
            </div>
        
        </div> <!-- VpcInner 끝 -->


          <!-- 플롯의 갯수만큼 반복 -->
           <!-- 플롯 블록 끝 -->


        </div>  
      </div> <!-- 플롯 컨트롤러 백그라운드 -->
      </div> 
    </div><!-- 플롯 컨트롤러 -->
</template>

<script>
import EngineCanvas from "./V_EngineCanvas.vue";
import storage from "../../../aws";
import axios from "../../../axios";
export default {
  name: "V_EngineInner",
  props:{
    data:Object
  },
  components: {
    EngineCanvas,
  },
  async created() {
    console.log("ss")
    this.pjCode = this.$route.params.pjCode;
    await this.getVS(this.pjCode);
  },
  data() {
    return {
      pjCode: "",
      index: "0",
      plot: "시작",
      VN: {},
      startPlot:"",
    };
  },
  watch:{
    data(){
      if(this.data!=undefined && this.data!=null){
        let url = this.data.url
        console.log(eval("this.VS.scenario."+this.plot+"["+this.index+"]"))
        eval("this.VS.scenario."+this.plot+"["+this.index+"].img="+"'"+url+"'")
        console.log(eval("this.VS.scenario."+this.plot+"["+this.index+"]"))
      }
    },
  },
  methods: {
    getCloudVS(VS){
      this.VS=VS
    },
    async getVS(pjCode) {
      var result = await storage.getVS(`Project/PJ${pjCode}/PJ${pjCode}.json`);
      var uint8array = new TextEncoder("utf-8").encode(result);
      var VS = new TextDecoder().decode(uint8array);
      if (Object.keys(VS).length === 0) {
        console.log("NULL JSON");
      } else {
        this.VS = await JSON.parse(VS);
        this.plot = JSON.parse(VS).startPlot;
        this.index=1;
        console.log(this.VS.scenario)
      }
    },
    deletePj() {
      axios
        .post("/engine/pj/deletePj", { pjCode: this.pjCode })
        .then((result) => {
          if (result.data == "ok") {
            this.$router.push("/");
          } else {
            console.log("Delete Project Error!");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    move(data) {
      console.log(this.plot, this.index);
      this.plot = data.plot;
      this.index = data.index;
      console.log(this.plot, this.index)
    },
    addPage(plot){
      console.log(plot+this.VS.scenario.시작)
      eval("this.VS.scenario."+plot+'.push({"bg": "","bgm": "","name": "이름","text": "대화","img": "","move": {"plot": "'+plot+'","index":0}})')
      console.log(this.VS.scenario);
    },
    changePlotName(event, plot){
      console.log(plot, 
      event.path[2].children[0].children[0])
      event.path[2].children[0].children[0].innerHTML=`<input type='text' value=${event.path[2].children[0].children[0].innerText}>`
    },
    selectOptionPlot(event,plot,index,number){
      console.log(event.target.value, plot, index, number)
      this.VS.scenario[plot][index].select[number].plot=event.target.value
      event.path[2].children[2].children[0].length = 0;
      for(let i=1;i<this.VS.scenario[event.target.value].length;i++){
        var opt = document.createElement("option")
        opt.value = opt.innerHTML = i;
        event.path[2].children[2].children[0].appendChild(opt)
      }      
    },
    selectOptionIndex(event,plot,index,number){
      console.log(event.path[2].children[0].children[0].value, event.target.value)
      this.VS.scenario[plot][index].select[number].index=event.target.value
      console.log(this.VS.scenario[plot][index].select[number].index)
    },
    returnIndex(plot){
      const result = this.VS.scenario[plot].length-1//new Function("this.VS.scenario.'"+plot+"'.length")
      console.log(plot);
      console.log(result);
      return result
    }
  },
};
</script>

<style>
.Venginebackground {
  width: 100%;
  height: 100%;
  background: #444444;
  z-index: 1;
}

.VEngineCanvas {
  position: absolute;
  width: calc(100% - 220px);
  height: 100%;
  color: white;
}

.VPlotController {
  position: absolute;
  left: 100%;
  transform: translate(-100%);
  width: 220px;
  height: 100%;
  padding: 20px;
  background: #272727;
  color: white;
  overflow: auto;
}

.VPCBackground {
  width: 100%;
  height: 100%;
}

.VpcTopToolbar {
  position: relative;
  width: 100%;
  height: 50px;
  border-radius: 20px;
  background: rgb(88, 88, 88);
  padding: 10px;
}

.VpcToolPosition {
  width: 100%;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

}

.VpcToolPosition button{
  background: #2872f9;
  border-radius: 10px;
  font-size: 0.9em;
  color: white;
  display: inline-block;
  cursor: pointer;
  border: none;
  padding: 5px;
  margin: 2px;
  transition: all ease 0.2s;
}

.VpcToolPosition button:hover{
  background: #0084ff;
}

.VpcTool_addplot p {
  position: relative;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  font-size: 0.9em;
}

.VpcInner {
  margin-top: 10px;
}

.VpcBlock {
  width: 100%;
  border-radius: 10px;
  background: rgb(119, 119, 119);
  margin-bottom: 10px;
}

.VpcBlockLabel {
  width: 100%;
  height: 40px;
  background: rgb(71, 71, 71);
  border-radius: 10px;
}

.VpcBlockLabel_end {
  width: 100%;
  height: 40px;
  background: #0b3c99;
  border-radius: 10px;
}

.VpcBlock_Title {
  position: relative;
  left: 10px;
  top: 10px;
  height: 20px;
  width: 100px;
  border-radius: 30px;
}

.VpcBlock_Title p {
  position: absolute;
  font-size: 0.9em;
}

.VpcBlock_addPlotB {
  position: absolute;
  left: 80%;
  transform: translate(-50%, -50%);
  background: #2872f9;
  border: none;
  border-radius: 7px;
  color: white;
  width: 25px;
  height: 25px;
  transition: all ease 0.2s;
  object-fit: cover;
}

.VpcBlock_addPlotB:hover {
  background: #0084ff;
}

.VpcBlock_addPlotB img {
  position: relative;
  top: -1px;
  left: -1.3px;
  width: 120%;
}

.VpcBlock_Opener {
  position: absolute;
  left: 65%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  background: #2872f9;
  border-radius: 7px;
  border: none;
  transition: all ease 0.2s;
  object-fit: cover;
}

.VpcBlock_Opener:hover {
  background: #0084ff;
}

.VpcBlock_Opener img {
  position: relative;
  top: -1px;
  left: 1px;
  width: 100%; 
}

.VpcBlockInner {
  padding: 7px;
}

.VpcPageNormal {
  width: 100%;
  background: #949494;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
  transition: all ease 0.2s;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  word-break: break-all;
}

.VpcPageNormalIndex {
  position: relative;
  border-radius: 5px;
  background: #838383;
  width: 18px;
  height: 23px;
}

.VpcPageNormalIndexSelected {
  position: relative;
  border-radius: 5px;
  background: #2872f9;
  width: 18px;
  height: 23px;
}

.VpcPageNormalIndexSelected span {
  position: absolute;
  left: 47%;
  top: 45%;
  transform: translate(-50%, -50%);
  font-size: 0.9em;
}

.VpcPageNormalIndex span {
  position: absolute;
  left: 47%;
  top: 45%;
  transform: translate(-50%, -50%);
  font-size: 0.9em;
}

.VpcPageNormal:hover {
  background: #818181;
  cursor: pointer;
}

.VpcPageSelect {
  width: 100%;
  background: #949494;
  border-radius: 5px;
  padding: 3px;
  margin-bottom: 5px;
  transition: all ease 0.2s;
}

.VpcPageSelect:hover {
  background: #818181;
  cursor: pointer;
}

.VpcPageSels {
  width: 100%;
  border-radius: 5px;
  margin-top: 2px;
  padding: 2px;
  text-align: center;
  
}

.VpcPageSelectIndex {
  position: relative;
  top: 1px;
  left: 2px;
  border-radius: 5px;
  background: #838383;
  width: 18px;
  height: 23px;
}

.VpcPageSelectIndex span {
  position: absolute;
  left: 47%;
  top: 45%;
  transform: translate(-50%, -50%);
  font-size: 0.9em;
}

.VpcPageSelectIndexSelected {
  position: relative;
  top: 1px;
  left: 2px;
  border-radius: 5px;
  background: #2872f9;
  width: 18px;
  height: 23px;
}

.VpcPageSelectIndexSelected span {
  position: absolute;
  left: 47%;
  top: 45%;
  transform: translate(-50%, -50%);
  font-size: 0.9em;
}

.VpcPageSelectTitle {
  position: absolute;
  transform: translate(4%, -104%);
  width: 70px;
  margin-left: 20px;
  /* background: white; */
  /* height: 100%; */
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
  font-size: 0.9em;
}

.VpcPageSelTitle {
  display: inline-block;
  width: 30%;
  font-size: 0.9em;
}

.VpcPageSelectPath {
  display: inline-block;
  width: 65%;
  text-align: center;
  font-size: 0.9em;
}

.VpcPageSelectArrow {
  display: inline-block;
  width: 5%;
  text-align: center;
  vertical-align: middle;
  font-size: 0.5em;
}

.VpcPageSelOrigin {
  display: inline-block;
}

.VpcPageSelOrigin select{
  border: none;
  width: 40px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 5px;
}

.VpcPageSelChange {
  display: inline-block;
}

.VpcPageSelChange select{
  border: none;
  width: 40px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 5px;
}

.VpcPageEnd {
  width: 100%;
  background: #949494;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
  transition: all ease 0.2s;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  word-break: break-all;
}

.VpcPageEnd:hover {
  background: #585858;
  cursor: pointer;
}

.VpcPageTitle {
  position: absolute;
  transform: translate(2%, -110%);
  width: 70px;
  margin-left: 20px;
  /* background: white; */
  /* height: 100%; */
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
  font-size: 0.9em;
}

/* .VpcPageTitle span {
  width: 100%;
} */

.VpcPage_addPlotB {
  display: inline;
  position: absolute;
  left: 80%;
  transform: translate(-50%, -97%);
  background: #6b6b6b;
  border: none;
  border-radius: 7px;
  color: white;
  width: 25px;
  height: 25px;
  transition: all ease 0.2s;
  object-fit: cover;
}

.VpcPage_addPlotB:hover {
  background: #0084ff;
}

.VpcPage_addPlotB img {
  position: relative;
  top: -1px;
  left: -1.3px;
  width: 120%;
}

.VpcPage_Opener {
  position: absolute;
  display: inline;
  left: 65%;
  transform: translate(-50%, -97%);
  width: 25px;
  height: 25px;
  background: #6b6b6b;
  border-radius: 7px;
  border: none;
  transition: all ease 0.2s;
  object-fit: cover;
}

.VpcPage_Opener:hover {
  background: #0084ff;
}

.VpcPage_Opener img {
  position: relative;
  top: -1px;
  left: 1px;
  width: 100%; 
}

.VpcBlockControl {
  width: 100%;
  text-align: right;
}


.VpcBlockControl button {
  position: relative;
  background: #2872f9;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 12px;
  padding: 5px;
  margin: 1px;
  transition: all ease 0.2s;
}

.VpcBlockControl button:hover {
  background: #0084ff;
}
</style>
