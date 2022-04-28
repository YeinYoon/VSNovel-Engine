<template>
<!--사이드바가 sideBarButton에 의해 true로 열리면 sideBarOn 으로 변경, false 땐 sideBarOff로 변경-->
 <div v-bind:class="{[`${this.$store.state.sideBarState}`]:true}"> 
     123



     <div class="sideBarButton" @click="sideBarClick()">
       <span>{{btnIcon}}</span>
     </div>
 </div>
</template>

<script>
export default {
  name : "SideBar",
  data() {
    return {
      btnIcon : "▶" 
    }
  },
  methods : {
    sideBarClick() {
      if(this.$store.state.sideBar == false) {
        this.$store.commit('sideMenuOn');
        this.btnIcon = "◀"
      } else {
        this.$store.commit('sideMenuOff');
        this.btnIcon = "▶"
      }
    }
  }
}
</script>

<style>
.sideBarOn {
  display:table;
  background:#2c2c2c;
  width: 300px;
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
  width: 300px;
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
  left: 100%;
  transform: translate(-50%, -50%);
  width: 25px;
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
      left: -150px;
  }
  to {
      left: 100px;
  }
}

@keyframes sideBarOff {
  from {
      left: 100px;
  }
  to {
      left: -165px;
  }
}
</style>