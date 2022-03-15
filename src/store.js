import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            userNickname : null,
            LoadingStatus: false
        }
    },
    mutations : {
        //유저 로그인
        userLogin(state, name) {
            state.userNickname = name;
        },

        //로딩
        startSpinner(state){
            state.LoadingStatus = true;
        },
        endSpinner(state){
            state.LoadingStatus = false;
        }
    }
})

export default store;