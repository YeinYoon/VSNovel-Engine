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
            gModalSize : ""
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
        }
    }
})

export default store;