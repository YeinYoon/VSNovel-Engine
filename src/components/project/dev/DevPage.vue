<template>
<div  :class="{ [`${this.$store.state.sideBarFixed}`]:true, [`${this.$store.state.sideBarMove}`]:this.$store.state.sideAnimationState }">
    <div class="DevPageTemp">
        <!-- <div>
            Project [ {{title}} ]
            마지막 저장 : {{retouchDate}}
            상태 : {{status}}

            <button @click="goToEditPjInfo(pjCode)">프로젝트 정보수정</button>
            <button @click="goToInvitePj(pjCode)">유저 초대</button>
            <button @click="save()">저장</button>
        </div> -->
        <div>
            <VEngineInner
            :data="data"
            ></VEngineInner>
        </div>
    </div>
</div>
</template>

<script>
import axios from '../../../axios';
import VEngineInner from './V_EngineInner.vue';
export default {
    name : "devPage",
    created() {
        this.$store.commit('cngSideMenu', 'N');
        this.pjCode = this.$route.params.pjCode;
        this.getPjInfo(this.pjCode);
    },
    props:{
        side:Boolean,
        main:Boolean,
        data:Object
    },
    watch : {
        $route() {
            this.getPjInfo(this.pjCode);
        },
        side(){
            if(!this.side){
                this.condition="RouterViewLeft"
            }
            else this.condition="RouterViewRight"
        },
        data(){
            console.log(this.data)
        }
    },
    data(){
        return {
            pjType : "",
            pjCode : "",
            condition: "RouterViewLeft"
        }
    },
    methods : {
        getPjInfo() {
            axios.post('/engine/pj/getPjInfo', {pjCode : this.pjCode})
            .then((result)=>{
                if(result.data == "err") {
                    this.$store.commit('gModalOn', "프로젝트 정보를 불러오는데 실패했습니다.", "normal");
                } else {
                    this.title = result.data.PROJ_TITLE;
                    this.retouchDate = result.data.PROJ_RETOUCHDATE;
                    this.status = result.data.PROJ_STATUS;
                    this.pjType = result.data.PROJ_TYPE;
                }
            })
            .catch((err)=>{
                console.error(err);
            })
        },

        save() {
            axios.patch('/engine/pj/devSave', {pjCode : this.pjCode})
            .then((result)=>{
                if(result.data.msg == "ok") {
                    this.$store.commit('gModalOn', {msg : "저장되었습니다.", size : "small"});
                    this.retouchDate = result.data.date;
                } else {
                    this.$store.commit('gModalOn', {msg : "ERR : 프로젝트 저장 실패", size : "normal"});
                }
            })
        },
    },
    components : {
        VEngineInner,
    }
}
</script>

<style>
/* .editRouter {
    position: fixed;
    width: 300px;
    height: 600px;
    z-index: 1;
} */
.DevPageTemp {
    background: #5e5e5e;
    width: 100%;
    height: 100%;
}
</style>