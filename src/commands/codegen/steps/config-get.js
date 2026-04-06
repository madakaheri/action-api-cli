import utils from '../../../utils/index.js';

const PACKAGEJSON_CONFIG_NAME = 'actionApi';

/**
 * configの取得
 *
 * #### 要件
 * - optionsに ```--source```と```--output```が存在する場合はpackageJson.actionApiより優先される
 * - optionsで```--source```または```--output```が指定されない場合は、packageJson.actionApiの存在が必須となる
 * @param {object} input
 * @param {string} input.cwd
 * @param {string[]} input.options
 * @returns {Promise<{source: string, output: string}>}
 */
export async function configGet({cwd, options}) {
	const config = {
		source: null,
		output: null,
	};
		// map options to clientConfig
	for (const option of options) {
		if (option.startsWith('--source=')) {
			config.source = option.replace('--source=', '');
		}

		if (option.startsWith('--output=')) {
			config.output = option.replace('--output=', '');
		}
	}

	// optionsに両方とも存在する場合はここで確定
	if (config.source && config.output) {
		return config;
	}

	// どちらかが存在しない場合はpackageJsonから探す
	const clientPackageJson = await utils.getClientPackageJson(cwd);
	const clientConfig = clientPackageJson[PACKAGEJSON_CONFIG_NAME] || {};
	config.source ||= clientConfig?.source;
	config.output ||= clientConfig?.output;
	if (!config.source || !config.output) {
		const error = new Error('Missing configuration. Please provide --source and --output options or add the following configuration to your package.json.');
		error.name = 'MissingConfigError';
		error.hint = `Example package.json configuration:
{
	"${PACKAGEJSON_CONFIG_NAME}": {
		"source": "src/actions",
		"output": "src/generated"
	}
}`;
		throw error;
	}

	return config;
}
