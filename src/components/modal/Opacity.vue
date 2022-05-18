<template>
    <div class="modal_opacity" v-if="opacityState == true">
    </div>
</template>

<script>
export default {
    name : "Opacity",
    props : {
        opacityState : Boolean
    },
    data() {
        return {

        }
    }
}
</script>

<style>

.modal_opacity{
  background: black;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  z-index: 4;
  position: fixed;
  animation-duration: 0.3s;
  animation-name: backgrounding_on;
  animation-fill-mode: forwards;
}

@keyframes backgrounding_on {
  from {
  }

  to {
    opacity: 0.3;
  }
}
</style>