const config = require('../config.json');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports.fetchMetadata = () => {
	return new Promise((resolve) => {
		fetch(config.blinkist.DAILY_URL)
			.then(res => res.text())
			.then(body => {
				const $ = cheerio.load(body);
				const author = $('.dailyV2__free-book__author').text().trim();
				const bookTitle = $('.dailyV2__free-book__title').text().trim();
				const contentPath = $('.dailyV2__free-book__cta a').prop('href');

				resolve({
					author: author,
					bookTitle: bookTitle,
					contentUrl: `${config.blinkist.HOST}${contentPath}`
				});
			})
	});
};
