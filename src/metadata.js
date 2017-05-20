const config = require('../config.json')
const fetch = require('node-fetch')
const domUtils = require('./dom-utils')

module.exports = async function() {
	let page, markup
	try {
		page = await fetch(config.blinkist.DAILY_URL)
		markup = await page.text()
	} catch(e) {
		console.log(e)
	}
	return domUtils.getBlinkistObject(config.blinkist.HOST, markup)
}
