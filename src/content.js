const config = require('../config.json');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const epub = require("epub-gen")

module.exports.fetchContent = (metadata) => {
	return new Promise((resolve) => {
		fetch(metadata.contentUrl)
			.then(res => res.text())
			.then(body => {
				let $ = cheerio.load(body);

				let $summary = $('<article>');

				//Append chapters to $summary element
				$('.chapter').each((index, el) => {
					$summary.append($(el).html());
				});

				// No promo info bro :stuck_out_tongue:
				$summary.find('.promotion').empty();

				const fileName = `${config.OUTPUT_DIR}/${metadata.bookTitle.replace(/\./g, '')} - ${metadata.author}.epub`;

				const epubOptions = {
					title: metadata.bookTitle,
					author: metadata.author,
					publisher: 'Blinkist.com',
					content: [{ data: $summary.html() }]
				};

				new epub(epubOptions, fileName);
			});
	});
};
