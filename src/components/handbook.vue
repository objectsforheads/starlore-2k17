<template>
  <div class="manual" v-bind:class="[isOpen]">
    <div class="manual__toggle">
      {{this.foundConstellations}}/{{this.totalConstellations}} <span class="manual__info-icon">!</span>
    </div>
    <div class="page">
      <ul>

      </ul>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'manual',
    computed: {
      isOpen: function() {
        return false;
      },
      totalConstellations: function() {
        let self = this;
        let state = self.$store.state;
        return state.totalConstellations;
      },
      foundConstellations: function() {
        let self = this;
        let state = self.$store.state
        return state.foundConstellationsCount;
      }
    },
  }
</script>

<style scoped lang="scss">
@import '../assets/styles/_globals';

.manual {
  position: absolute;
  top: 0;
  right: 100%;
  width: 100%;
  height: 100%;
  z-index: 2;
  animation: fadeIn 250ms;

  &__toggle {
    position: absolute;
    top: 0;
    left: 100%;
    width: 3.5em;
    padding: 0.25em 1em 0.25em 0.5em;
    border-radius: 0 0 0.5em 0;
    border: 2px solid $g-palette_primary-white;
    border-width: 0 2px 2px 0;
    @include m-body-text;
    text-align: right;
    white-space: nowrap;
  }

  &__info-icon {
    color: $g-palette_primary-dark;
    background: $g-palette_primary-white;
    display: inline-block;
    text-align: center;
    line-height: 1em;
    padding-left: 0.1em; // align to optical center
    border-radius: 50%;
    width: 1em;
    height: 1em;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
  }
}
</style>
