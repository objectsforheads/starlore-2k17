<template>
  <div class="starfield"
    v-bind:style="starfieldNaviator"
    v-on:mousedown="starfieldMousedown"
    v-on:mousemove="starfieldMousemove"
    v-on:mouseup="starfieldMouseup">
    <canvas id="planisphere" width="4500" height="2048"></canvas>
    <canvas id="star-tracker" width="4500" height="2048"></canvas>
    <div class="planisphere" style="background: rgba(0,255,255,0.1);">
      <constellation v-for="constellation in constellations"
      v-bind:key="constellation.name"
      v-bind:constellation="constellation"
      v-bind:offset="constellationVisibility[constellation.name]">
      </constellation>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import constellations from '../data/constellations';
import stars from '../data/stars';
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

    this.starfieldCoordinates.x = windowWidth/2 - currentWidth/2;
    this.starfieldCoordinates.y = windowHeight/2 - currentHeight/2;

    this.starfieldGPS.constraint.x.right = windowWidth - currentWidth;
    this.starfieldGPS.constraint.y.bottom = windowHeight - currentHeight;

    // Draw the starfield in the canvas
    let planisphere = document.getElementById('planisphere').getContext('2d');
    let planisphereWidth = currentWidth / 2;
    let planisphereHeight = currentHeight / 2;
    let constellations = this.constellations;

    // // Track the star hitboxes
    // let starTracker = document.getElementById('star-tracker').getContext('2d');
    let test = document.getElementById('star-tracker').getContext('2d');
    let starTracker = this.starTracker;

    // Each constellation should be drawn in each quadrant
    [
      [0, 0],
      [planisphereWidth, 0],
      [0, planisphereHeight],
      [planisphereWidth, planisphereHeight]
    ].forEach(function(quadrant) {
      constellations.forEach(function(constellation) {
        planisphere.save();
        // set canvas origin
        let moveX = (parseFloat(constellation.left)/100 * planisphereWidth) + quadrant[0];
        let moveY = (parseFloat(constellation.top)/100 * planisphereHeight) + quadrant[1];
        let constellationWidth = parseFloat(constellation.width)/100 * constellation.scale * planisphereWidth;
        let constellationHeight = parseFloat(constellation.height)/100 * constellation.scale * planisphereHeight;
        let centerX = moveX + (constellationWidth/2);
        let centerY = moveY + (constellationHeight/2);
        let radians = (Math.PI/180) * constellation.rotation;
        // Rotate around center
        planisphere.translate(centerX, centerY);
        planisphere.rotate(radians);
        planisphere.translate(
          -(constellationWidth/2),
          -(constellationHeight/2)
        );

        // Let's get our hitboxes!
        let x1 = centerX - (constellationWidth / 2);
        let x2 = centerX + (constellationWidth / 2);
        let y1 = centerY - (constellationHeight / 2);
        let y2 = centerY + (constellationHeight / 2);

        let hitboxes = [
          [x1, y1],
          [x2, y1],
          [x2, y2],
          [x1, y2]
        ];

        hitboxes = hitboxes.map(function(hitbox) {
          let x = hitbox[0];
          let y = hitbox[1];

          let xRotated = (Math.cos(radians) * (x - centerX)) -
              (Math.sin(radians) * (y - centerY)) +
              centerX;
          let yRotated = (Math.sin(radians) * (x - centerX)) +
              (Math.cos(radians) * (y - centerY)) +
              centerY;

          return [xRotated, yRotated, [constellation.name, [quadrant[0], quadrant[1]]]];
        })

        // If we did this right, we should be able to draw all the hitboxes from this
        if (constellation.name === 'Virgo') {
          test.save();
          test.beginPath();
          hitboxes.forEach(function(vertice, i) {
            if (i === 0) {
              test.moveTo(vertice[0], vertice[1]);
            } else {
              test.lineTo(vertice[0], vertice[1]);
            }
          })
          test.closePath();
          test.fillStyle = 'rgba(255, 0, 0, 0.1)';
          test.fill();
          test.restore();
        }

        starTracker.push(hitboxes)

        // starTracker.save();
        // starTracker.translate(
        //   moveX + (constellationWidth/2),
        //   moveY + (constellationHeight/2)
        // );
        // starTracker.rotate((Math.PI/180) * constellation.rotation);
        // starTracker.translate(
        //   -(constellationWidth/2),
        //   -(constellationHeight/2)
        // );
        // starTracker.fillStyle = 'rgba(0,255,255,0.25)';
        // starTracker.fillRect(0, 0, constellationWidth, constellationHeight);
        // starTracker.restore();

        let ownStars = stars[constellation.name].stars;
        let starRadius = 1;
        try {
          ownStars.forEach(function(star) {
            planisphere.beginPath();
            // CSS origin is top left, not center center, so account for the radius
            let starX = constellationWidth * parseFloat(star.left) / 100 + starRadius;
            // CSS origin is top left, not center center, so account for the radius
            let starY = constellationHeight * parseFloat(star.top) / 100 + starRadius;
            planisphere.arc(starX, starY, starRadius, 0, Math.PI * 2, false);
            planisphere.fillStyle = 'rgba(255,255,255,0.25)';
            planisphere.fill();
            planisphere.arc(starX, starY, 20, 0, Math.PI * 2, false);
            planisphere.fillStyle = 'rgba(0,0,0,0.01)';
            planisphere.fill();
            // planisphere.fillRect(0, 0, constellationWidth, constellationHeight);
          })
        }
        catch(err) {
          console.log(constellation.name)
        }
        planisphere.restore();
      })
    })
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
          coords.y = -this.$el.clientHeight/2;
        }

        if (coords.y < gps.y.bottom) {
          coords.y = (window.innerHeight - this.$el.clientHeight/2);
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
      constellationVisibility: {},
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
      },
      starTracker: []
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

      // Get viewport
      let starfieldWidth = this.$el.clientWidth;
      let starfieldHeight = this.$el.clientHeight;
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;

      let x1 = -this.starfieldCoordinates.x;
      let y1 = -this.starfieldCoordinates.y;
      let x2 = x1 + windowWidth;
      let y2 = y1 + windowHeight;

      // If done right, let's draw a test canvas
      // let test = document.getElementById('star-tracker').getContext('2d');
      // test.save();
      // test.beginPath();
      // test.moveTo(x1 + (windowWidth), y1 + (windowHeight));
      // test.lineTo(x2 - (windowWidth), y1 + (windowHeight));
      // test.lineTo(x2 - (windowWidth), y2 - (windowHeight));
      // test.lineTo(x1 + (windowWidth), y2 - (windowHeight));
      // test.closePath();
      // test.fillStyle = 'rgba(255, 255, 255, 0.1)';
      // test.fill();
      // test.restore();

      // Check for visible constellations
      this.constellationVisibility = {};
      let constellationVisibility = this.constellationVisibility;
      let visibilityTracker = [];
      this.starTracker.forEach(function(hitbox) {
        let isHit = hitbox.find(function(target) {
          let x = target[0];
          let y = target[1];
          if (
            x > x1 && x < x2 &&
            y > y1 && y < y2
          ) {
            return target;
          }
        })

        if (isHit) {
          let info = isHit[2];
          if (visibilityTracker.indexOf(info[0]) === -1) {
            visibilityTracker.push(info[0]);
            constellationVisibility[info[0]] = info[1];
          } else {
            console.log(info[0])
          }
        }
      })

      console.log(constellationVisibility)
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

  width: 4500rem;
  height: 2048rem;
  flex-wrap: wrap;

  // Set up the night sky backdrop
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    //background: url('../assets/images/tmp.jpg');
    background-size: 2250rem 1024rem;

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

[id="planisphere"],
[id="star-tracker"] {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
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
