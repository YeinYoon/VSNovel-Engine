<template>
<div v-if="iModalState">

    <div class="modal_opacity">
    </div>

  <div v-bind:class="{[`Imodal_frame`]:true}">
    <div class="InputModalTitle"><p>{{msg}}</p></div>

    <div class="Imodal_inner">
      <div class="Imodal_inputTag"><input v-model="input"></div>
    </div>

    <div class="Imodal_save_button" @click="inputVal()">
      <span class="Imodal_save_ok">확인</span>
    </div>

    <div class="Imodal_cancel_button" @click="modalClose()">
      <span class="Imodal_cancel_ok">취소</span>
    </div>

  </div>

</div> 
</template>

<script>
export default {
  name : "InputModal",
  data() {
    return {
      // 모달 데이터
      iModalState : false,
      iModalSize : "",
      msg : "",
      input : "",
      type : "",

      //이름 변경 관련
      key : "",
      preName : "",
      ex : "",

      //새로 생성
      index:null,
      plot:null,
      status:null,
    }
  },
  props:{
    VN:Object
  },
  methods : {
    modalClose() {
      this.iModalState = false; 
      this.input = "";
    },
    show(option = {}) {
      this.iModalState = true;
      this.iModalSize = option.size;
      this.msg = option.msg;
      this.type = option.type; // 어떤 것에 대한 입력 처리인가?
      switch(this.type) { // 타입에 따른 행동 코드

        case "rename" :
          this.preName = option.preName.split('.');
          this.ex = this.preName[1];
          this.input = this.preName[0];
          this.key = option.key;
          break
        case "change" :
          this.index = option.index;
          this.plot = option.plot;
          this.status = option.status;
          break
      }

    },

    inputVal() {
      if(this.input == "") {
        console.log("InputVal : Null");
      } else {
        let VN
        if(this.type =="change") VN=this.VN;
        switch(this.type) {

          case "newFolder" :
            this.$emit('inputFolderName', this.input);
            this.modalClose();
            break;

          case "rename" :
            this.$emit('inputNewName', {newName : this.input + '.' + this.ex, key : this.key});
            this.modalClose();
            break;

          case "change" :
            if(this.status=="plot"){
              VN.plotList[this.plot].plotName = this.input;
            }
            else if(this.status=="page"){
              VN.plotList[this.plot].pages[this.index].pageName = this.input;
            }
            else if(this.status=="add"){
              VN.plotList.push({plotName:this.input,nextPlot:0,pages:[]})
            }
            this.$emit('changeVN', VN)
            this.modalClose();
            break
          case "ep" :
            this.$emit('addEp', this.input)
            this.modalClose();
        }

      }
    },

  },
}
</script>

<style>

.Imodal_frame{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 200px;
  border-radius: 25px;
  background: #2a2a2a;
  animation-duration: 0.7s;
  animation-name: Iopening;
  opacity: 1;
  z-index: 100;
}

.Imodal_inner{
  color: white;
  position: fixed;
  top: 45%;
  left: 50%;
  width: 500px;
  height: 170px;
  transform: translate(-50%, -50%);
}

.Imodal_inputTag {
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
}

.InputModalTitle {
  left: 50%;
  top: 50px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
}

.InputModalTitle p{
  color: white;
}

.Imodal_inputTag input {
  width: 300px;
  height: 40px;
  border-radius: 10px;
  border: none;

}

.Imodal_save_button{
  width: 25%;
  height: 20%;
  background: #2872f9;
  border-radius: 20px;
  z-index: 2;
  display: table;
  position: fixed;
  top: 82%;
  left: 35%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.Imodal_cancel_button{
  width: 25%;
  height: 20%;
  background: #ff4c4c;
  border-radius: 20px;
  z-index: 2;
  display: table;
  position: fixed;
  top: 82%;
  left: 65%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.Imodal_save_ok{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
}
.Imodal_cancel_ok{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: white;
}
/* 애니메이션들,*/
  /*열리는 애니메이션 opening*/
@keyframes Iopening {
  from {
    top:150%;
    opacity: 0;
  }

  to {
    top:50%;
    opacity: 1;
  }
}
  /*배경을 만드는 backgrounding_on*/
@keyframes Ibackgrounding_on {
  from {
    opacity: 0;
  }
    
  to {
    opacity: 0.3;
  }
}

</style>

