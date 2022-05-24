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
          <div class="VpcToolPosition">
            <button>플롯 추가</button>
            <button>엔딩 추가</button>
          </div>

        </div> <!-- 플롯 추가등의 버튼 -->

        <div class="VpcInner"> 
          
          <!-- 플롯리스트 -->
          <!-- 플롯의 갯수만큼 반복 -->
          <div class="VpcBlock"> <!-- 플롯 박스 -->
            <div class="VpcBlockLabel"> <!-- 플롯 라벨 및 열기버튼 -->
              <div class="VpcBlock_Title"><p>플롯제목제목</p></div>
              <div class="VpcBlock_Opener"><p>ㅜ</p></div>
            </div>

            <!-- 플롯 내부 조회 --> 
            <!-- 이 플롯이 가진 페이지만큼 반복 -->
            <!-- 반복문 실행중 일반 페이지는 VpcPageNormal 클래스를 붙일것. -->
            <!-- 반복문 실행중 선택자 페이지는 VpcPageSelect 클래스를 붙일것. -->
            <div class="VpcBlockInner"> 
              
              <!-- 일반 페이지 -->
              <!-- 일반 페이지는 단순 대화를 담고있음. -->
              <!-- 일반 페이지는 다음 페이지로의 이동만 함. (플롯간 이동X) -->
              <div class="VpcPageNormal">
                <span>123123</span>
              </div>

              <div class="VpcPageNormal">
                <span>123123</span>
              </div>

              <div class="VpcPageNormal">
                <span>112313213213</span>
              </div>

              <!-- 선택자 페이지 -->
              <!-- 플레이어가 선택하면, 다른 플롯으로의 이동이 발생함 -->
              <!-- 페이지에 선택지를 추가한 갯수만큼 반복문을 돌릴것. -->
              <div class="VpcPageSelect">

                <div class="VpcPageSels">
                  <div class="VpcPageSelTitle">선택지1</div>
                  <div class="VpcPageSelectPath">
                    <div class="VpcPageSelOrigin"> <!-- 선택지이름 -->
                      <select disabled>
                        <option>1</option> <!-- 이 플롯의 고유번호 -->
                      </select>
                    </div>
                    <div class="VpcPageSelectArrow">></div>
                    <div class="VpcPageSelChange"> <!-- 선택 이후의 플롯인덱스 -->
                      <select>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="VpcPageSels">
                  <div class="VpcPageSelTitle">선택지1</div>
                  <div class="VpcPageSelectPath">
                    <div class="VpcPageSelOrigin"> <!-- 선택지이름 -->
                      <select disabled>
                        <option>1</option> <!-- 이 플롯의 고유번호 -->
                      </select>
                    </div>
                    <div class="VpcPageSelectArrow">></div>
                    <div class="VpcPageSelChange"> <!-- 선택 이후의 플롯인덱스 -->
                      <select>
                      </select>
                    </div>
                  </div>
                </div>

              </div>

              <div class="VpcBlockControl">
                <button>플롯 삭제</button>
                <button>페이지 추가</button>
              </div>
            </div><!-- 플롯 블록 이너 끝 -->

          </div> <!-- 플롯 블록 끝 -->


          <!-- 엔딩플롯 예시 -->
          <!-- 엔딩플롯이란, 유저가 선택한 선택지를 통해 이동된 플롯중 하나임. -->
          <!-- 엔딩플롯의 마지막 페이지에서는 비주얼노벨 종료 명령이 전달되도록 한다. -->
          <!-- 즉 웹툰에서 마지막 페이지를 담당하는것임. -->
          <!-- 플롯 반복문에서 가장 마지막에 반복되도록 만든다 -->
          <div class="VpcBlock"> <!-- 플롯 박스 -->
            <div class="VpcBlockLabel_end"> <!-- 플롯 라벨 및 열기버튼 -->
              <div class="VpcBlock_Title"><p>엔딩1 - 123</p></div>
              <div class="VpcBlock_Opener"><p>ㅜ</p></div>
            </div>
            <div class="VpcBlockInner">
              <div class="VpcPageNormal">
                <span>엄준식</span>
              </div>

              <div class="VpcPageNormal">
                <span>엄 어엄 엄</span>
              </div>

              <div class="VpcPageNormal">
                <span>고마웠어 엄준식</span>
              </div>

              <div class="VpcPageNormal">
                <span>엔딩1 - 굿바이 엄준식</span>
              </div>

              <div class="VpcPageEnd">
                <span>읽기종료</span>
              </div>

              <div class="VpcBlockControl">
                <button>엔딩 삭제</button>
                <button>페이지 추가</button>
              </div>
            </div>
          </div>


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
  background: #949494;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
  transition: all ease 0.2s;
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
  padding: 2px;
  text-align: center;
  
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
}

.VpcPageEnd:hover {
  background: #585858;
  cursor: pointer;
}

.VpcPageEnd span{
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
