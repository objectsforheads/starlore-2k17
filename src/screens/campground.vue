<template>
  <div class="campground">
    <div class="foreground">
      <div class="fire sprite" v-bind:class="isTutorial"></div>
    </div>
    <game-cli></game-cli>
  </div>
</template>

<script>
/* eslint-disable */
  export default {
    name: 'campground',
    computed: {
      isTutorial: function() {
        if (this.$store.state.isTutorial) {
          return false;
        }
        return 'lit';
      }
    }
  }
</script>

<style scoped lang="scss">
  // HACK really need a better way to import variables
  @import '../assets/styles/_globals';

  [class*="-enter-active"] {
    animation: fadeIn 50ms;
  }

  .campground {
    width: 100%;
    height: 100%;
  }

  .foreground {
    height: 100%;
    max-height: calc(100% - 250rem); // CLI height
  }

  .fire {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
