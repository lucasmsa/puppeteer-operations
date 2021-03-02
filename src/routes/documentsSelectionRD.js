const puppeteer = require('puppeteer')
const { Router } = require('express')
const { user, products, companyInfo, handleXPathOperation } = require('../utils')
const documentsRouter = Router()

documentsRouter.get('/documents', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('https://forms.rdstation.com.br/chatbot-produtos-a31b6d9833561a1ba3ff')
    const formType = {
      agendarReuniao: '/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[1]/div[1]/label/input',
      envioDeDocumentos: '/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[1]/div[2]/label/input',
      newsletter: '/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[1]/div[3]/label/input',
      falarComConsultor: '/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[1]/div[4]/label/input',
      queroSerParceiro: '/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[1]/div[5]/label/input'
    }
    const desiredProduct = {
      unity: '/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[5]/div[1]/label/input',
      telflex: '/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[5]/div[2]/label/input',
      squad: '/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[5]/div[3]/label/input'
    }
    const documentsSelection = {
      apresentacaoDeProdutos:  '/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[6]/div[1]/label/input',
      folhaDeDados: '/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[6]/div[2]/label/input',
      descricaoDeProdutos: '/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[6]/div[3]/label/input',
      manualDoUsuario: '/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[6]/div[4]/label/input',
      manualDoAdmin: '/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[6]/div[5]/label/input',
    }
    const partnershipType = {
      parceiroIntegrador: '/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[10]/div[1]/label/input',
      parceiroRepresentante: '/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[10]/div[2]/label/input',
      parceiroConsultor: '/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[10]/div[3]/label/input'
    }

    await handleXPathOperation('/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[2]/input', page, user.name)
    await handleXPathOperation('/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[3]/input', page, user.email)
    if (products.section) {
      await handleXPathOperation(desiredProduct[products.tech], page)
      await handleXPathOperation(documentsSelection[products.section], page)
    }
    if (products.type === 'agendarReuniao' || 'falarComConsultor' || 'queroSerParceiro') {
      await handleXPathOperation('/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[7]/input', page, companyInfo.sector)
      if (products.type !== 'queroSerParceiro') await handleXPathOperation('/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[8]/input', page, companyInfo.numberOfCollaborators)
      await handleXPathOperation('/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[4]/div/input', page, user.phone)
    }
    if (products.type === 'falarComConsultor') await handleXPathOperation('/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[11]/textarea', page, user.specificDoubt)
    if (products.type === 'queroSerParceiro') await handleXPathOperation(partnershipType[user.partnerType], page)

    await handleXPathOperation('/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[1]/div[9]/input', page, companyInfo.knowOtherPartnerProduct)
    await Promise.all([
      page.waitForNavigation(),
      handleXPathOperation('/html/body/section/div/div/section/div[2]/div/div/div[1]/form/div[2]/button', page)
    ])

    await page.waitForTimeout(10000)
    await browser.close()
    res.json({ ok: '🦫'})
  } catch (err) {
    console.error(err)
  }
})

module.exports = {
  documentsRouter
}