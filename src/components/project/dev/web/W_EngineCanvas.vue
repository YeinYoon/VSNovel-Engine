<template>
  <div class="CanvasBackground">
    <div class="Project_Header">
        <div>
          [{{title}}]
        </div> 
    </div>
    <div class="WN_Editor">
      <WebNovelEditor
      @commitContent="getContent"></WebNovelEditor>
      <div id="preview" v-html="contentHTML" ref="content"></div>
    </div>

    <div class="SaveButton"> 
      <button @click="save()">현재 상태 저장</button>
    </div>

    <div class="pjInfo">
      <p>마지막 저장 : {{retouchDate}}</p>
      상태 : {{status}}
    </div>
    
    <div class="PjEditButton"> 
      <button @click="goToEditPjInfo(pjCode)">프로젝트 정보 수정</button>
    </div>

    <div class="InviteButton">
      <button @click="goToInvitePj(pjCode)">유저 초대</button>
    </div>

    <div class="ExportButton"> 
      <button @click="exportToPDF()">프로젝트 내보내기</button>
    </div>
  </div>
</template>

<script>
import axios from '../../../../axios';
import WebNovelEditor from '../../editor/WebNovelEditor.vue'
import html2pdf from 'html2pdf.js'

export default {
  name: 'W_EngineCanvas',
  created() {
        this.pjCode = this.$route.params.pjCode;
        this.getPjInfo(this.pjCode);
    },
    watch : {
        $route() {
            this.getPjInfo(this.pjCode);
        }
    },
    data(){
        return {
            pjType : "",
            pjCode : "",
            title : "",
            retouchDate : "",
            status : "",
            contentHTML : "",
        }
    },
    components : {
      WebNovelEditor
    },
    methods : {
        getPjInfo() {
            axios.post('/engine/pj/getPjInfo', {pjCode : this.pjCode})
            .then((result)=>{
                if(result.data == "err") {
                    this.$store.commit('gModalOn', "프로젝트 정보를 불러오는데 실패했습니다.", "normal");
                } else {
                    this.title = result.data.PROJ_TITLE;
                    this.retouchDate = result.data.PROJ_RETOUCHDATE;
                    this.status = result.data.PROJ_STATUS;
                    this.pjType = result.data.PROJ_TYPE;
                }
            })
            .catch((err)=>{
                console.error(err);
            })
        },

        goToEditPjInfo(pjCode) {
            this.$router.push(`/devPage/${pjCode}/editInfo`);
        },

        goToInvitePj(pjCode) {
            this.$router.push(`/devPage/${pjCode}/invitePj`);
        },

        save() {
            axios.patch('/engine/pj/devSave', {pjCode : this.pjCode})
            .then((result)=>{
                if(result.data.msg == "ok") {
                    this.$store.commit('gModalOn', {msg : "저장되었습니다.", size : "small"});
                    this.retouchDate = result.data.date;
                } else {
                    this.$store.commit('gModalOn', {msg : "ERR : 프로젝트 저장 실패", size : "normal"});
                }
            })
        },

        getContent(content) {
            this.contentHTML = content;
        },

        viewContent() {
            console.log(this.contentHTML);
        },

        exportToPDF () {
        html2pdf(this.$refs.content, {
          margin: 0.42,
          filename: 'document.pdf',
          image: { type: 'jpeg', quality: 1.98 },
          html2canvas: { dpi: 192, letterRendering: true },
          jsPDF: {orientation: 'portrait', unit: 'in', format: 'a4'} 
			    })
        },
  }
}
</script>

<style>
.CanvasBackground {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.pjInfo {
  position: absolute;
  left: calc(100% - 120px);
  top: calc(100% - 60px);
  width: 300px;
  transform: translate(-50%, -50%);
}

.PjEditButton{
  width: 120px;
  height: 40px;
  position: absolute;
  left: calc(100% - 300px);
}

.PjEditButton button{
  background: #2872f9;
  width: 140px;
  height: 40px;
  border: none;
  border-radius: 20px;
  color: white;
}

.InviteButton{
  width: 120px;
  height: 40px;
  position: absolute;
  left: calc(100% - 420px);
}

.InviteButton button{
  background: #2872f9;
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 20px;
  color: white;
}

.Project_Header {
  position: absolute;
  font-size: 2em;
}

.WN_Editor {
  background: white;
  position: absolute;
  width: calc(100% - 40px);
  height: calc(100% - 190px);
  padding: 10px;
  color: black;
  border-radius: 25px;
  top: 80px;
  overflow: auto;
}

.SaveButton {
  width: 120px;
  height: 40px;
  position: absolute;
  left: calc(100% - 140px);
}

.SaveButton button{
  background: #2872f9;
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 20px;
  color: white;
}

.ExportButton {
  width: 140px;
  height: 40px;
  position: absolute;
  top: calc(100% - 100px);
  z-index: 1;
}

.ExportButton button {
  background: #2872f9;
  width: 140px;
  height: 40px;
  border: none;
  border-radius: 20px;
  color: white;
}





#preview {
  font-family: 'RIDIBatang';
  font-size: 1.5em;
}

.btn {
  float: left;
}

@font-face {
  font-family: 'RIDIBatang';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.ql-editor {
  width: 100%;
  height: 100%;
}

/*들여쓰기, 내어쓰기*/
#preview .ql-indent-1:not(.ql-direction-rtl) {
  padding-left: 2em;
}
#preview .ql-indent-1.ql-direction-rtl.ql-align-right {
  padding-right: 2em;
}
#preview .ql-indent-2:not(.ql-direction-rtl) {
  padding-left: 4em;
}
#preview .ql-indent-2.ql-direction-rtl.ql-align-right {
  padding-right: 4em;
}
#preview .ql-indent-3:not(.ql-direction-rtl) {
  padding-left: 6em;
}
#preview .ql-indent-3.ql-direction-rtl.ql-align-right {
  padding-right: 6em;
}
#preview .ql-indent-4:not(.ql-direction-rtl) {
  padding-left: 8em;
}
#preview .ql-indent-4.ql-direction-rtl.ql-align-right {
  padding-right: 8em;
}
#preview .ql-indent-5:not(.ql-direction-rtl) {
  padding-left: 10em;
}
#preview .ql-indent-5.ql-direction-rtl.ql-align-right {
  padding-right: 10em;
}
#preview .ql-indent-6:not(.ql-direction-rtl) {
  padding-left: 12em;
}
#preview .ql-indent-6.ql-direction-rtl.ql-align-right {
  padding-right: 12em;
}
#preview .ql-indent-7:not(.ql-direction-rtl) {
  padding-left: 14em;
}
#preview .ql-indent-7.ql-direction-rtl.ql-align-right {
  padding-right: 14em;
}
#preview .ql-indent-8:not(.ql-direction-rtl) {
  padding-left: 16em;
}
#preview .ql-indent-8.ql-direction-rtl.ql-align-right {
  padding-right: 16em;
}
#preview .ql-indent-9:not(.ql-direction-rtl) {
  padding-left: 18em;
}
#preview .ql-indent-9.ql-direction-rtl.ql-align-right {
  padding-right: 18em;
}

/*글자 크기*/
#preview .ql-size-large {
  font-size: 1.9em;
}
#preview .ql-size-huge {
  font-size: 2.3em;
}

/*문단정렬*/
#preview .ql-align-center {
  text-align: center;
}
#preview .ql-align-justify {
  text-align: justify;
}
#preview .ql-align-right {
  text-align: right;
}
</style>