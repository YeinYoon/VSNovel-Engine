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


</div>

  <div v-bind:class="{[`${this.sideButtonCondition}`]:true}" @click="sideBarClick()">
    <span class="sideBarButtonSpan">{{btnIcon}}</span>
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
      condition : "sideBarOffMain",
      sideButtonCondition : "sideBarButtonOff"
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
        this.sideButtonCondition = "sideBarButtonOff"
      } else {
        this.btnIcon = "◀"
        this.$emit("cngSide",!this.side)
        this.sideButtonCondition = "sideBarButtonOn"
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
        this.sideButtonCondition+="Main"
      }
    },
    main(){
      this.condition = ((this.side)?"sideBarOn":"sideBarOff")
      if(this.main){
        this.condition+="Main"
        this.sideButtonCondition+="Main"
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
  animation-name: sideBarMainOn;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  position: fixed;
}

.sideBarOffMain {
  display:table;
  background:#2c2c2c;
  width: 300px;
  height: 100vh;
  animation-name: sideBarMainOff;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  position: fixed;
}

.sideBarOn {
  display:table;
  background:#2c2c2c;
  width: 295px;
  height: 100vh;
  /* overflow: auto; */
  animation-name: sideBarOn;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  position: absolute;
}

.sideBarOff {
  display:table;
  background:#2c2c2c;
  width: 295px;
  height: 100vh;
  animation-name: sideBarOff;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  position: absolute;
}


.sideBarButtonOn {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 120px;
  color: white;
  background: #5e5e5e;
  border-radius: 10px;
  cursor: pointer;
  z-index: 3;
  animation-name: sideBarButtonOn;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}

.sideBarButtonOff {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 120px;
  color: white;
  background: #5e5e5e;
  border-radius: 10px;
  cursor: pointer;
  z-index: 3;
  animation-name: sideBarButtonOff;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}

.sideBarButtonOnMain {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 120px;
  color: white;
  background: #5e5e5e;
  border-radius: 10px;
  cursor: pointer;
  z-index: 3;
  animation-name: sideBarButtonOnMain;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}

.sideBarButtonOffMain {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 120px;
  color: white;
  background: #5e5e5e;
  border-radius: 10px;
  cursor: pointer;
  z-index: 3;
  animation-name: sideBarButtonOffMain;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}

.sideBarButtonSpan{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


@keyframes sideBarOn {
  from {
      left: -165px;
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

@keyframes sideBarButtonOn {
  from {
    left: 130px;
  }
  to {
    left: 415px;
  }
  
}

@keyframes sideBarButtonOff {
  from {
    left: 415px;
  }
  to {
    left: 130px;
  }
  
}

@keyframes sideBarButtonOnMain {
  from {
    left: 20px;
  }
  to {
    left: 300px;
  }
  
}

@keyframes sideBarButtonOffMain {
  from {
    left: 300px;
  }
  to {
    left: 20px;
  }
  
}
</style>