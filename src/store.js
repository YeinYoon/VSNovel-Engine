import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            //유저 로그인
            userNickname : null,

            //로딩
            LoadingStatus: false,

            // 메뉴 선택
            selectMenu : 7,
            menuStyle : "_active",

            //전역(Global) 모달
            gModalState : false,
            gModalMsg : "",
            gModalSize : "",

            // 컨펌 모달
            cModalState : false,
            cModalMsg : "",
            cModalSize : "",
            cModalBtn1 : "",
            cModalBtn2 : "",
            cModalAnswer : null, // 유저의 답변

            //사이드바의 상태 by 석범
            sideBarState : false,
        }
    },
    mutations : {
        //유저 로그인(닉네임)
        userLogin(state, name) {
            state.userNickname = name;
        },

        //로딩
        startSpinner(state){
            state.LoadingStatus = true;
        },
        endSpinner(state){
            state.LoadingStatus = false;
        },

        //메뉴 선택
        cngMenu(state, val){
            state.selectMenu = val;
        },

        //전역 모달
        gModalOn(state, info){
            state.gModalSize = info.size;
            state.gModalMsg = info.msg;
            state.gModalState = true;
        },
        gModalOff(state){
            state.gModalState = false;
        },

        // 컨펌 모달 (예, 아니오)
        cModalOn(state, info) {
            state.cModalState = true;
            state.cModalSize = info.size;
            state.cModalMsg = info.msg;
            state.cModalBtn1 = info.btn1;
            state.cModalBtn2 = info.btn2;       
        },
        cModalOff(state){
            state.cModalState = false;
        },
        setAnswer(state, val) {
            state.cModalAnswer = val;
        },


        //사이드바 함수 by 석범
        sideMenuOpen(state, val) {
            state.sideBarState = val;
        }
    },
    getters : {
        getAnswer(state) { // cModal의 유저 답변
            return state.cModalAnswer;
        }
    }
})

export default store;