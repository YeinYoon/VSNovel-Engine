<template>
  <div class="PCBackground">
    <div class="PlotList">

      <Draggable class="dragArea list-group w-full" :list="this.NovelPlot" @change="log">
        <div class="PlotBlock" v-for="(p, i) in NovelPlot" :key="i" @click="this.$emit('selectPlot', p.plCode);">
          <div v-if="i == nowPlot">
            <p class="PlotTitle_now">{{p.title}}</p>
            <p class="PlotTime_now">{{p.retouchTime}}</p>
            <div class="PlotDelButton" @click="this.$emit('deletePlot')"><img src="@/assets/icons/white/trash_white_two.png"></div>
          </div>
          <div v-else>
            <p class="PlotTitle">{{p.title}}</p>
            <p class="PlotTime">{{p.retouchTime}}</p>
          </div>
        </div> 
      </Draggable>

      <!-- <div class="PlotBlock" @click="this.$emit('addPlot');"> 
        <div class="PlotAddButton">
          <img class="" src="@/assets/icons/white/plus.png">
        </div>
      </div>  -->

    </div>
    <div class="PlotToolbar">
      <div class="PlotAddTool" @click="this.$emit('addPlot');"> 
        <div class="PlotToolButton">
          <img class="" src="@/assets/icons/white/plus.png">
        </div>
      </div>

      <div class="PlotMultiDelTool" @click="this.$emit('addPlot');"> 
        <div class="PlotToolButton">
          <img class="" src="@/assets/icons/white/plus.png">
        </div>
      </div> 

    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"
import { VueDraggableNext } from 'vue-draggable-next'
export default defineComponent({
  name: 'W_PlotController',
  props : {
    NovelPlot : Object,
    nowPlot : Number,
  },
  data() {
    return {
      enabled: true,
      dragging: false,
    }
  },
  methods : {
    log(evt) {
      console.log(evt);
      console.log(this.NovelPlot);
      this.$emit('indexCng', evt.moved.newIndex);
    }
  },
  components : {
    Draggable : VueDraggableNext
  }
})
</script>

<style>
.PCBackground {
  width: 100%;
  height: 100%;
}

.PlotList {
  position: absolute;
  left: 0px;
  width: 100%;
  height: 90%;
  padding: 10px;
  overflow: auto;
}

.PlotToolbar {
  position: absolute;
  top: calc(100% - 55px);
  left: 0px;
  width: 100%;
  height: calc(10% - 30px);
  padding: 10px;
}

.PlotAddTool {
  position: relative;
  display: inline-block;
  margin-bottom: 5px;
  margin-right: 5px;
  border-radius: 10px;
  width: 33%;
  height: 30px;
  background: rgb(90, 90, 90);
  transform: scale(1);
  transition: all ease 0.2s;
}

.PlotToolButton {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.PlotToolButton img{
  width: 20px;
  height: 20px;
}

.PlotMultiDelTool {
  position: relative;
  display: inline-block;
  margin-bottom: 5px;
  margin-left: 0px;
  border-radius: 10px;
  width: 33%;
  height: 30px;
  background: rgb(90, 90, 90);
  transform: scale(1);
  transition: all ease 0.2s;
}

.PlotBlock {
  position: relative;
  display: inline-block;
  margin-bottom: 5px;
  border-radius: 10px;
  width: 100%;
  height: 90px;
  background: rgb(90, 90, 90);
  transform: scale(1);
  transition: all ease 0.2s;
}

.PlotBlock:hover {
  transform: scale(1.02);

}

.PlotTitle {
  position: absolute;
  left: 15px;
  top: 10px;
}

.PlotTime {
  position: absolute;
  left: 15px;
  top: 30px;
}

.PlotTitle_now {
  position: absolute;
  color: #2872f9;
  left: 15px;
  top: 10px;
}
.PlotTime_now {
  position: absolute;
  color: #2872f9;
  left: 15px;
  top: 30px;
}

.PlotNumberIcon {
  position: absolute;
  left: calc(100% - 40px);
  top: 10px;
  width: 30px;
  height: 30px;
  background: #535353;
  border-radius: 15px;
  display: table;
}

.PlotNumber {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-weight: 700;
}

.PlotNumberControl {
  position: absolute;
  left: calc(100% - 85px);
  top: 50px;
}

.NumberShiftUp {
  width: 30px;
  height: 25px;
  margin: 5px;
  border-radius: 10px;
  font-size: 0.7em;
  background: #2872f9;
  color: white;
  border: none;
}

.NumberShiftDown {
  width: 30px;
  height: 25px;
  margin: 5px;
  border-radius: 10px;
  font-size: 0.7em;
  background: #2872f9;
  color: white;
  border: none;
}

.PlotDelButton {
  position: absolute;
  left: calc(100% - 35px);
  top: calc(100% - 35px);
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background: #464646;
  cursor: pointer;
}

.PlotDelButton img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
}
</style>