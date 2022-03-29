<template>
<!--사이드바가 sideBarButton에 의해 true로 열리면 sideBarOn 으로 변경, false 땐 sideBarOff로 변경-->
 <div v-bind:class="{'sideBarOff':true}"> 
     123



     <div class="sideBarButton">
       <span>◀</span>
     </div>
 </div>
</template>

<script>
export default {

}
</script>

<style>
.sideBarOn {
  display:table;
  background:#2c2c2c;
  width: 160px;
  height: 100vh;
  text-align: center;
  overflow:auto;
  animation-name: sideBarOn;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}
.sideBarOff {
  display:table;
  background:#2c2c2c;
  width: 160px;
  height: 100vh;
  text-align: center;
  overflow:auto;
  animation-name: sideBarOff;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}


.sideBarButton {
  position: absolute;
  top: 50%;
  left: 105%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 120px;
  color: white;
  background: #5e5e5e;
  border-radius: 10px;
  cursor: pointer;
}
.sideBarButton span{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


@keyframes sideBarOn {
  from {
      left: -20px;
  }
  to {
      left: 120px;
  }
}

@keyframes sideBarOff {
  from {
      left: 120px;
  }
  to {
      left: -20px;
  }
}
</style>