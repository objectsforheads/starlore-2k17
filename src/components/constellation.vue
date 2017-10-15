<template>
  <div class="constellation"
  v-bind:data-name="constellation.name"
  v-on:mouseup="constellationMouseup"
  v-bind:class="[isRevealed, isActive]"
  v-bind:style="starTransformer">
    <template v-for="star in ownStars">
      <div class="star" v-bind:style="{
        'top': star.top,
        'left': star.left
      }"></div>
    </template>
    <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" class="constellation-line">
      <constellation-path
        template v-for="path in starPath"
        :key="constellation.name"
        :path="path.path"
        :timing="path.timing"
        v-on:pathDrawn="pathDrawn">
        </constellation-path>
    </svg>
    <div class="art"
    v-bind:style="constellationArt">
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import stars from '../data/stars';
import { bus } from './bus.js';

export default {
  name: 'constellation',
  props: ['constellation', 'offset'],
  data() {
    return {
      stars,
      revealed: false,
      paths: null,
      drawn: 0
    };
  },
  mounted: function() {
    this.paths = this.starPath.length;

    this.$store.commit('countConstellations', {
      name: this.constellation.name
    })
  },
  computed: {
    constellationArt: function() {
      let name = this.constellation.name;
      name = name.toLowerCase().replace(' ', '');

      let path = `static/images/constellations/constellation-bg_${name}.png`;
      return {
        background: `url('${path}') no-repeat center center`,
        backgroundSize: 'contain'
      };
    },
    starTransformer: function() {
      let ref = this.constellation;

      let refOffset = this.offset;
      var offset = [0,0];
      if (refOffset) {
        offset = [refOffset[0], refOffset[1]];
      }

      return {
        top: `calc(${ref.top} + ${offset[1]}px)`,
        left: `calc(${ref.left} + ${offset[0]}px)`,
        width: `${parseFloat(ref.width) * ref.scale}%`,
        height: `${parseFloat(ref.height) * ref.scale}%`,
        transform: `rotate(${ref.rotation}deg)`
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
    },
    isRevealed: function() {
      if (this.revealed) {
        return 'revealed';
      }
      return false;
    },
    isActive: function() {
      if (this.$store.state.activeConstellation === this.constellation.name) {
        return 'active';
      }
      return false;
    }
  },
  methods: {
    constellationMouseup: function() {
      if (!this.$store.state.isNavigatingSky) {
        let self = this;
        self.$store.commit('setActiveConstellation', {
          name: self.constellation.name
        })

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
        return false;
      }
    },
    pathDrawn: function() {
      let self = this;
      let state = self.$store.state
      self.drawn += 1;
      if (self.drawn === self.paths) {
        setTimeout(function() {
          self.revealed = true;
          self.$store.commit('findConstellation', {
            name: self.constellation.name
          })

          let remaining = state.totalConstellations - state.foundConstellationsCount;
          let output = `You found ${self.constellation.name}. `
          if (remaining === 0) {
            output += `Congratulations, you've found them all!`;
          } else {
            output += remaining > 1 ? `There are still ${remaining} constellations to be found.` : `There is but one constellation left undiscovered in the night sky.`
          }
          bus.$emit('constellationFound', {
            outputter: 'event',
            output: output
          });
        }, 250)
      }
    },
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

  .art {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0;
    transition: opacity 250ms;
  }
}

.viewing-sky:not(.navigating-sky) {
  .revealed.active,
  .revealed:hover {
    .art {
      opacity: 1;
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
  opacity: 0;
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
  }
}

// Stars are only clickable when .viewing-sky
.viewing-sky {
  .star::after {
    pointer-events: initial;
  }
}
</style>
