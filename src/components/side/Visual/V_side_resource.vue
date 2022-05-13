<template>
  <div class="VSBackground">
    {{bg}}
  </div>
</template>

<script>
import {toRaw} from 'vue'
import storage from '../../../aws'
export default {
  name: 'V_side_resource',
  props : {
    pjCode : String
  },
  created() {
    this.getData();
  },
  data() {
    return {
      bg : [],
      bgm : [],
      img : []
    }
  },
  methods : {
    async getData() {
      console.log("해당 프로젝트의 리소스 파일을 불러옴", this.pjCode);
      var bg = await storage.getUrlList(`Project/PJ${this.pjCode}/bg/`);
      this.bg = bg

      var bgm = await storage.getUrlList(`Project/PJ${this.pjCode}/bgm/`);
      this.bgm = bgm

      var img = await storage.getUrlList(`Project/PJ${this.pjCode}/img/`);
      this.img = img

      this.bg = toRaw(this.bg);
      this.bgm = toRaw(this.bgm);
      this.img = toRaw(this.img);
    },

  },

  
}
</script>

<style>
.VSBackground {
  width: 100%;
  height: 100%;
  color: white;
}
</style>