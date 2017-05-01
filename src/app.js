const fetchMetadata = require('./metadata').fetchMetadata;
const fetchContent = require('./content').fetchContent;

fetchMetadata().then(metadata => {
	fetchContent(metadata);
});
