<template>
  <div class="Venginebackground">
    <div class="VEngineCanvas">
      <EngineCanvas :plot="plot" :index="index" :scenario="scenario" @getCloudJSON="getCloudJSON"/>
    </div>
    
    <div class="VPlotController"> <!-- 플롯 컨트롤러 -->
      <div class="VPCBackground"> <!-- 플롯 컨트롤러 백그라운드 -->
        <!-- <div
          v-for="(plot, i) in scenario"
          :key="i">
          {{ i }}<span @click="addPage(i)">추가</span>
          <hr />
          <div v-for="(page, j) in plot" :key="j">
            <span @click="goToPlot(i, j)">{{ j }}</span>
            <span v-if="page.select == undefined"
              >-> {{ page.move.plot }},{{ page.move.index }}</span
            >
            <div v-else>
              <p v-if="page.select.select1 != undefined">
                ({{ page.select.select1.text }})선택 시->
                {{ page.select.select1.plot }}, {{ page.select.select1.index }}
              </p>
              <p v-if="page.select.select2 != undefined">
                ({{ page.select.select2.text }})선택 시->
                {{ page.select.select2.plot }}, {{ page.select.select2.index }}
              </p>
              <p v-if="page.select.select3 != undefined">
                ({{ page.select.select3.text }})선택 시->
                {{ page.select.select3.plot }}, {{ page.select.select3.index }}
              </p>
            </div>
            <hr />
            
          </div>
        </div> -->

        <div class="VpcTopToolbar"> <!-- 플롯 추가등의 버튼 -->
          <div class="VpcTool_addplot">
            <p>플롯추가</p>
          </div>
        </div> <!-- 플롯 추가등의 버튼 -->

        <div class="VpcInner"> <!-- 플롯 컨트롤러 상단 도구와 분리 -->     
          
          <div class="VpcBlock"> <!-- 플롯 박스 -->
            <div class="VpcBlockLabel"> <!-- 플롯 라벨 및 열기버튼 -->
              <div class="VpcBlock_Title"><p>플롯제목제목</p></div>
              <div class="VpcBlock_Opener"><p>ㅜ</p></div>
            </div>

            <div class="VpcBlockInner"> <!-- 플롯 내부 조회 -->
              <div class="VpcPageNormal">
                123123
              </div>

              <div class="VpcPageSelect">
                12124214
              </div>

              <div class="VpcPageNormal">
                123123
              </div>

              <div class="VpcPageSelect">
                12124214
              </div>  
            </div><!-- 플롯 블록 이너 끝 -->

          </div> <!-- 플롯 블록 끝 -->


        </div> <!-- VpcInner 끝 -->

      </div> <!-- 플롯 컨트롤러 백그라운드 -->
    </div> <!-- 플롯 컨트롤러 -->
  </div>
</template>

<script>
import EngineCanvas from "./V_EngineCanvas.vue";
import storage from "../../../aws";
import axios from "../../../axios";
export default {
  name: "V_EngineInner",
  components: {
    EngineCanvas,
  },
  created() {
    this.pjCode = this.$route.params.pjCode;
    this.getJson(this.pjCode);
  },
  data() {
    return {
      pjCode: "",
      index: "",
      plot: "",
      scenario: {},
    };
  },
  methods: {
    getCloudJSON(json){
      this.scenario=json
    },
    async getJson(pjCode) {
      var result = await storage.getJson(`Project/PJ${pjCode}/PJ${pjCode}.json`);
      var uint8array = new TextEncoder("utf-8").encode(result);
      var json = new TextDecoder().decode(uint8array);
      if (Object.keys(json).length === 0) {
        console.log("해당 프로젝트의 JSON이 비어있음");
      } else {
        this.scenario = JSON.parse(json);
      }
    },
    deletePj() {
      axios
        .post("/engine/pj/deletePj", { pjCode: this.pjCode })
        .then((result) => {
          if (result.data == "ok") {
            this.$router.push("/");
          } else {
            console.log("프로젝트 삭제 에러");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    goToPlot(plot, index) {
      console.log(plot, index);
      this.plot = plot;
      this.index = index;
    },
    addPage(plot){
      console.log(plot+this.scenario.시작)
      eval("this.scenario."+plot+'.push({"bg": "","bgm": "","name": "이름","text": "대화","img": "","move": {"plot": "'+plot+'","index":0}})')
      console.log(this.scenario);
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
  width: 100%;
  height: 50px;
  border-radius: 20px;
  background: rgb(88, 88, 88);
}

.VpcTool_addplot {
  width: 60px;
  height: 30px;
  position: relative;
  left: 10px;
  top: 10px;
  background: #2872f9;
  border-radius: 10px;
  display: table;
  cursor: pointer;
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

.VpcBlock_Opener {
  position: relative;
  left: 90%;
  transform: translate(-50%, -50%);
  height: 25px;
  width: 50px;
  background: #797979;
  border-radius: 10px;
  cursor: pointer;
}

.VpcBlock_Opener p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50% ,-50%);
  font-size: 0.9em;
}

.VpcBlockInner {
  padding: 7px;
}

.VpcPageNormal {
  width: 100%;
  background: rgb(161, 161, 161);
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
}

.VpcPageSelect {
  width: 100%;
  background: rgb(161, 161, 161);
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
}

</style>
