const puppeteer = require('puppeteer')
const { Router } = require('express')
const { user, products, companyInfo } = require('../utils')
const documentsRouter = Router()

documentsRouter.get('/documents', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('https://forms.rdstation.com.br/chatbot-produtos-a31b6d9833561a1ba3ff')
    const desiredProduct = {
      unity: page.click('#rd-radio_buttons_field-ndAzGNhldU99Q8AwsgoU_Q_Unity'),
      telflex: page.click('#rd-radio_buttons_field-ndAzGNhldU99Q8AwsgoU_Q_Telflex'),
      squad: page.click('#rd-radio_buttons_field-ndAzGNhldU99Q8AwsgoU_Q_Squad')
    }
    const documentsSelection = {
      apresentacaoDeProdutos: page.click('#rd-radio_buttons_field-phGUw-prSznqZNxj39Lg8Q_Apresentação_de_produtos'),
      folhaDeDados: page.click('#rd-radio_buttons_field-phGUw-prSznqZNxj39Lg8Q_Folha_de_dados'),
      descricaoDeProdutos: page.click('#rd-radio_buttons_field-phGUw-prSznqZNxj39Lg8Q_Descrição_de_produtos'),
      manualDoUsuario: page.click('#rd-radio_buttons_field-phGUw-prSznqZNxj39Lg8Q_Manual_do_usuário'),
      manualDoAdmin: page.click('#rd-radio_buttons_field-phGUw-prSznqZNxj39Lg8Q_Manual_do_admin'),
      newsletter: page.click('#rd-radio_buttons_field-phGUw-prSznqZNxj39Lg8Q_Newsletter')
    }
    await page.waitForTimeout(500)
    await page.$eval('#rd-text_field-3_-5y7no0_FHMDrHnCMV9Q', (el, user) => el.value = user.name, user)
    await page.$eval('#rd-email_field-R-hSapwS9toeXNu_CtCoEg', (el, user) => el.value = user.email, user)
    await desiredProduct[products.tech]
    await documentsSelection[products.section]
    await page.$eval('#rd-text_field-wBwRoOG9OwKtkGPmudqIaA', (el, companyInfo) => el.value = companyInfo.sector, companyInfo)
    await page.$eval('#rd-text_field-DGVqHl-V6rkhng3e2h9-eQ', (el, companyInfo) => el.value = companyInfo.numberOfCollaborators, companyInfo)
    await page.$eval('#rd-text_field-sDZSEu6M0kRdDcyFUzPNog', (el, companyInfo) => el.value = companyInfo.knowOtherPartnerProduct, companyInfo)
    await Promise.all([
      page.waitForNavigation(),
      page.click('#rd-button-kljctmtk')
    ])
    await page.waitForTimeout(2000)
    await browser.close();
    res.json({ ok: '🦫'})
  } catch (err) {
    console.error(err)
  }
})

module.exports = {
  documentsRouter
}