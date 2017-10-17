<template>
  <div class="manual" v-bind:class="[isOpen]">
    <div class="manual__page">
      <button class="manual__toggle" v-on:click="handbookToggleClick">
        {{this.foundConstellationsCount}}/{{this.totalConstellations}} <span class="manual__info-icon">!</span>
      </button>
      <div class="manual__page-content">
        <ul>
          <template v-for="constellation in foundConstellations">
            <li v-bind:data-constellation="constellation.name" class="manual__constellation-index">
              {{ constellation.presentation }}
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';

  export default {
    name: 'manual',
    computed: {
      isOpen: function() {
        if (this.$store.state.handbookOpen) {
          return 'is-open';
        }
        return false;
      },
      totalConstellations: function() {
        let self = this;
        let state = self.$store.state;
        return state.totalConstellations;
      },
      foundConstellationsCount: function() {
        let self = this;
        let state = self.$store.state
        return state.foundConstellationsCount;
      },
      foundConstellations: function() {
        let constellations = [];
        let all = this.$store.state.foundConstellations;
        // push all constellations to the array first and sort alphabetically
        for (var constellation in all) {
          constellations.push({
            name: constellation,
            presentation: constellation
          });
        }
        constellations.sort(function(a, b) {
          if (a.name < b.name) {
            return -1;
          }

          if (b.name < a.name) {
            return 1;
          }

          return 0;
        });

        // loop through each constellation and replace with the mystery if not found yet
        constellations.forEach(function(constellation, i) {
          if (all[constellation.name] === false) {
            let mystery = constellations[i];
            mystery.presentation = constellation.presentation.replace(/[a-zA-Z&]/g, '?');

            Vue.set(constellations, i, constellations[i], mystery);
          }
        })

        return constellations;
      },
    },
    methods: {
      handbookToggleClick: function() {
        this.$store.commit('booleanToggle', {
          qualifier: 'handbookOpen'
        })
      }
    },
  }
</script>

<style scoped lang="scss">
@import '../assets/styles/_globals';

.manual {
  position: absolute;
  top: 0;
  right: 100%;
  height: 100%;
  width: 300rem;
  z-index: 2;
  animation: fadeIn 250ms;
  transition: transform 250ms;

  &.is-open {
    transform: translateX(100%);
  }

  &__toggle {
    position: absolute;
    top: 0;
    left: 100%;
    width: 3.5em;
    padding: 0.25em 1em 0.25em 0.5em;
    border-radius: 0 0 0.5em 0;
    border: 2px solid $g-palette_primary-white;
    border-width: 0 2px 2px 0;
    @include m-body-text;
    text-align: right;
    white-space: nowrap;
    background: transparent;
    color: $g-palette_primary-white;

    &:hover,
    &:focus,
    &:active {
      background: $g-palette_primary-white;
      color: $g-palette_primary-dark;
      cursor: pointer;

      .manual__info-icon {
        background: $g-palette_primary-dark;
        color: $g-palette_primary-white;
        border-color: $g-palette_primary-white;
      }
    }
  }

  &__info-icon {
    color: $g-palette_primary-dark;
    background: $g-palette_primary-white;
    display: inline-block;
    text-align: center;
    line-height: 1em;
    padding-left: 0.1em; // align to optical center
    border-radius: 50%;
    width: 1em;
    height: 1em;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
    border: 2px solid $g-palette_primary-dark;
    box-sizing: content-box;
  }

  &__page {
    height: 100%;
    width: 100%;

    &-content {
      padding: 1em;
      overflow-y: auto;
      overflow-x: hidden;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
