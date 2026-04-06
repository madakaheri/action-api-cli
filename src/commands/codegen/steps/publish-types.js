import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * @param {object} input
 * @param {string} input.sourcePath
 * @param {string} input.outPath
 * @returns {Promise<void>}
 */
export async function publishTypes({sourcePath, outPath}) {
	const typesPath = path.join(sourcePath, '..');
	const outTypesPath = path.join(outPath, '..');

	const dirrents = await fs.readdir(typesPath, {
		withFileTypes: true,
		recursive: true,
	});
	const files = dirrents
		.filter(dirent => dirent.isFile())
		.map(dirent => {
			const relativePath = path.relative(typesPath, path.join(dirent.parentPath, dirent.name));
			return relativePath
				// 先頭に必ず path-name が入るよう調整
				.split(path.sep)
				.filter(part => part !== '.')
				.filter(Boolean)
				.join('/');
		})
		.filter(relativePath => {
			if (relativePath.includes('/')) {
				return relativePath.startsWith('types/');
			}

			return relativePath.startsWith('types.');
		});

	await Promise.all(files.map(async file => {
		const sourceFile = path.join(typesPath, file);
		const outFile = path.join(outTypesPath, file);
		await fs.mkdir(path.dirname(outFile), {recursive: true});
		await fs.copyFile(sourceFile, outFile);
	}));
}
