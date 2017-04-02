<template>
  <div class="campground">
    <div class="foreground">
      <div class="sprite">
        <div class="fire"></div>
      </div>
    </div>
    <game-cli></game-cli>
  </div>
</template>

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
</style>
