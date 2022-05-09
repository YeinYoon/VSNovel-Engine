<template>
  <div class="CanvasBackground">
    <div class="Project_Header" @dblclick="inputPlotTitle = true">
        <p v-if="inputPlotTitle == false">
          {{title}}
        </p>
        <input v-else v-model="title">
    </div>
    <div class="WN_Editor_Frame">
      <div class="WN_Editor">
        <WebNovelEditor
        @commitContent="getContent"
        ref="webNovelEditor"></WebNovelEditor>
      </div>
      <div class="WN_Preview"> 
        <div id="preview" v-html="contentHTML" ref="content"></div>
      </div>
    </div>

    <div class="SaveButton"> 
      <button @click="saveAll()">현재 상태 저장</button>
    </div>

    <div class="pjInfo">
      <p>마지막 저장 : {{retouchDate}}</p>
      <p>상태 : {{status}}</p>
    </div>
    
    <div class="PjEditButton"> 
      <button @click="goToEditPjInfo(pjCode)">프로젝트 정보 수정</button>
    </div>

    <div class="InviteButton">
      <button @click="goToInvitePj(pjCode)">유저 초대</button>
    </div>

    <div class="SaveTextButton">
      <button
      @click="this.inputPlotTitle = false; this.$emit('savePlot', {title : this.title, content : this.contentHTML})">
      플롯 저장</button>
      <button @click="this.$emit('deletePlot')">플롯 삭제</button>
    </div>

    <div class="ExportButton"> 
      <button @click="this.$emit('pjSave')">프로젝트 저장</button>
    </div>

    
    
  </div>
</template>

<script>
import axios from '../../../../axios';
import WebNovelEditor from '../../editor/WebNovelEditor.vue'

export default {
  name: 'W_EngineCanvas',
  props:{
    isEditPj : Boolean,
    isInvitePj : Boolean,
    NovelPlot : Object,
    nowPlot : Number
  },
  watch : {
    nowPlot() {
      console.log("선택된 플롯의 인덱스 : ",this.nowPlot);

      this.inputPlotTitle = false;

      this.title = this.NovelPlot[this.nowPlot].title;
      this.contentHTML = this.NovelPlot[this.nowPlot].content;
      this.$refs.webNovelEditor.state.content = this.contentHTML;
    }
  },
  mounted() {
        this.pjCode = this.$route.params.pjCode;
        this.getPjInfo(this.pjCode);

        // this.title = this.NovelPlot[0].title;
        // this.contentHTML = this.NovelPlot[0].content;
        // this.$refs.webNovelEditor.state.content = this.NovelPlot[0].content;
    },
    data(){
        return {
            pjType : "",
            pjCode : "",
            title : "",
            retouchDate : "",
            status : "",

            inputPlotTitle : false,
            contentHTML : "",

            output:null
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
                    this.title = this.NovelPlot[0].title;
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
          console.log('edit', pjCode)
          this.$emit('pjEdit',true)
        },

        goToInvitePj(pjCode) {
          this.$emit('pjInvite',true)
          console.log(pjCode)
        },

        saveAll() {
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

        // 작성한 내용 미리보기
        viewContent() {
          //일렉트론 children Window 이용할것
        },

        // PDF 변환
        async exportToPDF () {
          const el = this.$refs.content
          const Option = {
            type: 'dataURL'
          }
          this.output = await this.$html2canvas(el, Option)
          // html2pdf(this.$refs.content, {
          //   margin: 0.42,
          //   filename: 'document.pdf',
          //   image: { type: 'jpeg', quality: 1.98 },
          //   html2canvas: { dpi: 192, letterRendering: true },
          //   jsPDF: {orientation: 'portrait', unit: 'in', format: 'a4'} 
          // })
        },

        plotMove() { // 0번째 플롯을 삭제했을시 작동
          this.inputPlotTitle = false;
          this.title = this.NovelPlot[this.nowPlot].title;
          this.contentHTML = this.NovelPlot[this.nowPlot].content;
          this.$refs.webNovelEditor.state.content = this.contentHTML;
        }
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
  top: calc(100% - 30px);
  line-height: 10px;
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

.Project_Header p{
  width: 440px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.WN_Editor_Frame {
  position: absolute;
  top: 80px;
  width: calc(100% - 40px);
  height: calc(100% - 160px);
  border-radius: 25px;
  overflow: hidden;
}

.WN_Editor {
  background: white;
  position: absolute;
  width: calc(50% - 10px);
  height: calc(100%);
  color: black;
  overflow: auto;
  border-radius: 25px;

}
.WN_Preview {
  background: white;
  position: absolute;
  left: calc(50% + 20px);
  width: calc(50% - 20px);
  height: calc(100%);
  color: black;
  overflow: auto;
  border-radius: 25px;
  padding: 20px;
  white-space: normal;
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
  top: calc(100% - 60px);
  left: 140px;
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

.SaveTextButton {
  width: 100px;
  height: 40px;
  position: absolute;
  top: calc(100% - 60px);
  z-index: 1;
}

.SaveTextButton button {
  background: #2872f9;
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 20px;
  color: white;
}

.PreviewButton {
  width: 120px;
  height: 40px;
  position: absolute;
  top: calc(100% - 60px);
  left: 300px;
  z-index: 1;
}

.PreviewButton button {
  background: #2872f9;
  width: 120px;
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