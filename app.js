const fetch = require('node-fetch');
const cheerio = require('cheerio');

fetch('https://app.blinkist.com/en/daily/')
  .then(res => res.text())
  .then(body => {
    let $ = cheerio.load(body);

    return {
      author: $('.today .blinks-pack__text__author').text().trim(),
      bookTitle: $('.today .blinks-pack__text__title').text().trim(),
      url: $('.today .blink__button a').prop('href')
    }
  })
  .then(metadata => {
    let fullUrl = `https://app.blinkist.com${metadata.url}`;

    fetch(fullUrl).then(res => {
      return res.text();
    }).then(body => {
      let $ = cheerio.load(body);

      // TODO Structure format!!!

      // Book title
      let title = $('.chapter_visible h1').first().text().replace('What’s in it for me? ', '');

      console.log(title);
    });

    console.log('Today\'s book is: %s by %s', metadata.bookTitle, metadata.author);
  });
