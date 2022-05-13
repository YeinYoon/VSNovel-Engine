<template>
<!--사이드바가 sideBarButton에 의해 true로 열리면 sideBarOn 으로 변경, false 땐 sideBarOff로 변경-->
<div v-bind:class="{[`${this.condition}`]:true}"> 

  <div v-if="this.$store.state.sideMenuState == 'C'">
    <VsideCoop :pjCode="pjCode"></VsideCoop>
  </div>

  <div v-else-if="this.$store.state.sideMenuState == 'R'">
    <VsideResource :pjCode="pjCode"></VsideResource>
  </div>

  <div v-else-if="this.$store.state.sideMenuState == 'S'">
    <VsideSetting :pjCode="pjCode"></VsideSetting>
  </div>

  <div v-else>
    메인화면 사이드
  </div>

  <div class="sideBarButton" @click="sideBarClick()">
    <span>{{btnIcon}}</span>
  </div>
</div>
</template>

<script>
import VsideCoop from '../side/Visual/V_side_coop.vue'
import VsideResource from '../side/Visual/V_side_resource.vue'
import VsideSetting from '../side/Visual/V_side_setting.vue'
export default {
  name : "SideBar",
  data() {
    return {
      pjCode  : null,
      btnIcon : "▶",//▶◀
      condition : "sideBarOffMain"
    }
  },
  components : {
    VsideCoop,
    VsideResource,
    VsideSetting
  },
  props:{
    main: Boolean,
    side: Boolean
  },
  methods : {
    sideBarClick() {
      if(this.side) {
        this.btnIcon = "▶"
        this.$emit("cngSide",!this.side)
      } else {
        this.btnIcon = "◀"
        this.$emit("cngSide",!this.side)
      }
    }
  },
  watch:{
    $route() {
      this.pjCode = this.$route.params.pjCode;
    },

    side(){
      this.condition = ((this.side)?"sideBarOn":"sideBarOff")
      if(this.main){
        this.condition+="Main"
      }
    },
    main(){
      this.condition = ((this.side)?"sideBarOn":"sideBarOff")
      if(this.main){
        this.condition+="Main"
      }
    }
  }
}
</script>

<style>
.sideBarOnMain {
  display:table;
  background:#2c2c2c;
  width: 300px;
  height: 100vh;
  text-align: center;
  overflow:auto;
  animation-name: sideBarMainOn;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}

.sideBarOffMain {
  display:table;
  background:#2c2c2c;
  width: 300px;
  height: 100vh;
  text-align: center;
  overflow:auto;
  animation-name: sideBarMainOff;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}

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

@keyframes sideBarMainOn {
  from {
      left: -280px;
  }
  to {
      left: 0px;
  }
}

@keyframes sideBarMainOff {
  from {
      left: 0px;
  }
  to {
      left: -280px;
  }
}
</style>