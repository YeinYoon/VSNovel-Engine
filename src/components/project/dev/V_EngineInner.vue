<template v-if="!!data">
  <div class="Venginebackground">
    <div class="VEngineCanvas">
      <EngineCanvas :plot="plot" :index="index" :VN="VN" :status="status" @changeVN="changeVN" @move="move" @changeStatus="changeStatus"/>
    </div>
    
    <div class="VPlotController"> <!-- 플롯 컨트롤러 -->
      <div class="VPCBackground"> <!-- 플롯 컨트롤러 백그라운드 -->

        <!-- 플롯 컨트롤러 툴바 -->
        <div class="VpcTopToolbar"> 
          <div class="VpcToolPosition">
            <button @click="addPlotModal">플롯 추가</button>
            <button @click="addPlotModal">테마 변경</button>
          </div>
        </div> 

        <!-- 플롯리스트 이너 -->
        <div v-if="VN" class="VpcInner">

          <!-- 플롯 반복문 -->
          <Draggable :list="VN.plotList" @change="dragCngLog">
            <div class="VpcBlock" v-for="(plot, i) in VN.plotList"
            :key="i">

              <!-- 플롯 정보 --> 
              <div class="VpcBlockLabel"> <!-- 플롯 라벨 및 열기버튼 -->
                <div class="VpcBlock_Title"><p>{{ plot.plotName }}</p></div>
                <button class="VpcBlock_Opener" @click="changePlotName(i , plot.plotName)"><img src="@/assets/icons/white/editing.png"></button>
                <button class="VpcBlock_DeletePage" @click="deletePlot(i)"><img src="@/assets/icons/white/trash_white.png"></button>
              </div>


              <!-- 플롯 내부 -->
              <div class="VpcBlockInner">
                <Draggable :list="VN.plotList[i].pages" @change="dragCngLog">
                <div v-for="(page, j) in plot.pages" :key="j">
                  
                  <div class="VpcPageNormal" @click="move({plot:i, index:j})" v-if="page.type!='s'">
                    <div class="VpcPageNormalIndexSelected" v-if="i==this.plot && j==this.index"><span>{{j+1}}</span></div>
                    <div class="VpcPageNormalIndex" v-else><span>{{j+1}}</span></div>
                    <div class="VpcPageTitle"><span>{{page.pageName}}</span></div>
                    <div v-if="i==this.plot && j==this.index">
                      <button class="VpcPage_Opener" @click="edit"><img src="@/assets/icons/white/editing.png"></button>
                      <button class="VpcPage_DeletePage" @click="deletePage(i,j)"><img src="@/assets/icons/white/trash_white.png"></button>
                    </div>
                  </div>

                  <!-- 선택자 페이지 -->
                  <div class="VpcPageSelect" v-if="page.type=='s'" @click="move({plot:i, index:j})">
                  
                    <div class="VpcPageSelectIndexSelected" v-if="i==this.plot && j==this.index"><span>{{j+1}}</span></div>
                    <div class="VpcPageSelectIndex" v-else><span>{{j+1}}</span></div>
                    <div class="VpcPageSelectTitle"><span>{{page.pageName}}</span></div>
                    <div v-if="i==this.plot && j==this.index">
                      <button class="VpcPage_Opener"><img src="@/assets/icons/white/editing.png"></button>
                      <button class="VpcPage_DeletePage"><img src="@/assets/icons/white/trash_white.png"></button>
                    </div>

                    <!-- 선택지들 -->
                    <div class="VpcPageSels" v-for="(select,k) in page.select" :key="k">
                      <div class="VpcPageSelTitle">
                        <span class="VpcPageSelTitle_Number">{{k+1}}</span>
                      </div>

                      <!-- 선택지 설정 -->
                      <div class="VpcPageSelectPath">
                        <div class="VpcPageSelOrigin">
                          <select id="plot" @change="selectOptionPlot($event,i,j,k)">
                            <option v-for="(sPlot, l) in VN.plotList" :key="l" :value="l" :selected="select.plot==l">{{VN.plotList[l].plotName}}</option>
                          </select>
                        </div>
                        <div class="VpcPageSelectArrow">/</div>
                        <div class="VpcPageSelChange">
                          <select id="index" @change="selectOptionIndex($event,i,j,k)">
                            <option v-for="(num,l) in returnIndex(VN.plotList[select.plot],i,j,k)" :key="l" :selected="select.index==l+1" :value="l">
                              {{l+1}}
                            </option>
                          </select>
                        </div>
                      </div>    
                    </div> 
                  </div> 
                </div>
                </Draggable>
    
        
                <!-- 플롯의 페이지추가 및 설정 -->
                <div class="VpcBlockControl">
                  <button @click="addPage(i, 'n')">일반</button>
                  <button @click="addPage(i, 's')">선택</button>
                  <button @click="addPage(i, 'e')">엔딩</button>
                </div>

                <div class="VpcBlockEndPoint">
                  <p>다음 플롯 : </p>
                    <select @change="changeNext($event, i)">
                      <option v-for="(nextPlot, j) in VN.plotList" :key="j" :selected="VN.plotList[i].nextPlot==j" :value="j">{{nextPlot.plotName}}</option>
                    </select>
                </div>

              </div> 

            </div>
          </Draggable> 
          

        </div>
        

      </div> 
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"
import { VueDraggableNext } from 'vue-draggable-next'
import EngineCanvas from "./V_EngineCanvas.vue"
import storage from "../../../aws";
import axios from "../../../axios";
export default defineComponent({
  name: "V_EngineInner",
  props:['resource'],
  components: {
    EngineCanvas,
    Draggable : VueDraggableNext
  },
  async created() {
    this.pjCode = this.$route.params.pjCode;
    await this.getVN(this.pjCode);
  },
  data() {
    return {
      pjCode: "",
      index: 0,
      plot: 0,
      VN: {},
      startPlot:"",
      status:'play'
    };
  },
  watch:{
    resource:{
      deep:true,
      handler(resource){
        if(resource!=undefined && resource!=null){
          let key = resource.key
          this.VN.plotList[this.plot].pages[this.index][resource.type]=key
        }
      }
    },
    VN:{
      deep:true,
      handler(VN){
        this.VN=VN
      }
    }
  },
  methods: {
    changeVN(VN){
      this.VN=VN
    },
    async getVN(pjCode) {
      var result = await storage.getVN(`Project/PJ${pjCode}/PJ${pjCode}.json`)
      var uint8array = new TextEncoder("utf-8").encode(result)
      var VN = new TextDecoder().decode(uint8array)
      if (Object.keys(VN).length === 0) {
        console.log("GetVN : Null JSON")
      } else {
        this.VN = await JSON.parse(VN)
        this.VN.id = pjCode
        this.VN.title = "Title" // hardCoding
        this.VN.ep = 1 // hardCoding
        this.plot=this.index=0
        console.log(this.VN)
      }
    },
    deletePj() {
      axios
        .post("/engine/pj/deletePj", { pjCode: this.pjCode })
        .then((result) => {
          if (result.data == "ok") {
            this.$router.push("/");
          } else {
            console.log("DeletePj : Not Good");
          }
        })
        .catch((err) => {
          console.error("DeletePj : Error Content\n" + err);
        });
    },
    move(data) {
      this.plot = data.plot;
      this.index = data.index;
      this.status = 'play'
    },
    addPage(plot, type){
      const name = { n:"일반 페이지", e:"종료 페이지", s:"선택 페이지"}
      console.log("addpage"+plot)
      this.VN.plotList[plot].pages.push({"pageName":name[type],"type": type,"bg": "","bgm": "","name": "이름","text": "대화 내용","img": "","select":[{"use":true,"text":"","plot":0,"index":0},{"use":true,"text":"","plot":0,"index":0},{"use":true,"text":"","plot":0,"index":0}],})
    },
    changePlotName(plot, plotName){
      const input = prompt(`${plotName}을 변경할 텍스트 :`,'플롯 이름')
      this.VN.plotList[plot].plotName = input;
    },
    selectOptionPlot(event,plot,index,number){
      console.log(event.target.value)
      console.log(plot+","+index+" : "+number)
      this.VN.plotList[plot].pages[index].select[number].plot=event.target.value
      this.VN.plotList[plot].pages[index].select[number].index=0
    },
    selectOptionIndex(event,plot,index,number){
      console.log(event.target.value)
      this.VN.plotList[plot].pages[index].select[number].index=parseInt(event.target.value)
    },
    returnIndex(sPlot,plot,index,number){
      console.log(sPlot.pages.length)
      console.log(plot)
      console.log(index)
      console.log(number)
      return sPlot.pages.length;

    },
    changeStatus(status){
      this.status=status
    },
    changeStart(event){
      console.log(event)
    },
    changeNext(event, plot){
      this.VN.plotList[plot].nextPlot=event.target.value
    },

    dragCngLog(evt) {
      console.log(evt);
    },

    addPlotModal(){
      let input = prompt('플롯 이름 : ','Input Plot Name')
      for(let i=0; i<this.VN.plotList.length; i++){
        if(input==this.VN.plotList[i].plotName){
          this.addPlotModal()
        }
      }
      this.VN.plotList.push({plotName:input,nextPlot:0,pages:[]})
      console.log(this.VN.plotList)
    },
    deletePlot(plot){
      console.log(this.VN.plotList)
      this.VN.plotList.splice(plot, 1)
      console.log(this.VN.plotList)
    },
    deletePage(plot, index){
      delete this.VN.plotList[plot].pages[index]
    }
  },
});
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
  position: relative;
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

