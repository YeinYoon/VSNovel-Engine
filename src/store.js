import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            //유저 로그인
            userId : null,
            userNickname : null,

            //로딩
            LoadingStatus: false,

            //전역(Global) 모달
            gModalState : false,
            gModalMsg : "",
            gModalSize : "",

            // 사이드바
            sideBar : false, // 사이드바 버튼 클릭시 상태체크
            sideBarState : "", // On, Off Class
            sideBarButtonState : "sideBarButtonOff", // On, Off Class
            sideBarFixed : "RouterViewLeft", // 사이드바 고정 Class
            sideBarMove : "RouterMoveLeft",// move 애니메이션 Class,
            sideAnimationState : true,
            sideButtonVisible : false,

            sideMenuState : "N", // N : 선택하지 않음, R : 리소스, C : 협업, S : 설정, E : 회차관리, M : 메인화면(인덱스)
            tutorialState : false, // 튜토리얼 가이드 상태값
            tutorialType : null
        }
    },
    mutations : {
        //유저 로그인(닉네임)
        userLogin(state, data) {
            state.userId = data.userId;
            state.userNickname = data.nickName;
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
        
        //메인화면에서의 사이드바 열기, 닫기
        sideMenuOnMain(state) {
            state.sideAnimationState = true;
            state.sideBar = true;
            state.sideBarState = "sideBarOnMain";
            state.sideBarMove = "mainRouterMoveRight";
            state.sideBarFixed = "mainRouterViewRight";
        },
        sideMenuOffMain(state) {
            state.sideAnimationState = true;
            state.sideBar = false;
            state.sideBarState = "sideBarOffMain";
            state.sideBarMove = "mainRouterMoveLeft";
            state.sideBarFixed = "mainRouterViewLeft";
        },

        sideAnimationFixed(state) {
            state.sideAnimationState = true;
            setTimeout(function() {
                state.sideAnimationState = !state.sideAnimationState;
            }, 600);
        },

        sideButtonVisible(state) {
            state.sideButtonVisible = !state.sideButtonVisible;
        },

        tutorialOn(state, val) {
            state.tutorialState = true;
            state.tutorialType = val;
        },
        tutorialOff(state) {
            state.tutorialState = false;
        },
    },
})

export default store;