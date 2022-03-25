<template>
    <div v-if="selectPlot == null">

        <div v-if="exPlot == false" class="createPlot">
            새로운 플롯을 생성해주세요.
            <input type="text" placeholder="플롯 제목" v-model="title">
            <button @click="createPlot()">생성</button>
        </div>

        <div v-else>
            플롯 선택
            <table>
                <thead>
                    <th>코드</th>
                    <th>제목</th>
                </thead>
                <tbody>
                    <tr v-for="p in plotList" :key="p.PLOT_CODE">
                        <td>{{p.PLOT_CODE}}</td>
                        <td>{{p.PLOT_TITLE}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>

    <div id="devBoard" v-else>
        <div class="input-img">
            
            <img v-show="imageSrc" :src="imageSrc">
            
            <input
            type="text"
            class="form-control"
            placeholder="드래그 앤 드롭으로 리소스를 올려보세요"
            v-model="filename"
            @dragover.prevent
            @dragenter.prevent
            @drop.prevent="onDrop"
            readonly>

        </div>
        
        <div id="talkTable"
        contenteditable="true"
        placeholder="텍스트를 입력해보세요.">
        </div>
  </div>
</template>

<script>
import axios from '../../../../axios'
export default {
    name : "VDevBoard",
    created() {
        if(this.pjType == "V") {
            this.getPlotList();
        }
    },
    data() {
        return {
            selectPlot : null,
            exPlot : false,
            title : "",
            plotList : [],

            filename: "",
            imageSrc: "",
            pageText : ""
        }
    },
    methods : {

        getPlotList() {
            axios.post('/engine/pj/getPlotList', {pjCode : this.VpjCode})
            .then((result)=>{
                console.log(result);
                if(result.data != "empty") {
                    this.exPlot = true;
                    this.plotList = result.data;
                }
            })
            .catch((err)=>{
                console.error(err);
            })
        },

        createPlot() {
            axios.post('/engine/pj/createPlot', {pjCode : this.VpjCode, title : this.title})
            .then((result)=>{
                if(result.data == "ok") {
                    this.$store.commit('gModalOn', {msg : "새로운 플롯 생성.", size : "small"});
                    this.exPlot = true;
                    this.getPlotList();
                }
            })
            .catch((err)=>{
                console.error(err);
            })
        },


        onDrop (event) {
            this.inputImageFile(event.dataTransfer.files);
        },
        inputImageFile (files) {
            if (files.length) {
                let file = files[0]
                if (!/^image\//.test(file.type)) {
                    alert('이미지 파일만 등록이 가능')
                    return false
                }
                this.filename = file.name;
                this.preview(file);
            }
        },
        preview (file) {   
            let vm = this;
            let reader = new FileReader();
            reader.onload = () => {
                vm.imageSrc = reader.result;
            }
            reader.readAsDataURL(file);
        }
    },
    props : {
        pjType : String,
        VpjCode : String
    }
}
</script>

<style>

#devBoard {
    background-color: rgba(235, 204, 192, 0.877);
    position: fixed;
    width: 100%;
    height: 100%;
}

/* #background {
    background-color: white;
    position: fixed;
    left: 50%;
    top: 60%;
    transform: translate(-50%, -50%);
    width : 70%;
    height : 70%;
} */

#talkTable {
    background-color: grey;
    position: fixed;
    width: 70%;
    height: 25%;
    opacity: 0.4;
    left: 50%;
    top: 82.5%;
    transform: translate(-50%, -50%);
}

.input-img {
    /* width : 100%;
    height : 100%; */

    background-color: white;
    position: fixed;
    left: 50%;
    top: 60%;
    transform: translate(-50%, -50%);
    width : 70%;
    height : 70%;
}
.form-control {
    width: 100%;
    height: 100%;
}

[contenteditable=true]:empty:before{
  content: attr(placeholder);
  display: block; /* For Firefox */
}
div[contenteditable=true] {
  font-size: 30px;
  color: white;
  padding: 15px;
}
</style>