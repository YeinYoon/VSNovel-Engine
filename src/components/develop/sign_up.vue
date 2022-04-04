<template>
<div>
  <div v-bind:class="{'contentbackground':true}"><!--컴포넌트 전체영역-->
    <img class="background_img" src="../assets/background.png" alt="">백그라운드 이미지
    <div class="sign_box"><!--전체 로그인 화면-->
      <div class="sign_title"> <!--로그인 타이틀-->
        <span>SIGN UP</span>
      </div>
      <div class="sign_inner_box"> <!--로그인 타이틀 아래, 기능부의 전체를 감싸는 검은박스-->
      
      <div class="input_box">
        <!--1페이지-->
        <p class="use_info_label">사용할 ID</p>
        <input class="use_info_input" id type="textarea">
        <p class="use_info_label">비밀번호</p>
        <input class="use_info_input" type="password">
        <p class="use_info_label">비밀번호 확인</p>
        <input class="use_info_input" type="password">
        <!--2페이지-->
        <!-- <p class="use_info_label">이름</p>
        <input class="use_info_input" id type="textarea">
        <p class="use_info_label">생년월일</p>
        <input class="use_info_input" type="password">
        <p class="use_info_label">전화번호</p>
        <input class="use_info_input" type="password"> -->
        <!--3페이지-->
        <!-- <p class="use_info_label">닉네임</p>
        <input class="use_info_input" id type="textarea">
        <p class="use_info_label">프로필 사진</p>
        <input class="use_info_input" type="password"><div class="img_browse_button"><span class="button_label">Browse</span></div>
        <p class="use_info_label">이메일</p>
        <input class="use_info_input" type="password"> -->
      </div>
      <div class="next_button">
        <span class="button_label">다음 단계로</span>
      </div>
      </div>
    </div>
  </div>
</div>  
</template>

<style>
.contentbackground {
  background:#353535;
  width: 100vw;
  height: 100vh;
  z-index: -100;
  overflow: auto;
}
.sign_box{
  position:absolute;
  width: 70%;
  height: 70%;
  padding-top: 3vh;
  padding-bottom: 3vh;
  padding-left: 3vh;
  padding-right: 3vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.background_img {
  position:absolute;
  top: 50%;
  left: 50%;
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
}
.sign_title{
  position:absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3em;
  font-weight: 700;
  color:white;
  z-index: 1;
}
.sign_inner_box{
  position:absolute;
  background: #2e2e2e;
  width: 980px;
  height: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  padding-top: 50px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  border-radius: 25px;
}
.input_box{
  position:absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -55%);
  font-size: 1.2em;
}
.use_info_label{
  margin-top: 30px;
  margin-right: 10px;
  color: white;
}
.use_info_input{
  width: 450px;
  height: 50px;
  padding-left: 10px;
  border-radius: 25px;
  background: #5e5e5e;
  color: white;
}
.next_button{
  position: absolute;
  background: #2872f9;
  left: 50%;
  top: 90%;
  width: 300px;
  height: 40px;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  text-align: center;
  display: table;
}
.button_label{
  display: table-cell;
  vertical-align: middle;
  color: white;
}
.img_browse_button{
  position: absolute;
  background: #2872f9;
  left: 120%;
  top: 58%;
  width: 150px;
  height: 40px;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  text-align: center;
  display: table;
}

</style>
<script>
export default {
  name: 'vsnsign_up',
  data() {
    return {

    }
  },

  components: {
  },
}
  
</script>

