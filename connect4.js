/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*
FUTURE WORK:
- TESTABLE TAKE TURN FUNCTION
- DECLARATIVE ROW, COL, DIAG FUNCTIONS
- GAME STATE VAR
- BETTER UI
*/

// all functions that have UI at the start of their name are in the uifunctions.js file

let turn = 0
let playerI = 'red'

let redPlayerName = 'Red'
let yellowPlayerName = 'Yellow'

let grid = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null]
]

function saveNames (e) {
  redPlayerName = document.getElementById('redName').value.length === 0 ? redPlayerName : document.getElementById('redName').value
  yellowPlayerName = document.getElementById('yellowName').value.length === 0 ? yellowPlayerName : document.getElementById('yellowName').value

  e.preventDefault()
  resetGame()
  UIsetFirstPlayer()
}

if (typeof module === 'undefined') {
  fetchScoresFromServer()
}

function takeTurn (e) {
  const id = e.target.id
  const colNum = id[8]
  // const rowNum = id[3]
  const winner = detectWinner(grid)
  fetchScoresFromServer()

  const lowestAvailableRow = getLowestAvailableRowInColumn(colNum, grid)

  if (detectDraw(grid) === true) {
    UIdeclareDraw()
    return
  }

  if (winner === null && lowestAvailableRow != null) {
    turn++
    grid[lowestAvailableRow][colNum] = playerI
    UIupdateGameState(colNum, lowestAvailableRow, playerI)
    playerI = UIswitchRedAndYellow(playerI)

    if (detectWinner(grid) != null) {
      UIdeclareWinner(UIswitchRedAndYellow(playerI), turn)
    }
  }
}

function winnerName (winnerColour) {
  return winnerColour === 'red' ? redPlayerName : yellowPlayerName
}

function detectDraw (currentGrid) {
  return !currentGrid.some(row => row.includes(null))
}

function getLowestAvailableRowInColumn (chosenColNum, currentGrid) {
  const avRowInCol = currentGrid.findIndex(row => row[chosenColNum] !== null) - 1
  return avRowInCol !== -2 ? (avRowInCol !== -1 ? avRowInCol : null) : 5
}

async function sendScoreToServer (winner, score) {
  const response = await fetch('http://localhost:3000/scores', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },

    body: JSON.stringify({ winner, score }, {})
  })

  // const data = response.json()
}

async function fetchScoresFromServer () {
  const totalScores = await fetch('http://localhost:3000/scores')
  const totalScoresJson = await totalScores.json()
  let scoreArray

  for (const item in totalScoresJson) {
    scoreArray = []
    scoreArray.push([item, totalScoresJson[item]])
  }

  UIlistTopTen(totalScoresJson)
}

function detectWinner (grid) {
  if (checkRows(grid) != null) {
    return checkRows(grid)
  }

  if (checkCols(grid) != null) {
    return checkCols(grid)
  }

  if (checkForwardDiag(grid) != null) {
    return checkForwardDiag(grid)
  }

  if (checkBackwardDiag(grid) != null) {
    return checkBackwardDiag(grid)
  }

  return null
}

function checkRows (grid) {
  /*
    we need only to check the cells marked with x, as only them can lead to a win in the rows
       0  1  2  3  4  5  6
    0 [x][x][x][x][ ][ ][ ]
    1 [x][x][x][x][ ][ ][ ]
    2 [x][x][x][x][ ][ ][ ]
    3 [x][x][x][x][ ][ ][ ]
    4 [x][x][x][x][ ][ ][ ]
    5 [x][x][x][x][ ][ ][ ]
    the remaining cells can never lead to winning combination in rows
    */

  for (let i = 0; i <= 5; i++) {
    for (let j = 0; j <= 3; j++) {
      if (grid[i][j] === grid[i][j + 1] &&
                grid[i][j] === grid[i][j + 2] &&
                grid[i][j] === grid[i][j + 3] &&
                grid[i][j] != null) {
        return grid[i][j]
      }
    }
  }
  return null
}

function checkCols (grid) {
  /*
    we need only to check the cells marked with x, as only them can lead to a win in the cols
       0  1  2  3  4  5  6
    0 [x][x][x][x][x][x][x]
    1 [x][x][x][x][x][x][x]
    2 [x][x][x][x][x][x][x]
    3 [ ][ ][ ][ ][ ][ ][ ]
    4 [ ][ ][ ][ ][ ][ ][ ]
    5 [ ][ ][ ][ ][ ][ ][ ]
    the remaining cells can never lead to winning combination in cols
    */

  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 7; j++) {
      if (grid[i][j] === grid[i + 1][j] &&
                grid[i][j] === grid[i + 2][j] &&
                grid[i][j] === grid[i + 3][j] &&
                grid[i][j] != null) {
        return grid[i][j]
      }
    }
  }

  return null
}

function checkForwardDiag (grid) {
  /*
    we need only to check the cells marked with x, as only them can lead to a win in the "/" direction from top to bottom
       0  1  2  3  4  5  6
    0 [ ][ ][ ][ ][ ][ ][ ]
    1 [ ][ ][ ][ ][ ][ ][ ]
    2 [ ][ ][ ][ ][ ][ ][ ]
    3 [x][x][x][x][ ][ ][ ]
    4 [x][x][x][x][ ][ ][ ]
    5 [x][x][x][x][ ][ ][ ]
    the remaining cells can never lead to winning combination in the forward diag top to bottom direction
    */

  for (let fn = 3; fn <= 5; fn++) {
    for (let fm = 0; fm <= 3; fm++) {
      if (grid[fn][fm] === grid[fn - 1][fm + 1] &&
               grid[fn][fm] === grid[fn - 2][fm + 2] &&
               grid[fn][fm] === grid[fn - 3][fm + 3] &&
               grid[fn][fm] != null) {
        return grid[fn][fm]
      }
    }
  }

  return null
}

function checkBackwardDiag (grid) {
  /*
    we need only to check the cells marked with x, as only them can lead to a win in the "\" direction from top to bottom
       0  1  2  3  4  5  6
    0 [ ][ ][ ][ ][ ][ ][ ]
    1 [ ][ ][ ][ ][ ][ ][ ]
    2 [ ][ ][ ][ ][ ][ ][ ]
    3 [ ][ ][ ][x][x][x][x]
    4 [ ][ ][ ][x][x][x][x]
    5 [ ][ ][ ][x][x][x][x]
    the remaining cells can never lead to winning combination in the backwards diag top to bottom direction
    */

  for (let bn = 3; bn <= 5; bn++) {
    for (let bm = 3; bm <= 6; bm++) {
      if (grid[bn][bm] === grid[bn - 1][bm - 1] &&
               grid[bn][bm] === grid[bn - 2][bm - 2] &&
               grid[bn][bm] === grid[bn - 3][bm - 3] &&
               grid[bn][bm] != null) {
        return grid[bn][bm]
      }
    }
  }

  return null
}

function resetGame () {
  console.log('game is reset')

  grid = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ]

  turn = 0

  playerI = 'red'

  fetchScoresFromServer()
  UIresetGameState()
}

function resetAll () {
  resetGame()
  sendScoreToServer('clear', 0).then(UIresetTopTen())
}

if (typeof module !== 'undefined') {
  module.exports = { getLowestAvailableRowInColumn, detectWinner }
}
