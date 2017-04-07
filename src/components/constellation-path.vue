<template>
  <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" class="constellation-line">
    <path v-bind:data-timing="this.timing"
    stroke="#ccc" stroke-width="1" fill="none"/>
  </svg>
</template>

<script>
/* eslint-disable */
export default {
  name: 'constellation-path',
};
</script>

<style lang="scss">
.constellation-line {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
