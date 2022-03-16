<template>
  <div>
      {{pjType}}
  </div>
</template>

<script>
export default {
    name : "VDevBoard",
    created() {
        if(this.pjType == "V") {
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
        VpjCode : String
    }
}
</script>

<style>

</style>