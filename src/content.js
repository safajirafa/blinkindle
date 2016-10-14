const config = require('../config.json');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

module.exports.fetchContent = (metadata) => {
  return new Promise((resolve) => {
    fetch(metadata.contentUrl)
      .then(res => res.text())
      .then(body => {
        const $ = cheerio.load(body);

        let $summary = $('<article>');

        //Append chapters to $summary element
        $('.chapter').each(() => {
          $summary.append($(this).html());
        });

        // No promo info bro :stuck_out_tongue:
        $summary.find('.promotion').empty();

        const fileName = `${config.OUTPUT_DIR}/${metadata.bookTitle.replace(/\./g, '')} - ${metadata.author}.html`;

        fs.writeFile(fileName, $summary.html(), (err) => {
          if (err) {
            return console.log(err);
          }
          console.log('Today\'s book is: %s by %s   ...enjoy', metadata.bookTitle, metadata.author);
        });
      });
  });
};
