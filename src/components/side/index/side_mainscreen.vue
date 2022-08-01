<template>
<ConfirmModal ref="confirmModal"></ConfirmModal>
    <div class="SBackgroundMain">
        <!-- 유저정보 헤더 -->
        <div class="UserInfo">
            <div class="UserProfileFrame">
                <div class="UserProfileImg">
                    <img src="@/assets/icons/vsn_engine.png">
                </div>
                <div class="UserProfileInfo">
                    {{this.$store.state.userNickname}}
                </div>
                <div class="UserProfileDeco">
                </div>
                <div class="UserSignFrame">
                    <router-link to="/signin" v-if="$store.state.userNickname == null"><button>로그인</button></router-link>
                    <button v-else @click="logout()">로그아웃</button>
                </div>
            </div>

        </div>
        <!--유저정보 헤더 끝 -->

        <!--알림센터-->
        <div class="AlertCenter"> 
            <div class="invite_center">

                <div @click="alramCenterToggle()" class="invite_box">
                    <img class="invite_icon" src="@/assets/icons/white/notification.png">
                    <div v-bind:class="{[`invite_counter_${existNotice}`]:true}"><!-- 초대가 0개 이하면 counter_off로 변경-->
                        <span>{{noticeList.length}}</span><!-- 이 유저에게 온 초대가 몇장인지 데이터 삽입-->
                    </div>
                </div>

                <div v-if="alramStatus" v-bind:class="{'invite_modal_on':true}">

                    <div v-if="noticeList.length > 0">
                        <div v-for="n in noticeList" :key="n.SCHE_CODE">
                            
                        <div class="invite_message" v-if="n.SCHE_TYPE == 'I' && n.SNOT_ISREAD == 0">
                            {{n.SCHE_STDATE}}
                            <div>{{n.SCHE_CONTENT}}</div>
                            <button class="invite_button" @click="PjAccept(n.PROJ_CODE, n.SCHE_CODE)">승인</button>
                            <button class="invite_button" @click="PjRefuse(n.PROJ_CODE, n.SCHE_CODE)">거절</button>
                        </div>
                        <hr>

                        </div>
                    </div>
                    <div v-else>새로운 알림이 없습니다.</div>

                    <hr>

                    <button v-if="this.noticeTap == false" class="Schedule_List_History_btn" @click="showNoticeHistory()">지난 알림</button>
                    <button v-else class="Schedule_List_History_btn" @click="showNoticeHistory()">닫기</button>

                    <div v-if="noticeTap == true && noticeHistoryList.length > 0">
                        <div v-for="n in noticeHistoryList" :key="n.SCHE_CODE">
            
                            <div class="invite_message" v-if="n.SCHE_TYPE == 'I'">
                                {{n.SCHE_STDATE}}
                                <div>{{n.SCHE_CONTENT}}</div>
                            </div>
                            <hr>

                        </div>
                    </div>
                    <div v-else-if="noticeTap == true && noticeHistoryList.length == 0">
                        지난 알림기록이 없습니다.
                    </div>

                </div>

            </div>
        </div>



        <div class="TaskCenter"> 
            <div class="invite_center">

                <div @click="TaskCenterToggle()" class="invite_box">
                    <img class="invite_icon" src="@/assets/icons/white/calendar_white.png">
                    <div v-bind:class="{[`invite_counter_${existSchedule}`]:true}"><!-- 초대가 0개 이하면 counter_off로 변경-->
                        <span>{{scheduleList.length}}</span><!-- 이 유저에게 온 초대가 몇장인지 데이터 삽입-->
                    </div>
                </div>

                <div v-if="taskStatus" v-bind:class="{'invite_modal_on':true}">
                    <!-- 회원에게 스케쥴 있으면 보이는곳 -->
                    <div v-if="this.scheduleList.length != 0">
                        <div class="Schedule_List_item" v-for="(s, i) in scheduleList" :key="i">
                            <div class="Schedule_List_item_date">
                                <div class="Schedule_List_item_date_box">{{s.SCHE_STDATE}}</div>
                                ~
                                <div class="Schedule_List_item_date_box">{{s.SCHE_EDDATE}}</div>
                            </div>
                            <div class="Schedule_List_item_writer">작성자 : {{s.USER_ID}}</div>
                            <div class="Schedule_List_item_content">내용 : {{s.SCHE_CONTENT}}</div>
                            <button class="Schedule_List_DelBtn_read" @click="readSchedule(s.SCHE_CODE)">읽음</button>
                        </div>
                    </div>

                    <!-- 회원에게 스케쥴 없으면 보이는곳 if문처리 -->
                    <div v-else>새로운 일정이 없습니다.</div>

                    <hr>
                    <!-- 히스토리 리스트 -->
                    <button v-if="this.scheduleTap == false" class="Schedule_List_History_btn" @click="showScheduleHistory()">지난 일정</button>
                    <button v-else class="Schedule_List_History_btn" @click="showScheduleHistory()">닫기</button>

                    <div v-if="this.scheduleTap == true && this.scheduleHistoryList.length != 0">
                        <div class="Schedule_List_item" v-for="(s, i) in scheduleHistoryList" :key="i">
                            <div class="Schedule_List_item_date">
                                <div class="Schedule_List_item_date_box">{{s.SCHE_STDATE}}</div>
                                ~
                                <div class="Schedule_List_item_date_box">{{s.SCHE_EDDATE}}</div>
                            </div>
                            <div class="Schedule_List_item_writer">작성자 : {{s.USER_ID}}</div>
                            <div class="Schedule_List_item_content">내용 : {{s.SCHE_CONTENT}}</div>
                        </div>
                    </div>
                    <div v-else-if="scheduleTap == true && scheduleHistoryList.length == 0">
                        지난 일정기록이 없습니다.
                    </div>

                </div>

            </div>
        </div>
        <!-- 알림센터 끝 -->

        <!-- <div class="CalendarCenter">
            <div class="CalendarInner">
                <div class="CalendarBtn" @click="CalendarToggle()"><img src="@/assets/icons/white/notification.png"></div>
                <div class="CalendarModal" v-if="CalendarStatus">
                    <div>123</div>
                </div>              
            </div>

        </div> -->
    </div>
