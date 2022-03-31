<template>
  <div class="barBackground">
   <div v-bind:class="{'bars_left':true}"> <!--사이드바가 열렸을때 bars_right 로 변경, 닫혔을땐 bars_left로 변경-->
          <span class="topmenus">VSN</span>
          <span class="topmenus">프로그램 설정</span>
          <span class="topmenus">도구</span>
          <span class="topmenus">창</span>
   </div>
  </div>
</template>

<script>
export default {
    name: 'TaskBar',
}
</script>

<style>
.barBackground {
    background: #5e5e5e;
    height: 30px;
}

.topmenus {
    position: relative;
    top: 2px;
    padding: 10px;
    color: white;
}
.topmenus:hover {
    background: #8f8f8f;
}

.bar_el:hover{
    background: #8f8f8f;
}

.bars_right{
    position: relative;
    animation-name: taskright;
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
}

.bars_left{
    position: relative;
    animation-name: taskleft;
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
}

@keyframes taskright {
    from {
        left: 140px;
    }
    to {
        left: 280px;
    }
}

@keyframes taskleft {
    from {
        left: 280px;
    }
    to {
        left: 140px;
    }
}
</style>