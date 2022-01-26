const { getLowestAvailableRowInColumn } = require('./connect4.js');

describe('When clicking a column', () => {
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