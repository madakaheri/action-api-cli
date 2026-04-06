import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {resetActions} from './reset-actions.js';

const outPath = new URL('../../../src/actions', import.meta.url).pathname;

test('resetActions', async () => {
	await resetActions(outPath);
	const files = await fs.readdir(outPath);
	assert.strictEqual(files.length, 0, 'outPath should be empty after resetting actions');
});
