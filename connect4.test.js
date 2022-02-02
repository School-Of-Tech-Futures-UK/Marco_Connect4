const { getLowestAvailableRowInColumn, detectWinner } = require('./connect4.js')

describe('detectWinner function test', () => {
  const testScenarios = [
    // test 1: column win
    [[
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null]
    ],
    'red'],

    // test 2: row win
    [[
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ['red', 'red', 'red', 'red', null, null, null]
    ],
    'red'],

    // test 3: fwd diag win
    [[
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, 'yellow', null, null, null],
      [null, null, 'yellow', 'red', null, null, null],
      ['red', 'yellow', 'red', 'red', null, null, null],
      ['yellow', 'red', 'red', 'red', null, null, null]
    ],
    'yellow'],

    // test 4: bkd diag win
    [[
      [null, 'yellow', null, null, null, null, null],
      [null, 'red', 'yellow', null, null, null, null],
      [null, 'yellow', 'red', 'yellow', null, null, null],
      [null, 'red', 'yellow', 'red', 'yellow', 'yellow', null],
      [null, 'yellow', 'red', 'red', 'yellow', 'red', null],
      [null, 'red', 'yellow', 'yellow', 'red', 'yellow', null]
    ],
    'yellow'],

    // test 5: no win empty grid
    [[
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ],
    null],

    // test 6: no win full board
    [[
      ['yellow', 'yellow', 'yellow', 'red', 'yellow', 'yellow', 'yellow'],
      ['red', 'red', 'red', 'yellow', 'red', 'red', 'red'],
      ['yellow', 'yellow', 'yellow', 'red', 'yellow', 'yellow', 'yellow'],
      ['red', 'red', 'red', 'yellow', 'red', 'red', 'red'],
      ['yellow', 'yellow', 'yellow', 'red', 'yellow', 'yellow', 'yellow'],
      ['red', 'red', 'red', 'yellow', 'red', 'red', 'red']
    ],
    null]
  ]

  it.each(testScenarios)('for grid %s the winner is %s', (grid, expectedOutput) => {
    let actualOutput = detectWinner(grid)
    expect(actualOutput).toBe(expectedOutput)
  })

})

describe('getLowestAvailableRowInColumn function', () => {
  // testScenarios = [[condition, expected result],[condition, expected result],....]
  // condition in this case is what is passed as arguments to the test function:
  // {board: , column:}
  const testScenarios = [
    // test 1
    [ // state
      {
        board: [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          ['red', null, null, null, null, null, null]
        ],
        column: 0
      },
      // expected output
      4

    ],

    // test 2
    [
      {
        board: [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          ['red', null, null, null, null, null, null],
          ['yellow', null, null, null, null, null, null]
        ],
        column: 0

      },

      3
    ],

    // test 3
    [
      {
        board: [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          ['red', null, null, null, null, null, null],
          ['yellow', null, null, null, null, null, null]
        ],
        column: 1
      },

      5
    ],

    // test 4
    [
      {
        board: [
          [null, null, null, null, null, null, null],
          ['yellow', null, null, null, null, null, null],
          ['red', null, null, null, null, null, null],
          ['yellow', null, null, null, null, null, null],
          ['red', null, null, null, null, null, null],
          ['yellow', null, null, null, null, null, null]
        ],
        column: 0
      },

      0
    ],
    // test 5
    [
      {
        board: [
          ['red', null, null, null, null, null, null],
          ['yellow', null, null, null, null, null, null],
          ['red', null, null, null, null, null, null],
          ['yellow', null, null, null, null, null, null],
          ['red', null, null, null, null, null, null],
          ['yellow', null, null, null, null, null, null]
        ],
        column: 0
      },

      null
    ]
  ]

  it.each(testScenarios)('for grid %s, the lowest available row is %s', (gridAndCol, expectedOutput) => {
    let actualOutput = getLowestAvailableRowInColumn(gridAndCol.column, gridAndCol.board)
    expect(actualOutput).toBe(expectedOutput)
  })
})

/*
    const tests =
        [// object with the conditions,
            //test 1
            [
                {
                    board: [
                        [null, null, null, null],
                        [null, null, null, null],
                        [null, null, null, null],
                        [null, null, null, null],

                    ],
                    player: 'Mike',
                    column: 1
                },
                //structure with the result]

                [
                    [null, null, null, null],
                    ['Mike', null, null, null],
                    [null, null, null, null],
                    [null, null, null, null],

                ]
            ],
            //test 2
            [
                {
                    board: [
                        [null, null, null, null],
                        ['Mike', null, null, null],
                        [null, null, null, null],
                        [null, null, null, null],

                    ],
                    player: 'Mike',
                    column: 1
                },
                //structure with the result]

                [
                    [null, null, null, null],
                    ['Mike', 'Mike', null, null],
                    [null, null, null, null],
                    [null, null, null, null],

                ]
            ]
        ]


    // change this to loop through them like a pro....

    it.each(tests)(`We can place a '%s' piece in column '%s' of '%s'`, (input, expectedOutput) => {
        // Consider descriptive test names:
        // "When place is called on an empty row the counter goes to the bottom of the row"

        //  variables from parameters....
        const actualOutput = placeModule.place(input.board, input.player, input.column);

        // Assert
        expect(actualOutput).toStrictEqual(expectedOutput);

    });

});

*/