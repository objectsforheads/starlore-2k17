<template>
  <div class="constellation"
  v-bind:data-name="constellation.name"
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
