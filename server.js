const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const respObj = {

}

function sortAndSlice (unsortedObj) {
  const sortedArray = []
  for (const player in unsortedObj) {
    sortedArray.push([player, unsortedObj[player]])
  }

  const slicedArray = sortedArray.sort(function (a, b) { return b[1] - a[1] }).slice(0, 10)

  const sortedObj = {}
  slicedArray.forEach(function (item) {
    sortedObj[item[0]] = item[1]
  })

  return sortedObj
}

app.get('/scores', (req, res) => {
  res.json(sortAndSlice(respObj))
})

app.post('/scores', (req, res) => {
  if (req.body.winner === 'clear') {
    for (let member in respObj) delete respObj[member]
  }
  else if (req.body.winner in respObj) {
    respObj[req.body.winner] += req.body.score
  }

  //  else if (req.body.winner !== 'clear') {
  else {
    respObj[req.body.winner] = req.body.score
  }

  // eslint-disable-next-line prefer-const
  for (let item in sortAndSlice(respObj)) {
    console.log(`${item} total score is: ${respObj[item]}`)
  }
  //  console.log(`Number of Games: ${respObj.noOfGames}`)

  res.send(sortAndSlice(respObj))
})

app.listen(3000)
