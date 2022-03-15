<template>
  <div>
      {{pjType}}
  </div>
</template>

<script>
export default {
    name : "WDebBoard",
    created() {
        if(this.pjType == "W") {
            alert("웹노벨 개발페이지 진입");
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