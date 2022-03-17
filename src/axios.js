import axios from 'axios'
import store from './store'

const axiosInstance = axios.create({
})

axiosInstance.interceptors.request.use(
    config => {
        store.commit('startSpinner');
        return config;
    },
    error => {
        this.$store.commit('gModalOn', {msg : "ERR : 데이터 요청 실패.", size : "small"});
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        store.commit('endSpinner');
        return response;
    },
    error => {
        this.$store.commit('gModalOn', {msg : "ERR : 데이터 응답 실패.", size : "small"});
        return Promise.reject(error);
    }
)

export default axiosInstance