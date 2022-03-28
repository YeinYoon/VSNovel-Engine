<template>
  <div class="barBackground">
    <div class="bar_el">
          <span class="topmenus">VSN</span>
    </div>
    <div class="bar_el">
          <span class="topmenus">프로그램 설정</span>
    </div>
    <div class="bar_el">
          <span class="topmenus">도구</span>
    </div>
    <div class="bar_el">
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
}
.bar_el{
    display: inline-block;
    position: relative;
    left: 120px;
    height: 30px;
    color: white;
    cursor: pointer;
    padding-top: 2px;
    margin-left: 10px;
    padding-left: 5px;
    padding-right: 5px;
}
.topmenus{
    text-align: center;
}

.bar_el:hover{
    background: #8f8f8f;
}
</style>