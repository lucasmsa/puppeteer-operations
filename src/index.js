const express = require('express');
const puppeteer = require('puppeteer');
const { date, eventName, hour, products, user } = require('./utils/test-variables')

require('dotenv/config')
const app = express();

app.get('/', async (req, res) => {
  try {
    const browser =  await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://forms.rdstation.com.br/chatbot-agendar-demo-fd230f90358743d7ffe7');
    await page.type('#rd-text_field-klgho98a', user.name)
    await page.type('#rd-email_field-klgho98b', user.email)
    await page.waitForTimeout(1000)
    await Promise.all([
      page.waitForNavigation(),
      page.click('#rd-button-klghkeme')
    ])
    await page.waitForTimeout(1000)
    await browser.close();
    
    res.json({ ok: '🦬' })
  } catch (err) {
    console.error(err)
  }
})

app.get('/products', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('https://forms.rdstation.com.br/chatbot-produtos-a31b6d9833561a1ba3ff')
    const documentsSelection = {
      apresentacaoDeProdutos: page.click('#rd-radio_buttons_field-kljd8u2e_Apresentação_de_produtos'),
      folhaDeDados: page.click('#rd-radio_buttons_field-kljd8u2e_Folha_de_dados'),
      descricaoDeProdutos: page.click('#rd-radio_buttons_field-kljd8u2e_Descrição_de_produtos'),
      manualDoUsuario: page.click('#rd-radio_buttons_field-kljd8u2e_Manual_do_usuário'),
      manualDoAdmin: page.click('#rd-radio_buttons_field-kljd8u2e_Manual_do_admin')
    }    
    await page.type('#rd-text_field-kljd8u2c', user.name)
    await page.type('#rd-email_field-kljd8u2d', user.email)
    await documentsSelection[products.section]
    await page.waitForTimeout(1000)
    await Promise.all([
      page.waitForNavigation(),
      page.click('#rd-button-kljctmtk')
    ])
    await page.waitForTimeout(3000)
    await browser.close();
    res.json({ ok: '🦫'})
  } catch (err) {
    console.error(err)
  }
})
const loginToGoogle = async (browser, page) => {
  await page.goto('https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin')
  await page.type('#identifierId', process.env.LOGIN)
  await Promise.all([
    page.waitForNavigation(),
    page.click('.VfPpkd-Jh9lGc')
  ])
  await page.waitForTimeout(1000)
  console.log(page.url())
  await page.type('input[type=password][name=password]', process.env.PASSWORD)
  await page.click('.VfPpkd-RLmnJb')
}

const setDateAndEventName = async (page) => {
  let calendarDateTimeHandler = await page.$x(`//*[@id="tabEvent"]/div/div[1]/div/div[1]/div/div/div[2]/div[1]/div/span/span`)
  await page.evaluate(el => el.click(), calendarDateTimeHandler[0])
  let dateHandler = await page.$x(`//*[@id="c72"]/div/div[1]/div/div[2]/div/div[1]/div[1]/div/label/div[1]/div/input`)
  await page.evaluate((el, date) => { el.value = `${date.day} ${date.month}` }, dateHandler[0], date)
  let eventNameHandler = await page.$x(`//*[@id="yDmH0d"]/div/div/div[2]/span/div/div[1]/div[3]/div[1]/div[1]/div/div[1]/div/div[1]/input`)
  await page.evaluate((el, name) => { el.value = `${name}` }, eventNameHandler[0], eventName)
}

const setBegginingAndEndHours = async (page) => {

}

const calendarOperations = async (browser, page) => {
  await page.goto('https://calendar.google.com/calendar/u/0/r?tab=mc&pli=1')
  await page.click('.u5sQsb')
  await page.waitForXPath(`//*[@id="tabEvent"]/div/div[1]/div/div[1]/div/div/div[2]/div[1]/div/span/span`)
  await setDateAndEventName(page)
  await setBegginingAndEndHours(page)
  await page.waitForTimeout(20000)
  await browser.close();
}

app.get('/calendar', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await loginToGoogle(browser, page)
    await page.waitForTimeout(1000)
    await calendarOperations(browser, page)
    res.json({ ok: '🦫'})
  } catch (err) {
    console.error(err)
  }
})

app.listen(3000, (req, res) => {
  console.log("Server listening on port 3000 🦥")
})