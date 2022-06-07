<template>
    <div :class="{ [`${this.$store.state.sideBarFixed}`]:true, [`${this.$store.state.sideBarMove}`]:true }">
      <div class="create_pj_page_frame">
        <span class="pj_info_type">프로젝트 정보를 입력하세요.</span>
        <div class="create_pj_frame"> 
          <div class="title_input_frame">
            <span class="label_center">제목</span>
            <input class="title_input" type="text" v-model="title">
          </div>
          <div class="synopsis_input_frame">
            <span class="label_center">시놉시스</span>
            <textarea class="synopsis_input" v-model="synopsis"></textarea>
          </div>
          <div class="create_button_frame">
            <div class="create_button" @click="createPj()"><span>생성</span></div>
            <button @click="$router.push('/')">취소</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from '../../../axios'
import storage from '../../../aws'
export default {
  name : "InputPj",
  data() {
    return {
      title : "",
      synopsis : ""
    }
  },
  methods : {
    createPj() {
      var newProject = {
        type : this.type,
        title : this.title,
        synopsis : this.synopsis
      }

      axios.post('/engine/pj/createNewPj', newProject)
      .then(async (result)=>{
        if(result.data!="err") {
          var data = JSON.stringify({ // 프로젝트 기본 구조
            "startPlot":"",
            "scenario":{}
          });
          var fileName = `PJ${result.data.pjCode}.json`
          var properties = {type:'text/plain'};
          var file = new File([data], fileName, properties); //새로운 파일 객체 생성
          await storage.uploadFile(`Project/PJ${result.data.pjCode}/`, file);
          this.$store.commit('gModalOn', {msg : "새로운 프로젝트가 생성됐습니다.", size : "normal"});
          this.$router.push('/');
        } else {
          this.$store.commit('gModalOn', {msg : result.data, size : "normal"});
        }
      })
      .catch((err)=>{
        console.log("CreatePj : Error\n"+err);
      })
    }    
  },
  props : {
    type : String
  }
}
</script>

<style>
.contentbackground {
  position: absolute;
  background:#353535;
  width: calc(100vw - 120px);
  height: 100vh;
  overflow:auto;
}
/* 여기서부터 */
.pj_info_type {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 2em;
}
.create_pj_frame{
  position: absolute;
  width: 900px;
  height: 450px;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #444444;
  border-radius: 25px;

}
.title_input_frame {
  position: absolute;
  width: 90%;
  height: 55px;
  top: 11%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  display: flex;
}
.title_input_frame span{
  flex: 1.5;
  font-size: 1.5em;
  text-align: center;
  margin-top: 10px;
  
}
.title_input{
  flex: 8.5;
  background: rgb(182, 182, 182);
  border-radius: 20px;
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 1.5em;
  border: none;
}
.synopsis_input_frame {
  position: absolute;
  top: 48%;
  left: 50%;
  width: 90%;
  height: 250px;
  transform: translate(-50%, -50%);
  color: white;
  display: flex;
}
.synopsis_input_frame span {
  flex: 1.5;
  font-size: 1.5em;
  margin-top: 10px;
}
.synopsis_input{
  flex: 8.5;
  background: rgb(182, 182, 182);
  border-radius: 20px;
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 1.5em;
  white-space:pre-line;
  border: none;
  resize: none;
}
.create_button_frame {
  position: absolute;
  top: 90%;
  left: 50%;
  width: 50%;
  height: 50px;
  transform: translate(-50%, -50%);
  display: flex;
}
.create_button {
  width: 200px;
  height: 50px;
  flex: 10;
  background: #2872f9;
  border-radius: 20px;
  text-align: center;
  display: table;
  cursor: pointer;
}
.create_button:hover{
  opacity: 0.9;
}
.create_button span{
  position: relative;
  top: 13px;
  font-size: 1.2em;
  color: white  ;
}
/* 애니메이션 뺄거면 여기까지 */
.create_pj_page_frame{
  animation-name: opening;
  animation-duration: 0.5s;
}
@keyframes opening {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
/* 여기까지 */
</style>