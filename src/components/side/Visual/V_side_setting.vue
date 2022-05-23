<template>
<ConfirmModal ref="confirmModal"></ConfirmModal>
  <div class="VSBackgroundSet">

    <div class="VSSetTool">
      <div class="VSSetTitle"><span>설정</span></div>
      <div class="VSSetButtons">
        <button @click="saveEdit()">저장</button>
        <button>되돌리기</button>
        <!-- <button>기능3</button> -->
      </div>
    </div>

    <div class="VSSetList">

      <div class="VSSetMenu"> <!-- 0 -->
        <div class="VSSetMenuTitle" @click="menuClick(0)">
          <p>프로젝트 상태 변경</p>
        </div>

        <div class="VSSetMenuInner" v-if="menu0 == true">
          <select class="VSSetStatus" v-model="status">
            <option value="D">개발중</option>
            <option value="S">배포</option>
            <option value="P">개발중단</option>
          </select> 
        </div>
      </div>

      <div class="VSSetMenu"> <!-- 1 -->
        <div class="VSSetMenuTitle" @click="menuClick(1)">
          <p>제목 변경</p>
        </div>

        <div class="VSSetMenuInner" v-if="menu1 == true">
          <input class="VSSetTitleInput" type="text" placeholder="제목" v-model="title">
        </div>
      </div>

      <div class="VSSetMenu"> <!-- 2 -->
        <div class="VSSetMenuTitle" @click="menuClick(2)">
          <p>시놉시스 작성</p>
        </div>

        <div class="VSSetMenuInner" v-if="menu2 == true">
          <textarea
            class="VSSetSynopsis"
            cols="40"
            rows="10"
            v-model="synopsis">
          </textarea>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import ConfirmModal from '../../modal/ConfirmModal.vue'
import axios from '../../../axios'
export default {
  name: 'V_side_setting',
  props : {
    pjCode : String
  },
  components : {
    ConfirmModal
  },
  created() {
    this.getPjInfo(this.pjCode);
  },
  data() {
    return {
      menu0 : false,
      menu1 : false,
      menu2 : false,

      status : "",
      title : "",
      synopsis : "",

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
    },

    getPjInfo() {
      axios.post('/engine/pj/getPjInfo', {pjCode : this.pjCode})
      .then((result)=>{
        if(result.data == "err") {
          this.$store.commit('gModalOn', {msg : "프로젝트 정보 불러오기를 실패했습니다.", size : "normal"});
        } else {
          this.status = result.data.PROJ_STATUS;
          this.title = result.data.PROJ_TITLE;
          this.synopsis = result.data.PROJ_SYNOPSIS;
        }
      })
      .catch((err)=>{
        console.error(err);
      })
    },

    saveEdit() {
      var editData = {
        pjCode : this.pjCode,
        status : this.status,
        title : this.title,
        synopsis : this.synopsis
      }

      axios.patch('/engine/pj/editPjInfo', editData)
      .then((result)=>{
        if(result.data=="ok") {
          this.$store.commit('gModalOn', {msg : "수정되었습니다.", size : "small"});
          this.$emit('pjEdit', false);
        } else {
          this.$store.commit('gModalOn', {msg : "ERR : 프로젝트 수정 실패.", size : "small"});
        }
      })
      .catch((err)=>{
        console.error(err);
      })
    },

    async deletePj() {
      var result = await this.$refs.confirmModal.show({
        msg : `프로젝트 [${this.title}]를 삭제하시겠습니까?`,
        size : "normal",
        btn1 : "확인",
        btn2 : "취소"
      });

      if(result == true) {
        axios.post('/engine/pj/deletePj', {pjCode : this.pjCode})
        .then((result)=>{
          if(result.data == "ok") {
            this.$store.commit('gModalOn', {msg : "프로젝트가 삭제되었습니다.", size : "normal"});
            this.$router.push('/');
          } else {
            this.$store.commit('gModalOn', {msg : "ERR : 삭제를 실패했습니다.", size : "normal"});
          }
        })
        .catch((err)=>{
          console.error(err);
        })
        .finally(()=>{
          this.$router.push('/')
        })
      } else {
        console.log('삭제 취소');
      }

    }    
  }
}
</script>

<style>
.VSBackgroundSet {
  width: 100%;
  height: 100%;
}

.VSSetTool {
  width: 100%;
  height: 80px;
  position: relative;
  background: #474747;
  border-radius: 0px 0px 10px 10px;
  overflow: hidden;
}

.VSSetTitle {
  position: relative;
  width: 100%;
  left: 0px;
  font-size: 1em;
}

.VSSetTitle span{
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%);
  font-size: 1em;
  color: white
}

.VSSetButtons {
  position: relative;
  width: 100%;
  top: 32px;
  height: 40px;
  padding: 7px;
  text-align: center;
}

.VSSetButtons button {
  display: inline;
  width: 80px;
  height: 30px;
  border-radius: 10px;
  margin: 2px;
  color: white;
  border: none;
  background: #2872f9;
}

.VSSetList {
  position: absolute;
  top: 80px;
  width: 100%;
  height: calc(100vh - 80px);
  padding: 20px;
  color: white;
  overflow: auto;
}

.VSSetMenu {
  position: relative;
  display: table;
  width: 100%;
  margin-bottom: 15px;
  background: #585858;
  border-radius: 20px;
  border: none;
}

.VSSetMenuTitle {
  position: relative;
  width: 100%;
  height: 60px;
  background: #474747;
  border-radius: 20px;
  transition: all ease 0.2s;
  cursor: pointer;
}

.VSSetMenuTitle:hover {
  background: #7c7c7c;
}

.VSSetMenuTitle p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.VSSetMenuInner {
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
}

.VSSetStatus {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  width: 160px;
  height: 40px;
  border-radius: 10px;
  border: none;
}

.VSSetTitleInput {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  width: 160px;
  height: 40px;
  border-radius: 10px;
  border: none;
}

.VSSetSynopsis {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  width: 90%;
  height: 200px;
  border-radius: 10px;
  padding: 10px;
  border: none;
}
</style>