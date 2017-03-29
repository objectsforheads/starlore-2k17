<template>
  <div class="campground">
    <div class="sprite">
      <div class="fire">

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  [class*="-enter-active"] {
    animation: fadeIn 50ms;
  }

  .campground {
    // HACK really need a better way to import variables
    @import '../assets/styles/_globals';

    @include m-body-text();
  }
</style>
