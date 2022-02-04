/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

function UIcolorToName (currentPlayer) {
  return currentPlayer === 'red' ? redPlayerName : yellowPlayerName
}

function UIswitchRedAndYellow (currentPlayer) {
  return currentPlayer === 'red' ? 'yellow' : 'red'
}

function UIdeclareWinner (winner, turns) {
  console.log(`winner is: ${winnerName(winner)}`)
  document.getElementById('playerTurn').innerText = ''
  document.getElementById('turnBall').style.backgroundColor = winner
  document.getElementById('resetButton').innerText = 'Rematch'

  document.getElementById('overlay').style.display = 'block'
  document.getElementById('winnerMsg').innerText = `${winnerName(winner)} wins in ${turns} turns!`

  sendScoreToServer(winnerName(winner), 42 - turns)
  fetchScoresFromServer()
}

function UIupdateGameState (clickedCol, availableRow, currentPlayer) {
  document.getElementById('overlay').style.display = 'none'
  document.getElementById(`row${availableRow}-col${clickedCol}`).style.backgroundColor = currentPlayer

  const nextPlayer = UIswitchRedAndYellow(currentPlayer)

  document.getElementById('playerTurn').innerText = `${UIcolorToName(nextPlayer)}'s turn`
  document.getElementById('turnBall').style.backgroundColor = nextPlayer
}

function UIdeclareDraw () {
  console.log('Draw!')
  document.getElementById('overlay').style.display = 'block'
  document.getElementById('winnerMsg').innerText = 'Draw'
}

function UIresetGameState () {
  for (const i of document.getElementsByClassName('col')) {
    i.style.removeProperty('background-color')
  }
  document.getElementById('overlay').style.display = 'none'
  document.getElementById('resetButton').innerText = 'Reset Game'
  document.getElementById('playerTurn').innerText = `${redPlayerName}'s turn`
  document.getElementById('turnBall').style.backgroundColor = 'red'
}

function UIsetFirstPlayer () {
  document.getElementById('playerTurn').innerText = `${redPlayerName}'s turn`
  document.getElementById('turnBall').style.backgroundColor = 'red'
}

function UIlistTopTen (obj) {
  let i = 1
  for (const player in obj) {
    document.getElementById(`${i}#`).innerText = `${i}#  ${player}: ${obj[player]}`
    i++
  }
}
function UIresetTopTen () {
  for (let i = 1; i <= 10; i++) {
    document.getElementById(`${i}#`).innerText = ''
  }
}

// eslint-disable-next-line no-unused-vars
function UIexitOverlay (e) {
  document.getElementById('overlay').style.display = 'none'
}
