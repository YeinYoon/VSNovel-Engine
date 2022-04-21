<template>
<div>

<div class="Editor">
  <quill-editor
    v-html="loadData"
    v-model:value="state.content"
    :options="state.editorOption"
    :disabled="state.disabled"
    @change="onEditorChange($event)"
  />
</div>

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
            [],[],[],[],[],[],[],[],[],[],[],[], // 메뉴 정렬용
            ["bold", "italic", "underline"],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ size: [false, "large", "huge"] }],
            // [{ font: [] }], // 추후 폰트 지원
            [{ align: [] }],
            ["image"],
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
.Editor {
  width: 100%;
}

.ql-toolbar {
  position: sticky;
  top: 0px;
  background: white;
  z-index: 10;
  text-align: center;
}
.ql-toolbar.ql-snow {
  padding-right: 175px;
}

.ql-container {
  overflow-x: auto;
}

.ql-editor > * {
  cursor: text;
  color: black;
  font-size: 0.6em;
  font-family: "RIDIBatang";
}
.ql-container.ql-snow {
  overflow: scroll;
  border: none;
}

@font-face {
  font-family: 'RIDIBatang';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
</style>