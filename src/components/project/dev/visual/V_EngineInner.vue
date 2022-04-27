<template>
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
      var uint8array = new TextEncoder("utf-8").encode(result); // utf8 형식으로 변환
      var string = new TextDecoder().decode(uint8array);
      console.log(JSON.parse(string));
      
      this.scenario = JSON.parse(string);
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