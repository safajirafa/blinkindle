const getBlinkistContent = require('./content')
const config = require('../config.json')
const epub = require("epub-gen")

getBlinkistContent().then(c => {
	const fileName = `${config.OUTPUT_DIR}/${c.title.replace(/\./g, '')} - ${c.author}.epub`;
	const epubOptions = {
		title: c.title,
		author: c.author,
		publisher: 'Blinkist.com',
		content: [{ data: c.html }]
	};

	// Generate an ePub and have always something to read :)
	new epub(epubOptions, fileName);
})
