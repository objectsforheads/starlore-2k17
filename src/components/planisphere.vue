<template>
  <div class="planisphere">
    <constellation v-for="constellation in constellations"
    v-bind:key="constellation.name"
    v-bind:constellation="constellation">
    </constellation>
  </div>
</template>

<script>
import constellations from '../data/constellations';

export default {
  name: 'planisphere',
  props: ['star'],
  data() {
    return {
      constellations,
    };
  },
};
</script>

<style lang="scss">
.planisphere {
  z-index: 3;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2250rem;
  height: 1024rem;
}
</style>
