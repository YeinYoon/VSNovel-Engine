<template>
  <div class="PCBackground">
    123
  </div>
</template>

<script>
import storage from '../../../../aws'
export default {
  name: 'V_PlotController',
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
      var result = await storage.getJson(`Project/PJ${pjCode}/PJ${pjCode}.json`);
      var uint8array = new TextEncoder("utf-8").encode(result); // utf8 형식으로 변환
      var string = new TextDecoder().decode(uint8array);
      console.log(JSON.parse(string));
      
      this.scenario = JSON.parse(string);
    }
  }
}
</script>

<style>
.PCBackground {
  width: 100%;
  height: 100%;
}
</style>