const join_url = require('url-join')
const environment = require('./environment')
const { exec, env_substr } = require('./utils')

const target = `s3://${join_url(environment.bucket, env_substr(environment.target), '/')}`

main()

async function main() {
	const process_start_at = new Date()

	console.log(`start upload from ${environment.source} to ${target}`)
	await exec([
		`export AWS_ACCESS_KEY_ID="${environment.access_key}" &&`,
		`export AWS_SECRET_ACCESS_KEY="${environment.secret_key}" &&`,
		`export AWS_DEFAULT_REGION="${environment.region}" &&`,
		`aws`,
		environment.endpoint && `--endpoint-url=${environment.endpoint}`,
		environment.delete && `--delete`,
		`s3`,
		`sync`,
		`${environment.source}`,
		target,
		environment.silent && `--only-show-errors`,
	])

	console.log(`deploy time: ${(new Date() - process_start_at) / 1000}s`)
}
