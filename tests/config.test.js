const config = require('../config.json')

test('should have a valid config object', () => {
	const configSchema = {
		blinkist: {
			HOST: 'https://app.blinkist.com',
			DAILY_URL: 'https://app.blinkist.com/en/daily'
		},
		OUTPUT_DIR: expect.any(String)
	}

	expect(config).toMatchObject(configSchema)
})

