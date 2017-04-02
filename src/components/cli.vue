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
  computed: {
    nounMatchedCommands: function() {
      let input = this.command;

      let filtered = this.commands.filter(function(command) {
        let match = false;
        command.nouns.forEach(function(noun) {
          if (input.indexOf(noun) > -1) {
            match = true;
          }
        })
        return match;
      })

      return filtered[0];
    },
    verbMatchedCommands: function() {
      let input = this.command;

      let filtered = this.commands.filter(function(command) {
        let match = false;
        command.verbs.forEach(function(verb) {
          if (input.indexOf(verb) > -1) {
            match = true;
          }
        })
        return match;
      })

      return filtered[0];
    },
    matchedCommands: function() {
      let cli = this;
      let input = cli.command;

      let filtered = cli.commands.filter(function(command) {
        let nounMatched = false;
        command.nouns.forEach(function(noun) {
          if (input.indexOf(noun) > -1) {
            nounMatched = true;
          }
        })

        let verbMatched = false;
        command.verbs.forEach(function(verb) {
          if (input.indexOf(verb) > -1) {
            verbMatched = true;
          }
        })

        if (nounMatched && verbMatched) {
          return true;
        }
        return false;
      })
      return filtered[0];
    },
  },
  data() {
    return {
      log: [
        { outputter: 'Dad',
          text: 'Fiddlesticks. This fire seems to be sputtering about!',
        }
      ],
      command: null,
      commands: [
        {
          name: 'completeTutorial',
          verbs: ['kindle', 'start', 'stoke'],
          nouns: ['fire'],
          success: {
            outputter: 'event',
            output: 'You {verb} the {noun}',
          },
          error: {
            verb: {
              outputter: 'Dad',
              output: 'I don\'t think you can {verb} that, Scout!'
            },
            noun: {
              outputter: 'Dad',
              output: 'I don\'t think that\'s going to help the {noun}, Scout!'
            }
          },
          resolution: function() {
            console.log('finished tutorial!')
          }
        },
        {
          name: 'getHint',
          verbs: ['talk', 'ask'],
          nouns: ['dad'],
        },
        {
          name: 'seeProgress',
          verbs: ['read', 'consult'],
          nouns: ['manual', 'handbook'],
        }
      ]
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
        e.preventDefault();
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

      if (cli.matchedCommands) {
        let action = cli.matchedCommands;
        let output = (' ' + action.success.output).slice(1);

        let wordOrder = [];

        let verb = action.verbs.reduce(function(a, b) {
          if (command.indexOf(b) > -1) {
            a = b;
            wordOrder.push(command.indexOf(b));
          }
          return a;
        }, null)
        let noun = action.nouns.reduce(function(a, b) {
          if (command.indexOf(b) > -1) {
            a = b;
            wordOrder.push(command.indexOf(b));
          }
          return a;
        }, null)

        // Make sure words were entered in verb -> noun order
        if (wordOrder[0] > wordOrder[1]) {
          return cli.outputToCLI(
            'Dad',
            'Sorry, Scout, we don\'t speak in tongues in this household!'
          );
        }

        // Parse the output if necessary
        if ( /{.*?}/.test(action.success.output) ) {
          output = output.replace('{verb}', verb.toUpperCase());
          output = output.replace('{noun}', noun.toUpperCase());
        }

        return cli.outputToCLI(
          action.success.outputter,
          output,
          action.resolution);
      }
      else if (cli.verbMatchedCommands) {
        let action = cli.verbMatchedCommands;
        let output = (' ' + action.error.verb.output).slice(1);

        if ( /{.*?}/.test(output) ) {
          let verb = action.verbs.reduce(function(a, b) {
            if (command.indexOf(b) > -1) {
              a = b;
            }
            return a;
          }, null)

          output = output.replace('{verb}', verb.toUpperCase());
        }

        return cli.outputToCLI(
          action.error.verb.outputter,
          output);
      }
      else if (cli.nounMatchedCommands) {
        let action = cli.nounMatchedCommands;
        let output = (' ' + action.error.noun.output).slice(1);

        if ( /{.*?}/.test(output) ) {
          let noun = action.nouns.reduce(function(a, b) {
            if (command.indexOf(b) > -1) {
              a = b;
            }
            return a;
          }, null)

          output = output.replace('{noun}', noun.toUpperCase());
        }

        return cli.outputToCLI(
          action.error.verb.outputter,
          output);
      } else {
        return cli.outputToCLI(
          'event',
          'Dad looks at you funny'
        )
      }
    },
    outputToCLI: function(outputter, output, resolution) {
      let cli = this;

      cli.log.push({
        outputter: outputter,
        text: output
      })

      if (resolution) {
        resolution();
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
