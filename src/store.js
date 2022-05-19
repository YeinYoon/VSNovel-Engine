import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            //유저 로그인
            userNickname : null,

            //로딩
            LoadingStatus: false,

            //전역(Global) 모달
            gModalState : false,
            gModalMsg : "",
            gModalSize : "",

            // 사이드바
            sideBar : false, // 사이드바 버튼 클릭시 상태체크
            sideBarState : "sideBarOff", // On, Off Class
            sideBarButtonState : "sideBarButtonOff", // On, Off Class
            sideBarFixed : "RouterViewLeft", // 사이드바 고정 Class
            sideBarMove : "RouterMoveLeft",// move 애니메이션 Class,
            sideAnimationState : true,

            sideMenuState : "M" //R : 리소스, C : 협업, S : 설정, M : 메인
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
        cngSideMenu(state, val){
            state.sideMenuState = val;
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
            state.sideAnimationState = true;
            state.sideBar = true;
            state.sideBarState = "sideBarOn";
            state.sideBarMove = "RouterMoveRight";
            state.sideBarFixed = "RouterViewRight";
        },
        sideMenuOff(state) {
            state.sideAnimationState = true;
            state.sideBar = false;
            state.sideBarState = "sideBarOff";
            state.sideBarMove = "RouterMoveLeft";
            state.sideBarFixed = "RouterViewLeft";
        },

        sideAnimationFixed(state) {
            console.log(state.sideAnimationState);
            state.sideAnimationState = true;
            setTimeout(function() {
                state.sideAnimationState = !state.sideAnimationState;
                console.log(state.sideAnimationState);
                return true
            }, 700);
        },
    },
})

export default store;