<template>
<div class="RouterView">

  <div>
    {{pjType}}
  </div>

</div>
</template>

<script>
export default {
    name : "WDebBoard",
    created() {
        if(this.pjType == "W") {
            // 데이터 불러오기의 시작점.
            // 기존 프로젝트 데이터 가져오는 코드 작성할 것.
        }
    },
    data() {
        return {
            
        }
    },
    methods : {

    },
    props : {
        pjType : String,
        WpjCode : String
    }
}
</script>

<style>

</style>