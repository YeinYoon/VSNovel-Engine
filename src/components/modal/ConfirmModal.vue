<template>
<div v-if="cModalState">
  <!-- 모달창이 나올떄 뒷 배경을 흐리게 만드는 녀석
  이걸 안쓰고 싶을땐 단순히 modal_opacity만을 주석처리하면 된다.-->
  <div class="modal_opacity">
  </div>
  <!-- 모달창의 크기를 결정하는 modal_frame,
  모달창의 크기 또한 파라미터로 받아서 나오게 할수도 있겠다. 쓰는사람 마음대로-->
  <div v-bind:class="{[`modal_frame_${this.cModalSize}`]:true}">
    <!--모달 내 메세지 및 컨텐츠인 modal_inner, 여기에 단순히 메세지만을 표시할수도 
    작은 컴포넌트를 삽입할수도 있따.-->
    <div class="modal_inner">
      <span>{{this.cModalMsg}}</span> <!--메세지를 출력하는 예제-->
    </div>
      <!--모달을 닫는 버튼과 버튼내 메세지(확인, 취소 등등)-->
    <div class="modal_save_button" @click="modalCloseY()">
      <span class="modal_save_ok">{{this.cModalBtn1}}</span>
    </div>
    <div class="modal_cancel_button" @click="modalCloseN()">
      <span class="modal_cancel_ok">{{this.cModalBtn2}}</span>
    </div>
  </div>  
</div>
</template>

<script>
export default {
  name : "ConfirmModal",
  data() {
    return {
      // 모달 데이터
      cModalState : false,
      cModalSize : "",
      cModalMsg : "",
      cModalBtn1 : "",
      cModalBtn2 : "",

      // 응답 프로미스
      resolvePromise: undefined,
      rejectPromise: undefined,
    }
  },
  methods : {
    show(option = {}) {
      this.cModalState = true;

      this.cModalSize = option.size;
      this.cModalMsg = option.msg;
      this.cModalBtn1 = option.btn1;
      this.cModalBtn2 = option.btn2;

      return new Promise((resolve, reject)=>{
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },
    modalCloseY() {
      this.cModalState = false;
      this.resolvePromise(true)
    },
    modalCloseN() {
      this.cModalState = false; 
      this.resolvePromise(false)
    }
  },
}
</script>

<style>
.modal_opacity{
  background: black;
  width: 100vw;
  height: 100vh;
  opacity:0;
  z-index: 99;
  position: fixed;
  animation-duration: 0.3s;
  animation-name: backgrounding_on;
  animation-fill-mode: forwards;
  z-index: 1;
}
.modal_frame_normal{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 200px;
  border-radius: 25px;
  background: #2a2a2a;
  animation-duration: 0.7s;
  animation-name: opening;
  z-index: 100;
  opacity: 1;
}
.modal_frame_small{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 125px;
  border-radius: 25px;
  background: #2a2a2a;
  animation-duration: 0.7s;
  animation-name: opening;
  z-index: 100;
  opacity: 1;
}
.modal_frame_big{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 400px;
  border-radius: 25px;
  background: #2a2a2a;
  animation-duration: 0.7s;
  animation-name: opening;
  z-index: 100;
  opacity: 1;
}
.modal_inner{
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal_save_button{
  width: 25%;
  height: 20%;
  background: #2872f9;
  border-radius: 20px;
  z-index: 2;
  display: table;
  position: fixed;
  top: 85%;
  left: 35%;
  transform: translate(-50%, -50%);
}
.modal_cancel_button{
  width: 25%;
  height: 20%;
  background: #2872f9;
  border-radius: 20px;
  z-index: 2;
  display: table;
  position: fixed;
  top: 85%;
  left: 65%;
  transform: translate(-50%, -50%);
}
.modal_save_ok{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
}
.modal_cancel_ok{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
}
/* 애니메이션들,*/
  /*열리는 애니메이션 opening*/
@keyframes opening {
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
@keyframes backgrounding_on {
  from {
    opacity: 0;
  }
    
  to {
    opacity: 0.3;
  }
}

</style>

