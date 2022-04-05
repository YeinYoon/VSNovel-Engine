<template>
  <div :class="{ [`${this.$store.state.sideBarFixed}`]:true, [`${this.$store.state.sideBarMove}`]:true }">
    <div class="enginebackground">
      <div class="EngineCanvas">
        <EngineCanvas>
        </EngineCanvas>
      </div>
      <div class="PlotController">
        <PlotController/>
      </div>
    </div>
  </div>
</template>

<script>
import PlotController from './W_PlotController.vue'
import EngineCanvas from './W_EngineCanvas.vue'

export default {
  name: 'W_EngineInner',
  components: {
    PlotController,
    EngineCanvas,
  },
}

</script>

<style>
.enginebackground {
  width: 100%;
  height: 100%;
  background: #444444;
  z-index: 1;
}

.EngineCanvas {
  position: absolute;
  width: calc(100% - 220px);
  height: 100%;
  color: white;
}

.PlotController {
  position: absolute;
  left: 100%;
  transform: translate(-100%);
  width: 220px;
  height: 100%;
  padding: 20px;
  background: #272727;
  color: white;
  overflow: auto;
}
</style>