<template>
    <div class="container mt-3">
        <div class="mb-3">
            <input type="text" class="form-control" placeholder="id" v-model="id">
        </div>
        <div class="mb-3">
            <input type="password" class="form-control" placeholder="pw" v-model="pw">
        </div>
        <button class="btn btn-primary" @click="login()">로그인</button> <br><br>
    </div>
</template>

<script>
import axios from '../../axios';
export default {
    name:"Login",
    data(){
        return {
            id : "",
            pw : ""
        }
    },
    methods : {
        login() {
            var loginData = {
                id : this.id,
                pw : this.pw
            }
            axios.post('/engine/auth/login', loginData)
            .then((result)=>{
                if(result.data=='ok') {
                    this.$store.commit('gModalOn', {msg : "로그인되었습니다.", size : "small"});
                    this.$router.push('/');
                } else {
                    this.$store.commit('gModalOn', {msg : result.data, size : "normal"});
                }
            })
            .catch((err)=>{
                console.error(err);
            })
        }
    }
}
</script>

<style>

</style>