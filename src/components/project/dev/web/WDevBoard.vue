<template>

<WebNovelEditor
@commitContent="getContent"></WebNovelEditor>

<div id="preview" v-html="contentHTML" ref="content"></div>

<button class="btn btn-primary" @click="exportToPDF()">PDF 변환</button>

</template>


<script>
import WebNovelEditor from '../../editor/WebNovelEditor.vue'
import html2pdf from 'html2pdf.js'
export default {
    name : "WDebBoard",
    watch : {
        //실시간 미리보기 업데이트 기능 개발중
        // contentHTML(val) {
        //     this.contentHTML = val;
        // }
    },
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
				margin: 1,
				filename: 'document.pdf',
				image: { type: 'jpeg', quality: 0.98 },
				html2canvas: { dpi: 192, letterRendering: true },
				jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
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
    width: 500px;
    height: 300px;
    font-family: 'RIDIBatang';
}

@font-face {
  font-family: 'RIDIBatang';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

/*들여쓰기, 내어쓰기*/
#preview .ql-indent-1:not(.ql-direction-rtl) {
  padding-left: 3em;
}
#preview .ql-indent-1.ql-direction-rtl.ql-align-right {
  padding-right: 3em;
}
#preview .ql-indent-2:not(.ql-direction-rtl) {
  padding-left: 6em;
}
#preview .ql-indent-2.ql-direction-rtl.ql-align-right {
  padding-right: 6em;
}
#preview .ql-indent-3:not(.ql-direction-rtl) {
  padding-left: 9em;
}
#preview .ql-indent-3.ql-direction-rtl.ql-align-right {
  padding-right: 9em;
}
#preview .ql-indent-4:not(.ql-direction-rtl) {
  padding-left: 12em;
}
#preview .ql-indent-4.ql-direction-rtl.ql-align-right {
  padding-right: 12em;
}
#preview .ql-indent-5:not(.ql-direction-rtl) {
  padding-left: 15em;
}
#preview .ql-indent-5.ql-direction-rtl.ql-align-right {
  padding-right: 15em;
}
#preview .ql-indent-6:not(.ql-direction-rtl) {
  padding-left: 18em;
}
#preview .ql-indent-6.ql-direction-rtl.ql-align-right {
  padding-right: 18em;
}
#preview .ql-indent-7:not(.ql-direction-rtl) {
  padding-left: 21em;
}
#preview .ql-indent-7.ql-direction-rtl.ql-align-right {
  padding-right: 21em;
}
#preview .ql-indent-8:not(.ql-direction-rtl) {
  padding-left: 24em;
}
#preview .ql-indent-8.ql-direction-rtl.ql-align-right {
  padding-right: 24em;
}
#preview .ql-indent-9:not(.ql-direction-rtl) {
  padding-left: 27em;
}
#preview .ql-indent-9.ql-direction-rtl.ql-align-right {
  padding-right: 27em;
}

/*글자 크기*/
#preview .ql-size-small {
  font-size: 0.75em;
}
#preview .ql-size-large {
  font-size: 1.5em;
}
#preview .ql-size-huge {
  font-size: 2.5em;
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