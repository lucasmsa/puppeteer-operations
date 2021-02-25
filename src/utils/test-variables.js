var format = require('date-fns/format')

const user = {
  name: 'luvas',
  email: 'luvas@gmail.com',
}
const products = {
  section: 'apresentacaoDeProdutos'
}
const date = {
  day: 28,
  month: 'Fevereiro'
}
const hour = {
  beggining: format(new Date(2021, 2, 28, 9), "hh':'mmaaa"),
  end: format(new Date(2021, 2, 28, 10), "hh':'mmaaa")
}

const eventName = 'Main Event 🦇'

module.exports = {
  user,
  products,
  date,
  hour,
  eventName
}