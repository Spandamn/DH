/**
 * Verifier process
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * This is just an asynchronous implementation of a verifier for a
 * signed key, because Node.js's crypto functions are synchronous,
 * strangely, considering how everything else is asynchronous.
 *
 * I wrote this one day hoping it would help with performance, but
 * I don't think it had any noticeable effect.
 *
 * @license MIT
 */
import * as crypto from 'crypto';

import {QueryProcessManager} from '../lib/process-manager';

export const PM = new QueryProcessManager(module, async ({data, signature}) => {
	const verifier = crypto.createVerify(Config.loginserverkeyalgo);
	verifier.update(data);
	let success = false;
	try {
		success = verifier.verify(Config.loginserverpublickey, signature, 'hex');
	} catch (e) {}

	return success;
});

export function verify(data: string, signature: string): Promise<boolean> {
	return PM.query({data, signature});
}

if (!PM.isParentProcess) {
	// This is a child process!
	// @ts-ignore This file doesn't exist on the repository, so Travis checks fail if this isn't ignored
	global.Config = require('../config/config'); // tslint:disable-line: no-var-requires

	const Repl = require('../lib/repl').Repl; // tslint:disable-line: no-var-requires
	// tslint:disable-next-line: no-eval
	Repl.start('verifier', (cmd: string) => eval(cmd));
} else {
	PM.spawn(global.Config ? Config.verifierprocesses : 1);
}
