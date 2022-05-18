<template>
<div v-if="FMModalState">

  <div v-bind:class="{[`FMmodal_frame`]:true}">
    <div class="FMnputModalTitle"><p>{{msg}}</p></div>

    <div class="FMmodal_inner">
      <div class="FMmodal_inputTag"><input v-model="input"></div>
    </div>

    <div class="FMmodal_save_button" @click="inputVal()">
      <span class="FMmodal_save_ok">확인</span>
    </div>

    <div class="FMmodal_cancel_button" @click="modalClose()">
      <span class="FMmodal_cancel_ok">취소</span>
    </div>

  </div>

</div> 
</template>

<script>
export default {
  name : "FMnputModal",
  data() {
    return {
      // 모달 데이터
      iModalState : false,
      iModalSize : "",
      msg : "",
      input : "",
    }
  },
  methods : {
    inputVal() {
      if(this.input == "") {
        console.log("폴더 이름이 비어있음");
      } else {
        this.$emit('inputRes', this.input);
        this.modalClose();
      }
      
    },
    modalClose() {
      this.iModalState = false; 
    },
    show(option = {}) {
      this.iModalState = true;
      this.iModalSize = option.size;
      this.msg = option.msg;
    },

  },
}
</script>

<style>

.FMmodal_frame{
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
  z-index: 100;
  opacity: 1;
}

.FMmodal_inner{
  color: white;
  position: fixed;
  top: 45%;
  left: 50%;
  width: 500px;
  height: 170px;
  transform: translate(-50%, -50%);
}

.FMmodal_inputTag {
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
}

.FMnputModalTitle {
  left: 50%;
  top: 50px;
  position: absolute;
  transform: translate(-50%, -50%);
}

.FMnputModalTitle p{
  color: white;
}

.FMmodal_inputTag input {
  width: 300px;
  height: 40px;
  border-radius: 10px;
  border: none;

}

.FMmodal_save_button{
  width: 25%;
  height: 20%;
  background: #2872f9;
  border-radius: 20px;
  z-index: 2;
  display: table;
  position: fixed;
  top: 82%;
  left: 35%;
  transform: translate(-50%, -50%);
}
.FMmodal_cancel_button{
  width: 25%;
  height: 20%;
  background: #ff4c4c;
  border-radius: 20px;
  z-index: 2;
  display: table;
  position: fixed;
  top: 82%;
  left: 65%;
  transform: translate(-50%, -50%);
}
.FMmodal_save_ok{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
}
.FMmodal_cancel_ok{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
}
/* 애니메이션들,*/
  /*열리는 애니메이션 opening*/
@keyframes FMopening {
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
@keyframes FMbackgrounding_on {
  from {
    opacity: 0;
  }
    
  to {
    opacity: 0.3;
  }
}

</style>

