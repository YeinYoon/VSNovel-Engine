<template>

<button class="btn btn-primary" @click="exportToPDF()">PDF 변환</button>
<WebNovelEditor
@commitContent="getContent"></WebNovelEditor>

<div id="preview" v-html="contentHTML" ref="content"></div>
</template>


<script>
import WebNovelEditor from '../../editor/WebNovelEditor.vue'
import html2pdf from 'html2pdf.js'
export default {
    name : "WDebBoard",
    created() {
      if(this.pjType == "W") {
        console.log("웹소설 개발 페이지 진입");
      }
    },
    data() {
        return {
            contentHTML : ""
        }
    },
    methods : {
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
		}
    },
    props : {
      pjType : String,
      WpjCode : String
    },
    components : {
      WebNovelEditor
    }
}
</script>

<style>
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