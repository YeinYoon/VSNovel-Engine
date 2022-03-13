<template>
    프로젝트 상태변경
    <select v-model="status">
        <option value="D">개발중</option>
        <option value="S">배포</option>
        <option value="P">개발중단</option>
    </select> <br>
    <input type="text" placeholder="제목" v-model="title"> <br>
    <textarea
    cols="40"
    rows="10"
    v-model="synopsis"></textarea> <br>

    <button @click="saveEdit()">수정하기</button> <br>
    <button @click="deletePj()">프로젝트 삭제</button>
</template>

<script>
import axios from 'axios';
export default {
    name : "EditPjInfo",
    created() {
        this.pjCode = this.$route.params.pjCode;
        this.getPjInfo(this.pjCode);
    },
    data() {
        return {
            pjCode : "",
            status : "",
            title : "",
            //synopsis : ""
        }
    },
    methods : {
        getPjInfo() {
            axios.post('/engine/pj/getPjInfo', {pjCode : this.pjCode})
            .then((result)=>{
                if(result.data == "err") {
                    alert("프로젝트 정보를 불러오는데 실패했습니다.");
                } else {
                    this.status = result.data.PROJ_STATUS;
                    this.title = result.data.PROJ_TITLE;
                    //this.synopsis = result.data.PROJ_SYNOPSIS;
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
                //synopsis : this.synopsis
            }

            axios.patch('/engine/pj/editPjInfo', editData)
            .then((result)=>{
                if(result.data=="ok") {
                    alert("수정되었습니다.")
                    this.$router.push(`/devPage/${this.pjCode}`);
                } else {
                    alert("ERR : 프로젝트 수정 실패");
                }
            })
            .catch((err)=>{
                console.error(err);
            })
        },

        deletePj() {
            if(confirm(`프로젝트 [${this.title}]를 삭제하시겠습니까?`)) {
                axios.post('/engine/pj/deletePj', {pjCode : this.pjCode})
                .then((result)=>{
                    if(result.data == "ok") {
                        alert("프로젝트가 삭제되었습니다.");
                        this.$router.push('/');
                    } else {
                        alert("ERR : 프로젝트 삭제를 실패했습니다.");
                    }
                })
                .catch((err)=>{
                    console.error(err);
                })
            }
        }
    }
}
</script>

<style>

</style>