<template>
    <div class="enginebackground">
      <div class="EngineCanvas">
        <EngineCanvas
        :isEditPj="isEditPj"
        :isInvitePj="isInvitePj"
        @pjEdit='pjEdit'
        @pjInvite='pjInvite'
        :NovelPlot="NovelPlot"
        :nowPlot="nowPlot"
        @savePlot="savePlot"
        @deletePlot="deletePlot"
        @pjSave="pjSave"
        ref="canvas" >
        </EngineCanvas>
      </div>
      <div class="PlotController">
        <PlotController
        :NovelPlot="NovelPlot"
        @addPlot="addPlot()"
        @selectPlot="selectPlot"
        :nowPlot="nowPlot"
        ref="controller"/>
      </div>
    </div>
</template>

<script>
import PlotController from './W_PlotController.vue'
import EngineCanvas from './W_EngineCanvas.vue'
import storage from '../../../../aws'
import timestamp from '../../../../timestamp'
export default {
  name: 'W_EngineInner',
  created(){
    this.pjCode = this.$route.params.pjCode;
    this.getData();
    this.editPj=this.isEditPj
    this.invitePj=this.isInvitePj
  },
  components: {
    PlotController,
    EngineCanvas,
  },
  props:{
    isEditPj : Boolean,
    isInvitePj : Boolean
  },
  data(){
    return {
      editPj:false,
      invitePj:false,

      pjCode : "",

      NovelPlot : [],
      nowPlot : null
    }
  },
  methods:{
    pjEdit: function(bool){
      this.$emit('pjEdit',bool)
    },
    pjInvite: function(bool){
      this.$emit('pjInvite',bool)
    },

    async getData() {
      var result = await storage.getJson(`PJ${this.pjCode}/PJ${this.pjCode}.json`);
      var uint8array = new TextEncoder("utf-8").encode(result); // utf8 형식으로 변환
      var string = new TextDecoder().decode(uint8array);
      var data = JSON.parse(string);

      if(Object.keys(data).length != 0) {
        this.NovelPlot = data;
        this.nowPlot = 0;
      } else {
        this.addPlot();
      }
    },

    addPlot() {
      var newCode = Date.now() + Math.random();
      newCode = newCode.toString();
      newCode = newCode.split('.')
      newCode = newCode[1];

      this.NovelPlot.push({
        title : "새 플롯",
        content : "새 텍스트",
        retouchTime : "-",
        plCode : newCode
      })
    },
    selectPlot(plCode) {
      var index = this.NovelPlot.findIndex(p => p.plCode == plCode);
      this.nowPlot = index;
    },
    savePlot(data) {
      if(data.title == "") {
        data.title = "무제"
      }
      this.NovelPlot[this.nowPlot].title = data.title;
      this.NovelPlot[this.nowPlot].content = data.content;
      this.NovelPlot[this.nowPlot].retouchTime = timestamp.getTimestamp();

    },
    deletePlot() {
      if(this.NovelPlot.length != 1) {
        let index = this.nowPlot;
        this.NovelPlot.splice(this.nowPlot, 1);
        this.nowPlot = index - 1;
        if(this.nowPlot == -1) {
          this.nowPlot = index;
          this.$refs.canvas.plotMove();
        }
      } else {
        this.$store.commit('gModalOn', {size : "normal", msg : "삭제를 위해 최소 2개의 플롯이 필요합니다."});
      }
    },

    async pjSave() {
      var data = JSON.stringify(this.NovelPlot);
      var fileName = `PJ${this.pjCode}.json`
      var properties = {type:'text/plain'};

      var file = new File([data], fileName, properties); //새로운 파일 객체 생성
      console.log(file);

      var result = await storage.uploadFile(`PJ${this.pjCode}/`, file);
      console.log(result);
    }

  },
  watch: {
    editPj(edit, pre){
      console.log('변화됨 :' + edit + " " + pre)
      if(!edit){
        this.$router.go();
      }
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
</style>