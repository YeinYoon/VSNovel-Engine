<template>
  <div class="PCBackground">
    <div class="PlotList">

      <div class="PlotBlock"> <!--플롯 블록 -->

        <p class="PlotTitle">플롯제목</p> <!-- 플롯 제목 출력부 -->
        <p class="PlotTime">시간</p> <!-- 플롯 수정시간 출력부 -->

        <!-- 플롯의 순서 -->
        <div class="PlotNumberIcon"> 
          <p class="PlotNumber">1</p>
        </div>
         <!-- 플롯의 순서 -->

        <!-- <div class="PlotNumberControl"> 
          <button class="NumberShiftUp">▲</button>
          <button class="NumberShiftDown">▼</button>
        </div> -->

      </div> <!--플롯 블록 -->

      <div class="PlotBlock">
        <p class="PlotTitle">플롯제목</p>
        <p class="PlotTime">시간</p>

        <div class="PlotNumberIcon">
          <p class="PlotNumber">1</p>
        </div>
      </div> 

      <div class="PlotBlock">

        <p class="PlotTitle">플롯제목</p>
        <p class="PlotTime">시간</p>

        <div class="PlotNumberIcon">
          <p class="PlotNumber">1</p>
        </div>

      </div> 

      <div class="PlotBlock"> <!--엔드블록-->
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
  created() {
    
  },
  data() {
    return {
      pjCode : "",
      
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