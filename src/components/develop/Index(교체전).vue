<template>
    <div id="page">
      VSNovel 엔진 테스트 페이지
      <hr>

      <div v-if="$store.state.userNickname == null">
        <router-link to="/signin">로그인</router-link>
      </div>

      <div v-else-if="$store.state.LoadingStatus">
        프로젝트 목록을 불러오는 중입니다.
      </div>

      <div v-else-if="pjList.length != 0">
        <div id="pjTb">
          <table border="2px">
            <thead>
              <th>프로젝트 코드</th>
              <th>유형</th>
              <th>제목</th>
              <th>상태</th>
              <th>마지막 수정일자</th>
            </thead>
            <tbody>
              <tr v-for="pj in pjList" :key="pj.PROJ_CODE">
                <td>{{pj.PROJ_CODE}}</td>
                <td>{{pj.PROJ_TYPE}}</td>
                <td @click="goToDevPage(pj.PROJ_CODE)">{{pj.PROJ_TITLE}}</td>
                <td>{{pj.PROJ_STATUS}}</td>
                <td>{{pj.PROJ_RETOUCHDATE}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <router-link to="/CreateNewPj">새 프로젝트 생성하기</router-link>
        <br><router-link to="/fileTest">파일테스트</router-link>
      </div>

      <div v-else>
        프로젝트 목록이 없습니다. 새로운 프로젝트를 생성해주세요.<br>
        <router-link to="/CreateNewPj">새 프로젝트 생성하기</router-link>
        <br><router-link to="/fileTest">파일테스트</router-link>
      </div>

    </div>
</template>

<script>
import axios from '../axios';
export default {
  name : "Index",
  created() {
    axios.get('/engine/auth/loginCheck')
    .then(async (result)=>{
      if(result.data!="") {
        this.$store.commit('userLogin', result.data.USER_NICKNAME);
        await this.getPjList();
      }
    })
    .catch((err)=>{
      console.error(err);
    })
  },
  data() {
    return {
      pjList : [],
    }
  },
  methods : {
    goToDevPage(pjCode) {
      this.$router.push(`/devPage/${pjCode}`);
    },
    
    getPjList() {
      axios.get('/engine/pj/getList')
        .then((result)=>{
          if(result.data != "empty") {
            this.pjList = result.data;
          }
        })
        .catch((err)=>{
          console.error(err);
      })
    }
  },
  components : {
  }
}
</script>

<style>
#page {
  font-family: "나눔스퀘어";
  text-align: center;
  /* margin-top: 60px; */
}

#pjTb {
  text-align: center;
}
</style>