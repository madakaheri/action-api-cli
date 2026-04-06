/**
 * @param {object} event
 * @param {string} event.rootPath
 * @param {string} event.cwd
 * @param {string} event.command
 * @param {string[]} event.options
 * @returns {Promise<void>}
 */
export async function handler({rootPath, cwd, command, options}) {
	switch (command) {
		case 'codegen': {
			const {codegen} = await import('./commands/codegen/index.js');
			await codegen({cwd, options});
			break;
		}

		default: {
			const {info} = await import('./commands/help/index.js');
			await info({rootPath});
		}
	}
}
