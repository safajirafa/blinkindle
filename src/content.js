const getBlinkistMetadata = require('./metadata')
const domUtils = require('./dom-utils')
const fetch = require('node-fetch');

module.exports = async function() {
	let metadata, page, markup
	try {
		metadata = await getBlinkistMetadata()
		page = await fetch(metadata.contentUrl)
		markup = await page.text()
	} catch(e) {
		console.log(e)
	}
	return {
		title: metadata.bookTitle,
		author: metadata.author,
		publisher: 'blinkist.com',
		html: domUtils.parseBlinkistContent(markup)
	}
}
