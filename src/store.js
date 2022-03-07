import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            userNickname : null
        }
    },
    mutations : {
        userLogin(state, name) {
            state.userNickname = name;
        }
    }
})

export default store;