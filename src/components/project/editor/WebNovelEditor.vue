<template>
<div>
  <quill-editor v-html="loadData"
    v-model:value="state.content"
    :options="state.editorOption"
    :disabled="state.disabled"
    @change="onEditorChange($event)"
  />
    <!-- @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)" -->
    <button @click="save()">저장</button>
</div>
</template>

<script>
import { reactive } from "vue";
import { quillEditor } from "vue3-quill";
export default {
  name: "App",
  data() {
    return {
      loadData : "",
    }
  },
  methods : {
    save() {
      this.$emit("commitContent",this.state._content);
      //DB 저장코드 작성하면 될듯 ㅎㅎ;
    }
  },

  setup() {
    const state = reactive({
      _content: "",
      editorOption: {
        placeholder: "",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ size: ["small", false, "large", "huge"] }],
            // [{ font: [] }], // 추후 폰트 지원
            [{ align: [] }],
            ["clean"],
          ],
        },
      },
      disabled: false,
    });

    const onEditorChange = ({ quill, html, text }) => {
      console.log("editor change!", quill, html, text);
      state._content = html;
    };

    return {
      state,
      onEditorChange,
    };
  },

  components: {
    quillEditor,
  }
};
</script>
<style>
.ql-editor > * {
  cursor: text;
  color: black;
  font-size: 18px;
  font-family: "RIDIBatang";
}

@font-face {
  font-family: 'RIDIBatang';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
</style>