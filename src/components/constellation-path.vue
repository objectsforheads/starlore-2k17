<template>
  <path v-bind:data-timing="this.timing"
  stroke="#ccc" stroke-width="1" fill="none"
  v-on:transitionend="constellationTransitionend" />
</template>

<script>
/* eslint-disable */
export default {
  name: 'constellation-path',
  props: ['path', 'timing'],
  mounted: function() {
    // Get the path we need to target
    let path = this.$el;
    // Get the array of stars we need to connect as indexes
    let draw = this.path;

    // Accumulate path points
    let line = '';

    let constellation = this.$parent.$el;
    for (var i = 0; i < draw.length - 1; i++) {
      let start = constellation.querySelector('.star:nth-of-type(' + draw[i] + ')');
      let end = constellation.querySelector('.star:nth-of-type(' + draw[i + 1] + ')');

      if (i === 0) {
        line = `${line} M ${start.offsetLeft}, ${start.offsetTop}`;
        line = `${line} L ${end.offsetLeft}, ${end.offsetTop}`;
      }
      else if (path.length !== 2) {
        line = `${line} L ${end.offsetLeft}, ${end.offsetTop}`;
      }
    }

    // Set the path
    path.setAttribute('d', line);

    // Set animation settings
    let length = path.getTotalLength();
    //  Clear any previous transition
    path.style.transition = path.style.WebkitTransition = 'none';
    //  Set up the starting positions (hide)
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
  },
  methods: {
    constellationTransitionend: function() {
      this.$emit('pathDrawn');
    }
  }
};
</script>

<style lang="scss">
.constellation-line {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  opacity: 0.25;
  transition: opacity 250ms;
}

.active .constellation-line {
  opacity: 1;
}

.navigating-sky .constellation-line {
  opacity: 0;
}
</style>
