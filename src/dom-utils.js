const cheerio = require('cheerio');

module.exports.getBlinkistObject = (host, markup) => {
	$ = cheerio.load(markup)
	author = $(`.dailyV2__free-book__author`).text().trim()
	bookTitle = $(`.dailyV2__free-book__title`).text().trim()
	contentPath = $(`.dailyV2__free-book__cta a`).prop('href')
	contentUrl = `${host}${contentPath}`
	return {author, bookTitle, contentUrl}
}

module.exports.parseBlinkistContent = (markup) => {
	let $ = cheerio.load(markup);
	let $summary = $('<article>');
	//Append chapters to $summary element
	$('.chapter').each((index, el) => {
		$summary.append($(el).html());
	});
	// No promo info bro :stuck_out_tongue:
	$summary.find('.promotion').empty();
	return $summary.html();
}
