/* eslint-disable */
export const cliCommands = [
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
    name: 'viewSky',
    verbs: ['douse', 'put out'],
    nouns: ['fire'],
    qualifier: {
      state: {
        isTutorial: false,
        isViewingSky: false
      }
    },
    success: [
      {
        outputter: 'event',
        output: 'You {verb} the {noun}'
      }
    ],
    resolution: function(cli) {
      cli.$store.commit('booleanToggle', {
        qualifier: 'isViewingSky',
        boolean: true
      })
    }
  },
  {
    name: 'viewCampground',
    verbs: ['kindle', 'start', 'stoke'],
    nouns: ['fire'],
    qualifier: {
      state: {
        isTutorial: false,
        isViewingSky: true
      }
    },
    success: [
      {
        outputter: 'event',
        output: 'You {verb} the {noun}'
      }
    ],
    resolution: function(cli) {
      cli.$store.commit('booleanToggle', {
        qualifier: 'isViewingSky',
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