</template>

<script>
import ConfirmModal from '../../modal/ConfirmModal.vue'
import axios from '../../../axios'
export default {
    name:'Side_MainScreen',
    watch : {
        userId() {
            if(this.userId != null) {
                this.getNoticeList();
                this.getScheduleList();
            }
        }
    },
    props : {
        userId : String
    },
    data() {
        return{
            noticeList : [],
            noticeHistoryList : [],
            noticeTap : false,
            scheduleList : [],
            scheduleHistoryList : [],
            scheduleTap : false,

            alramStatus : false,
            existNotice : "off",
            existSchedule : "off",
            CalendarStatus : false,
            taskStatus : false,
        }
    },
    methods: {
        logout(){
            this.noticeList = [];
            this.noticeHistoryList = [];
            this.scheduleList = [];
            this.scheduleHistoryList = [];
            axios.get('/engine/auth/logout')
            .then((result)=>{
                if(result.data=='ok') {
                    this.$store.commit('userLogin', {userId : null, nickName : null});
                    this.$router.push('/signin');
                } else {
                    console.log(result);
                    alert(result.data);
                }
            })
            .catch((err)=>{
                console.error(err);
            })
        },

        // 도착한 알림 목록 가져오기
        getNoticeList() {
            axios.get('/engine/team/getNoticeList')
            .then((result)=>{
                if(result.data == "err") {
                console.log("ERR : 알림 불러오기 실패")
                } else {
                    for(var i=0; i<result.data.length; i++) {
                        console.log(result.data[i]);
                        if(result.data[i].SCHE_TYPE != 'S' && result.data[i].SNOT_ISREAD == 0) {
                            this.noticeList.push(result.data[i]);
                        } else if(result.data[i].SCHE_TYPE != 'S' && result.data[i].SNOT_ISREAD == 1) {
                            this.noticeHistoryList.push(result.data[i]);
                        }
                    }
                    if(this.noticeList.length > 0) {
                        this.existNotice = "on";
                    } else {
                        this.existNotice = "off";
                    }
                    console.log("새로운 알림 : ", this.noticeList);
                    console.log("지난 알림 : ", this.noticeHistoryList);
                }
            })
            .catch((err)=>{
                console.error(err);
            });
        },

        getScheduleList() {
            axios.get('/engine/team/getNoticeList')
            .then((result)=>{
                if(result.data == "err") {
                    console.log("ERR : 알림 불러오기 실패")
                } else {
                    for(var i=0; i<result.data.length; i++) {
                        if(result.data[i].SCHE_TYPE == 'S' && result.data[i].SNOT_ISREAD == 0) {
                            this.scheduleList.push(result.data[i]);
                        } else if(result.data[i].SCHE_TYPE == 'S' && result.data[i].SNOT_ISREAD == 1) {
                            this.scheduleHistoryList.push(result.data[i]);
                        }
                    }
                    if(this.scheduleList.length > 0) {
                        this.existSchedule = "on";
                    } else {
                        this.existSchedule = "off";
                    }
                    console.log("새로운 일정 : ", this.scheduleList);
                    console.log("지난 일정 : ", this.scheduleHistoryList);
                }
            })
            .catch((err)=>{
                console.error(err);
            });
        },
        readSchedule(scheCode) {
            axios.post('/engine/team/readSchedule', {scheCode : scheCode})
            .then((result)=>{
                if(result.data == "ok") {
                    this.scheduleList = [];
                    this.scheduleHistoryList = [];
                    this.getScheduleList();
                } else {
                    this.$store.commit('gModalOn', {msg : "ERR:일정 읽음처리 실패", size : "normal"});
                }
            })
        },



        // 프로젝트 초대 수락
        async PjAccept(pjCode, scheCode) {
            var accept = await this.$refs.confirmModal.show({
                msg : "초대를 수락하시겠습니까?",
                size : "normal",
                btn1 : "수락",
                btn2 : "취소"
            });
            if(accept) { 
                axios.post('/engine/team/PjAccept', {pjCode : pjCode, scheCode : scheCode})
                .then((result)=>{
                    if(result.data == "ok") {
                        this.noticeList = [];
                        this.noticeHistoryList = [];
                        this.getNoticeList();
                    } else {
                        this.$store.commit('gModalOn', {msg : "ERR:프로젝트 초대 수락 실패", size : "normal"});
                    }
                })
                console.log("초대 수락");
            } else {
                console.log("초대 보류");
            }
        },
        // 프로젝트 초대 거절
        async PjRefuse(pjCode, scheCode) {
            var refuse = await this.$refs.confirmModal.show({
                msg : "초대를 거절하시겠습니까?",
                size : "normal",
                btn1 : "확인",
                btn2 : "취소"
            });
            if(refuse) { 
                axios.post('/engine/team/PjRefuse', {pjCode : pjCode, scheCode : scheCode})
                .then((result)=>{
                    if(result.data == "err") {
                        this.$store.commit('gModalOn', {msg : "ERR: 서버 처리 에러발생", size : "normal"});
                    } else {
                        this.noticeList = [];
                        this.noticeHistoryList = [];
                        this.getNoticeList();
                    }
                })
            } else {
                console.log("거절 보류");
            }
        },

        alramCenterToggle() {
            this.alramStatus = !this.alramStatus;
        },

        CalendarToggle() {
            this.CalendarStatus = !this.CalendarStatus;
        },

        TaskCenterToggle() {
            this.taskStatus = !this.taskStatus;
        },

        showNoticeHistory() {
            if(this.noticeTap) {
                this.noticeTap = false;
            } else {
                this.noticeTap = true;
            }
        },

        showScheduleHistory() {
            if(this.scheduleTap) {
                this.scheduleTap = false;
            } else {
                this.scheduleTap = true;
            }
        }
    },

    components : {
        ConfirmModal
    }

}
</script>

