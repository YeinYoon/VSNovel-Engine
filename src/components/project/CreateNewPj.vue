<template>
    소설형식 선택
  <select v-model="type">
      <option value="W" selected>웹소설</option>
      <option value="V">비주얼노벨</option>
  </select> <br>
  <input type="text" placeholder="제목" v-model="title"> <br>
  <textarea
  cols="40"
  rows="10"
  placeholder="시놉시스를 작성해주세요(추후 수정가능)"
  v-model="synopsis"></textarea> <br>

  <button @click="createPj()">프로젝트 생성</button>
</template>

<script>
import axios from 'axios'
export default {
    name:"CreateNewPj",
    data() {
        return {
            type : "W",
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
            .then((result)=>{
                if(result.data=="ok") {
                    alert("새로운 프로젝트가 생성되었습니다.");
                    this.$router.push('/');
                } else {
                    console.log(result);
                    alert(result.data);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }
}
</script>

<style>

</style>