import fs from 'node:fs/promises';
import path from 'node:path';
import camelCase from 'lodash.camelcase';

/**
 * @param {object} input
 * @param {string} input.outPath
 * @param {string} input.actionName
 * @param {string} input.docComment
 * @param {string} input.inputName
 * @param {string} input.notice
 * @returns {Promise<string>} code
 */
export async function publishAction({outPath, actionName, docComment, inputName, notice}) {
	const actionNameCamel = camelCase(actionName);
	const code = `${notice}
	
	import api from '../../utils/api.js';
	
	${docComment}
	export async function ${actionNameCamel}(${inputName}) {
		return api.post({
			action: '${actionName}',
			payload: ${inputName || 'null'},
		});
	}
	`;

	await fs.mkdir(path.dirname(outPath), {recursive: true});
	await fs.writeFile(outPath, code, 'utf8');

	return code;
}
