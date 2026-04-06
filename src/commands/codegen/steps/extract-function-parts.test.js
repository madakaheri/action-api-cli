import test from 'node:test';
import assert from 'node:assert/strict';
import {extractFunctionParts} from './extract-function-parts.js';

const sourcePath = new URL('extract-function-parts.js', import.meta.url).pathname;

test('extractFunctionParts', async () => {
	const {docComment, inputName} = await extractFunctionParts(sourcePath);
	console.log({docComment, inputName});
	assert.strictEqual(typeof docComment, 'string', 'docComment should be a string');
	assert.ok(docComment.includes('@param {string} sourcePath'), 'docComment should include @param for sourcePath');
	assert.ok(docComment.includes('@returns {Promise<{'), 'docComment should include @returns with expected structure');
	assert.ok(inputName === undefined || typeof inputName === 'string', 'inputName should be a string or undefined');
});
