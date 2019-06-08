'use strict';
let fs = require('fs');
let mods = fs.readdirSync('./');
for (let mod of mods) {
	if (mod === 'replace.js') continue;
	let files = fs.readdirSync(`./${mod}`);
	for (let file of files) {
		if (!file.endsWith('.js')) continue;
		let data = fs.readFileSync(`./${mod}/${file}`).toString();
		console.log(`Replacing in mods/${mod}/${file}`);
		data = data.replace(/toId/g, 'toID'); // First instance is what you want to replace, second is what you want to replace it with
		fs.writeFileSync(`./${mod}/${file}`, data);
	}
}
console.log('Done');
