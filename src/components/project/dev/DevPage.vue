<template>
<div :class="{ [`${this.$store.state.sideBarFixed}`]:true, [`${this.$store.state.sideBarMove}`]:this.$store.state.sideAnimationState }">
    <div class="DevPageTemp">
        <div v-if="ep!=null">
            <EngineInner
            :resource="resource"
            :ep="ep"
            ></EngineInner>
        </div>
        <div v-else class="NotFoundEP"><span>에피소드를 선택하세요</span></div>
        <div v-if="ep==null && (this.$store.state.sideMenuState != 'E' || !this.$store.state.sideBar)" class="NotFoundEPArrow"> <span>❮</span> </div>
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
        userTutorialCheck() {
            axios.get('/engine/user/tutorialCheck')
            .then((result)=>{
                if(result.data == "err") {
                    console.log("유저 튜토리얼 확인 유무 불러오기 실페");
                } else {

                    if(result.data.USER_EHELP == 'N') {
                        this.$store.commit('tutorialOn', 'dev');
                    } else {
                        this.$store.commit('tutorialOff');
                    }

                }
            })
        },

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
    background: #353535;
    width: 100%;
    height: 100%;
    /* animation-name: StudioOn;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out; */
}

.NotFoundEP {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 130px;
    background: #3d3d3d;
    color: white;
    border-radius: 25px;
    font-size: 1em;
}

.NotFoundEP span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);   
}

.NotFoundEPArrow {
    font-size: 2em;
    font-weight: 900;
    color: white;
    position: fixed;
    top: calc(50% - 175px);
    transform: translate(-50%, -50%);
    left: 125px;
    animation-name: NotFoundEPArrowMove;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-duration: 0.5s;
    transition: 0.2s all ease;
    text-shadow: 0px 0px 6px #ffffff;
    z-index: 99;
}

@keyframes NotFoundEPArrowMove {
  0% {
  }

  100% {
    left: 115px;
    text-shadow: 0px 0px 15px #ffffff;
  }
}

@keyframes StudioOn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  
}
</style>