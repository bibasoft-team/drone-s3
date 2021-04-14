const { env } = require('process')

const environment = {
	bucket: env.PLUGIN_BUCKET,
	target: env.PLUGIN_TARGET,
	access_key: env.PLUGIN_ACCESS_KEY,
	secret_key: env.PLUGIN_SECRET_KEY,
	endpoint: env.PLUGIN_ENDPOINT,
	source: env.PLUGIN_SOURCE,
	delete: env.PLUGIN_DELETE ? env.PLUGIN_DEVETE === 'true' : true,
	silent: env.PLUGIN_SILENT ? env.PLUGIN_SILENT === 'true' : true,
	region: env.PLUGIN_REGION || 'ru-central1',
}

module.exports = environment