.VpcToolPosition select{
  position: relative;
  background: #2872f9;
  border-radius: 10px;
  font-size: 0.9em;
  width: 63px;
  height: 31px;
  color: white;
  display: inline-block;
  cursor: pointer;
  border: none;
  padding: 5px;
  margin: 2px;
  transition: all ease 0.2s;
}

.VpcToolPosition select option{
   text-align-last: center;
   text-align: center;
   -ms-text-align-last: center;
   -moz-text-align-last: center;
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

.VpcBlock_DeletePage {
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

.VpcBlock_DeletePage:hover {
  background: #0084ff;
}

.VpcBlock_DeletePage img {
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
  text-align: right;
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
  width: 20px;
  font-size: 0.9em;
  background: #838383;
  border-radius: 100px;
  text-align: center;
}

.VpcPageSelTitle_Number {
  position: relative;
  left: -0.5px;
  top: -0.5px;
}

.VpcPageSelectPath {
  display: inline-block;
  width: 110px;
  text-align: center;
  font-size: 0.8em;
}

.VpcPageSelectArrow {
  display: inline-block;
  width: 5%;
  text-align: center;
  font-size: 1em;
}

.VpcPageSelOrigin {
  display: inline-block;

}

.VpcPageSelOrigin select{
  border: none;
  width: 60px;
  height: 19.19px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 5px;
  appearance: none;
  text-align-last:center;
  padding-right: 5px;
}

.VpcPageSelOrigin select option{
   text-align-last: center;
   text-align: center;
   -ms-text-align-last: center;
   -moz-text-align-last: center;
}

.VpcPageSelChange {
  display: inline-block;
}

.VpcPageSelChange select{
  border: none;
  width: 35px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 5px;
  appearance: none;
  text-align-last:center;
  padding-right: 5px;
}

.VpcPageSelChange select option{
   text-align-last: center;
   text-align: center;
   -ms-text-align-last: center;
   -moz-text-align-last: center;
}

.VpcPageEnd {
  width: 100%;
  background: #2061d8;
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
  background: #0d52bb;
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

.VpcPage_DeletePage {
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

.VpcPage_DeletePage:hover {
  background: #0084ff;
}

.VpcPage_DeletePage img {
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
  padding: 5px;
  width: 38px;
  height: 28px;
  display: inline-block;
  transition: all ease 0.2s;
  margin-left: 5px;
  font-size: 0.8em;
}

.VpcBlockControl button:hover {
  background: #0084ff;
}

.VpcBlockEndPoint {
  position: relative;
  margin-top: 5px;
  width: 100%;
  text-align: right;
}

.VpcBlockEndPoint p {
  display: inline-block;
  margin: 0px 5px 0px 5px;
  font-size: 0.8em;
}

.VpcBlockEndPoint select {
  border: none;
  width: 90px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 5px;
  appearance: none;
  text-align-last:center;
  padding-right: 5px;  
}

.BlockTitleCngInput {
  position: relative;
  top: -2px;
  border: none;
  border-radius: 5px;
  width: 90%;
  background: #6b6b6b;
  color: white;
  border: 1px #2872f9 solid;
  font-size: 0.9em;
}

</style>
