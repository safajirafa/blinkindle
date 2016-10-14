const config = require('../config.json');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports.fetchMetadata = () => {
  return new Promise((resolve) => {
    fetch(config.blinkist.DAILY_URL)
      .then(res => res.text())
      .then(body => {
        const $ = cheerio.load(body);
        const author = $('.today .blinks-pack__text__author').text().trim();
        const bookTitle = $('.today .blinks-pack__text__title').text().trim();
        const contentPath = $('.today .blink__button a').prop('href');

        resolve({
          author: author,
          bookTitle: bookTitle,
          contentUrl: `${config.blinkist.HOST}${contentPath}`
        });
      })
  });
};
