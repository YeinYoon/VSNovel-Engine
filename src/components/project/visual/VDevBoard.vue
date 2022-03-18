<template>
    <div id="devBoard">
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
export default {
    name : "VDevBoard",
    created() {
        if(this.pjType == "V") {
            // 데이터 불러오기의 시작점.
            // 기존 프로젝트 데이터 가져오는 코드 작성할 것.
        }
    },
    data() {
        return {
            filename: "",
            imageSrc: "",
            pageText : ""
        }
    },
    methods : {
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