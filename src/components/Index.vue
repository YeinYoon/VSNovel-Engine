<template>
<div class="RouterView">
  <div v-bind:class="{'enginebackground':true}">
    <div class="header"> <!--타이틀과 로고-->
      <img class="header_icon" src="..\assets\icons/vsn_engine.png"><span class="header_title">VSN Engine</span>
    </div>
    <div class="section"> <!--뉴프로젝트와 로드프로젝트-->
      <div class="newpj_part">
        <div class="newpj_icon">
          <img class="newpj_icon_plus" src="..\assets\icons/white/plus.png">
        </div>
        <div>
          <span class="newpj_label">New Project</span>
        </div>
        <div class="newpj_create_frame">
          <div><span>새로운 프로젝트 생성하기</span></div>
          <!-- <div class="newpj_create_form"></div> -->
          <!-- <div class="newpj_input_tag"><input type="textarea"></div>
          <div class="newpj_input_savebutton"><span>생성</span></div> -->
        </div>
      </div>
      <div class="loadpj_part">
                <div class="loadpj_icon">
          <img class="loadpj_icon_plus" src="..\assets\icons/white/magnifier.png">
        </div>
        <div>
          <span class="loadpj_label">Load Project</span>
        </div>
        <div class="loadpj_list_box">
          <div class="loadpj_list_th"></div>
          <div class="loadpj_list_tr"></div>
          <div class="loadpj_list_tr"></div>
          <div class="loadpj_list_tr"></div>
          <div class="loadpj_list_tr"></div>
          <div class="loadpj_list_tr"></div>
          <div class="loadpj_list_tr"></div>
          <div class="loadpj_list_tr"></div>
          <div class="loadpj_list_tr"></div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>
<style>
.enginebackground {
  position: absolute;
  background:#353535;
  width: calc(100vw - 120px);
  height: 100vh;
  overflow:auto;
  color: white;
}
.header{
  position: fixed;
  left: 20%;
  top: 50px;
  display: table;
}
.header_icon{
  width: 60px;
  height: 60px;
  margin-right: 15px;
  display: table-cell;
  vertical-align: middle;
}
.header_title{
  font-size: 2.2em;
  display: table-cell;
  vertical-align: middle;
}
.section{
  position: fixed;
  top: 160px;
  left: 20%;
  width: calc(100vw - 20%);
  height: calc(100vh - 110px);
  /* background: white; */
}
/*새 프로젝트*/
.newpj_part{
  position: relative;
  height: 150px;
}
.newpj_icon{
  width: 35px;
  height: 35px;
  background: #2872f9;
  border-radius: 11px;
  position: fixed;
}
.newpj_icon_plus{
  position: absolute;
  width: 20px;
  height: 20px;
  left: 8px;
  top: 7.5px; 
}
.newpj_label{
  position: absolute;
  height: 25px;
  top:-3px;
  left: 50px;
  font-size: 1.8em;
}
.newpj_create_frame{
  position: relative;
  top: 55px;
  left: 45px;
  width: calc(100% - 20%);
  min-height: 60px;
  height: auto;
  border-radius: 20px;
  background: #2a2a2a;
  text-align: center;
  padding-top: 18px;
}
.newpj_create_form{
  margin-top: 30px;
}


/*로드 프로젝트*/
.loadpj_part{
  position: relative;
  height: 100%;
}
.loadpj_icon{
  width: 35px;
  height: 35px;
  background: #2872f9;
  border-radius: 11px;
  position: absolute;
  top: 10px;
}
.loadpj_icon_plus{
  position: relative;
  width: 24px;
  height: 24px;
  left: 6px;
  top: 4.5px; 
}
.loadpj_label{
  position: relative;
  height: 25px;
  top:  7px;
  left: 50px;
  font-size: 1.8em;
}
.loadpj_list_box{
  position: relative;
  top: 20px;
  left: 45px;
  width: calc(100% - 20%);
  height: calc(100% - 280px);
  border-radius: 20px;
  background: #2a2a2a;
  overflow: auto;
}
.loadpj_list_th{
  background: #727272;
  margin: 20px 15px 15px 15px;
  width: calc(100% - 30px);
  height: 40px;
  border-radius: 20px;
}
.loadpj_list_tr{
  background: #818181;
  margin: 15px 15px 15px 15px;
  width: calc(100% - 30px);
  height: 60px;
  border-radius: 20px;
}
</style>
<script>
export default {
  name: 'enginemain',

  components: {
  },
}
  
</script>

