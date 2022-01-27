
let turn = 0
let player1 = 'red'
// eslint-disable-next-line no-unused-vars
const gamesPlayed = 0
let redPlayerName
let yellowPlayerName

let grid = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null]
]

// fetchScoresFromServer()

// eslint-disable-next-line no-unused-vars
function saveNames (e) {
  redPlayerName = document.getElementById('redName').value
  yellowPlayerName = document.getElementById('yellowName').value
  e.preventDefault()
  document.getElementById('playerTurn').innerText = `${redPlayerName}'turn`
  resetGame()
}

// fetchScoresFromServer()
// setFirstPlayer()

// eslint-disable-next-line no-unused-vars
function takeTurn (e) {
  const id = e.target.id
  const colNum = id[8]
  // eslint-disable-next-line no-unused-vars
  const rowNum = id[3]
  const winner = detectWinner(grid)
  checkFull(grid)
  fetchScoresFromServer()
  // document.getElementById('noOfGames').innerText = `# of games played: ${gamesPlayed}`

  const lowestAvailableRow = getLowestAvailableRowInColumn(colNum, grid)
  console.log(`Lowest available row: ${lowestAvailableRow}`)

  if (winner === null) {
    if (lowestAvailableRow != null) {
      turn++
      if (player1 === 'red') {
        grid[lowestAvailableRow][colNum] = 'red'
        document.getElementById(`row${lowestAvailableRow}-col${colNum}`).style.backgroundColor = 'red'
        player1 = 'yellow'
        document.getElementById('playerTurn').innerText = `${yellowPlayerName}'s turn`
        document.getElementById('playerTurn').style.backgroundColor = 'yellow'

      } else {
        grid[lowestAvailableRow][colNum] = 'yellow'
        document.getElementById(`row${lowestAvailableRow}-col${colNum}`).style.backgroundColor = 'yellow'
        player1 = 'red'
        document.getElementById('playerTurn').innerText = `${redPlayerName}'s turn`
        document.getElementById('playerTurn').style.backgroundColor = 'red'
      }
    }

    // console.log(`You clicked column ${colNum}`)
    // console.log(`Turn number ${turn}`)
    // console.log(grid)
  }

  if (winner != null) {
    // grid[rowNum][colNum] = winner
    console.log(`winner is: ${winnerName(winner)}`)
    document.getElementById('playerTurn').innerText = `${winnerName(winner)} wins! in ${turn} turns`
    document.getElementById('playerTurn').style.removeProperty('background-color')
    document.getElementById('resetButton').innerText = 'Play Again'
    // sendScoreToServer(winner, 42 - turn)
    // CHANGE SERVER TO ADD NAMES AND ASSOCIATED SCORES
    sendScoreToServer(winnerName(winner), 42 - turn)
    alert(`winner is: ${winnerName(winner)}`)
    fetchScoresFromServer()
  }
}
/*

continueGame (colNum, grid, player1)
function continueGame (clickedCol, gameGrid, currentPlayer){
  const lowestAvailableRow = getLowestAvailableRowInColumn(clickedCol, gameGrid)

  if (lowestAvailableRow != null) {
    turn++

    gameGrid[lowestAvailableRow][clickedCol] = currentPlayer
    updateUI (clickedCol, lowestAvailableRow, gameGrid, currentPlayer)


    // if (currentPlayer === 'red') {
    //   gameGrid[lowestAvailableRow][clickedCol] = 'red'
    //   document.getElementById(`row${lowestAvailableRow}-col${clickedCol}`).style.backgroundColor = 'red'
    //   currentPlayer = 'yellow'
    //   document.getElementById('playerTurn').innerText = `${yellowPlayerName}'s turn`
    //   document.getElementById('playerTurn').style.backgroundColor = 'yellow'

    // } else {
    //   gameGrid[lowestAvailableRow][clickedCol] = 'yellow'
    //   document.getElementById(`row${lowestAvailableRow}-col${clickedCol}`).style.backgroundColor = 'yellow'
    //   currentPlayer = 'red'
    //   document.getElementById('playerTurn').innerText = `${redPlayerName}'s turn`
    //   document.getElementById('playerTurn').style.backgroundColor = 'red'
    // }
}
function updateUI (clickedCol, availableRow, gameGrid, currentPlayer) {
    document.getElementById(`row${availableRow}-col${clickedCol}`).style.backgroundColor = currentPlayer

    currentPlayer = switchRedAndYellow(currentPlayer)

    document.getElementById('playerTurn').innerText = `${colorToName(currentPlayer)}'s turn`
    document.getElementById('playerTurn').style.backgroundColor = currentPlayer
}

function colorToName (currentPlayer) {
  return currentPlayer === 'red' ? redPlayerName : yellowPlayerName
}

function switchRedAndYellow (currentPlayer) {
  // let switchedPlayer
  return currentPlayer === 'red' ? 'yellow' : 'red'
}
function declareWinner
*/
function checkFull (currentGrid) {
  if (turn >= 42) {
    console.log('Draw!')
    document.getElementById('playerTurn').innerText = 'Draw!'
  }
}

