const handleXPathOperation = async (xpath, page, text='') => { 
  await page.waitForXPath(xpath)
  let handler = await page.$x(xpath)
  if (!text.length) await handler[0].click()
  else {
    await handler[0].focus()
    await handler[0].type(text)
  }
}

module.exports = {
  handleXPathOperation
}