import path from 'node:path';
import fs from 'node:fs/promises';

/**
 * クライアントプロジェクトのpackage.jsonを取得する
 * @param {string} cwd
 * @returns {Promise<object>}
 * @throws {Error} name: 'FileNotFoundError' - package.jsonが見つからない場合にスロー
 */
export async function getClientPackageJson(cwd) {
	const clientPackageJsonPath = path.join(cwd, 'package.json');
	try {
		await fs.access(clientPackageJsonPath);
	} catch {
		const error = new Error(`No package.json found in the current directory (${cwd}). Please run this command in the root of your client project or provide --source and --output options.`);
		error.name = 'FileNotFoundError';
		throw error;
	}

	const clientPackageJsonContent = await fs.readFile(clientPackageJsonPath, 'utf8');
	return JSON.parse(clientPackageJsonContent);
}
