<template>
<div class="RouterModalView">
    <div class="EditInner">
        <div class="InnerPositioner">
            <div>
            <select v-model="searchType">
                <option value="I" selected>아이디</option>
                <option value="N">닉네임</option>
            </select>
            <input type="text" v-model="searchKeyword"> <button @click="userSearch()">유저 검색</button>

            <table border="2px">
                <thead>
                        <th>ID</th>
                        <th>닉네임</th>
                        <th>초대하기</th>
                </thead>
                <tbody>
                    <tr v-for="user in userList" :key="user.USER_ID">
                        <td :id="user.USER_ID">{{user.USER_ID}}</td>
                        <td>{{user.USER_NICKNAME}}</td>
                        <td><button @click="inviteUser(user.USER_ID)" :disabled="isInvite == user.USER_ID">초대</button></td>
                    </tr>
                </tbody>
            </table>

            <button @click="back()">돌아가기</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from '../../../axios'
export default {
    name : "InvitePj",
    created() {
        this.pjCode = this.$route.params.pjCode;
        console.log(this.pjCode);
    },
    data() {
        return {
            pjCode : "",
            searchKeyword : "",
            searchType : "I",
            userList : [],
            isInvite : ""
        }
    },
    props:{
        isInvitePj:Boolean
    },
    methods : {
        userSearch() {
            var searchData = {
                searchKeyword : this.searchKeyword,
                searchType : this.searchType
            }
            axios.post('/engine/user/search', searchData)
            .then((result)=>{
                if(result.data != "empty") {
                    this.userList = result.data;
                } else {
                    this.$store.commit('gModalOn', {msg : "조건에 맞는 유저를 찾지 못했습니다.", size : "normal"});
                }
            })
            .catch((err)=>{
                console.error(err);
            })
        },

        inviteUser(userId) {
            var data = {
                userId : userId,
                pjCode : this.pjCode,
            }
            axios.post('/engine/team/inviteUser', data)
            .then((result)=>{
                if(result.data == "ok") {
                    this.$store.commit('gModalOn', {msg : `유저 [${userId}]님을 초대하였습니다.`, size : "small"});
                    this.isInvite = userId;
                } else if(result.data == "already"){
                    this.$store.commit('gModalOn', {msg : "이미 초대한 유저입니다.", size : "small"});
                } else {
                    this.$store.commit('gModalOn', {msg : "ERR : 유저 초대 실패", size : "small"});
                }
            })
        },

        back() {
            this.$emit('pjInvite',false)
            // this.$router.push(`/devPage/${this.pjCode}`);
        }
    }
}
</script>

<style>
.EditInner {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 600px;
    height: 400px;
    transform: translate(-50%, -50%);
    background: #353535;
    color: white;
    border-radius: 25px;
}
.InnerPositioner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>