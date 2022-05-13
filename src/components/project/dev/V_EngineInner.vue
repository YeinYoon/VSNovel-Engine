<template>
  <button @click="goToEditPjInfo()">정보 수정</button
  ><button @click="goToInvitePj()">유저 초대</button>
  <div class="Venginebackground">
    <div class="VEngineCanvas">
      <EngineCanvas :plot="plot" :index="index" :scenario="scenario" @getCloudJSON="getCloudJSON"/>
    </div>
    <div class="VPlotController">
      <div class="VPCBackground">
        <div
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
        </div>
      </div>
    </div>
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
  props: {
    isEditPj: Boolean,
    isInvitePj: Boolean,
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
    goToEditPjInfo: function () {
      this.$emit("pjEdit", true);
    },

    goToInvitePj: function () {
      this.$emit("pjInvite", true);
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
</style>
