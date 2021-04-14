const _exec = require('shelljs.exec')
const { template } = require('lodash')

async function exec(commands) {
	return new Promise((res, rej) => {
		const { error, stdout } = _exec(
			Array.isArray(commands) ? commands.filter(v => !!v).join(' ') : commands,
			{
				stdio: 'inherit',
			},
		)
		if (error) {
			rej(error)
		} else {
			res(stdout)
		}
	})
}

function escape(dir) {
	return (dir + '').toLowerCase().replace(/(?:(?![a-z0-9\-]).)/gm, '-')
}

/**
 * Возможные переменные
 * - branch_escape
 */
function env_substr(str) {
	const data = {
		branch_escape: escape(process.env.DRONE_SOURCE_BRANCH),
	}
	return template(str, {
		interpolate: /{{([\s\S]+?)}}/g,
		evaluate: /{%([\s\S]+?)%}/g,
	})(data)
}

module.exports = {
	escape,
	exec,
	env_substr,
}
