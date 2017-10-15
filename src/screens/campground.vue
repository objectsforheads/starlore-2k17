<template>
  <div class="campground" v-bind:class="[isTutorial, isViewingSky, isNavigatingSky]">
    <planisphere></planisphere>
    <handbook></handbook>
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
      },
      isViewingSky: function() {
        if (this.$store.state.isViewingSky) {
          return 'viewing-sky';
        }
        return false;
      },
      isNavigatingSky: function() {
        if (this.$store.state.isNavigatingSky) {
          return 'navigating-sky';
        }
        return false;
      }
    }
  }
</script>

<style scoped lang="scss">
  // HACK really need a better way to import variables
  @import '../assets/styles/_globals';
  .campground {
    width: 100%;
    height: 100%;
    // animation: slideInUp 7500ms;
  }

  .foreground {
    height: 100%;

    .sprite {
      transition: all 500ms ease-out;
    }
  }

  .mountains {
    position: absolute;
    z-index: 0;

    position: absolute;
    z-index: 0;
    left: 50%;
    transform: translateX(-50%);
    bottom: 36em;

    opacity: 0;
  }

  .land {
    position: absolute;
    z-index: 1;
    bottom: -39em;
    left: 50%;
    transform: translateX(calc(-50% - 30em));

    [class*="land--"] {
      opacity: 0;
    }
  }

  .fire {
    position: absolute;
    z-index: 2;
    bottom: 6em;
    left: 50%;
    transform: translateX(-50%);

    animation: fireStart steps(1) 1000ms infinite alternate;
  }

  .lit {
    .fire {
      animation: fireGoing steps(1) 450ms infinite alternate;
    }

    .land {
      [class*="land--"] {
        animation: fadeIn 180ms;
        animation-fill-mode: both;
      }

      .land--1 {
        animation-delay: 30ms;
      }
      .land--2 {
        animation-delay: 120ms;
      }
      .land--3 {
        animation-duration: 210ms;
        animation-delay: 210ms;
      }
      .land--4 {
        animation-duration: 270ms;
        animation-delay: 360ms;
      }
      .land--5 {
        animation-duration: 270ms;
        animation-delay: 450ms;
      }
    }

    .mountains {
      animation: fadeIn 360ms;
      animation-fill-mode: both;
      animation-delay: 540ms;
    }
  }

  .viewing-sky {
    .foreground {
      pointer-events: none;
    }
    .foreground .sprite {
      font-size: 1rem;
    }
  }
</style>
