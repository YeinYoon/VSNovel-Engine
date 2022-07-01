<template>
<ConfirmModal ref="confirmModal"></ConfirmModal>
<EpisodeModal ref="episodeModal"></EpisodeModal>
  <div class="VSBackgroundEpic">

    <div class="VSCoopTool">
      <div class="VSCoopTitle"><span>에피소드 목록</span></div>
      <div class="VSCoopButtons">
        <button>추가</button>
        <button>정렬변경</button>
      </div>
    </div>

    <div class="VSEpicList">

      <!-- 반복, 에피소드 하나 -->
      <div class="VSEpic_el"> 
        <!-- 에피소드 회차 -->
        <div class="VSEpic_Index">
          <p>1</p>
        </div>

        <!-- 에피소드 명 -->
        <div class="VSEpic_Title"> 
          <p>지각이다</p>
        </div>

        <!-- 에피소드에 마지막으로 접근한 시간 -->
        <div class="VSEpic_RecentDate">
          <p>2022-01-01 01:00:00</p>
        </div>

        <!-- 해당 에피소드의 상태 -->
        <div class="VSEpic_destroy" v-if="delMode == true">
          <p>삭제</p>
        </div>

        <div class="VSEpic_Status" v-if="delMode == false" @click="epModalOn()">
          <p>설정</p>
        </div>
      </div>
      <!-- 여기까지 반복 -->


    </div>
    

  </div>
</template>

<script>
import EpisodeModal from '../../modal/EpisodeModal.vue'
import ConfirmModal from '../../modal/ConfirmModal.vue'
// import axios from '../../../axios'
export default {
  name: 'V_side_episode',
  props : {
    pjCode : String
  },
  components : {
    ConfirmModal,
    EpisodeModal
  },
  created() {
    this.delMode = false;
  },
  data() {
    return {
      delMode : false,
    }
  },
  methods: {
    epModalOn() {
      this.$refs.episodeModal.show();
    }
  }
}
</script>

<style>
.VSBackgroundEpic {
  width: 100%;
  height: 100%;
}
.VSEpicTool {
  width: 100%;
  height: 80px;
  position: relative;
  background: #474747;
  border-radius: 0px 0px 10px 10px;
  overflow: hidden;
}

.VSEpicList {
  width: 100%;
  padding: 20px;
}

.VSEpic_el {
  position: relative;
  width: 100%;
  height: 60px;
  border-radius: 20px;
  background: #585858;
  margin-bottom: 15px;
  padding: 10px;
  color: white;
}

.VSEpic_Index {
  position: absolute;
  left: -6px;
  top: -6px;
  background: #2872f9;
  width: 25px;
  height: 25px;
  text-align: center;
  border-radius: 99px;
}

.VSEpic_Index p {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.VSEpic_Title {
  position: absolute;
  left: 20px;
  top: 6px;
  background: #474747;
  width: calc(100% - 30px);
  height: 25px;
  text-align: center;
  border-radius: 99px;
}

.VSEpic_destroy {
  position: absolute;
  left: 185px;
  top: 35px;
  background: #ff4c4c;
  width: 60px;
  height: 20px;
  text-align: center;
  border-radius: 99px;
  font-size: 0.8em;
  cursor: pointer;
}

.VSEpic_RecentDate {
  position: absolute;
  left: 20px;
  top: 35px;
  background: #474747;
  width: 160px;
  height: 20px;
  text-align: center;
  border-radius: 99px;
  font-size: 0.8em;
}

.VSEpic_Status {
  position: absolute;
  left: 185px;
  top: 35px;
  background: #2872f9;
  width: 60px;
  height: 20px;
  text-align: center;
  border-radius: 99px;
  font-size: 0.8em;
  cursor: pointer;
}
</style>