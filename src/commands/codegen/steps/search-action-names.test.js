import test from 'node:test';
import assert from 'node:assert/strict';
import {searchActionNames} from './search-action-names.js';

const sourcePath = new URL('../../../../../service/src/actions', import.meta.url).pathname;

test('searchActionNames', async () => {
	const actionNames = await searchActionNames(sourcePath);
	console.log(actionNames);
	assert.ok(Array.isArray(actionNames), 'actionNames should be an array');
	assert.ok(actionNames.length > 0, 'actionNames should not be empty');
	assert.ok(actionNames.every(name => typeof name === 'string'), 'all actionNames should be strings');
});
