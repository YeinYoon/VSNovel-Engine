<template>
<!--사이드바가 sideBarButton에 의해 true로 열리면 sideBarOn 으로 변경, false 땐 sideBarOff로 변경-->
<div v-bind:class="{[`${this.$store.state.sideBarState}`]:true}"> 

  <div v-if="this.$store.state.sideMenuState == 'M'">
    <SideMainScreen :userId="$store.state.userId"></SideMainScreen>
  </div>

  <div v-else-if="this.$store.state.sideMenuState == 'E'">
    <VsideEpisode :pjCode="pjCode" :epNum="epNum" @sendEp="sendEp"></VsideEpisode>
  </div>

  <div v-else-if="this.$store.state.sideMenuState == 'C'">
    <VsideCoop :pjCode="pjCode"></VsideCoop>
  </div>

  <div v-else-if="this.$store.state.sideMenuState == 'R'">
    <VsideResource :pjCode="pjCode" @send="send"></VsideResource>
  </div>

  <div v-else-if="this.$store.state.sideMenuState == 'S'">
    <VsideSetting :pjCode="pjCode"></VsideSetting>
  </div>

  <div class="sideBarButton" @click="sideBarClick()">
    <div class="sideBarBar"></div>
  </div>
</div>
</template>

<script>
import VsideCoop from '../side/Visual/V_side_coop.vue'
import VsideResource from '../side/Visual/V_side_resource.vue'
import VsideSetting from '../side/Visual/V_side_setting.vue'
import SideMainScreen from '../side/index/side_mainscreen.vue'
import VsideEpisode from '../side/Visual/V_side_episode.vue'
export default {
  name : "SideBar",
  data() {
    return {
      pjCode  : null,
    }
  },
  components : {
    VsideCoop,
    VsideResource,
    VsideSetting,
    VsideEpisode,
    SideMainScreen,
  },
  props:{
    main: Boolean,
    side: Boolean,
    sideBarStatus : String,
    epNum : Number
  },
  methods : {
    sideBarClick() {
      if(this.$store.state.sideMenuState != 'N') {

        if(this.$store.state.sideBar == false) {

          if(this.sideBarStatus == 'Main') {
            this.$store.commit('sideMenuOnMain');
            this.$store.commit('sideAnimationFixed');
          }
          else {
            this.$store.commit('sideMenuOn');
            this.$store.commit('sideAnimationFixed');
          }

        } else {

          if(this.sideBarStatus == 'Main') {
            this.$store.commit('sideMenuOffMain');
            this.$store.commit('sideAnimationFixed');
          }
          else {
            this.$store.commit('sideMenuOff');
            this.$store.commit('sideAnimationFixed');
          }

        }
      }
    },
    send(data){
      console.log(data)
      this.$emit('send',data)
    },
    sendEp(ep){
      this.$emit("sendEp",ep)
    }
  },
  watch:{
    $route() {
      this.pjCode = this.$route.params.pjCode;
    },
    sideBarStatus(cng, pre) {
      console.log(pre, "->", cng);
      // this.sideBarClick();
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
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
}

.sideBarOffMain {
  display:table;
  background:#2c2c2c;
  width: 300px;
  height: 100vh;
  animation-name: sideBarMainOff;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
}

.sideBarOn {
  display:table;
  background:#2c2c2c;
  width: 295px;
  height: 100vh;
  /* overflow: auto; */
  animation-name: sideBarOn;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
}

.sideBarOff {
  display:table;
  background:#2c2c2c;
  width: 295px;
  height: 100vh;
  animation-name: sideBarOff;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
}

.sideBarButton {
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 100px;
  color: white;
  background: #353535;
  border-radius: 10px;
  cursor: pointer;
  z-index: 99;
}

.sideBarButton span{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.sideBarBar {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 50%;
  background: rgb(166, 166, 166);
  border-radius: 5px;
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