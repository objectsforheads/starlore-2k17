<template>
  <div class="constellation"
  v-bind:data-name="constellation.name"
  v-on:click="animateConstellation"
  v-bind:style="starTransformer">
    <template v-for="star in ownStars">
      <div class="star" v-bind:style="{
        'top': star.top,
        'left': star.left
      }"></div>
    </template>
    <constellation-path
      template v-for="path in starPath"
      :key="constellation.name"
      :path="path.path"
      :timing="path.timing">
      </constellation-path>
  </div>
</template>

<script>
/* eslint-disable */
import stars from '../data/stars';

export default {
  name: 'constellation',
  props: ['constellation'],
  data() {
    return {
      stars,
    };
  },
  computed: {
    starTransformer: function() {
      let ref = this.constellation;
      return {
        top: ref.top,
        left: ref.left,
        width: ref.width,
        height: ref.height,
        transform: `scale(${ref.scale}) rotate(${ref.rotation})`
      }
    },
    ownStars: function() {
      if (this.stars[this.constellation.name]) {
        return this.stars[this.constellation.name].stars
      }
      // Error testing
      console.log(this.constellation.name);
      return false;
    },
    starPath: function() {
      if (this.stars[this.constellation.name]) {
        return this.stars[this.constellation.name].paint
      }
      // Error testing
      console.log(this.constellation.name);
      return false;
    }
  },
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
