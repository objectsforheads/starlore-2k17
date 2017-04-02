<template>
  <div class="game-cli">
    <div v-for="line in log" class="cli__line">
      <span class="cli__outputter" v-bind:data-outputter="line.outputter"></span>
      <div class="cli__input">
        <span class="cli__command">{{ line.text }}</span>
      </div>
    </div>
    <div class="cli__line">
      <div class="cli__input">
        <span class="cli__command">&gt; {{ command }}<span class="cli__indicator a-blink">_</span></span>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'gameCLI',
  created: function () {
    let cli = this;
    window.addEventListener('keypress', (e) => {
      cli.windowKeypress(e)
    })
  },
  data() {
    return {
      log: [
        { outputter: 'Dad',
          text: 'Fiddlesticks. This fire seems to be sputtering about!',
        }
      ],
      command: null,
      dictionary: {
        kindle: {
          fire: {
            action: 'kindleFire',
            line: {
              outputter: 'event',
              text: 'You KINDLE the FIRE'
            }
          },
          error: {
            outputter: 'Dad',
            text: 'I don\'t think you can KINDLE that, Scout!'
          }
        },
        feed: {
          squirrel: {
            action: 'feedSquirrel',
            line: {
              outputter: 'event',
              text: 'You FEED the SQUIRREL. It does not break eye contact while it eats your offering. You must look away.'
            }
          }
        }
      }
    }
  },
  methods: {
    windowKeypress: function(e) {
      let cli = this;
      // If keypress is a character, let it through
      if (e.key.length === 1) {
        if (!cli.command) {
          cli.command = e.key;
        } else {
          cli.command += e.key;
        }
      }
      else if (e.key === 'Backspace') {
        cli.command = cli.command.slice(0, -1);
      }
      else if (e.key === 'Enter') {
        cli.processCommand();
      }
    },
    processCommand: function() {
      let cli = this;
      // Push the command to log before resolving it
      cli.log.push({
        outputter: 'command',
        text: cli.command
      })

      // Force everything into lowercase
      let command = cli.command.toLowerCase();
      let resolver = [];
      let dictionary = cli.dictionary;

      // Check if a verb matches
      for (var verb in dictionary) {
        if (command.indexOf(verb) > -1) {
          // If it matches, push it to resolver
          resolver.push(verb);

          // Then check if a noun matches too
          for (var noun in dictionary[verb]) {
            // Push match to resolver
            if (command.indexOf(noun) > -1) {
              resolver.push(noun);
            }
          }
        }
      }

      // if resolver length is 1, verb resolved but noun did not
      // Show the verb error message
      if (resolver.length === 1) {
        dictionary[resolver[0]].error ? cli.log.push(dictionary[resolver[0]].error) : cli.log.push({
          outputter: 'Dad',
          text: 'You\'re onto something, Scout!'
        })
      }
      // run resolution function if verb and noun resolved
      else if (resolver.length === 2) {
        cli.log.push(dictionary[resolver[0]][resolver[1]].line)
      }
      // respond with a generic "Did not understand" otherwise
      else {
        cli.log.push({
          outputter: 'event',
          text: 'Dad looks at you funny.'
        })
      }

      // reset the command after resolution
      return cli.command = null;
    }
  }
};
</script>

<style scoped lang="scss">
  .game-cli {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    display: flex;
    flex-direction: column;

    padding: 0 9rem;
  }

  .cli__outputter {
    float: left;
    text-transform: uppercase;
    padding-right: 9rem;

    &[data-outputter="command"] {
      &::before {
        content: '>';
      }
    }

    &:not([data-outputter="event"]):not([data-outputter="command"]) {
      &::before {
        content: attr(data-outputter);
      }

      &::after {
        content: ':';
      }
    }
  }

  .cli__input {
    overflow: auto;
  }
</style>
