const express = require('express')
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]

const shoes = [
  { name: 'Birkenstocks', price: 50, type: 'sandal' },
  { name: 'Air Jordans', price: 500, type: 'sneaker' },
  { name: 'Air Mahomeses', price: 501, type: 'sneaker' },
  { name: 'Utility Boots', price: 20, type: 'boot' },
  { name: 'Velcro Sandals', price: 15, type: 'sandal' },
  { name: 'Jet Boots', price: 1000, type: 'boot' },
  { name: 'Fifty-Inch Heels', price: 175, type: 'heel' }
]

const app = express()

app.get('/greetings/:name', (req, res) => {
  res.send(`Hello there ${req.params.name} ! `)
})

app.get('/roll/:number', (req, res) => {
  let num = req.params.number
  if (isNaN(num)) {
    res.send(`You must specify a number`)
  } else {
    let random = Math.floor(Math.random() * 16)
    res.send(`You rolled a ${random} `)
  }
})

app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index)
  if (index >= collectibles.length) {
    return res.send('This item is not yet in stock. Check back soon!')
  }
  const collectiblesIndex = collectibles[index]
  res.send(
    `So, you want the ${collectiblesIndex.name}? For ${collectiblesIndex.price}, it can be yours!!`
  )
})

app.get('/shoes', (req, res) => {
  let Filter = shoes

  if (req.query['min-price']) {
    const minPrice = parseFloat(req.query['min-price'])
    if (!isNaN(minPrice)) {
      Filter = Filter.filter((shoe) => shoe.price >= minPrice)
    }
  }

  if (req.query['max-price']) {
    const maxPrice = parseFloat(req.query['max-price'])
    if (!isNaN(maxPrice)) {
      Filter = Filter.filter((shoe) => shoe.price <= maxPrice)
    }
  }

  if (req.query.type) {
    const type = req.query.type.toLowerCase()
    Filter = Filter.filter((shoe) => shoe.type.toLowerCase() === type)
  }

  res.json(Filter)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
