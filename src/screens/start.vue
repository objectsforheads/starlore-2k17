<template>
  <div class="start-screen">
    <h1>
        <img src="../assets/images/logo.png" alt="Game name - brush stroke lettering">
    </h1>
    <div class="start-screen__alignment--text">
      <span class="byline">
        a small game by objectsforheads
      </span>
      <router-link to="/campground" class="start-button a_pressStart">
        <span class="a-blink actionable">Press Start</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
  // HACK really need a better way to import variables
  @import '../assets/styles/_globals';

  [class*="-enter-active"] {
    animation: slideInUp 500ms;
  }

  [class*="-leave-active"] {
    animation: slideOutUp 500ms;
    animation-delay: 500ms;

    .a-blink {
      animation-duration: 150ms;
    }
  }

  .start-screen {
    // Puts the main button closer to the center line
    // so that the screeen doesn't look so weighed to the bottom
    top: -100rem;
  }

  .start-screen__alignment--text {
    position: absolute;
    right: 0;
    bottom: 0;

    text-align: right;
  }

  .byline {
    @include m-body-text();
  }

  .start-button {
    display: block;
    width: 467rem;
    height: 41rem;
    background: url('../assets/images/starlore_press-start.png') no-repeat center center;

    line-height: 41rem;
    @include m-heading-text(2);
    text-align: center;
    color: $g-palette_primary-white;
    text-transform: uppercase;
    text-decoration: none;

    &:focus,
    &:active {
      outline: none;
    }
  }
</style>
