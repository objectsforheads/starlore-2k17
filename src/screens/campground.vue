<template>
  <div class="campground">
    <h1>stuff</h1>
  </div>
</template>

<style scoped lang="scss">
  .campground {
    // HACK really need a better way to import variables
    @import '../assets/styles/_globals';

    @include m-body-text();
  }
</style>
