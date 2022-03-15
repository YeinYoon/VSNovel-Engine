<template>
  <div>
      {{pjType}}
      {{msg}}
  </div>
</template>

<script>
export default {
    name : "WDebBoard",
    created() {
        if(this.pjType == 0) {
            this.msg = "웹개발페이지임"
        } else {
            this.msg = "웹소설형식이 아님"
        }
    },
    data() {
        return {
            msg : ""
        }
    },
    methods : {

    },
    props : {
        pjType : Number,
        WpjCode : String
    }
}
</script>

<style>

</style>