<template>
<div v-if="tModalState">

    <div class="modal_opacity">
    </div>

  <div v-bind:class="{[`Tmodal_frame`]:true}">
    <div class="InputModalTitle"><p>{{msg}}</p></div>
    <div class="Tmodal_type1_button" @click="inputType('bg')">
      <span class="Tmodal_type_ok">배경</span>
    </div>
    <div class="Tmodal_type2_button" @click="inputType('img')">
      <span class="Tmodal_type_ok">이미지</span>
    </div>

    <div class="Tmodal_cancel_button" @click="modalClose()">
      <span class="Tmodal_cancel_ok">닫기</span>
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
      msg : ""
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
    },
    inputType(type) {
      console.log(type)
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
  width: 500px;
  height: 170px;
  transform: translate(-50%, -50%);
}

.Tmodal_inputTag {
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
}

.TnputModalTitle {
  left: 50%;
  top: 50px;
  position: absolute;
  transform: translate(-50%, -50%);
}

.TnputModalTitle p{
  color: white;
}

.Tmodal_inputTag input {
  width: 300px;
  height: 40px;
  border-radius: 10px;
  border: none;

}

.Tmodal_type_button{
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
  cursor: pointer;
}
.Tmodal_cancel_button{
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
  cursor: pointer;
}
.Tmodal_save_ok{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
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

