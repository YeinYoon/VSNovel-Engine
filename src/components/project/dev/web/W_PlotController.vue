<template>
  <div class="PCBackground">
    <div class="PlotList">

      <div class="PlotBlock" v-for="(p, i) in NovelPlot" :key="i" @click="this.$emit('selectPlot', p.plCode);">
        <div v-if="i == nowPlot">
          <p class="PlotTitle_now">{{p.title}}</p>
          <p class="PlotTime_now">{{p.retouchTime}}</p>
        </div>
        <div v-else>
          <p class="PlotTitle">{{p.title}}</p>
          <p class="PlotTime">{{p.retouchTime}}</p>
        </div>
      </div> 

      <div class="PlotBlock" @click="this.$emit('addPlot');"> <!--엔드블록-->
        <div class="PlotAddButton">
          <img class="" src="@/assets/icons/white/plus.png">
        </div>
      </div> 

    </div>

  </div>
</template>

<script>
export default {
  name: 'W_PlotController',
  props : {
    NovelPlot : Object,
    nowPlot : Number,
  },
  data() {
    return {
      
    }
  },
  methods : {

  }
}
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
  height: 100%;
  padding: 10px;
}

.PlotBlock {
  position: relative;
  display: inline-block;
  margin-bottom: 5px;
  border-radius: 10px;
  width: 100%;
  height: 90px;
  background: rgb(90, 90, 90);
  cursor: pointer;
}

.PlotBlock:nth-child(nowPlot) {
  position: relative;
  display: inline-block;
  margin-bottom: 5px;
  border-radius: 10px;
  width: 100%;
  height: 90px;
  background: rgb(90, 90, 90);
  cursor: pointer;
}

.PlotTitle {
  position: absolute;
  left: 15px;
  top: 10px;
}

.PlotTime {
  position: absolute;
  left: 15px;
  top: 35px;
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
  top: 35px;
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

.PlotAddButton {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.PlotAddButton img{
  width: 40px;
  height: 40px;
}

.PlotBlock:hover {
  opacity: 0.9;
}
</style>