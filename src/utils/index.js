var format = require('date-fns/format')

const user = {
  name: 'luvas',
  email: 'luvas@gmail.com',
}
const companyInfo = {
  sector: 'Metal',
  numberOfCollaborators: 6,
  knowOtherPartnerProduct: 'Não'
}
const products = {
  tech: 'squad',
  section: 'apresentacaoDeProdutos'
}
const date = '5 de março'
const hour = {
  beggining: format(new Date(2021, 2, 28, 8), "hh':'mmaaa"),
  end: format(new Date(2021, 2, 28, 9), "hh':'mmaaa")
}

const eventName = '🦨 x 🦦'

module.exports = {
  user,
  products,
  date,
  hour,
  eventName,
  companyInfo
}