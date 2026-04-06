import test from 'node:test';
import assert from 'node:assert/strict';
import utils from '../../../utils/index.js';
import {configGet} from './config-get.js';

test('configGet with options', async () => {
	const input = {
		cwd: '/any/path',
		options: ['--source=src/actions', '--output=src/generated'],
	};
	const config = await configGet(input);
	assert.deepStrictEqual(config, {source: 'src/actions', output: 'src/generated'});
});

test('configGet with package.json config', async () => {
	utils.getClientPackageJson = async () => ({
		actionApi: {
			source: 'src/actions',
			output: 'src/generated',
		},
	});
	const input = {
		cwd: './test/fixtures/client-with-config',
		options: [],
	};
	const config = await configGet(input);
	assert.deepStrictEqual(config, {source: 'src/actions', output: 'src/generated'});
});

test('configGet with missing config', async () => {
	utils.getClientPackageJson = async () => ({});
	const input = {
		cwd: './test/fixtures/client-without-config',
		options: [],
	};
	await assert.rejects(() => configGet(input), {
		name: 'MissingConfigError',
	});
});
