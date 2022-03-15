<template>
    <div v-if="type == null">
        소설형식 선택
        <div @click="selectType('W')">웹소설</div>
        <div @click="selectType('V')">비주얼노벨</div>
    </div>
  
    <div v-else>
        -선택형식-
        <p v-if="type=='W'">웹소설</p>
        <p v-else>비주얼노벨</p>

        <input type="text" placeholder="제목" v-model="title"> <br>
        <textarea
        cols="40"
        rows="10"
        placeholder="시놉시스를 작성해주세요(추후 수정가능)"
        v-model="synopsis"></textarea> <br>

        <button @click="createPj()">프로젝트 생성</button>
    </div>

</template>

<script>
import axios from 'axios'
export default {
    name:"CreateNewPj",
    data() {
        return {
            type : null,
            title : "",
            synopsis : ""
        }
    },
    methods : {
        selectType(val) {
            this.type = val;
        },

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