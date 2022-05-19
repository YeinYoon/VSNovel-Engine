<template>
<div v-if="gModalState">
    <div class="modal_opacity">
    </div>
  <!-- 모달창이 나올떄 뒷 배경을 흐리게 만드는 녀석
  이걸 안쓰고 싶을땐 단순히 modal_opacity만을 주석처리하면 된다.-->
  <!-- 모달창의 크기를 결정하는 modal_frame-->
  <div v-bind:class="{[`Gmodal_frame_${this.$store.state.gModalSize}`]:true}">
    <!--모달 내 메세지 및 컨텐츠인 modal_inner, 여기에 단순히 메세지만을 표시할수도 
    작은 컴포넌트를 삽입할수도 있따.-->
    <div class="Gmodal_inner">
      <span>{{this.$store.state.gModalMsg}}</span> <!--메세지를 출력-->
    </div>
      <!--모달을 닫는 버튼과 버튼내 메세지(확인, 취소 등등)-->
    <div class="Gmodal_close_button">
      <span class="Gmodal_close_ok" @click="modalClose()">확인</span>
    </div>
  </div>  
</div>
</template>
<style>
.modal_opacity{
  background: black;
  width: calc(100vw + 120px);
  height: 100vh;
  opacity: 0;
  z-index: 5;
  position: fixed;
  animation-duration: 0.3s;
  animation-name: backgrounding_on;
  animation-fill-mode: forwards;
  left: -120px;
}

.Gmodal_frame_normal{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 200px;
  border-radius: 25px;
  background: #2a2a2a;
  animation-duration: 0.7s;
  animation-name: Gopening;
  z-index: 100;
  opacity: 1;
}
.Gmodal_frame_small{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 125px;
  border-radius: 25px;
  background: #2a2a2a;
  animation-duration: 0.7s;
  animation-name: Gopening;
  z-index: 100;
  opacity: 1;
}
.Gmodal_frame_big{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 400px;
  border-radius: 25px;
  background: #2a2a2a;
  animation-duration: 0.7s;
  animation-name: Gopening;
  z-index: 100;
  opacity: 1;
}
.Gmodal_inner{
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.Gmodal_close_button{
  width: 40%;
  height: 15%;
  background: #2872f9;
  border-radius: 20px;
  z-index: 2;
  display: table;
  position: fixed;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.Gmodal_close_ok{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
  cursor: pointer;
}
/* 애니메이션들,*/
  /*열리는 애니메이션 opening*/
@keyframes Gopening {
  from {
    top:150%;
    opacity: 0;
  }

  to {
    top:50%;
    opacity: 1;
  }
}

@keyframes backgrounding_on {
  from {
  }

  to {
    opacity: 0.3;
  }
}

  /*배경을 만드는 backgrounding_on*/


</style>
<script>
export default {
  name: 'GlobalModal',
  methods : {
    modalClose() {
      this.$store.commit('gModalOff');
    }
  },
  props: {
    gModalState: {
      type: Boolean,
      required: true
    }
  }
}
  
</script>

