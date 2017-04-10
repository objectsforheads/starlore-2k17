<template>
  <div class="starfield">
    <div class="planisphere">
      <constellation v-for="constellation in constellations"
      v-bind:key="constellation.name"
      v-bind:constellation="constellation">
      </constellation>
    </div>
    <div class="planisphere">
      <constellation v-for="constellation in constellations"
      v-bind:key="constellation.name"
      v-bind:constellation="constellation">
      </constellation>
    </div>
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
.starfield {
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  will-change: content;

  // Set up the night sky backdrop
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../assets/images/tmp.jpg');
    background-size: 2250rem;

    opacity: 0.01;
    transition: opacity 500ms;

    .lit & {
      opacity: 0.1;
    }

    .viewing-sky & {
      opacity: 0.2;
    }
  }
}

.planisphere {
  width: 2250rem;
  height: 1024rem;

  // Hidden by default
  opacity: 0;
  transition: opacity 1000ms;

  .viewing-sky & {
    opacity: 1;
    transition: opacity 500ms;
  }
}
</style>
