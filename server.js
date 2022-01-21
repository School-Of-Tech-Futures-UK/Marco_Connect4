const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

// const respObj = {
//   redScores: 0,
//   yellowScores: 0,
//   noOfGames: 0
// }

const respObj = {
//    noOfGames: 0
}

app.get('/scores', (req, res) => {
  res.json(respObj)
})

app.post('/scores', (req, res) => {
  if (req.body.winner in respObj) {
    respObj[req.body.winner] += req.body.score
    //    respObj.noOfGames++
  }

  //  else if (req.body.winner !== 'clear') {
  else {
    respObj[req.body.winner] = req.body.score
    //    respObj.noOfGames++
  }

  for (let item in respObj) {
    console.log(`${item} total score is: ${respObj.item}`)
  }
  //  console.log(`Number of Games: ${respObj.noOfGames}`)

  res.send(respObj)
//   //saveTotal(total)
})

// app.post('/scores', (req, res) => {
//   // console.log(req.body)
//   if (req.body.winner === 'red') {
//     respObj.redScores += req.body.score
//     respObj.noOfGames++
//   }

//   if (req.body.winner === 'yellow') {
//     respObj.yellowScores += req.body.score
//     respObj.noOfGames++
//   }

//   if (req.body.winner === 'clear') {
//     respObj.redScores = 0
//     respObj.yellowScores = 0
//     respObj.noOfGames = 0
//   }

//   console.log(`Red team total score: ${respObj.redScores}
// Yellow team total Score: ${respObj.yellowScores}
// Number of Games: ${respObj.noOfGames}`)

//   res.send(respObj)
//   //saveTotal(total)
// })

app.listen(3000)
