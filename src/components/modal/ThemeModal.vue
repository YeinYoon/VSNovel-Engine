<template>
<div class="FullView" v-if="TMModalState">

  <div class="modal_opacity"></div>

  <div class="TMmodal_frame">
    <div class="TMmodal_inner">
      <p class="TMmodal_title">테마설정</p>
    
    <!-- 테마 미리보기 -->
    <div class="TMmodal_Preview">
      <div class="Section_title">프리뷰</div>
    </div>

    <!-- 폰트스타일 설정 섹션 -->
    <div class="TMmodal_FontStyle_Section">
      <div class="Section_title">폰트 설정</div>
      <div class="Section_itemList">
        <div class="Section_item Section_item_active"><img src="@/assets/icons/white/comment_two.png"><p>기본값</p></div>
        <div class="Section_item"><img src="@/assets/icons/white/comment_two.png"><p>궁서</p></div>
      </div>
    </div>

    <!-- 텍스트박스 설정 섹션 -->
    <div class="TMmodal_TextBox_Section">
      <div class="Section_title">대사창 모양</div>
      <div class="Section_itemList">
        <div class="Section_item Section_item_active"><img src="@/assets/icons/white/comment_two.png"><p>기본값</p></div>
        <div class="Section_item"><img src="@/assets/icons/white/comment_two.png"><p>선형</p></div>
      </div>
    </div>

    <!-- 캐릭터명 설정 섹션 -->
    <div class="TMmodal_Speecher_Section">
      <div class="Section_title">캐릭터명 모양</div>
      <div class="Section_itemList">
        <div class="Section_item  Section_item_active"><img src="@/assets/icons/white/comment_two.png"><p>기본값</p></div>
        <div class="Section_item"><img src="@/assets/icons/white/comment_two.png"><p>선형</p></div>
      </div>
    </div>

    <!-- 기타 설정 섹션 -->
    <div class="TMmodal_ETC_Section">
      <div class="Section_title">기타</div>
        <div class="Section_ColorSet">컬러셋 
          <select>
            <option>기본</option>
            <option>레드</option>
          </select>
        </div>
    </div>

    <!-- 테마 저장 및 취소 -->
    <!-- 취소 누를시, 저장된 변수를 초기화할것. -->
    <!-- 저장 누를시 해당 VN의 테마를 json내에 저장합니다. -->
    <div class="TMmodal_functions">
      <button class="TMmodal_saveInfo">저장</button>
      <button class="TMmodal_cancelInfo" @click="modalClose()">취소</button>
    </div>

    </div>
  </div>

</div> 
</template>

<script>
export default {
  name : "themeModal",
  data() {
    return {
      // 모달 데이터
      TMModalState : false,

    }
  },
  
  methods : {
    modalClose() {
      this.TMModalState = false;
      this.$store.commit('sideButtonVisible');
    },
    show() {
      console.log("호출함");
      this.$store.commit('sideButtonVisible');
      this.TMModalState = true;
    },

  },
}
</script>

<style>
.TMmodal_frame{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1140px;
  height: 600px;
  border-radius: 25px;
  background: #2a2a2a;
  animation-duration: 0.7s;
  animation-name: TMopening;
  z-index: 100;
  opacity: 1;
  padding: 10px;
}

.TMmodal_inner{
  color: white;
  position: absolute;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
}

.TMmodal_title {
  position: absolute;
  left: 20px;
  top: 10px;
  font-size: 1.5em;
}

.Section_title {
  position: sticky;
  left: 0px;
  top: 0px;
  padding-top: 2px;
  background: #2872f9;
  width: 120px;
  text-align: center;
  border-radius: 0 0 10px;
}

.Section_ColorSet {
  position: absolute;
  top: 40px;
  left: 10px;
}

.Section_ColorSet select {
  border: none;
  color: white;
  background: #656565;
  width: 80px;
  padding: 3px 6px 3px 3px;
  margin-left: 5px;
  border-radius: 10px;
}

.Section_itemList {
  padding: 5px 0px 0px 5px;
}

.Section_item {
  background: rgb(50, 50, 50);
  width: 92px;
  height: 92px;
  border-radius: 10px;
  display: inline-block;
  margin: 5px;
  cursor: pointer;
  overflow: hidden;
  object-fit: cover;
}

.Section_item img{
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -58%);
  text-align: center;
  width: 60px;
}

.Section_item p{
  position: relative;
  top: 12px;
  font-size: 0.8em;
  color: rgb(255, 255, 255);
  background: rgba(0,0,0,0.3);
  text-align: center;
}

.Section_item_active {
  box-shadow: 0 0 2px 3px #2872f9 inset;
  box-shadow: 0 0 2px 3px #2872f9;
}

.TMmodal_Preview {
  position: absolute;
  top: 65px;
  left: 880px;
  width: 220px;
  height: 180px;
  border-radius: 20px;
  background: #434343;
  overflow: auto;
}

.TMmodal_FontStyle_Section {
  position: absolute;
  top: 65px;
  left: 20px;
  width: 830px;
  height: 140px;
  border-radius: 20px;
  background: #434343;
  overflow: auto;
}

.TMmodal_TextBox_Section {
  position: absolute;
  top: 215px;
  left: 20px;
  width: 830px;
  height: 140px;
  border-radius: 20px;
  background: #434343;
  overflow: auto;
}

.TMmodal_Speecher_Section {
  position: absolute;
  top: 365px;
  left: 20px;
  width: 830px;
  height: 140px;
  border-radius: 20px;
  background: #434343;
  overflow: auto;
}

.TMmodal_ETC_Section {
  position: absolute;
  top: 255px;
  left: 880px;
  width: 220px;
  height: 250px;
  border-radius: 20px;
  background: #434343;
  overflow: auto;
}

.TMmodal_functions{
  position: absolute;
  width: 100%;
  top: calc(100% - 50px);
  height: 40px;
  text-align: center;
}

.TMmodal_saveInfo {
  display: inline-block;
  background: #2872f9;
  border-radius: 20px;
  border: none;
  color: white;
  width: 90px;
  height: 35px;
  margin: 3px;
}

.TMmodal_cancelInfo {
  display: inline-block;
  background: #2872f9;
  border-radius: 20px;
  border: none;
  color: white;
  width: 90px;
  height: 35px;
  margin: 3px;
}

/* 애니메이션들,*/
  /*열리는 애니메이션 opening*/
@keyframes TMopening {
  from {
    top:150%;
    opacity: 0;
  }

  to {
    top:50%;
    opacity: 1;
  }
}
  /*배경을 만드는 backgrounding_on*/
@keyframes TMbackgrounding_on {
  from {
    opacity: 0;
  }
    
  to {
    opacity: 0.3;
  }
}

</style>