function getLowestAvailableRowInColumn (chosenColNum, currentGrid) {
  // currentGrid.forEach((row, index) => {
  //   row[chosenColNum] === null ? index : null
  //   console.log(avRowInCol)
    
  // })
  // const avRowInCol = currentGrid[chosenColNum].reduce((prevVal, currVal, index) => {
  //   return prevVal != null ? 
  // }, null)
    
  //   console.log(avRowInCol)
  // })
  // return avRowInCol
  
  for (let i = 5; i >= 0; i--) {
    if (currentGrid[i][chosenColNum] === null) {
      return i
    }
  }
  return null
}

async function sendScoreToServer (winner, score) {
  // eslint-disable-next-line no-unused-vars
  const response = await fetch('http://localhost:3000/scores', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },

    body: JSON.stringify({ winner, score }, {})
  })

  // const data = response.json()
}

// eslint-disable-next-line no-unused-vars
async function fetchScoresFromServer () {
  const totalScores = await fetch('http://localhost:3000/scores')
  const totalScoresJson = await totalScores.json()
  let scoreArray

  for (const item in totalScoresJson) {
    console.log(`${item} ${totalScoresJson[item]}`)
    scoreArray = []
    scoreArray.push([item, totalScoresJson[item]])
  }

  // document.getElementById('scoreBoard').innerText = scoreArray
  listTopTen(totalScoresJson)
  //   gamesPlayed = totalScoresJson.noOfGames

  // console.log(`# of games ${gamesPlayed}`)
  // document.getElementById('noOfGames').innerText = `# of games played: ${gamesPlayed}`
}

// eslint-disable-next-line no-unused-vars
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

  // eslint-disable-next-line prefer-const
  for (let i of document.getElementsByClassName('col')) {
    i.style.removeProperty('background-color')
  }

  turn = 0
  player1 = 'red'

  document.getElementById('resetButton').innerText = 'Reset Game'
  document.getElementById('playerTurn').innerText = `${redPlayerName}'s turn`
  document.getElementById('playerTurn').style.backgroundColor = 'red'
}

// eslint-disable-next-line no-unused-vars
// function resetAll () {
//   resetGame()
//   sendScoreToServer('clear', 0)
// //  resetTopTen(document.getElementsByClassName('scoresBanner'))
// //  resetTopTen()
// }

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

function setFirstPlayer () {
  document.getElementById('playerTurn').innerText = `${redPlayerName}'s turn`
  document.getElementById('playerTurn').style.backgroundColor = 'red'
}

function winnerName (winnerColour) {
  let winnerName
  winnerColour === 'red' ? winnerName = redPlayerName : winnerName = yellowPlayerName
  return winnerName
}

function listTopTen (obj) {
  let i = 1
  for (const player in obj) {
    document.getElementById(`${i}#`).innerText = `${i}#  ${player}: ${obj[player]}`
    i++
  }
}

// function resetTopTen () {
// //   scoresBanner.forEach((player) => player.innerText = '')
//   let i = 1
//   for (i = 0; i < 10; i++) {
//     document.getElementById(`${i}#`).innerText = null
//   }
// }

module.exports = { getLowestAvailableRowInColumn }
