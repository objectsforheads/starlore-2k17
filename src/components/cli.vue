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

      return filtered;
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

      return filtered;
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
      return filtered;
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
          qualifier: {
            state: {
              isTutorial: true
            }
          },
          success: [
            {
              outputter: 'event',
              output: 'You {verb} the {noun}',
            }
          ],
          error: {
            verb: [
              {
                outputter: 'Dad',
                output: 'I don\'t think you can {verb} that, Scout!'
              }
            ],
            noun: [
              {
                outputter: 'Dad',
                output: 'I don\'t think that\'s going to help the {noun}, Scout!'
              }
            ],
            qualifier: [
              {
                outputter: 'Dad',
                output: 'The {noun} is already going, Scout! No need to fiddle around with it anymore.'
              }
            ]
          },
          resolution: function(cli) {
            cli.$store.commit('booleanToggle', {
              qualifier: 'isTutorial',
              boolean: false
            })
          }
        },
        {
          name: 'squirrelQuest_1',
          verbs: ['feed'],
          nouns: ['squirrel'],
          qualifier: {
            state: {
              squirrelQuest: true,
              squirrelDebt: false
            }
          },
          success: [
            {
              outputter: 'event',
              output: 'You {verb} the {noun}',
            }
          ],
          error: {
            verb: [
              {
                outputter: 'Dad',
                output: 'Maybe you don\'t {verb} that, Scout.'
              }
            ],
            noun: [
              {
                outputter: 'event',
                output: 'The {noun} squeaks angrily at you.'
              },
              {
                outputter: 'Squirrel',
                output: '.-- .... .- - / - .-. .. -.-. -.- . .-. -.-- / .. ... / - .... .. ... ..--.. / -... . --. --- -. . .-.-.-'
              }
            ]
          },
          resolution: function(cli) {
            cli.$store.commit('counterIncrement', {
              qualifier: 'squirrelDebtCounter',
              increment: 1
            })

            if (cli.$store.state.squirrelDebtCounter >= 5) {
              cli.$store.commit('booleanToggle', {
                qualifier: 'squirrelDebt',
                boolean: true
              })
            }
          }
        },
        {
          name: 'squirrelQuest_2',
          verbs: ['feed'],
          nouns: ['squirrel'],
          qualifier: {
            state: {
              squirrelQuest: true,
              squirrelDebt: true
            }
          },
          success: [
            {
              outputter: 'event',
              output: 'Eh? What\'s this? The squirrel appears to be talking to you. But squirrels can\'t talk...can they?'
            },
            {
              outputter: 'Squirrel',
              output: '... -- .- .-.. .-.. / .... ..- -- .- -. .-.-.- / -.-- --- ..- .-. / --- ..-. ..-. . .-. .. -. --. ... / .-- .. .-.. .-.. / ... .- ...- . / -- -.-- / .--. . --- .--. .-.. . / ..-. .-. --- -- / .- / .... .- .-. ... .... / .-- .. -. - . .-. / .- -. -.. / - .... .. ... / -.. . -... - / .-- .. .-.. .-.. / -. --- - / .-. . -- .- .. -. / ..- -. .--. .- .. -.. .-.-.- / .. / ... .-- . .- .-. / - --- / -.-- --- ..- --..-- / ... -- .- .-.. .-.. / .... ..- -- .- -. --..-- / - .... .- - / .-- .... . -. / -.-- --- ..- .-. / -.. .- .-. -.- . ... - / .... --- ..- .-. / -.-. --- -- . ... --..-- / .. / ... .... .- .-.. .-.. / ... - .- -. -.. / .-. . .- -.. -.-- / .- - / - .... . / ...- .- -. --. ..- .- .-. -.. .-.-.- / -... ..- - / ..-. --- .-. / -. --- .-- --..-- / .. / -- ..- ... - / --. --- --..-- / ..-. --- .-. / -- -.-- / .--. . --- .--. .-.. . / -. . . -.. / -- . .-.-.-'
            }
          ]
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

      if (cli.matchedCommands.length > 0) {
        // Look for a qualified action
        let action = cli.matchedCommands.filter(function(command) {
          if (qualifyState(command.qualifier, cli.$store)) {
            return true;
          }
          return false;
        })[0];

        if (action) {
          // Return an error if the words weren't input in verb -> noun order
          let wordOrder = [];
          action.verbs.forEach(function(verb) {
            if (command.indexOf(verb) > -1) {
              wordOrder.push(command.indexOf(verb));
            }
          })
          action.nouns.forEach(function(noun) {
            if (command.indexOf(noun) > -1) {
              wordOrder.push(command.indexOf(noun));
            }
          })

          if (wordOrder[0] > wordOrder[1]) {
            return cli.outputToCLI(
              'Dad',
              'Sorry, Scout, we don\'t speak in tongues in this household!'
            );
          }

          // All clear, return the command and resolver
          return action.success.forEach(function(output, i) {
            if (i < action.success.length - 1) {
              return cli.outputToCLI(
                output.outputter,
                parseOutput(action, output.output)
              )
            } else {
              return cli.outputToCLI(
                output.outputter,
                parseOutput(action, output.output),
                action.resolution
              )
            }
          })
        } else {
          // Return the first unqualified error
          action = cli.matchedCommands.filter(function(command) {
            if (typeof command.error !== 'undefined' && typeof command.error.qualifier !== 'undefined') {
              return true;
            }
            return false;
          })[0];
          if (action) {
            return action.error.qualifier.forEach(function(output) {
              return cli.outputToCLI(
                output.outputter,
                parseOutput(action, output.output)
              )
            });
          } else {
            return cli.outputToCLI(
              'event',
              'This is not working.'
            )
          }

        }
      }

      if (cli.verbMatchedCommands.length > 0 || cli.nounMatchedCommands.length > 0) {
        // If we only matched a noun or a verb, return a specific error if it exists
        if (cli.verbMatchedCommands.length > 0 && cli.verbMatchedCommands[0].error) {
          let action = cli.verbMatchedCommands[0];
          return action.error.verb.forEach(function(output) {
            return cli.outputToCLI(
              output.outputter,
              parseOutput(action, output.output)
            )
          })
        }
        else if (cli.nounMatchedCommands.length > 0 && cli.nounMatchedCommands[0].error) {
          let action = cli.nounMatchedCommands[0];
          return action.error.noun.forEach(function(output) {
            return cli.outputToCLI(
              output.outputter,
              parseOutput(action, output.output)
            )
          })
        }
        else {
          return cli.outputToCLI(
            'Dad',
            'By Jove, I think you\'re onto something, Scout!'
          );
        }
      }

      // Return a generic error if there is no specific error to be called
      return cli.outputToCLI(
        'event',
        'Dad looks at you funny'
      )

      function qualifyState(reqs, current) {
        // Accumulate qualifications to reduce later
        let qualifications = [];
        // Loop recursively through each req in the reqs object
        // Comparing it to the current state object and checking for a match
        for (var req in reqs) {
          if (typeof reqs[req] === 'object' && typeof current[req] === 'object') {
            qualifications = qualifications.concat(qualifyState(reqs[req], current[req]))
          } else {
            qualifications.push(reqs[req] === current[req]);
          }
        }

        // Reduce qualifications to a boolean
        return qualifications.reduce(function(a, b) {
          if (b === false || typeof b !== 'boolean') {
            a = false;
          }
          return a;
        }, true)
      }

      function parseOutput(action, output) {
        // Find matched noun and verb, if any
        let verb = action.verbs.reduce(function(a, b) {
          if (command.indexOf(b) > -1) {
            a = b;
          }
          return a;
        }, null)
        let noun = action.nouns.reduce(function(a, b) {
          if (command.indexOf(b) > -1) {
            a = b;
          }
          return a;
        }, null)

        // Clone the output for modifying
        let parsed = (' ' + output).slice(1);
        if (verb) { parsed = parsed.replace('{verb}', verb.toUpperCase()); }
        if (noun) { parsed = parsed.replace('{noun}', noun.toUpperCase()); }
        return parsed;
      }
    },
    outputToCLI: function(outputter, output, resolution) {
      let cli = this;

      cli.log.push({
        outputter: outputter,
        text: output
      })

      if (resolution) {
        resolution(cli);
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
