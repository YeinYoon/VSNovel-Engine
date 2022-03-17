<template>
<div id="tmp">
<h4>이미지 파일 드래그 앤 드롭</h4>
  <div class="input-group">
    <input
       type="text"
       class="form-control"
       placeholder="이미지 URL 입력 또는 드래그 앤 드롭"
       v-model="filename"
       @dragover.prevent
       @dragenter.prevent
       @drop.prevent="onDrop">
    <div class="input-group-append">
      <span class="input-group-text" @click="onClickFile">찾아보기</span>
        <button
          class="btn btn-outline-info"
          @click="onClickUpload">업로드</button>
    </div>
    <input type=file class="file-input" accept="image/*" ref="fileInput" @change="onFileChange">
  </div>
  <div v-show="imageSrc" class="upload-image">
    <img :src="imageSrc">
  </div>

</div>
</template>

<script>
export default {
    name : "FileTest",
    data() {
        return {
            filename: '',
            imageSrc: ''
        }
    },
    methods : {
        onDrop (event) {
            this.inputImageFile(event.dataTransfer.files);
        },
        onClickFile() {
            this.$refs.fileInput.click();
        },
        onFileChange(event) {
            this.inputImageFile(event.target.files);
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
        onClickUpload () {
            this.preview (this.filename);
        },
        preview (file) {
            if (typeof file === 'string') {
                this.imageSrc = file;
            } else {
                let vm = this;
                let reader = new FileReader();
                reader.onload = () => {
                    vm.imageSrc = reader.result;
                }
                reader.readAsDataURL(file);
            }
        }
    }
}
</script>

<style>
.file-input {
    display: none;
}

.upload-image {
    padding-top: 1rem;
    width: 200px;
    height: 200px;
}
img {
    width: 100%;
    height: 100%;
}
</style>