<style>
.SBackgroundMain {
    position: relative;
    width: 100%;
    height: 100vh;
    padding: 10px;
    overflow: auto;
}

.UserInfo {
    position: relative;

}

.AlertCenter {
    position: relative;
    margin-top: 10px;
}

.CalendarCenter {
    position: relative;
    margin-top: 10px;
}

.UserProfileFrame {
  position: relative;
  width: 100%;
  height: 100px;
  border-radius: 15px;
  padding: 10px;
  background: #505050;
}

.UserProfileImg {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.UserProfileImg img{
  width: 100%;
}

.UserProfileInfo {
  position: relative;
  left: 50px;
  font-size: 1.1em;
  color: white;
}

.UserProfileDeco {
  position: absolute;
  width: 170px;
  height: 10px;
  background: #2872f9;
  border-radius: 10px;
  left: 60px;
}

.UserSignFrame {
  position: relative;
  top: 20px;
}

.UserSignFrame button{
  background: #2872f9;
  border: none;
  border-radius: 15px;
  width: 100px;
  height: 35px;
  color: white;
}


.invite_center{
  background: #797979;
  border-radius: 20px;
  margin-bottom: 15px;
}

.invite_box{
  position: relative;
  width: 100%;
  height: 50px;
  background: #2872f9;
  cursor: pointer;
  z-index: 6;
  transition: all ease 0.2s;
  border-radius: 15px;
}

.invite_box:hover{
  background: #0084ff;
}

.invite_icon{
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
}

.invite_counter_on{
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  left: 60%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ff4c4c;
}

.invite_counter_on span{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.95em;
}

.invite_counter_off{
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ff4c4c;
  visibility: hidden;
}

.invite_counter_off span{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  visibility: hidden;
}

.invite_modal_on{
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 15px;
  padding: 10px;
  color: white;
}

.invite_button {
  border:none;
  background: #2872f9;
  color: white;
  border-radius: 5px;
  margin: 2px;
}

.CalendarBtn {
  position: absolute;
  width: 100%;
  height: 50px;
  background: #2872f9;
  border-radius: 15px;
  cursor: pointer;
  transition: all ease 0.2s;
  z-index: 6;
}

.CalendarBtn:hover {
  background: #0084ff;
}

.CalendarBtn img {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
}

.CalendarModal {
  position: relative;
  padding: 30px;
  border-radius: 15px;
  width: 100%;
  overflow-y: auto;
  background: #797979;
  color: white;
  z-index: 5;
  height: 100%;
}

.Schedule_List_DelBtn_read {
  position: relative;
  left: calc(100% - 50px);
  top: calc(100% - 26px);
  width: 50px;
  height: 25px;
  background: #2872f9;
  color: white;
  border-radius: 8px;
  border: none;
}

.Schedule_List_History_btn {
  position: relative;
  left: 0px;
  top: -5px;
  width: 90px;
  height: 25px;
  background: #2872f9;
  color: white;
  border-radius: 8px;
  border: none;
  margin-bottom: 5px;
}
</style>