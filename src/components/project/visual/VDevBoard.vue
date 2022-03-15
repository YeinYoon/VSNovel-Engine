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
            alert("비주얼노벨 개발페이지 진입");
        }
    },
    data() {
        return {
            
        }
    },
    methods : {
        hi() {
            alert("ㅎㅇ");
        }
    },
    props : {
        pjType : String,
        VpjCode : String
    }
}
</script>

<style>

</style>