<template>
  <div v-bind:class="{'mainmenu':true}">
    <div v-bind:class="{'menus':true}">
      <div v-bind:class="{'menubox':true}">
        <img class="menubox_icon_resource" src="../../assets/icons/white/folder.png">
      </div>
      <br>
      <div v-bind:class="{'menubox':true}">
        <img class="menubox_icon_text" src="../../assets/icons/white/comment_two.png">
      </div>
      <br>
      <div v-bind:class="{'menubox':true}">
        <img class="menubox_icon_event" src="../../assets/icons/white/clapperboard.png">
      </div>
      <br>
      <div v-bind:class="{'menubox':true }">
        <img class="menubox_icon_scene" src="../../assets/icons/white/background_two.png">
      </div>
      <br>
      <div v-bind:class="{'menubox':true}">
        <img class="menubox_icon_cooperation" src="../../assets/icons/white/handshake.png">
      </div>
      <br>
      <div v-bind:class="{'menubox':true}">
        <img class="menubox_icon_setting" src="../../assets/icons/white/gear.png">
      </div>
      <br>
      <div v-bind:class="{'menubox_active':true}" @click="this.$router.push('/')">
        <img class="menubox_icon_mainscreen" src="../../assets/icons/white/home.png">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MainBar',
    data() {
      return{
      }
    }
  }
</script>

<style>
.mainmenu {
  display:table;
  background:#262626;
  left: 45px;
  width: 100%;
  height: 100vh;
  text-align: center;
  overflow:auto;
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
  margin-top: 10px;
  width: 75px;
  height: 75px;
  border-radius: 20px;
}
.menubox:hover{
  background: #5a5a5a;
}
.menubox_active{
  display:inline-table;
  margin-top: 10px;
  width: 75px;
  height: 75px;
  border-radius: 20px;
  background: #2872f9;
}

.menubox_icon_resource {
  position: relative;
  top: 12px;
  left: 4px;
  width: 50px;
  height: 50px;
}
.menubox_icon_text {
  position: relative;
  top: 13px;
  left: 1px;
  width: 50px;
  height: 50px;
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
</style>