<template>
<div v-if="tModalState">

    <div class="modal_opacity">
    </div>

  <div v-bind:class="{[`Tmodal_frame`]:true}">
    <div class="Tmodal_inner">
      <div class="TmodalTitle"><p>{{msg}}</p></div>
      <div class="Tmodal_ButtonPosition">
        <div class="Tmodal_type_button" @click="inputType(option[Object.keys(option)[0]])">
          <span class="Tmodal_type_ok">{{Object.keys(option)[0]}}</span>
        </div>
        <div class="Tmodal_type_button" @click="inputType(option[Object.keys(option)[1]])">
          <span class="Tmodal_type_ok">{{Object.keys(option)[1]}}</span>
        </div>
      </div>


      <div class="Tmodal_cancel_button" @click="modalClose()">
        <span class="Tmodal_cancel_ok">닫기</span>
      </div>
    </div>


  </div>

</div> 
</template>

<script>
export default {
  name : "TypeModal",
  data() {
    return {
      // 모달 데이터
      tModalState : false,
      tModalSize : "",
      msg : "",
      option : {},
      data : {}
    }
  },
  methods : {
    modalClose() {
      this.tModalState = false; 
      this.input = "";
    },
    show(option = {}) {
      this.tModalState = true;
      this.tModalSize = option.size;
      this.msg = option.msg;
      this.option = option.option;
      this.data = option.data
    },
    inputType(type) {
      this.$emit("inputResource",this. data, type)
      this.tModalState = false;
    },
  },
}
</script>

<style>

.Tmodal_frame{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 200px;
  border-radius: 25px;
  background: #2a2a2a;
  animation-duration: 0.7s;
  animation-name: Iopening;
  opacity: 1;
  z-index: 100;
}

.Tmodal_inner{
  color: white;
  position: fixed;
  top: 45%;
  left: 50%;
  width: 100%;
  height: 200px;
  transform: translate(-50%, -50%);
}

.TmodalTitle {
  left: 50%;
  top: 90px;
  width: 100%;
  position: absolute;
  transform: translate(-50%, -50%);
  text-align: center;
}

.TnputModalTitle p{
  width: 100%;
  color: white;
}

.Tmodal_inputTag input {
  width: 300px;
  height: 40px;
  border-radius: 10px;
  border: none;

}

.Tmodal_ButtonPosition {
  width: 100%;
  height: 60px;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  text-align: center;
}

.Tmodal_type_button{
  position: relative;
  width: 100px;
  height: 40px;
  background: #2872f9;
  border-radius: 20px;
  z-index: 2;
  display: inline-block;
  cursor: pointer;
  margin: 7px;
}

.Tmodal_cancel_button{
  width: 15%;
  height: 13%;
  background: #ff4c4c;
  border-radius: 20px;
  z-index: 2;
  display: table;
  position: fixed;
  top: 18%;
  left: 88%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.Tmodal_type_ok{
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.Tmodal_cancel_ok{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
}
/* 애니메이션들,*/
  /*열리는 애니메이션 opening*/
@keyframes Iopening {
  from {
    top:150%;
    opacity: 0;
  }

  to {
    top:50%;
    opacity: 1;
  }
}
  /*배경을 만드는 backgrounding_on*/
@keyframes Ibackgrounding_on {
  from {
    opacity: 0;
  }
    
  to {
    opacity: 0.3;
  }
}

</style>

