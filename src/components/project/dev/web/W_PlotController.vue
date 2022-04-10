<template>
  <div class="PCBackground">
    <div v-for="plot in plotList" :key="plot.PLOT_CODE">
      <p>{{plot.PLOT_TITLE}}</p>
    </div>

  </div>
</template>

<script>
import axios from '../../../../axios'
export default {
  name: 'W_PlotController',
  created() {
    this.getPlotList();
  },
  data() {
    return {
      pjCode : "",
      plotList : [],
    }
  },
  methods : {
    getPlotList() {
      axios.post('/engine/pj/getPlotList', {pjCode : this.$route.params.pjCode})
      .then((result)=>{
        console.log(result);
        if(result.data != "empty") {
          this.plotList = result.data;
        }
      })
      .catch((err)=>{
        console.error(err);
      })
    },


  }
}
</script>

<style>
.PCBackground {
  width: 100%;
  height: 100%;
}
</style>