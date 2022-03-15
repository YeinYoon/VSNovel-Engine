<template>
  <div>
      {{pjType}}
      {{msg}}
  </div>
</template>

<script>
export default {
    name : "VDevBoard",
    created() {
        if(this.pjType == 1) {
            this.msg = "비주얼개발페이지임"
        } else {
            this.msg = "비주얼형식이 아님"
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
        VpjCode : String
    }
}
</script>

<style>

</style>