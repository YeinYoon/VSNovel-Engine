<template>
  <div class="CanvasBackground">
    <div class="Project_Header">
      <span>웹소설 - 프로젝트명</span>  
    </div>
    <div class="WN_Editor">
      에디터
    </div>

    <div class="SaveButton"> 
      <button>현재 상태 저장</button>
    </div>

    <div class="ExportButton"> 
      <button>프로젝트 내보내기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'W_EngineCanvas',
}
</script>

<style>
.CanvasBackground {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.Project_Header {
  position: absolute;
  font-size: 2em;
}

.WN_Editor {
  background: white;
  position: absolute;
  width: calc(100% - 40px);
  height: calc(100% - 190px);
  padding: 10px;
  color: black;
  border-radius: 25px;
  top: 80px;
}

.SaveButton {
  width: 120px;
  height: 40px;
  position: absolute;
  left: calc(100% - 140px);
}

.SaveButton button{
  background: #2872f9;
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 20px;
  color: white;
}

.ExportButton {
  width: 140px;
  height: 40px;
  position: absolute;
  top: calc(100% - 90px);
}

.ExportButton button {
  background: #2872f9;
  width: 140px;
  height: 40px;
  border: none;
  border-radius: 20px;
  color: white;
}
</style>