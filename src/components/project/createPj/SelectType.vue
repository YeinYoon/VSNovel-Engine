<template>
    <div :class="{ [`${this.$store.state.sideBarFixed}`]:true, [`${this.$store.state.sideBarMove}`]:true }">
        <div class="select_type_frame">
            <span class="title_type">제작 유형을 선택하세요.</span>
            <div class="type_box">
                <div class="web_novel_button" @click="this.$emit('selectType', 'W')">
                    <div class="novel_tag">
                        <img class="button_img_book" src="../../../assets/icons/white/book.png">
                        <span class="korean_tag">웹 소설</span><br><span class="en_tag">Web Novel</span>
                    </div>
                </div>
                <div class="visual_novel_button" @click="this.$emit('selectType', 'V')">
                    <div class="novel_tag">
                        <img class="button_img_visual" src="../../../assets/icons/white/storytelling.png">
                        <img class="button_img_play" src="../../../assets/icons/white/youtube.png">
                        <span class="korean_tag">비주얼 노벨</span><br><span class="en_tag">Visual Novel</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"SelectType"
}
</script>

<style>
.contentbackground {
  position: absolute;
  background:#353535;
  width: calc(100vw - 120px);
  height: 100vh;
  overflow:auto;
}
.title_type {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 2em;
}
.type_box {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
    height: 500px;
}
.web_novel_button{
    position: absolute;
    width: 35%;
    height: 60%;
    top: 50%;
    left: 220px;
    transform: translate(-50%, -50%);
    background: #5e5e5e;
    border-radius: 25px;
    color: white;
    cursor: pointer;
}
.web_novel_button:hover{
    opacity: 0.9;
}
.visual_novel_button{
    position: absolute;
    top: 50%;
    left: 680px;
    width: 35%;
    height: 60%;
    background: #5e5e5e;
    transform: translate(-50%, -50%);
    border-radius: 25px;
    color: white;
    cursor: pointer;
}
.visual_novel_button:hover{
    opacity: 0.9;
}
.novel_tag{
    position: absolute;
    top: 80%;
    left: 30%;
    width: 50%;
    transform: translate(-50%, -50%);
}
.korean_tag{
    position: absolute;
    font-size: 1.5em;
}
.en_tag{
    position: absolute;
    margin-top: 10px;
    font-size:1em;
    left: 30%;
}
.button_img_book{
    position: absolute;
    transform: translate(-50%, -50%);
    left: 90%;
    top: -530%;
    width: 160%;
}
.button_img_visual{
    position: absolute;
    transform: translate(-50%, -50%);
    left: 90%;
    top: -550%;
    width: 110%;
    z-index: 2;
}
.button_img_play{
    position: absolute;
    transform: translate(-50%, -50%);
    left: 90%;
    top: -400%;
    width: 50%;
    z-index: 3;
}
/* 애니메이션 뺄거면 여기까지 */
.select_type_frame{
    animation-name: opening;
    animation-duration: 0.5s;
}
@keyframes opening {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>