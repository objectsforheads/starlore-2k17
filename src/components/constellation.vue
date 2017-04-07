<template>
  <div class="constellation"
  v-bind:data-name="constellation.name"
  v-on:click="animateConstellation"
  v-bind:style="{
    'left': constellation.left,
    'top': constellation.top,
    'width': constellation.width,
    'height': constellation.height
  }">
    <template v-for="star in constellation.stars">
      <div class="star" v-bind:style="{
        'left': star[0],
        'top': star[1]
      }"></div>
    </template>
    <constellation-path
      v-for="path in constellation.paint"
      :key="constellation.name"
      :path="path.path"
      :timing="path.timing">
      </constellation-path>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'constellation',
  props: ['constellation'],
  methods: {
    animateConstellation: function() {
      let paths = this.$el.querySelectorAll('path');
      for (var i = 0; i < paths.length; i++) {
        let path = paths[i];
        const timing = path.getAttribute('data-timing');
        const length = path.getTotalLength();
        // Clear any previous transition
        path.style.transition = path.style.WebkitTransition = 'none';
        // Set up the starting positions
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;
        // Trigger a layout so styles are calculated & the browser
        // picks up the starting position before animating
        path.getBoundingClientRect();

        path.style.transition = path.style.WebkitTransition = timing;

        // Go!
        path.style.strokeDashoffset = '0';
      }
    }
  }
};
</script>

<style lang="scss">
.constellation {
  position: absolute;
  pointer-events: none;

  &:hover {
    .star {
      opacity: 0.66;
    }
  }
}

.star {
  position: absolute;
  width: 2rem;
  height: 2rem;
  background: white;
  pointer-events: none;
  cursor: pointer;
  opacity: 0.33;
  transition: opacity 250ms;

  &::after {
    content: '';
    width: 25rem;
    height: 25rem;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    pointer-events: initial;
  }
}
</style>
