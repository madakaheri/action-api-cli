import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * @param {object} input
 * @param {string} input.outPath
 * @param {string[]} input.actionNames
 * @param {string} input.notice
 * @returns {Promise<string>} code
 */
export async function publishActionsIndex({outPath, actionNames, notice}) {
	const code = `${notice}

${actionNames.map(actionName => `export * from './${actionName}/index.js';`).join('\n')}
`;

	await fs.mkdir(path.dirname(outPath), {recursive: true});
	await fs.writeFile(outPath, code, 'utf8');

	return code;
}
