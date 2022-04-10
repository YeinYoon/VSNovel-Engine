<template>
  <div class="lds-facebook" v-if="loading">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
<style>
.lds-facebook {
  display: inline-block;
  position: absolute;
  width: 64px;
  height: 64px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 6px;
  width: 15px;
  margin-left: 10px;
  border-radius: 250px;
  background: #2872f9;
  box-shadow: 0px 0px 10px 2px rgba(24, 53, 113, 0.7);
  animation: lds-facebook 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 0px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 30px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 60px;
  animation-delay: 0s;
}
@keyframes lds-facebook {
  0% {
    opacity: 0.5;
    top: -50px;
    transform: scale(0.1);
    height: 10px;
  }
  50%,
  100% {
    top: 0px;
    transform: scale(1);
    height: 15px;
  }
}
</style>