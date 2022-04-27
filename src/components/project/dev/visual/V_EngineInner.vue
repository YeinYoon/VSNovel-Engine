<template>
<button @click="deletePj()">삭제</button>
    <div class="enginebackground">
      <div class="EngineCanvas">
        <EngineCanvas/>
      </div>
      <div class="PlotController">
        <div class="PCBackground">
          123
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

      scenario : ""
    }
  },
  methods : {
    async getJson(pjCode) {
      var result = await storage.getJson(`PJ${pjCode}/PJ${pjCode}.json`);
      if(result == undefined) {
        console.log("해당 프로젝트의 JSON이 존재하지 않음")
      } else {
        var uint8array = new TextEncoder("utf-8").encode(result);
        var string = new TextDecoder().decode(uint8array);
        this.scenario = JSON.parse(string);
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
    }
  }
}

</script>

<style>
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