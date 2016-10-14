const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const fetchMetadata = require('./metadata').fetchMetadata;

fetchMetadata().then(res => {
  fetch(res.contentUrl).then(res => {
    return res.text();
  }).then(body => {
    let $ = cheerio.load(body);

    let $summary = $('<article>');

    // TODO Structure format!!!
    $('.chapter').each(function(index) {
      $summary.append($(this).html());
    });

    $summary.find('.promotion').empty();

    // save content to html file!
    console.log($summary.html());

    // TODO: Use the book title to name the file
    // let title = $('.chapter_visible h1')
    //   .html()
    //   .replace('What&#x2019;s in it for me? ', '');

    fs.writeFile('/Users/andres.valencia/Google Drive/blinkist-hoarder/nice.html', $summary.html(), (err) => {
      if (err) {
        return console.log(err);
      }
    });
  });

  //console.log('Today\'s book is: %s by %s', metadata.bookTitle, metadata.author);
});
