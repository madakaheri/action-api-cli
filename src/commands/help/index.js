import path from 'node:path';
import fs from 'node:fs/promises';

/**
 * @param {object} event
 * @param {string} event.rootPath
 * @returns {Promise<string>}
 */
export async function help({rootPath}) {
	const packageJsonPath = path.join(rootPath, 'package.json');
	const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8');
	const {version} = JSON.parse(packageJsonContent);
	const info = `
Action API CLI v${version}

Usage: action-api <command> [options]

Commands:
	help			Display this help message
	codegen		Generate client actions
`;
	console.info(info);
	return info;
}
