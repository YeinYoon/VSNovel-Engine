<template>
<ConfirmModal ref="confirmModal"></ConfirmModal>
    <div class="RouterModalView">
        <div class="EditInner">
            <div class="cancleButton" @click="back()">
                <p>x</p>
            </div>

            <div class="InnerPositioner">

                프로젝트 상태변경
                <select v-model="status">
                    <option value="D">개발중</option>
                    <option value="S">배포</option>
                    <option value="P">개발중단</option>
                </select> <br>
                <input type="text" placeholder="제목" v-model="title"> <br>
                <textarea
                cols="40"
                rows="10"
                v-model="synopsis"></textarea> <br>

                <div class="buttonsFrame">
                    <button @click="saveEdit()">수정하기</button>
                    <button @click="deletePj()">프로젝트 삭제</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import ConfirmModal from '../../modal/ConfirmModal.vue'
import axios from '../../../axios';
export default {
    name : "EditPjInfo",
    components : {
        ConfirmModal,
    },
    created() {
        this.pjCode = this.$route.params.pjCode;
        this.getPjInfo(this.pjCode);
    },
    data() {
        return {
            pjCode : "",
            status : "",
            title : "",
            synopsis : "",
        }
    },
    methods : {
        getPjInfo() {
            axios.post('/engine/pj/getPjInfo', {pjCode : this.pjCode})
            .then((result)=>{
                if(result.data == "err") {
                    this.$store.commit('gModalOn', {msg : "프로젝트 정보 불러오기를 실패했습니다.", size : "normal"});
                } else {
                    this.status = result.data.PROJ_STATUS;
                    this.title = result.data.PROJ_TITLE;
                    this.synopsis = result.data.PROJ_SYNOPSIS;
                }
            })
            .catch((err)=>{
                console.error(err);
            })
        },

        saveEdit() {
            var editData = {
                pjCode : this.pjCode,
                status : this.status,
                title : this.title,
                synopsis : this.synopsis
            }

            axios.patch('/engine/pj/editPjInfo', editData)
            .then((result)=>{
                if(result.data=="ok") {
                    this.$store.commit('gModalOn', {msg : "수정되었습니다.", size : "small"});
                    this.$router.push(`/devPage/${this.pjCode}`);
                } else {
                    this.$store.commit('gModalOn', {msg : "ERR : 프로젝트 수정 실패.", size : "small"});
                }
            })
            .catch((err)=>{
                console.error(err);
            })
        },

        back() {
            this.$router.push(`/devPage/${this.pjCode}`);
        },

        async deletePj() {
            
            var result = await this.$refs.confirmModal.show({
                msg : `프로젝트 [${this.title}]를 삭제하시겠습니까?`,
                size : "normal",
                btn1 : "확인",
                btn2 : "취소"
            });

            if(result == true) {
                axios.post('/engine/pj/deletePj', {pjCode : this.pjCode})
                .then((result)=>{
                    if(result.data == "ok") {
                        this.$store.commit('gModalOn', {msg : "프로젝트가 삭제되었습니다.", size : "normal"});
                        this.$router.push('/');
                    } else {
                        this.$store.commit('gModalOn', {msg : "ERR : 삭제를 실패했습니다.", size : "normal"});
                    }
                })
                .catch((err)=>{
                    console.error(err);
                })
            } else {
               console.log('삭제 취소');
            }

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
.buttonsFrame {
    position: absolute;
    top: 105%;
    width: 250px;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}
.buttonsFrame button{
    border: none;
    background: #2872f9;
    border-radius: 10px;
    color: white;
    display: inline-block;
    width: 100px;
    padding: 5px;
    margin: 5px;
}
.cancleButton p{
    float: right;
    font-size: 2em;
    margin-right: 10px;
}
</style>