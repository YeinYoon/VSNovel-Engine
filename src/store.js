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

            // 사이드바
            sideBar : false, // 사이드바 버튼 클릭시 상태체크
            sideBarState : "sideBarOff", // On, Off Class
            sideBarFixed : "RouterViewLeft", // 사이드바 고정 Class
            sideBarMove : "RouterMoveLeft",// move 애니메이션 Class
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

        //사이드바 열기, 닫기
        sideMenuOn(state) {
            state.sideBar = true;
            state.sideBarState = "sideBarOn";
            state.sideBarMove = "RouterMoveRight";
            state.sideBarFixed = "RouterViewRight";
        },
        sideMenuOff(state) {
            state.sideBar = false;
            state.sideBarState = "sideBarOff";
            state.sideBarMove = "RouterMoveLeft";
            state.sideBarFixed = "RouterViewLeft";
        }
    },
})

export default store;