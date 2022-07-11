<template>
<div v-if="!main"> <!-- 스토어 조건문 달아주셈 -->
  <div v-bind:class="{'mainmenu':true}">
    <div v-bind:class="{'menus':true}">


      <div :class="[Menu1]" @click="openMenu('E')">
        <img class="menubox_icon_episode" src="../../assets/icons/white/book.png">
      </div>

      <div :class="[Menu2]" @click="openMenu('R')">
        <img class="menubox_icon_resource" src="../../assets/icons/white/folder.png">
      </div>

      <div :class="[Menu3]" @click="openMenu('C')">
        <img class="menubox_icon_cooperation" src="../../assets/icons/white/handshake.png">
      </div>

      <div :class="[Menu4]" @click="openMenu('S')">
        <img class="menubox_icon_setting" src="../../assets/icons/white/gear.png">
      </div>

      <div :class="[Menu5]" @click="this.$router.push('/')">
        <img class="menubox_icon_mainscreen" src="../../assets/icons/white/home.png">
      </div>

    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'MainBar',
    props:{
      main:Boolean
    },
    data() {
      return {
        Menu1 : 'menubox',
        Menu2 : 'menubox',
        Menu3 : 'menubox',
        Menu4 : 'menubox',
        Menu5 : 'menubox',
      }
    },
    methods : {
      openMenu(val) {
        this.$store.commit('sideMenuOn');
        switch(val) {
          case 'R' :
            this.$store.commit('cngSideMenu', 'R');
            this.Menu2 = 'menubox_active';
            this.Menu1 = 'menubox';
            this.Menu3 = 'menubox';
            this.Menu4 = 'menubox';
            break;
          case 'C' :
            this.$store.commit('cngSideMenu', 'C');
            this.Menu3 = 'menubox_active';
            this.Menu1 = 'menubox';
            this.Menu2 = 'menubox';
            this.Menu4 = 'menubox';
            break;
          case 'S' :
            this.$store.commit('cngSideMenu', 'S');
            this.Menu4 = 'menubox_active';
            this.Menu1 = 'menubox';
            this.Menu3 = 'menubox';
            this.Menu2 = 'menubox';
            break;
          case 'E' :
            this.$store.commit('cngSideMenu', 'E');
            this.Menu1 = 'menubox_active';
            this.Menu2 = 'menubox';
            this.Menu3 = 'menubox';
            this.Menu4 = 'menubox';
            break;
        }
      }
    }
  }
</script>

<style>
.mainmenu {
  position: absolute;
  display:table;
  background:#262626;
  left: 0px;
  width: 100%;
  height: 100vh;
  text-align: center;
  overflow:auto;
  animation-name: menuOn;
  animation-duration: 0.6s;
}
.menus{
  display:table-cell;
  vertical-align:middle;
  height: calc(100vh - 4vh);
  overflow:auto;
}
.menubox {
  background: #353535;
  display:inline-table;
  margin: 5% 0;
  width: 75px;
  height: 75px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s all ease;
}
.menubox:hover{
  background: #5a5a5a;
}
.menubox_active{
  display:inline-table;
  margin: 5% 0;
  width: 75px;
  height: 75px;
  border-radius: 20px;
  background: #2872f9;
  transition: 0.2s all ease;
}

.menubox_icon_resource {
  position: relative;
  top: 12px;
  left: 4px;
  width: 50px;
  height: 50px;
}
.menubox_icon_episode {
  position: relative;
  top: 6.5px;
  left: 1px;
  width: 60px;
  height: 60px;
}
.menubox_icon_event {
  position: relative;
  top: 12px;
  left: 1px;
  width: 50px;
  height: 50px;
}
.menubox_icon_scene {
  position: relative;
  top: 15px;
  left: 1px;
  width: 45px;
  height: 45px;
}
.menubox_icon_cooperation {
  position: relative;
  top: 10px;
  left: 0.5px;
  width: 55px;
  height: 55px;
}
.menubox_icon_setting {
  position: relative;
  top: 13px;
  left: 1px;
  width: 50px;
  height: 50px;
}
.menubox_icon_mainscreen {
  position: relative;
  top: 12px;
  left: 1px;
  width: 50px;
  height: 50px;
}

@keyframes menuOn {
  from {
    left: -170px;
  }
  to {
    left: 0px;
  }
}
</style>