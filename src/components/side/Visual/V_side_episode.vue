<template>
<ConfirmModal ref="confirmModal"></ConfirmModal>
  <div class="VSBackgroundSet">

    

  </div>
</template>

<script>
import ConfirmModal from '../../modal/ConfirmModal.vue'
// import axios from '../../../axios'
export default {
  name: 'V_side_setting',
  props : {
    pjCode : String
  },
  components : {
    ConfirmModal
  },
  created() {
    
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>
.VSBackgroundSet {
  width: 100%;
  height: 100%;
}


</style>