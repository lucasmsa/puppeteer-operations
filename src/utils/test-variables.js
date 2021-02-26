var format = require('date-fns/format')

const user = {
  name: 'luvas',
  email: 'luvas@gmail.com',
}
const products = {
  section: 'apresentacaoDeProdutos'
}
const date = '4 de março'
const hour = {
  beggining: format(new Date(2021, 2, 28, 12), "hh':'mmaaa"),
  end: format(new Date(2021, 2, 28, 13), "hh':'mmaaa")
}

const eventName = '🦨 x 🦦'

module.exports = {
  user,
  products,
  date,
  hour,
  eventName
}