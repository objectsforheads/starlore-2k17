<template>
  <div class="campground" v-bind:class="isViewingSky">
    <div class="background">
      <div class="starfield sprite"></div>
    </div>
    <div class="foreground" v-bind:class="isTutorial">
      <div class="mountains sprite"></div>
      <div class="land sprite">
        <div class="land--1"></div>
        <div class="land--2"></div>
        <div class="land--3"></div>
        <div class="land--4"></div>
        <div class="land--5"></div>
      </div>
      <div class="fire sprite"></div>
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
      },
      isViewingSky: function() {
        if (this.$store.state.isViewingSky) {
          return 'viewing-sky';
        }
        return false;
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
    max-height: calc(100% - 175rem); // CLI height
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

  .foreground .sprite {
    transition: font-size 500ms ease-out;
  }

  .viewing-sky {
    .sprite {
      font-size: 1rem;
    }
  }
</style>
