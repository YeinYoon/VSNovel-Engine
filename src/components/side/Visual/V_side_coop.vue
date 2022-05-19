<template>
  <div class="VSBackgroundCoop">

    <div class="VSCoopTool">
      <div class="VSCoopTitle"><span>협업 관리</span></div>
      <div class="VSCoopButtons">
        <button>기능1</button>
        <button>기능2</button>
        <button>기능3</button>
      </div>
    </div>

    <div class="VSCoopMemberList">

      <div class="VSCoopMenu"> <!-- 0 -->
        <div class="VSCoopMenuTitle" @click="menuClick(0)">
          <p>유저초대</p>
        </div>

        <div class="VSCoopMenuInner" v-if="menu0 == true">
          내용
        </div>

      </div> <!-- 0 -->

      <div class="VSCoopMenu"> <!-- 1 -->
        <div class="VSCoopMenuTitle" @click="menuClick(1)">
          <p>멤버목록</p>
        </div>

        <div class="VSCoopMenuInner" v-if="menu1 == true">
          내용
        </div>

      </div> <!-- 1 -->

      <div class="VSCoopMenu"> <!-- 2 -->
        <div class="VSCoopMenuTitle" @click="menuClick(2)">
          <p>히스토리</p>
        </div>

        <div class="VSCoopMenuInner" v-if="menu2 == true">
          내용
        </div>

      </div> <!-- 2 -->

    </div>

  </div>
</template>

<script>
export default {
  name: 'V_side_coop',
  data() {
    return {
      menu0 : false,
      menu1 : false,
      menu2 : false,
    }
  },
  methods: {
    menuClick(menu) {
      switch(menu) {
        case 0 :
          this.menu0 = !this.menu0;
          break;
        case 1 :
          this.menu1 = !this.menu1;
          break;
        case 2 :
          this.menu2 = !this.menu2;
          break;
      }
    }
  }
}
</script>

<style>
.VSBackgroundCoop {
  width: 100%;
  height: 100%;
}

.VSCoopTool {
  width: 100%;
  height: 80px;
  position: relative;
  background: #474747;
  border-radius: 0px 0px 10px 10px;
  overflow: hidden;
}

.VSCoopTitle {
  position: relative;
  width: 100%;
  left: 0px;
  font-size: 1em;
}

.VSCoopTitle span{
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%);
  font-size: 1em;
  color: white
}

.VSCoopButtons {
  position: relative;
  width: 100%;
  top: 32px;
  height: 40px;
  padding: 7px;
  text-align: center;
}

.VSCoopButtons button {
  display: inline;
  width: 80px;
  height: 30px;
  border-radius: 10px;
  margin: 2px;
  color: white;
  border: none;
  background: #2872f9;
}

.VSCoopMemberList {
  position: absolute;
  top: 80px;
  width: 100%;
  height: calc(100vh - 80px);
  padding: 20px;
  color: white;
  overflow: auto;
}

.VSCoopMenu {
  position: relative;
  display: table;
  width: 100%;
  margin-bottom: 15px;
  background: #585858;
  border-radius: 20px;
  border: none;
}

.VSCoopMenuTitle {
  position: relative;
  width: 100%;
  height: 60px;
  background: #474747;
  border-radius: 20px;
  transition: all ease 0.2s;
  cursor: pointer;
}

.VSCoopMenuTitle:hover {
  background: #7c7c7c;
}

.VSCoopMenuTitle p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.VSCoopMenuInner {
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>