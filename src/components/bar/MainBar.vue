<template>
  <div v-bind:class="{'mainmenu':true}">
    <div v-bind:class="{'menus':true}">
      <div v-bind:class="{'menubox':true}">
        <img class="menubox_icon_mypage" src="../../assets/icons/white_logo.png">
      </div>
      <br>
      <div v-bind:class="{'menubox':true}">
        <img class="menubox_icon_library" src="../../assets/icons/white/library.png">
      </div>
      <br>
      <div v-bind:class="{'menubox':true}">
        <img class="menubox_icon_store" src="../../assets/icons/white/shopping-cart.png">
      </div>
      <br>
      <div v-bind:class="{'menubox':true }">
        <img class="menubox_icon_engine" src="../../assets/icons/white/engineering.png">
      </div>
      <br>
      <div v-bind:class="{'menubox':true}">
        <img class="menubox_icon_community" src="../../assets/icons/white/bubble_chat.png">
      </div>
      <br>
      <div v-bind:class="{'menubox':true}">
        <img class="menubox_icon_notice" src="../../assets/icons/white/megaphone.png">
      </div>
      <br>
      <div v-bind:class="{'menubox_active':true}" @click="this.$router.push('/')">
        <img class="menubox_icon_mainscreen" src="../../assets/icons/white_logo.png">
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

.menubox_icon_mypage {
  position: relative;
  top: 2px;
  left: 1px;
  width: 75px;
  height: 75px;
}
.menubox_icon_library {
  position: relative;
  top: 12px;
  left: 1px;
  width: 50px;
  height: 50px;
}
.menubox_icon_store {
  position: relative;
  top: 16px;
  left: -1px;
  width: 45px;
  height: 45px;
}
.menubox_icon_engine {
  position: relative;
  top: 12px;
  left: 1.45px;
  width: 50px;
  height: 50px;
}
.menubox_icon_community {
  position: relative;
  top: 15px;
  left: 1px;
  width: 50px;
  height: 50px;
}
.menubox_icon_notice {
  position: relative;
  top: 11px;
  left: 1.5px;
  width: 50px;
  height: 50px;
}
.menubox_icon_mainscreen {
  position: relative;
  top: 3px;
  left: 1px;
  width: 70px;
  height: 70px;
}
</style>