require('dotenv/config')
const { date, eventName, hour } = require('../utils')
const puppeteer = require('puppeteer')
const { Router } = require('express')

const calendarRouter = Router()

const loginToGoogle = async (browser, page) => {
  await page.goto('https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin')
  await page.type('#identifierId', process.env.LOGIN)
  await Promise.all([
    page.waitForNavigation(),
    page.click('.VfPpkd-Jh9lGc')
  ])
  await page.waitForTimeout(1000)
  await page.type('input[type=password][name=password]', process.env.PASSWORD)
  await page.click('.VfPpkd-RLmnJb')
}

const handleXPathOperation = async (xpath, page, text='') => { 
  await page.waitForXPath(xpath)
  let handler = await page.$x(xpath)
  if (!text.length) await handler[0].click()
  else {
    await handler[0].focus()
    await page.waitForTimeout(500)
    await handler[0].type(text, {delay: 20})
  }
}

const setDateAndEventName = async (page) => {
  await page.waitForTimeout(500)
  await handleXPathOperation(
    `/html/body/div[4]/div/div/div[2]/span/div/div[1]/div[3]/div[1]/div[2]/div[2]/span[1]/div/div[1]/div/div[1]/div/div/div[2]/div[1]/div/span/span`, 
    page
  )
  await handleXPathOperation(
    `/html/body/div[4]/div/div/div[2]/span/div/div[1]/div[3]/div[1]/div[2]/div[2]/span[1]/div/div[1]/div/div[2]/div/div[1]/div/div[2]/div/div[1]/div[1]/div/label/div[1]/div/input`,
    page,
    `${date}`
  )
  await handleXPathOperation(
    `/html/body/div[4]/div/div/div[2]/span/div/div[1]/div[3]/div[1]/div[1]/div/div[1]/div/div[1]/input`,
    page,
    `${eventName}`
  )
}

const setBegginingAndEndHours = async (page) => {
  await handleXPathOperation(
    `/html/body/div[4]/div/div/div[2]/span/div/div[1]/div[3]/div[1]/div[2]/div[2]/span[1]/div/div[1]/div/div[2]/div/div[1]/div/div[2]/div/div[2]/div[1]/div[1]/div/label/div[1]/div/input`,
    page,
    `${hour.beggining}`
  )
  await handleXPathOperation(
    `/html/body/div[4]/div/div/div[2]/span/div/div[1]/div[3]/div[1]/div[2]/div[2]/span[1]/div/div[1]/div/div[2]/div/div[1]/div/div[2]/div/div[2]/div[2]/div[1]/div/label/div[1]/div/input`,
    page,
    `${hour.end}`
  )
}

const submitEventCalendar = async (page) => {
  await handleXPathOperation(
    `/html/body/div[4]/div/div/div[2]/span/div/div[1]/div[3]/div[2]/div[2]`,
    page
  )
}

const calendarOperations = async (browser, page) => {
  await page.goto('https://calendar.google.com/calendar/u/0/r?tab=mc&pli=1')
  await page.click('.u5sQsb')
  await page.waitForXPath(`/html/body/div[2]/div[1]/div[1]/div[1]/button/span[2]`)
  await setDateAndEventName(page)
  await page.waitForTimeout(500)
  await setBegginingAndEndHours(page)
  await submitEventCalendar(page)
  await browser.close();
}

calendarRouter.get('/calendar', async (req, res) => {
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

module.exports = {
  calendarRouter
}