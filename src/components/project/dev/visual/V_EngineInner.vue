<template>
<button @click="deletePj()">삭제</button>
    <div class="enginebackground">
      <div class="EngineCanvas">
        <EngineCanvas :plot="plot" :index="index" :scenario="scenario"/>
      </div>
      <div class="PlotController">
        <div class="PCBackground">
          <div v-for="(plot, i) in scenario" :key="i" draggable="true" class="bigBox">
            {{i}}
            <hr>
            <div v-for="(page, j) in plot" :key="j" @click="goToPlot(i,j)">
              {{j}}
              <span v-if="page.select==undefined">-> {{page.move.plot}},{{page.move.index}}</span>
              <div v-else>
                <p v-if="page.select.select1!=undefined">({{page.select.select1.text}})선택 시-> {{page.select.select1.plot}}, {{page.select.select1.index}}</p>
                <p v-if="page.select.select2!=undefined">({{page.select.select2.text}})선택 시-> {{page.select.select2.plot}}, {{page.select.select2.index}}</p>
                <p v-if="page.select.select3!=undefined">({{page.select.select3.text}})선택 시-> {{page.select.select3.plot}}, {{page.select.select3.index}}</p>
              </div>
              <hr>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import EngineCanvas from './V_EngineCanvas.vue'
import storage from '../../../../aws'
import axios from '../../../../axios'
export default {
  name: 'V_EngineInner',
  components: {
    EngineCanvas,
  },
  created() {
    this.pjCode = this.$route.params.pjCode;
    this.getJson(this.pjCode);
  },
  data() {
    return {
      pjCode : "",
      index:"",
      plot:"",
      scenario : {}
    }
  },
  methods : {
    async getJson(pjCode) {
      var result = await storage.getJson(`PJ${pjCode}/PJ${pjCode}.json`);
      var uint8array = new TextEncoder("utf-8").encode(result);
      var json = JSON.parse(new TextDecoder().decode(uint8array));
      if(Object.keys(json).length === 0) {
        console.log("해당 프로젝트의 JSON이 비어있음");
      } else {
        this.scenario = json;
        console.log('hi there')
        console.log(this.scenario);
      }
    },

    deletePj() {
      axios.post('/engine/pj/deletePj', {pjCode : this.pjCode})
      .then((result)=>{
        if(result.data=="ok") {
          this.$router.push('/');
        } else {
          console.log("프로젝트 삭제 에러")
        }
      })
      .catch((err)=>{
        console.error(err);
      })
    },
    goToPlot(plot, index){
      console.log(plot, index)
      this.plot = plot
      this.index = index
    }
  }
}

</script>

<style>
.bigBox{
  cursor:move
}
.enginebackground {
  width: 100%;
  height: 100%;
  background: #444444;
  z-index: 1;
}

.EngineCanvas {
  position: absolute;
  width: calc(100% - 220px);
  height: 100%;
  color: white;
}

.PlotController {
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

.PCBackground {
  width: 100%;
  height: 100%;
}
</style>