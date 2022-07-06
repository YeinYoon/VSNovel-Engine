<template>
<div  :class="{ [`${this.$store.state.sideBarFixed}`]:true, [`${this.$store.state.sideBarMove}`]:this.$store.state.sideAnimationState }">
    <div class="DevPageTemp">
        <div v-if="ep!=null">
            <EngineInner
            :resource="resource"
            :ep="ep"
            ></EngineInner>
        </div>
        <div v-else> ep를 설정해주세요</div>
    </div>
</div>
</template>

<script>
import axios from '../../../axios';
import EngineInner from './EngineInner.vue';
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
        resource:Object,
        ep:Number
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
        resource(){
            console.log(this.resource)
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
        EngineInner,
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