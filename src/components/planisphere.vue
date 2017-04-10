<template>
  <div class="starfield"
    v-bind:style="starfieldNaviator"
    v-on:mousedown="starfieldMousedown"
    v-on:mousemove="starfieldMousemove"
    v-on:mouseup="starfieldMouseup">
    <div class="planisphere">
      <constellation v-for="constellation in constellations"
      v-bind:key="constellation.name"
      v-bind:constellation="constellation">
      </constellation>
    </div>
    <div class="planisphere">
      <constellation v-for="constellation in constellations"
      v-bind:key="constellation.name"
      v-bind:constellation="constellation">
      </constellation>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import constellations from '../data/constellations';
import _ from 'lodash';

export default {
  name: 'planisphere',
  props: ['star'],
  created: function() {
    document.addEventListener('mouseout', (e) => {
      e = e ? e : window.event;
      let from = e.relatedTarget || e.toElement;
      if (!from || from.nodeName == "HTML") {
        let self = this;
        self.$store.commit('booleanToggle', {
          qualifier: 'canNavigateSky',
          boolean: false
        })
        self.$store.commit('booleanToggle', {
          qualifier: 'isNavigatingSky',
          boolean: false
        })
      }

    })
  },
  mounted: function() {
    let currentWidth = this.$el.clientWidth;
    let currentHeight = this.$el.clientHeight;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let nonStarfieldRegionHeight = document.querySelector('.game-cli').clientHeight;

    this.starfieldCoordinates.x = windowWidth/2 - currentWidth/2;

    this.starfieldGPS.constraint.x.right = windowWidth - currentWidth;
    this.starfieldGPS.constraint.y.bottom = windowHeight - currentHeight - nonStarfieldRegionHeight;
  },
  computed: {
    starfieldNaviator: function() {
      let coords = this.starfieldCoordinates;
      let gps = this.starfieldGPS.constraint;
      coords.x = coords.x - this.starfieldGPS.diff.x;
      coords.y = coords.y - this.starfieldGPS.diff.y;

      try {
        // Snap planisphere back to left when at right edge
        if (coords.x < gps.x.right) {
          coords.x = (window.innerWidth - this.$el.clientWidth/2);
        }

        // Snap planisphere to right when at left edge
        if (coords.x > gps.x.left) {
          coords.x = -this.$el.clientWidth/2;
        }

        if (coords.y > gps.y.top) {
          coords.y = gps.y.top;
        }

        if (coords.y < gps.y.bottom) {
          coords.y = gps.y.bottom;
        }
      } catch(err) {}

      return {
        transform: `translate(${coords.x}rem, ${coords.y}rem)`
      }
    }
  },
  data() {
    return {
      constellations,
      starfieldCoordinates: {
        x: 0,
        y: 0
      },
      starfieldGPS: {
        start: {
          x: 0,
          y: 0
        },
        diff: {
          x: 0,
          y: 0
        },
        constraint: {
          x: {
            left: 0,
            right: 0
          },
          y: {
            top: 0,
            bottom: 0
          }
        }
      }
    };
  },
  methods: {
    starfieldMousedown: function(e) {
      e.preventDefault();
      let self = this;
      let canMove = this.$store.state.isViewingSky;
      if (canMove) {
        self.starfieldGPS.start.x = e.screenX;
        self.starfieldGPS.start.y = e.screenY;
        self.$store.commit('booleanToggle', {
          qualifier: 'canNavigateSky',
          boolean: true
        })
      }
    },
    starfieldMousemove: _.throttle(
      function(e) {
        e.preventDefault();
        let self = this;
        let canMove = self.$store.state.canNavigateSky;
        let isMoving = self.$store.state.isNavigatingSky;
        if (canMove && !isMoving) {
          self.$store.commit('booleanToggle', {
            qualifier: 'isNavigatingSky',
            boolean: true
          })
        }
        if (isMoving) {
          let start = this.starfieldGPS.start;

          this.starfieldGPS.diff.x = start.x - e.screenX;
          this.starfieldGPS.diff.y = start.y - e.screenY;
          start.x = e.screenX;
          start.y = e.screenY;
        }
      }, 50),
    starfieldMouseup: function(e) {
      let self = this;
      self.$store.commit('booleanToggle', {
        qualifier: 'canNavigateSky',
        boolean: false
      })
      self.$store.commit('booleanToggle', {
        qualifier: 'isNavigatingSky',
        boolean: false
      })

      let isMoving = this.$store.state.isNavigatingSky;
      if (isMoving) {
        this.starfieldGPS.diff.x = 0;
        this.starfieldGPS.diff.y = 0;
      }
    }
  }
};
</script>

<style lang="scss">
.starfield {
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  will-change: content;

  // Set up the night sky backdrop
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../assets/images/tmp.jpg');
    background-size: 2250rem;

    opacity: 0.01;
    transition: opacity 500ms;

    .lit & {
      opacity: 0.1;
    }

    .viewing-sky & {
      opacity: 0.2;
    }
  }
}

.planisphere {
  width: 2250rem;
  height: 1024rem;

  // Hidden by default
  opacity: 0;
  transition: opacity 1000ms;

  .viewing-sky & {
    opacity: 1;
    transition: opacity 500ms;
  }
}
</style>
