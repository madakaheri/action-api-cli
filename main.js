#!/usr/bin/env node

import process from 'node:process';
import {handler} from './src/index.js';

const rootPath = new URL('.', import.meta.url).pathname;
const cwd = process.cwd();
const [command, ...options] = process.argv.slice(2);

await handler({
	rootPath,
	cwd,
	command,
	options,
});
