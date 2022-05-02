<template>
    <div class="enginebackground">
      <div class="EngineCanvas">
        <EngineCanvas :isEditPj="isEditPj" :isInvitePj="isInvitePj" @pjEdit='pjEdit' @pjInvite='pjInvite' ref="canvas" :NovelPlot="NovelPlot">
        </EngineCanvas>
      </div>
      <div class="PlotController" :NovelPlot="NovelPlot">
        <PlotController/>
      </div>
    </div>
</template>

<script>
import PlotController from './W_PlotController.vue'
import EngineCanvas from './W_EngineCanvas.vue'
import storage from '../../../../aws'
export default {
  name: 'W_EngineInner',
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

      NovelPlot : [
        {
          title : "챕터 제목",
          content : "텍스트",
          retouchTime : "-",
          index : 0
        },
      ]
    }
  },
  created(){
    this.pjCode = this.$route.params.pjCode;
    this.getData();

    this.editPj=this.isEditPj
    this.invitePj=this.isInvitePj
  },
  methods:{
    pjEdit: function(bool){
      console.log('hihihihihih'+ bool)
      this.$emit('pjEdit',bool)
    },
    pjInvite: function(bool){
      this.$emit('pjInvite',bool)
    },


    async getData() {
      var result = await storage.getJson(`PJ${this.pjCode}/PJ${this.pjCode}.json`);
      var uint8array = new TextEncoder("utf-8").encode(result); // utf8 형식으로 변환
      var string = new TextDecoder().decode(uint8array);
      console.log(JSON.parse(string));
      var data = JSON.parse(string);

      if(Object.keys(data).length != 0) {
        this.NovelPlot = data;
      } 
      
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