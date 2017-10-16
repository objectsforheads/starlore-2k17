<template>
  <main id="app" v-bind:class="'game scale-' + scale">
    <transition name="changeover" mode="out-in">
      <router-view></router-view>
    </transition>
  </main>
</template>

<script>
/* eslint-disable */
import store from './data/store';

export default {
  name: 'app',
  store,
  data() {
    return {
      scale: 2,
    };
  },
};
</script>

<style lang="scss">
@import 'node_modules/reset-css/_reset';
@import './assets/styles/_globals';
@import './assets/styles/_animations';
@import './assets/styles/_sprites';

*, *::before, *::after {
  position: relative;
  box-sizing: border-box;
}

html, body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  background-color: $g-palette_primary-dark;
  color: $g-palette_primary-white;
}

main {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.sprite {
  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: pixelated;
  image-rendering: optimize-contrast;
  -ms-interpolation-mode: nearest-neighborz;
}

@font-face {
    font-family: 'upheaval';
    src: url('assets/fonts/upheavtt-webfont.woff2') format('woff2'),
         url('assets/fonts/upheavtt-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'romulus';
    src: url('assets/fonts/romulus-webfont.woff2') format('woff2'),
         url('assets/fonts/romulus-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

h1, h2, h3, h4, h5, h6,
.h1, .h2, .h3, .h4, .h5, .h6 {
  font-family: $g-font-family_heading;
}

html, body {
  font-size: 1px;
  font-family: $g-font-family_body;
}

.game {
  @include m-body-text();
  line-height: 1.33;
}
</style>
