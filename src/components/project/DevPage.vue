<template>
  <div>
    Project [ {{title}} ]
    마지막 저장 : {{retouchDate}}
    상태 : {{status}}

    <button @click="goToEditPjInfo(pjCode)">프로젝트 정보수정</button>
    <button @click="save()">저장</button>
  </div>

  <div>
      <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name : "devPage",
    created() {
        this.pjCode = this.$route.params.pjCode;
        this.getPjInfo(this.pjCode);
    },
    watch : {
        $route() {
            this.getPjInfo(this.pjCode);
        }
    },
    data(){
        return {
            pjCode : "",
            title : "",
            retouchDate : "",
            status : "",
        }
    },
    methods : {
        getPjInfo() {
            axios.post('/engine/pj/getPjInfo', {pjCode : this.pjCode})
            .then((result)=>{
                if(result.data == "err") {
                    alert("프로젝트 정보를 불러오는데 실패했습니다.");
                } else {
                    this.title = result.data.PROJ_TITLE;
                    this.retouchDate = result.data.PROJ_RETOUCHDATE;
                    this.status = result.data.PROJ_STATUS;
                }
            })
            .catch((err)=>{
                console.error(err);
            })
        },

        goToEditPjInfo(pjCode) {
            this.openPjEdit = true;
            this.$router.push(`/devPage/${pjCode}/editInfo`);
        },

        save() {
            axios.patch('/engine/pj/devSave', {pjCode : this.pjCode})
            .then((result)=>{
                if(result.data.msg == "ok") {
                    alert("저장되었습니다.");
                    this.retouchDate = result.data.date;
                } else {
                    alert("ERR : 저장실패");
                }
            })
        }
    }
}
</script>

<style>

</style>