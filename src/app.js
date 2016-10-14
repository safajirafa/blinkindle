const fetch = require('node-fetch');
const cheerio = require('cheerio');

const fetchMetadata = require('./metadata').fetchMetadata;
const fetchContent = require('./content').fetchContent;

const config = require('../config.json');

const fs = require('fs');

fetchMetadata().then(metadata => {
  fetch(metadata.contentUrl).then(res => {
    return res.text();
  }).then(body => {
    let $ = cheerio.load(body);

    let $summary = $('<article>');

    // TODO Structure format!!!
    $('.chapter').each(function(index) {
      $summary.append($(this).html());
    });

    $summary.find('.promotion').empty();

    // TODO: Use the book title to name the file
    // let title = $('.chapter_visible h1')
    //   .html()
    //   .replace('What&#x2019;s in it for me? ', '');

    const fileName = `${config.OUTPUT_DIR}/${metadata.bookTitle.replace(/\./g, '')} - ${metadata.author}.html`;

    fs.writeFile(fileName, $summary.html(), (err) => {
      if (err) {
        return console.log(err);
      }
    });
  });

  //console.log('Today\'s book is: %s by %s', metadata.bookTitle, metadata.author);
});
