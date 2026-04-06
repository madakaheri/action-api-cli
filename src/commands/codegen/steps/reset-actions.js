import fs from 'node:fs/promises';

/**
 * 既存のactionsディレクトリを削除して空の状態で再生成
 * @param {string} outPath
 * @returns {Promise<void>}
 */
export async function resetActions(outPath) {
	try {
		await fs.rm(`${outPath}`, {recursive: true});
	} catch {
		// thru
	}

	await fs.mkdir(`${outPath}`, {recursive: true});
}
