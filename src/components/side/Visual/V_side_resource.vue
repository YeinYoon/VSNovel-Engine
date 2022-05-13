<template>
  <div class="VSBackground">
    <div v-for="(bg, i) in bg" :key="i">
      <p>{{bg.name}}</p>
    </div>

    <div v-for="(bgm, i) in bgm" :key="i">
      <p>{{bgm.name}}</p>
    </div>

    <div v-for="(img, i) in img" :key="i">
      <p>{{img.name}}</p>
    </div>
  </div>
</template>

<script>
import storage from '../../../aws'
export default {
  name: 'V_side_resource',
  props : {
    pjCode : String
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      bg : null,
      bgm : null,
      img : null
    }
  },
  methods : {
    async getData() {
      console.log("해당 프로젝트의 리소스 파일을 불러옴", this.pjCode);
      this.bg = await storage.getUrlList(`Project/PJ${this.pjCode}/bg/`);
      this.bgm = await storage.getUrlList(`Project/PJ${this.pjCode}/bgm/`);
      this.img = await storage.getUrlList(`Project/PJ${this.pjCode}/img/`);

      console.log("bg : ", this.bg);
      console.log("bgm : ", this.bgm);
      console.log("img : ", this.img)
    }

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